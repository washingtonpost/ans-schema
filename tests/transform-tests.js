'use strict';

var should = require('should'),
    dir = require('node-dir'),
    path = require('path'),
    Ajv = require('ajv'),
    ans = require('../lib/ans'),
    _ = require('lodash'),
    async = require('async');

var current_version = ans.version;
var transforms = ans.transforms;
var loadedFiles = {};
var baseDir = path.join(path.dirname(module.filename), '../src/main/resources/schema/ans');
var loadedSchemas = {};

var ajv = new Ajv({allErrors:true});

var FIRST_VERSION = '0.5.0';
var LAST_VERSION = current_version.version;

var fixtures = {};
var ans_validator = null;

// Helpers
var validate = function(schemaName, ans, expected) {
  var schema = loadedSchemas[schemaName];
  //console.log(fixtures);
  expected = (typeof expected === "undefined") ? true : expected;

  var result = ajv.validate(schema, ans);
  //console.log("Fixture: " + fixture);
  if (result !== expected) {
    console.log(ans);
    console.log(result.errors);
  }
  result.should.eql(expected);
};

var validateAns = function(transformed_ans, original_ans, version, expected) {

  expected = (typeof expected === "undefined") ? [] : expected;
  var result = ans_validator.getAllContentErrors(transformed_ans, version, "");
  if (_.difference(result, expected).length !== 0) {
    console.log("----ORIGINAL: " + JSON.stringify(original_ans, null, 2));
    console.log("----TRANSFORMED: " + JSON.stringify(transformed_ans, null, 2));
    console.log(JSON.stringify(result, null, 2));
  }
  _.difference(result, expected).length.should.eql(0);
};


var validateTransformAndValidate = function validateTransformAndValidate(name, version, type, transformer) {
  if (_.isNil(fixtures[version][name])) {
    console.log("      Skipping " + name + " for version " + version);
  }
  else {
    console.log("      Validating " + name + " for version " + version);
    var original = fixtures[version][name];
    validateAns(original, null, version);

    console.log("      Transforming and validating " + name);
    var transformed = transformer(fixtures[version][name]);
    var validate_version = transformed.version;

    validateAns(transformed, original, validate_version);
  }
};


describe("Transformations: ", function() {
  // Make sure schemas are loaded
  before(function(done) {
    ans.getSchemas(function(err, schemas) {
      loadedSchemas = schemas;

      ans_validator = new ans.AnsValidator(new Ajv({allErrors:true}), loadedSchemas);

      var keys = Object.keys(loadedSchemas);

      for( var i = 0; i < keys.length; i++) {
        var schema = loadedSchemas[keys[i]];
        ajv.addSchema(schema);
      }

      done();
    });
  });

  // Make sure fixtures are loaded
  before(function(done) {

    var version_keys = _.keys(transforms.upverters);

    async.reduce(version_keys, {}, function(result, version, callback) {
      fixtures[version] = {};
      dir.readFiles(
        path.join(path.dirname(module.filename), 'fixtures/transforms/' + version),
        function(err, content, filename, next) {
          if (err) throw err;

          fixtures[version][path.basename(filename, '.json')] = JSON.parse(content);

          next();
        },
        function(err, files) {
          if (err) {
            console.log(err);
            callback(err);
          }
          else {
            callback(null, fixtures);
          }
        }
      );
    }, function(err, result) {
      done();
    });
  });

  describe("Upverters", function() {

    describe("Image ", function() {
      var fixture_names = ['image-fixture-good', 'image-fixture-good-no-height-width'];

      _.forIn(transforms.upverters, function(transformer, version) {
        it("can transform from " + version, function() {
          _.forEach(fixture_names, function(value, key) {
            validateTransformAndValidate(value, version, '/image.json', transformer);
          });
        });
      });

      it(" validates as version " + LAST_VERSION + " after being upverted from " + FIRST_VERSION, function() {
        _.forEach(fixture_names, function(name, key) {
          validateTransformAndValidate(name, FIRST_VERSION, '/image.json', function(ans) { return transforms.upvert(ans, LAST_VERSION); });
        });
      });
    });


    describe("Video ", function() {
      var fixture_names = ['video-fixture-good', 'video-fixture-nationals'];

      _.forIn(transforms.upverters, function(transformer, version) {
        it("can transform from " + version, function() {
          _.forEach(fixture_names, function(value, key) {
            validateTransformAndValidate(value, version, '/video.json', transformer);
          });
        });
      });

      it(" validates as version " + LAST_VERSION + " after being upverted from " + FIRST_VERSION, function() {
        _.forEach(fixture_names, function(name, key) {
          var transformed = transforms.upvert(fixtures[FIRST_VERSION][name], LAST_VERSION);
          validateTransformAndValidate(name, FIRST_VERSION, '/video.json', function(ans) { return transforms.upvert(ans, LAST_VERSION); });
        });
      });
    });


    describe("Story ", function() {
      var fixture_names = ['story-fixture-good', 'story-fixture-references', 'story-fixture-tiny-house', 'story-fixture-table', 'story-fixture-good-planning',
                           'story-fixture-references-2', 'story-fixture-references-3', 'story-fixture-misspelled-additional-properties'];

      _.forIn(transforms.upverters, function(transformer, version) {
        it("can transform from " + version, function() {
          _.forEach(fixture_names, function(value, key) {
            validateTransformAndValidate(value, version, '/story.json', transformer);
          });
        });
      });

      it(" validates as version " + LAST_VERSION + " after being upverted from " + FIRST_VERSION, function() {
        _.forEach(fixture_names, function(name, key) {
          //var result = transforms.upvert(fixtures[FIRST_VERSION][name], LAST_VERSION);
          validateTransformAndValidate(name, FIRST_VERSION, '/story.json', function(ans) { return transforms.upvert(ans, LAST_VERSION); });
          //validate(LAST_VERSION + '/story.json', result);
        });
      });
    });


    describe("Version Incrementer", function() {
      var getResult = function() { return transforms.incrementer('0.5.5')(fixtures['0.5.4']['story-fixture-versions']) };

      it("should add version to a story", function() {
        var result = getResult();
        result.version.should.eql('0.5.5');
        result.promo_items.basic.version.should.eql('0.5.5');
      });
      it("should not add version to references", function() {
        var result = getResult();
        result.content_elements[13].referent.should.not.have.property("version");
        result.content_elements[18].referent.should.not.have.property("version");
      });

    });


    describe("0.5.0 to 0.5.1: misspelled additional properties", function() {

      var getResult = function() { return transforms.upvert(fixtures['0.5.0']['story-fixture-misspelled-additional-properties'], '0.5.1') };

      it("should be corrected in content_elements[0]", function() {
        var result = getResult();
        result.content_elements[0].should.have.property('additional_properties');
        result.content_elements[0].should.not.have.property('additonal_properties');
        result.content_elements[0].additional_properties.should.be.Object();
        result.content_elements[0].additional_properties['was'].should.be.eql("misspelled");
      });


      it("should be corrected in content_elements[1]", function() {
        var result = getResult();
        result.content_elements[1].should.have.property('additional_properties');
        result.content_elements[1].should.not.have.property('additonal_properties');
        result.content_elements[1].additional_properties.should.be.Object();
        result.content_elements[1].additional_properties['was'].should.be.eql("misspelled");
      });

      it("should be corrected in content_elements[3].content_elements[0]", function() {
        var result = getResult();
        result.content_elements[3].content_elements[0].should.have.property('additional_properties');
        result.content_elements[3].content_elements[0].should.not.have.property('additonal_properties');
        result.content_elements[3].content_elements[0].additional_properties.should.be.Object();
        result.content_elements[3].content_elements[0].additional_properties['was'].should.be.eql("misspelled");
      });

      it("should be left alone in additional_properties.additonal_properties", function() {
        var result = getResult();
        result.should.have.property('additional_properties');
        result.should.not.have.property('additonal_properties');
        result.additional_properties.should.be.Object();
        result.additional_properties.should.have.property('additonal_properties');
      });


      it("should not have affected taxonomy.seo_keywords", function() {
        var result = getResult();
        result.taxonomy.seo_keywords[0].should.be.eql("one");
      });

    });


    describe("0.5.2 to 0.5.3: ", function() {

      var getResult = function() { return transforms.upvert(fixtures['0.5.2']['story-fixture-taxonomy-bugs'], '0.5.3') };


      describe("sections", function() {

        it("should have type, version, and name", function() {
          var result = getResult();
          var site0 = result.taxonomy.sites[0];
          site0.should.have.property("type");
          site0.should.have.property("version");
          site0.should.have.property("name");
          site0.should.have.property("_id");
        });

        it("should have type == 'site'", function() {
          var result = getResult();
          var site0 = result.taxonomy.sites[0];
          site0.type.should.be.eql("site");
        });

        it("should not have extraneous properties", function() {
          var result = getResult();
          var site0 = result.taxonomy.sites[0];

          site0.should.not.have.property("foo");
          site0.should.not.have.property("other");
          site0.should.have.property("additional_properties");
          site0.additional_properties.should.have.property("foo");
          site0.additional_properties.foo.should.be.eql("bar");
        });

        it("should migrate parent to parent_id", function() {
          var result = getResult();
          var site1 = result.taxonomy.sites[1];
          site1.should.have.property("parent_id");
          var old_parent = fixtures['0.5.2']['story-fixture-taxonomy-bugs'].taxonomy.sections[1].parent;

          site1.parent_id.should.be.eql(old_parent);
          site1.should.not.have.property("parent");
        });

        it("should be applied recursively", function() {
          var result = getResult();
          var site0 = result.content_elements[1].taxonomy.sites[0];
          site0.should.have.property("type");
        });

      });

      describe("tags", function() {

        it("should be objects", function() {
          var result = getResult();
          result.taxonomy.tags[0].should.be.Object();
        });

        it("should have name and _id set to string", function() {
          var result = getResult();
          result.taxonomy.tags[0]._id.should.be.eql("alpha");
          result.taxonomy.tags[0].text.should.be.eql("alpha");
        });

        it("should be applied recusively", function() {
          var result = getResult();
          var tag0 = result.content_elements[1].taxonomy.tags[0];
          tag0.should.be.Object();
          tag0.text.should.be.eql("delta");
        });

      });


      describe("promo items", function() {

        it("should have items in it or be absent", function() {
          var result = transforms.upvert(fixtures['0.5.2']['story-fixture-promo-items-empty'], '0.5.3');
          result.should.not.have.property("promo_items");
        });

        it("should have a 'basic' item", function() {
          var result = transforms.upvert(fixtures['0.5.2']['story-fixture-promo-items-no-basic'], '0.5.3');
          result.should.have.property("promo_items");
          _.keys(result.promo_items).length.should.be.eql(2);
          result.promo_items.should.have.property("secondary");
          result.promo_items.should.have.property("basic");
          result.promo_items.basic.should.be.eql(result.promo_items.secondary);
        });

      });


    });

    describe("0.5.3 to 0.5.4", function() {

      describe("planning traits", function() {
        it("should move extra properties into additional_properties", function() {
          var result = transforms.upvert(fixtures['0.5.3']['story-fixture-good-planning'], '0.5.4');
          result.should.have.property("planning");
          result.planning.should.have.property("additional_properties");
          result.planning.additional_properties.foo.should.eql("bar");
          result.planning.additional_properties.scheduling.foo.should.eql("ack");
          result.planning.additional_properties.story_length.baz.should.eql("bat");
        });

        it("should have only one level of 'planning' objects", function() {
          var result = transforms.upvert(fixtures['0.5.3']['story-fixture-good-planning'], '0.5.4');
          result.planning.should.not.have.property("planning");
          result.planning.should.have.property("scheduling");
          result.planning.should.have.property("story_length");
          result.planning.scheduling.planned_publish_date.should.eql("2015-06-24T09:49:00.10Z");
        });

        it("should have 'planned_publish_date' instead of 'planned_published_date'", function() {
          var result = transforms.upvert(fixtures['0.5.3']['story-fixture-good-planning'], '0.5.4');
          result.planning.scheduling.should.not.have.property("planned_published_date");
          result.planning.scheduling.should.have.property("planned_publish_date");
          result.planning.scheduling.planned_publish_date.should.eql("2015-06-24T09:49:00.10Z");
        });

        it("should validate as a 'planning' trait", function() {
          var result = transforms.upvert(fixtures['0.5.3']['story-fixture-good-planning'], '0.5.4');
          validate('0.5.4/traits/trait_planning.json', result.planning);
        });

        it("should not fail when planning.scheduling.additional_properties is undefined", function() {
          var result = transforms.upvert(fixtures['0.5.3']['story-fixture-good-with-scheduling-without-additional-properties-with-story-length-without-addtional-properties'], '0.5.4');
          result.version.should.eql('0.5.4');
        });
      });

      describe("references", function() {
        it("should move extra properties into additional_properties", function() {
          var result = transforms.upvert(fixtures['0.5.3']['story-fixture-good-references-2'], '0.5.4');
          result.content_elements[0].should.have.property("additional_properties");
          result.content_elements[0].additional_properties.foo.should.eql("bar");
          result.content_elements[0].additional_properties.three.should.eql("four");
          result.content_elements[0].additional_properties.additional_properties.one.should.eql("two");

        });

        it("should not alter references with no extraneous properties", function() {
          var result = transforms.upvert(fixtures['0.5.3']['story-fixture-good-references-3'], '0.5.4');
          result.content_elements[0].should.not.have.property('additional_properties');
        });

        it("should validate as 'reference'", function() {
          var result = transforms.upvert(fixtures['0.5.3']['story-fixture-good-references-2'], '0.5.4');
          validate('0.5.4/utils/reference.json', result.content_elements[0]);

          result = transforms.upvert(fixtures['0.5.3']['story-fixture-good-references-3'], '0.5.4');
          validate('0.5.4/utils/reference.json', result.content_elements[0]);
        });
      });

    });

    describe("0.5.4 to 0.5.5", function() {
      describe("keyword.score is required field", function() {
        it("should add score to keyword objects if not present", function() {
          var result = transforms.upvert(fixtures['0.5.4']['gallery-fixture'], '0.5.5');
          result.content_elements[0].taxonomy.keywords[0].score.should.eql(0.0);
          result.taxonomy.keywords[0].score.should.eql(0.0);
        });
        it("should not change existing scores", function() {
          var result = transforms.upvert(fixtures['0.5.4']['gallery-fixture'], '0.5.5');
          result.taxonomy.keywords[1].score.should.eql(0.5);
        });
      });

      describe("Promote additional_properties.slug to slug", function() {

        it("should have slug property set correctly", function() {

          var result = transforms.upvert(fixtures['0.5.4']['story-fixture-good-slugs'], '0.5.5');
          result.slug.should.eql("story-about-tj-life");
          result.credits.by[0].slug.should.eql("thomas-jefferson");
          result.content_elements[0].slug.should.eql("foo");
        });

        it("should not affect additional_properties", function() {
          var result = transforms.upvert(fixtures['0.5.4']['story-fixture-good-slugs'], '0.5.5');
          result.additional_properties.foo.should.eql("bar");
          result.additional_properties.slug.should.eql("story-about-tj-life");
        });
      });
    });

    describe("0.5.5 to 0.5.6", function() {
      describe("Add site.primary and owner.sponsored", function() {
        it("should have site.primary and owner.sponsored set correctly", function() {

          var result = transforms.upvert(fixtures['0.5.5']['story-fixture-good'], '0.5.6');
          result.taxonomy.sites[0].primary.should.eql(false);
          result.content_elements[2].taxonomy.sites[0].primary.should.eql(false);
          result.owner.sponsored.should.eql(false);
        });

        it("should copy 'primary' value from additional_properties", function() {

          var result = transforms.upvert(fixtures['0.5.5']['story-fixture-taxonomy-bugs'], '0.5.6');
          result.taxonomy.sites[1].primary.should.eql(true);
        });

        it("should leave references in taxonomy.sites alone", function() {
          var result = transforms.upvert(fixtures['0.5.5']['story-fixture-taxonomy-bugs'], '0.5.6');
          result.taxonomy.sites[2].should.not.have.property('primary');
          result.taxonomy.sites[2].additional_properties.primary.should.eql(true);
        });

      });
    });

    describe("0.5.6 to 0.5.7", function() {
      describe("ombed", function() {
        it("should not convert additional_properties or referent objects", function () {
          var result = transforms.upvert(fixtures['0.5.6']['story-fixture-oembed'], '0.5.7');
          result.content_elements[0].additional_properties.type.should.eql("oembed");
          result.content_elements[1].referent.type.should.eql("oembed");
        });

        it("should convert oembed objects to references", function () {
          var result = transforms.upvert(fixtures['0.5.6']['story-fixture-oembed'], '0.5.7');
          result.content_elements[2].additional_properties.abraham.should.eql("lincoln");
          result.content_elements[2].type.should.eql("reference");
          result.content_elements[2].referent.provider.should.eql("https://api.twitter.com/1/statuses/oembed.json");
          result.content_elements[2].referent.id.should.eql("https://twitter.com/BradDavis_WFTS/status/664422935130566656");
        });
      });
      describe("channels", function() {
        it("should convert channel to channels", function() {
          var result = transforms.upvert(fixtures['0.5.6']['story-fixture-references-with-channel'], '0.5.7');
          result.content_elements[0].channels[0].should.eql("web");
          result.content_elements[1].channels[0].should.eql("post-it-note");
        });
      });
    });

    describe("0.5.7 to 0.5.8", function() {
      describe("Tags", function() {
        it("should leave valid tags alone", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-tags'], '0.5.8');
          result.taxonomy.tags[0]._id.should.eql("ABC");
          result.taxonomy.tags[0].text.should.eql("Foo");
          result.taxonomy.tags[0].should.not.have.property("additional_properties");
          result.taxonomy.tags[0].should.not.have.property("slug");
          result.taxonomy.tags[0].should.not.have.property("description");
          result.taxonomy.tags[0].should.not.have.property("tag");

          result.taxonomy.tags[1].text.should.eql("Bar");
        });

        it("should promote 'tag' to 'text' where the former exists and the latter does not", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-tags'], '0.5.8');
          result.taxonomy.tags[2].text.should.eql("Baz");
        });

        it("should not promote 'tag' to 'text' where the latter exists", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-tags'], '0.5.8');
          result.taxonomy.tags[1].text.should.eql("Bar");
        });

        it("should leave in place 0.5.8 fields 'description' and 'slug' if they exist", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-tags'], '0.5.8');
          result.taxonomy.tags[3].slug.should.eql("car");
          result.taxonomy.tags[3].description.should.eql("Not automobiles");
        });

        it("should add non-spec properties to additional properties", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-tags'], '0.5.8');
          result.taxonomy.tags[3].additional_properties.prop1.should.eql("foo");
          result.taxonomy.tags[3].additional_properties.prop2.should.eql("bar");
        });

        it("should preserve non-colliding additional propeties when possible", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-tags'], '0.5.8');
          result.taxonomy.tags[3].additional_properties.one.should.eql("two");
          result.taxonomy.tags[3].additional_properties.slug.should.eql("carrr--");
        });

        it("should copy original additional_properties to sub-object", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-tags'], '0.5.8');
          result.taxonomy.tags[3].additional_properties.should.have.property("additional_properties");
          result.taxonomy.tags[3].additional_properties.additional_properties.one.should.eql("two");
          result.taxonomy.tags[3].additional_properties.additional_properties.prop1.should.eql("baz");
          result.taxonomy.tags[3].additional_properties.additional_properties.slug.should.eql("carrr--");

          result.taxonomy.tags[1].additional_properties.tag.should.eql("wrong");
          result.taxonomy.tags[2].additional_properties.tag.should.eql("Baz");
        });

        it("should not create second additional_properties if first did not exist", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-tags'], '0.5.8');
          result.taxonomy.tags[1].additional_properties.should.not.have.property("additional_properties");
          result.taxonomy.tags[2].additional_properties.should.not.have.property("additional_properties");

        });
      });

      describe("Labels", function() {
        it("should leave valid labels alone", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good'], '0.5.8');
          result.label.basic.text.should.eql("The Kicker");
          result.label.basic.url.should.eql("https://www.washingtonpost.com/kicker");
          result.label.basic.display.should.eql(true);
          result.label.basic.additional_properties.bar.should.eql("foo");

          result.label.another_one.text.should.eql("Another One");
        });

        it("should add 'text' where not present'", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-old-style-label-and-source'], '0.5.8');
          result.label.basic.text.should.eql('');
        });

        it("should move invalid properties to additional_properties'", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-old-style-label-and-source'], '0.5.8');
          result.label.basic.additional_properties.field.should.eql("value");
          result.label.basic.additional_properties.why.should.eql("is there no text here");
        });

        it("should rename invalid keys'", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-old-style-label-and-source'], '0.5.8');
          result.label.should.have.property('__renamed_invalid_name');
          result.label.__renamed_invalid_name.text.should.eql("Invalid name for a label.");
        });
      });

      describe("Source", function() {
        it("should leave valid source fields alone", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-old-style-label-and-source'], '0.5.8');
          result.source.source_type.should.eql("Wires");
          result.source.name.should.eql("Reuters");
        });

        it("should move invalid source fields to additional_properties", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good-old-style-label-and-source'], '0.5.8');
          result.source.additional_properties.more.should.eql("data");
        });
      });

      describe("Comments", function() {
        it("should leave valid comments fields alone", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good'], '0.5.8');
          result.comments.comments_period.should.eql(14);
          result.comments.moderation_required.should.eql(false);
        });

        it("should move invalid comments fields to additional_properties", function() {
          var result = transforms.upvert(fixtures['0.5.7']['story-fixture-good'], '0.5.8');
          result.comments.additional_properties.favorite_comment.should.eql("All work and no play makes Jack a dull boy.");
        });
      });


    });
  });

  describe("Synchronizer", function() {
    it ("should sync a document with mixed version sub-documents", function() {
      var original = fixtures['0.5.5']['story-fixture-bad-mixed-sub-document-versions'];
      var result = transforms.sync(original);
      validateAns(result, original, '0.5.5');
    });
  });
});
