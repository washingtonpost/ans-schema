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


// Don't upvert to 0.5.0
var FIRST_VERSION = '0.4.5';
var LAST_VERSION = '0.4.7';

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
    ans.getSchemas(function(err, schemas) {
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

    var version_keys = _.union(
      _.keys(transforms.versions['0.4']),
      _.keys(transforms.versions['0.5'])
    );

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

    _.forIn(transforms.versions['0.4'], function(transformer, version) {
      it("can transform from " + version, function() {
        _.forEach(fixture_names, function(value, key) {
          transformer(fixtures[version][value]);
        });
      });
    });

    it(" validates as version " + LAST_VERSION + " after being upverted from " + FIRST_VERSION, function() {
      _.forEach(fixture_names, function(name, key) {
        var result = transforms.upvert(fixtures[FIRST_VERSION][name], LAST_VERSION);

        validate('v0_4/image.json', result);
      });
    });
  });


  describe("Video ", function() {
    var fixture_names = ['video-fixture-good', 'video-fixture-nationals'];

    _.forIn(transforms.versions['0.4'], function(transformer, version) {
      it("can transform from " + version, function() {
        _.forEach(fixture_names, function(value, key) {
          transformer(fixtures[version][value]);
        });
      });
    });

    it(" validates as version " + LAST_VERSION + " after being upverted from " + FIRST_VERSION, function() {
      _.forEach(fixture_names, function(name, key) {
        var result = transforms.upvert(fixtures[FIRST_VERSION][name], LAST_VERSION);
        validate('v0_4/video.json', result);
      });
    });
  });


  describe("Story ", function() {
    var fixture_names = ['story-fixture-good', 'story-fixture-references', 'story-fixture-tiny-house'];

    _.forIn(transforms.versions['0.4'], function(transformer, version) {
        it("can transform from " + version, function() {
          _.forEach(fixture_names, function(value, key) {
            transformer(fixtures[version][value]);
          });
        });
    });

    it(" validates as version " + LAST_VERSION + " after being upverted from " + FIRST_VERSION, function() {
      _.forEach(fixture_names, function(name, key) {
        var result = transforms.upvert(fixtures[FIRST_VERSION][name], LAST_VERSION);
        validate('v0_4/story.json', result);
      });
    });
  });


});
