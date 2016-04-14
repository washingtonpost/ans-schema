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
    var fixture_names = ['story-fixture-good', 'story-fixture-references', 'story-fixture-tiny-house'];

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
        validate(LAST_VERSION + '/story.json', result);
      });
    });
  });

  describe("0.5.0: misspelled additional properties", function() {

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
});
