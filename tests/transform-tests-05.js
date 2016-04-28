'use strict';

var should = require('should'),
    dir = require('node-dir'),
    path = require('path'),
    Ajv = require('ajv'),
    ans = require('../lib/schemas'),
    _ = require('lodash'),
    current_version = require('../lib/version'),
    async = require('async'),
    transforms = require('../lib/transforms');

var loadedFiles = {};
var baseDir = path.join(path.dirname(module.filename), '../src/main/resources/schema/ans');
var loadedSchemas = {};

var ajv = new Ajv({allErrors:true});

var FIRST_VERSION = '0.5.0';
var LAST_VERSION = current_version.version;

var fixtures = {};

// Helper
var validate = function(schemaName, ans, expected) {
  var schema = loadedSchemas[schemaName];
  //console.log(fixtures);
  expected = (typeof expected === "undefined") ? true : expected;

  var result = ajv.validate(schema, ans);
  //console.log("Fixture: " + fixture);
  if (result !== expected) {
    console.log(ans);
    console.log(ajv.errors);
  }
  result.should.eql(expected);
};


describe("Transformations: ", function() {
  // Make sure schemas are loaded
  before(function(done) {
    ans.getSchemas(function(schemas) {
      loadedSchemas = schemas;
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

    var version_keys = _.keys(transforms.versions['0.5']);

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

  describe("Image ", function() {
    var fixture_names = ['image-fixture-good', 'image-fixture-good-no-height-width'];

    _.forIn(transforms.versions['0.5'], function(transformer, version) {
        it("can transform from " + version, function() {
          _.forEach(fixture_names, function(value, key) {
            transformer(fixtures[version][value]);
          });
      });
    });

    it(" validates as version " + LAST_VERSION + " after being upverted from " + FIRST_VERSION, function() {
      _.forEach(fixture_names, function(name, key) {
        var result = transforms.upvert(fixtures[FIRST_VERSION][name], LAST_VERSION);

        validate(LAST_VERSION + '/image.json', result);
      });
    });
  });


  describe("Video ", function() {
    var fixture_names = ['video-fixture-good', 'video-fixture-nationals'];

    _.forIn(transforms.versions['0.5'], function(transformer, version) {
      it("can transform from " + version, function() {
        _.forEach(fixture_names, function(value, key) {
          transformer(fixtures[version][value]);
        });
      });
    });

    it(" validates as version " + LAST_VERSION + " after being upverted from " + FIRST_VERSION, function() {
      _.forEach(fixture_names, function(name, key) {
        var result = transforms.upvert(fixtures[FIRST_VERSION][name], LAST_VERSION);
        validate(LAST_VERSION + '/video.json', result);
      });
    });
  });


  describe("Story ", function() {
    var fixture_names = ['story-fixture-good', 'story-fixture-references', 'story-fixture-tiny-house', 'story-fixture-table'];

    _.forIn(transforms.versions['0.5'], function(transformer, version) {
      it("can transform from " + version, function() {
        _.forEach(fixture_names, function(value, key) {
          var x = transformer(fixtures[version][value]);
        });
      });
    });

    it(" validates as version " + LAST_VERSION + " after being upverted from " + FIRST_VERSION, function() {
      _.forEach(fixture_names, function(name, key) {
        var result = transforms.upvert(fixtures[FIRST_VERSION][name], LAST_VERSION);
        validate(LAST_VERSION + '/story.json', result);
      });
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


    it("should be left alone in content_elements[2]", function() {
      var result = getResult();
      result.content_elements[2].should.have.property('additional_properties');
      result.content_elements[2].should.not.have.property('additonal_properties');
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

});
