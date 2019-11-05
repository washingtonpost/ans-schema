/*global describe:true it:true */

var should = require('should'),
    dir = require('node-dir'),
    path = require('path'),
    Ajv = require('ajv'),
    _ = require('lodash'),
    ans = require('../lib/ans');

var version = ans.version;
var loadedFiles = {};
var baseDir = path.join(path.dirname(module.filename), '../src/main/resources/schema/ans');
var loadedSchemas = {};

var ajv = new Ajv({allErrors:true});
// var tv4 = require('tv4');

var test_versions = _.map(
  _.filter(version.history, function(item) {
    return (item.schema == true) && (item.name.indexOf("0.10") > -1);
  }),
  function(item) {
    return item.name;
  }
);

var json_schema = {
    "id": "http://json-schema.org/draft-04/schema#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "Core schema meta-schema",
    "definitions": {
        "schemaArray": {
            "type": "array",
            "minItems": 1,
            "items": { "$ref": "#" }
        },
        "positiveInteger": {
            "type": "integer",
            "minimum": 0
        },
        "positiveIntegerDefault0": {
            "allOf": [ { "$ref": "#/definitions/positiveInteger" }, { "default": 0 } ]
        },
        "simpleTypes": {
            "enum": [ "array", "boolean", "integer", "null", "number", "object", "string" ]
        },
        "stringArray": {
            "type": "array",
            "items": { "type": "string" },
            "minItems": 1,
            "uniqueItems": true
        }
    },
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "format": "uri"
        },
        "$schema": {
            "type": "string",
            "format": "uri"
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "default": {},
        "multipleOf": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        },
        "maximum": {
            "type": "number"
        },
        "exclusiveMaximum": {
            "type": "boolean",
            "default": false
        },
        "minimum": {
            "type": "number"
        },
        "exclusiveMinimum": {
            "type": "boolean",
            "default": false
        },
        "maxLength": { "$ref": "#/definitions/positiveInteger" },
        "minLength": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "pattern": {
            "type": "string",
            "format": "regex"
        },
        "additionalItems": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" }
            ],
            "default": {}
        },
        "items": {
            "anyOf": [
                { "$ref": "#" },
                { "$ref": "#/definitions/schemaArray" }
            ],
            "default": {}
        },
        "maxItems": { "$ref": "#/definitions/positiveInteger" },
        "minItems": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "uniqueItems": {
            "type": "boolean",
            "default": false
        },
        "maxProperties": { "$ref": "#/definitions/positiveInteger" },
        "minProperties": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "required": { "$ref": "#/definitions/stringArray" },
        "additionalProperties": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" }
            ],
            "default": {}
        },
        "definitions": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "properties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "patternProperties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "dependencies": {
            "type": "object",
            "additionalProperties": {
                "anyOf": [
                    { "$ref": "#" },
                    { "$ref": "#/definitions/stringArray" }
                ]
            }
        },
        "enum": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true
        },
        "type": {
            "anyOf": [
                { "$ref": "#/definitions/simpleTypes" },
                {
                    "type": "array",
                    "items": { "$ref": "#/definitions/simpleTypes" },
                    "minItems": 1,
                    "uniqueItems": true
                }
            ]
        },
        "allOf": { "$ref": "#/definitions/schemaArray" },
        "anyOf": { "$ref": "#/definitions/schemaArray" },
        "oneOf": { "$ref": "#/definitions/schemaArray" },
        "not": { "$ref": "#" }
    },
    "dependencies": {
        "exclusiveMaximum": [ "maximum" ],
        "exclusiveMinimum": [ "minimum" ]
    },
    "default": {}
};

var hyper_schema = {
    "$schema": "http://json-schema.org/draft-04/hyper-schema#",
    "id": "http://json-schema.org/draft-04/hyper-schema#",
    "title": "JSON Hyper-Schema",
    "allOf": [
        {
            "$ref": "http://json-schema.org/draft-04/schema#"
        }
    ],
    "properties": {
        "additionalItems": {
            "anyOf": [
                {
                    "type": "boolean"
                },
                {
                    "$ref": "#"
                }
            ]
        },
        "additionalProperties": {
            "anyOf": [
                {
                    "type": "boolean"
                },
                {
                    "$ref": "#"
                }
            ]
        },
        "dependencies": {
            "additionalProperties": {
                "anyOf": [
                    {
                        "$ref": "#"
                    },
                    {
                        "type": "array"
                    }
                ]
            }
        },
        "items": {
            "anyOf": [
                {
                    "$ref": "#"
                },
                {
                    "$ref": "#/definitions/schemaArray"
                }
            ]
        },
        "definitions": {
            "additionalProperties": {
                "$ref": "#"
            }
        },
        "patternProperties": {
            "additionalProperties": {
                "$ref": "#"
            }
        },
        "properties": {
            "additionalProperties": {
                "$ref": "#"
            }
        },
        "allOf": {
            "$ref": "#/definitions/schemaArray"
        },
        "anyOf": {
            "$ref": "#/definitions/schemaArray"
        },
        "oneOf": {
            "$ref": "#/definitions/schemaArray"
        },
        "not": {
            "$ref": "#"
        },

        "links": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/linkDescription"
            }
        },
        "fragmentResolution": {
            "type": "string"
        },
        "media": {
            "type": "object",
            "properties": {
                "type": {
                    "description": "A media type, as described in RFC 2046",
                    "type": "string"
                },
                "binaryEncoding": {
                    "description": "A content encoding scheme, as described in RFC 2045",
                    "type": "string"
                }
            }
        },
        "pathStart": {
            "description": "Instances' URIs must start with this value for this schema to apply to them",
            "type": "string",
            "format": "uri"
        }
    },
    "definitions": {
        "schemaArray": {
            "type": "array",
            "items": {
                "$ref": "#"
            }
        },
        "linkDescription": {
            "title": "Link Description Object",
            "type": "object",
            "required": [ "href", "rel" ],
            "properties": {
                "href": {
                    "description": "a URI template, as defined by RFC 6570, with the addition of the $, ( and ) characters for pre-processing",
                    "type": "string"
                },
                "rel": {
                    "description": "relation to the target resource of the link",
                    "type": "string"
                },
                "title": {
                    "description": "a title for the link",
                    "type": "string"
                },
                "targetSchema": {
                    "description": "JSON Schema describing the link target",
                    "$ref": "#"
                },
                "mediaType": {
                    "description": "media type (as defined by RFC 2046) describing the link target",
                    "type": "string"
                },
                "method": {
                    "description": "method for requesting the target of the link (e.g. for HTTP this might be \"GET\" or \"DELETE\")",
                    "type": "string"
                },
                "encType": {
                    "description": "The media type in which to submit data along with the request",
                    "type": "string",
                    "default": "application/json"
                },
                "schema": {
                    "description": "Schema describing the data to submit along with the request",
                    "$ref": "#"
                }
            }
        }
    },
    "links": [
        {
            "rel": "self",
            "href": "{+id}"
        },
        {
            "rel": "full",
            "href": "{+($ref)}"
        }
    ]
};


describe("ANS Schema", function() {
  beforeEach(function(done) {
    ans.getSchemas(function(err, schemas) {
      loadedSchemas = schemas;
      done();
    });
  });
  describe("All schemas can be loaded as JSON Schema", function() {
    it("should load all schemas into an object", function(done) {

      dir.readFiles(
        baseDir, {
          match:  /.json$/
        },
        function(err, content, filename, next) {
          if (err) throw err;
          var name = path.relative(baseDir, filename);
          loadedFiles[name] = content;
          next();
        },
        function(err, files) {
          if (err) {
            console.log(err);
            throw err;
          }

          var keys = Object.keys(loadedFiles);
          for ( var i = 0; i < keys.length; i++) {

            var schema = loadedSchemas[keys[i]];

            schema.should.be.instanceOf(Object);
            schema.should.deepEqual(JSON.parse(loadedFiles[keys[i]]));
          }
          done();
        }
      );
    });

    it("should validate as valid JSON Schema and Hyper Schema", function() {
      var keys = Object.keys(loadedSchemas);

      for( var i = 0; i < keys.length; i++) {
        console.log("        " + keys[i] + " should be a valid JSON Schema");
        var schema = loadedSchemas[keys[i]];
        ajv.addSchema(schema);

        // Uncomment to validate with tv4
        //tv4.addSchema(schema);
      }

    });
  });
});



var fixtures = {};
var validate = function(version, schemaName, fixture, expected) {
  //console.log("schema: " + schemaName);
  //console.log("fixture: " + fixture);

  var schema = loadedSchemas[version + schemaName];
  fixture = (typeof fixture === "string") ? fixtures[fixture] : fixture;

  expected = (typeof expected === "undefined") ? true : expected;

  var result = ajv.validate(schema, fixture);
  if (result !== expected) {
    console.log(JSON.stringify(fixture));
    console.log(JSON.stringify(schema));
    console.log(ajv.errors);
  }
  result.should.eql(expected);

  // Uncomment to validate with tv4
  // var result = tv4.validateResult(fixture, schema, false, false);
  // if (result.valid != expected) {
  //   console.log(fixtureName);
  //   console.log(result);
  // }
  // result.valid.should.eql(expected);

};

var validateIfFixtureExists = function(version, schemaName, fixture, expected) {
  if(_.has(fixtures, fixture) && _.has(loadedSchemas, version + schemaName)) {
    validate(version, schemaName, fixture, expected);
  }
};


describe("Schema: ", function() {

  test_versions.forEach(function(version) {

    var versionObj = new ans.version.Version(ans.version.parse_version(version));

    describe("ANS ", function() {

      before(function(done) {
        fixtures = {};
        dir.readFiles(
          path.join(path.dirname(module.filename), 'fixtures/schema/' + version),
          function(err, content, filename, next) {
            if (err) throw err;

            try {
              fixtures[path.basename(filename, '.json')] = JSON.parse(content);
            }
            catch (err) {
              console.log("Could not load " + filename);
            }
            next();
          },
          function(err, files) {
            if (err) throw err;
            done();
          }
        );
      });

      describe(version, function() {
        describe("Author", function() {
          it("should validate a well-formatted author", function() {
            validateIfFixtureExists('/utils/author.json', 'author-fixture-good');
          });
        });

        describe("Audio", function() {
          it("should validate a well-formatted audio", function() {
            validate(version, '/audio.json', 'audio-fixture-good');
          });

          it("should validate audio with streams", function() {
            validateIfFixtureExists(version, '/audio.json', 'audio-fixture-good-streams');
          });

          it("should validate a well-formatted audio with settings", function() {
            validate(version, '/audio.json', 'audio-fixture-good-settings');
          });

          it("should validate a well-formatted audio with custom fields", function() {
            validate(version, '/audio.json', 'audio-fixture-good-custom');
          });

          it("should not validate a non-audio element", function() {
            validate(version, '/audio.json', 'audio-fixture-bad', false);
          });

          it("should not validate an audio with no source", function() {
            validateIfFixtureExists(version, '/audio.json', 'audio-fixture-bad-no-source', false);
          });

          it("should validate as content", function() {
            validate(version, '/content.json', 'audio-fixture-good')
            validate(version, '/content.json', 'audio-fixture-good-settings')
            validate(version, '/content.json', 'audio-fixture-good-custom')
          });
        });

        describe("Video", function() {
          it("should validate a well-formatted video", function() {
            validate(version, '/video.json', 'video-fixture-good');
            validate(version, '/video.json', 'video-fixture-nationals');
          });

          it("should not validate a non-well-formatted video", function() {
            validate(version, '/video.json', 'video-fixture-bad', false);
          });

          it("should validate as content", function() {
            validate(version, '/content.json', 'video-fixture-good');
          });
        });

        describe("Story", function() {
          it("should validate a story", function() {
            validate(version, '/story.json', 'story-fixture-good');
            validate(version, '/story.json', 'story-fixture-tiny-house');
            validate(version, '/story.json', 'story-fixture-references');
            validate(version, '/story.json', 'story-fixture-good-multi-site');
          });

          it("should validate a story with a content element with unknown properties", function() {
            validate(version, '/story.json', 'story-fixture-good-mystery-element');
          });

          it("should validate a story with distributor.category set to 'stock'", function() {
            validateIfFixtureExists(version, '/story.json', 'story-fixture-good-distributor');
          });

          it("should validate a story with distributor.category set to 'handout'", function() {
            validateIfFixtureExists(version, '/story.json', 'story-fixture-good-distributor-handout');
          });

          it("should validate a story with referenced distributor", function() {
            validateIfFixtureExists(version, '/story.json', 'story-fixture-good-referenced-distributor');
          });

          it("should not validate a story with referenced distributor with no reference id", function() {
            validateIfFixtureExists(version, '/story.json', 'story-fixture-bad-referenced-distributor-reference-id', false);
          });

          it("should not validate a story with referenced distributor with no mode", function() {
            validateIfFixtureExists(version, '/story.json', 'story-fixture-bad-referenced-distributor-mode', false);
          });

          it("should not validate a story with unspecified properties", function() {
            validate(version, '/story.json', 'story-fixture-bad-extra-properties', false);
          });

          it("should not validate a story with the wrong type", function() {
            validate(version, '/story.json', 'story-fixture-bad-wrong-type', false);
          });

          it("should not validate a story with the wrong version", function() {
            validate(version, '/story.json', 'story-fixture-bad-wrong-version', false);
          });

          it("should validate a story with valid taxonomy", function() {
            validateIfFixtureExists(version, '/story.json', 'story-fixture-good-taxonomy');
          });

          it("should not validate a story with bad taxonomy", function() {
            validateIfFixtureExists(version, '/story.json', 'story-fixture-bad-taxonomy-additional-tasks', false);
            validateIfFixtureExists(version, '/story.json', 'story-fixture-bad-tag-strings', false);
            validateIfFixtureExists(version, '/story.json', 'story-fixture-bad-sections-addl-properties', false);
          });

          it("should validate as content", function() {
            validate(version, '/content.json', 'story-fixture-good');
            validate(version, '/content.json', 'story-fixture-tiny-house');
            validate(version, '/content.json', 'story-fixture-references');
          });

          it("should not validate a story with bad corrections", function() {
              validate(version, '/story.json', 'story-fixture-bad-corrections', false);
          });

          it("should not validate a story with bad interstitial link", function() {
              validate(version, '/story.json', 'story-fixture-bad-interstitial-link', false);
          });

          it("should validate a story with valid embargo", function() {
            validateIfFixtureExists(version, '/story.json', 'story-fixture-good-embargo', true);
          });

           it("should not validate a story with bad embargo", function() {
            validateIfFixtureExists(version, '/story.json', 'story-fixture-bad-embargo', false);
          });
        });

        describe("Tag", function() {
          it("should validate a tag", function() {
            validateIfFixtureExists(version, "/utils/tag.json", "tag-fixture-good", true);
          });

          it("should not validate invalid tags", function() {
            validateIfFixtureExists(version, '/utils/tag.json', 'tag-fixture-bad-no-text', false);
            validateIfFixtureExists(version, '/utils/tag.json', 'tag-fixture-bad-subtype', false);
            validateIfFixtureExists(version, '/utils/tag.json', 'tag-fixture-bad-type', false);
          });
        });

        describe("Image", function() {
          it("should validate a valid image", function() {
            validate(version, '/image.json', 'image-fixture-good');
          });
          it("should validate an image with no height or width", function() {
            validate(version, '/image.json', 'image-fixture-good-no-height-width');
          });

          it("should validate as content", function() {
            validate(version, '/content.json', 'image-fixture-good');
          });

          it("should not validate an image with focal point data as text instead of number", function() {
            validateIfFixtureExists(version, '/image.json', 'image-fixture-bad-focal-point-text-value', false);
          });
          it("should not validate an image with focal point data as null value", function() {
            validateIfFixtureExists(version, '/image.json', 'image-fixture-bad-focal-point-null-value', false);
          });
          // it("should not validate an image with focal point data that is out of range", function() {
          //   validateIfFixtureExists(version, '/image.json', 'image-fixture-bad-focal-point-out-of-range', false);
          // });
          it("should not validate an image with focal point data with invalid prop name", function() {
            validateIfFixtureExists(version, '/image.json', 'image-fixture-bad-focal-point-bad-prop-name', false);
          });
        });

        describe("Image Operation", function() {
          var type = "/image_operation.json";
          ['create', 'update', 'delete'].forEach(function (op) {
            it("should validate image " + op + " operation", function () {
              validateIfFixtureExists(version, type, "image-operation-" + op);
            });
          });
        });

        describe("Gallery", function() {
          it("should validate a valid gallery", function() {
            validateIfFixtureExists(version, '/gallery.json', 'gallery-fixture-good');
          });
          it("should validate a gallery with no images", function() {
            validateIfFixtureExists(version, '/gallery.json', 'gallery-fixture-good-no-images');
          });
          it("should validate as content", function() {
            validateIfFixtureExists(version, '/content.json', 'gallery-fixture-good');
          });
        });

        describe("Gallery Operation", function() {
          var type = "/gallery_operation.json";
          ['create', 'update', 'delete'].forEach(function (op) {
            it("should validate gallery " + op + " operation", function () {
              validateIfFixtureExists(version, type, "gallery-operation-" + op);
            });
          });
        });

        describe("Alignment", function() {
          it("should not validate an object with an invalid alignment setting", function() {
            validateIfFixtureExists(version, '/image.json', 'image-fixture-bad-alignment', false);
          });
        });

        describe("Redirect", function() {
            it("should validate a valid redirect", function() {
                validateIfFixtureExists(version, '/redirect.json', 'redirect-fixture-good');
            });
            it("should not validate an invalid redirect", function() {
                validateIfFixtureExists(version, '/redirect.json', 'redirect-fixture-bad', false);
            });
        });

        describe("URL Operation", function() {
          var type = "/url_operation.json";
          ['insert-redirect'].forEach(function (op) {
              it("should validate url " + op + " operation", function () {
                  validateIfFixtureExists(version, type, "url-operation-" + op);
              });
          });
        });

        describe("Content Operation", function() {
          var type = "/content_operation.json";
          it("should validate a referent update", function () {
            validateIfFixtureExists(version, type, "content-operation-good");
          });
        });

        describe("Story Operation", function() {
          var type = "/story_operation.json";

          it("should validate a create operation", function() {
            validate(version, type, 'operation-create');
          });
          it("should validate an update operation", function() {
            validate(version, type, 'operation-update');
          });
          it("should validate a delete operation", function() {
            validate(version, type, 'operation-delete');
          });
          it("should validate a publish-edition operation", function() {
            validate(version, type, 'operation-publish-edition');
          });
          it("should validate an unpublish-edition operation", function() {
            validate(version, type, 'operation-unpublish-edition');
          });
        });

        describe("Reference", function() {
          it("should validate a reference", function() {
            validate(version, '/utils/reference.json', 'reference-fixture-good');
          });

          it("should not validate a reference with additional properties", function() {
            validateIfFixtureExists(version, '/utils/reference.json', 'reference-fixture-bad-addl-props', false);
          });

          it("should not validate a reference with a referent with additional properties (0.5.4+)", function() {
            validateIfFixtureExists(version, '/utils/reference.json', 'reference-fixture-bad-more-addl-props', false);
          });

          it("should not validate an array as a reference", function() {
            validateIfFixtureExists(version, '/utils/reference.json', 'reference-fixture-bad-array', false);
          });
        });

        describe("Restricted content", function() {
          it("should validate a restricted content", function() {
            validate(version, '/restricted_content.json', 'restricted-content-fixture-good');
          });

          it("should invalidate a restricted content with no referent", function() {
            validate(version, '/restricted_content.json', 'restricted-content-fixture-bad-referent', false);
          });

          it("should validate a geo restriction configuration in the content_restrictions trait", function() {
            validateIfFixtureExists(version, '/traits/trait_content_restrictions.json', 'geo-restrictions-fixture-good');
          });

          it("should invalidate a geo restriction configuration with too many restriction objects", function() {
            validateIfFixtureExists(version, '/traits/trait_content_restrictions.json', 'geo-restrictions-fixture-bad-length', false);
          });

          it("should invalidate a geo restriction configuration where restrictions property is not an array", function() {
            validateIfFixtureExists(version, '/traits/trait_content_restrictions.json', 'geo-restrictions-fixture-bad-type', false);
          });

          it("should invalidate a geo restriction configuration with an additional field on the restriction object", function() {
            validateIfFixtureExists(version, '/traits/trait_content_restrictions.json', 'geo-restrictions-fixture-bad-property', false);
          });

          it("should invalidate a geo restriction configuration with no restriction objects", function() {
            validateIfFixtureExists(version, '/traits/trait_content_restrictions.json', 'geo-restrictions-fixture-bad-empty', false);
          });

          it("should invalidate a video with a content_restrictions.geo field set to an empty object", function() {
            validateIfFixtureExists(version, '/video.json', 'video-fixture-bad-empty-geo-restriction', false);
          });
        });

        describe("Clavis", function() {

          describe("Clavis Keywords", function() {
            it("should validate a keyword", function() {
              validateIfFixtureExists(version, '/utils/keyword.json', 'keyword-fixture-good');
            });

            it("should not validate a keyword with a bad score", function() {
              validateIfFixtureExists(version, '/utils/keyword.json', 'keyword-fixture-bad-score-type', false);
            });

            it("should not validate a keyword with a missing score", function() {
              validateIfFixtureExists(version, '/utils/keyword.json', 'keyword-fixture-bad-missing-score', false);
            });

            it("should not validate a keyword with a bad tag type", function() {
              validateIfFixtureExists(version, '/utils/keyword.json', 'keyword-fixture-bad-tag-type', false);
            });

            it("should not validate a keyword with a bad frequency type", function() {
              validateIfFixtureExists(version, '/utils/keyword.json', 'keyword-fixture-bad-numeric-frequency', false);
            });
          });

          describe("Clavis Topics", function() {
            it("should validate a topic", function() {
              validateIfFixtureExists(version, '/utils/topic.json', 'topic-fixture-good');
            });

            it("should validate a topic with a missing name", function() {
              validateIfFixtureExists(version, '/utils/topic.json', 'topic-fixture-good-missing-name');
            });

            it("should not validate a topic with a bad id", function() {
              validateIfFixtureExists(version, '/utils/topic.json', 'toppic-fixture-bad-id-type', false);
            });

            it("should not validate a topic with a missing uid", function() {
              validateIfFixtureExists(version, '/utils/topic.json', 'topic-fixture-bad-missing-uid', false);
            });
          });

          describe("Clavis Auxiliaries", function() {
            it("should validate an auxiliary", function() {
              validateIfFixtureExists(version, '/utils/auxiliary.json', 'auxiliary-fixture-good');
            });

            it("should validate an auxiliary without a name", function() {
              validateIfFixtureExists(version, '/utils/auxiliary.json', 'auxiliary-fixture-good-optional-name');
            });

            it("should not validate an auxiliary missing an uid", function() {
              validateIfFixtureExists(version, '/utils/auxiliary.json', 'auxiliary-fixture-bad-missing-uid', false);
            });
          });

          describe("Named Entities", function() {
            it("should validate a named entity", function() {
              validateIfFixtureExists(version, '/utils/named_entity.json', 'named-entity-fixture-good');
            });

            it("should validate a named entity without score", function() {
              validateIfFixtureExists(version, '/utils/named_entity.json', 'named-entity-fixture-good-missing-score');
            });

            it("should not validate a named entity without id", function() {
              validateIfFixtureExists(version, '/utils/named_entity.json', 'named-entity-fixture-bad-missing-id', false);
            });
          });

        });

        describe("Label", function() {
          it("should validate a valid label", function() {
            validateIfFixtureExists(version, '/traits/trait_label.json', 'label-good');
          });

          it("should not validate a label with extra properties", function() {
            validateIfFixtureExists(version, '/traits/trait_label.json', 'label-bad-arbitrary-properties', false);
          });

          it("should not validate a valid label with fields with extra characters", function() {
            validateIfFixtureExists(version, '/traits/trait_label.json', 'label-bad-field-name-with-dots', false);
          });
        });


        describe("Source", function() {
          it("should validate a valid source", function() {
            validateIfFixtureExists(version, '/traits/trait_source.json', 'source-good');
          });
        });

        describe("Pitches", function() {
          it("should validate properly formatted pitches", function() {
            validateIfFixtureExists(version, '/traits/trait_pitches.json', 'trait-pitches-fixture-good', true);
          });
          it("should reject platform pitch event status containing numeric characters", function() {
            validateIfFixtureExists(version, '/traits/trait_platform_pitch_event.json', 'trait-pitch-event-fixture-numeric-status', false);
          });
          it("should reject platform pitch event status containing uppercase characters", function() {
            validateIfFixtureExists(version, '/traits/trait_platform_pitch_event.json', 'trait-pitch-event-fixture-uppercase-status', false);
          });
          it("should allow platform pitch event status containing spaces", function() {
            validateIfFixtureExists(version, '/traits/trait_platform_pitch_event.json', 'trait-pitch-event-fixture-space-in-status', true);
          });
          it("should reject publication pitch event status containing numeric characters", function() {
            validateIfFixtureExists(version, '/traits/trait_publication_pitch_event.json', 'trait-pitch-event-fixture-numeric-status', false);
          });
          it("should reject publication pitch event status containing uppercase characters", function() {
            validateIfFixtureExists(version, '/traits/trait_publication_pitch_event.json', 'trait-pitch-event-fixture-uppercase-status', false);
          });
          it("should allow publication pitch event status containing spaces", function() {
            validateIfFixtureExists(version, '/traits/trait_publication_pitch_event.json', 'trait-pitch-event-fixture-space-in-status', true);
          });
        });

        describe("Workflow", function() {
          it("should validate properly formatted workflow information", function() {
            validateIfFixtureExists(version, '/traits/trait_workflow.json', 'trait-workflow-fixture-good', true);
          });
          it("should reject invalid workflow status code", function() {
            validateIfFixtureExists(version, '/traits/trait_workflow.json', 'trait-workflow-fixture-bad-code', false);
          });
        });

        describe("Planning", function() {
          it("should validate properly formatted planning information", function() {
            validateIfFixtureExists(version, '/traits/trait_planning.json', 'trait-planning-fixture-good', true);
          });
        });

        describe("Publishing", function() {
          it("should validate publishing information", function() {
            validateIfFixtureExists(version, '/traits/trait_publishing.json', 'trait-publishing-fixture-good', true);
          })

          it('should not validate publishing with incorrect story operation types', function() {
            validateIfFixtureExists(version, '/traits/trait_publishing.json', 'trait-publishing-fixture-bad-mismatched-operations', false);
          });
        });

        describe("Related Content", function() {
          it("should not validate related_content.redirect that is not a redirect or that has too many items", function() {
            validateIfFixtureExists(version, '/traits/trait_related_content.json', 'trait-related-content-bad-attached-redirect-has-multiple-items', false);
            validateIfFixtureExists(version, '/traits/trait_related_content.json', 'trait-related-content-bad-attached-redirect-is-not-redirect', false);
          });
        });

        describe("Collection (0.9.0+)", function() {
          it("should validate a well-formatted collection", function() {
            validate(version, '/collection.json', 'collection-fixture-good');
          });

          it("should validate each promo reference in a collection", function() {
            var document = fixtures['collection-fixture-good'];
            document.content_elements.forEach(function (item) {
              validate(version, '/utils/promo_reference.json', item);
            });
          });
        });


        describe("Story Elements ", function() {
          var type_prefix = "/story_elements";

          describe("Blockquote", function() {
            it("should validate a well-formatted blockquote", function() {
              validate(version, type_prefix + '/blockquote.json', 'bq-fixture-good');
            });

            it("should not validate a non-blockquote", function() {
              validate(version, type_prefix + '/blockquote.json', 'bq-fixture-bad', false);
            });
          });

          describe("Code", function() {
            it("should validate a well-formatted code sample", function() {
              validate(version, type_prefix + '/code.json', 'code-fixture-good');
            });
          });

          describe("Numeric Rating", function() {
            it("should validate a valid numeric rating", function() {
              validateIfFixtureExists(version, type_prefix + '/numeric_rating.json', 'numeric-rating-fixture-good');
            });

            it("should not validate an invalid numeric rating", function() {
              validateIfFixtureExists(version, type_prefix + '/numeric_rating.json', 'numeric-rating-fixture-bad', false);
            });

            it("should validate a numeric rating with no min, max, or units", function() {
               validateIfFixtureExists(version, type_prefix + '/numeric_rating.json', 'numeric-rating-fixture-good-only-rating');
            });
          });

          describe("Endorsement", function() {
            it("should validate a valid endorsement", function() {
              validateIfFixtureExists(version, type_prefix + '/endorsement.json', 'endorsement-fixture-good');
            });

            it("should not validate an endorsement with a number value for a property that should be a string", function() {
              validateIfFixtureExists(version, type_prefix + '/endorsement.json', 'endorsement-fixture-bad-type-mismatch', false);
            });

            it("should not validate an endorsement with a property missing", function() {
              validateIfFixtureExists(version, type_prefix + '/endorsement.json', 'endorsement-fixture-bad-missing-prop', false);
            });
          });

          describe("List", function() {
            it("should validate a list of text elements", function() {
              validate(version, type_prefix + '/list.json', 'ul-fixture-good');
              validate(version, type_prefix + '/list_element.json', 'ul-fixture-good');
            });

            it("should validate a nested list of text elements", function() {
              validate(version, type_prefix + '/list.json', 'ul-fixture-good-nested');
            });
          });

          if (versionObj.lt(new ans.version.Version(ans.version.parse_version("0.5.7")))) {
            describe("Oembed", function() {
              it("should validate an oembed element", function() {
                validate(version, type_prefix + '/oembed.json', 'oembed-fixture-good');
              });

              it("should not validate a non-oembed", function() {
                validate(version, type_prefix + '/oembed.json', 'oembed-fixture-bad', false);
              });
            });
          }

          if (versionObj.gt(new ans.version.Version(ans.version.parse_version("0.5.6")))) {
            describe("Oembed Response", function() {
              it("should validate an oembed response object", function() {
                validate(version, "/utils/oembed_response.json", "oembed-response-fixture-good");
              });
            });
          }

          describe("Text", function() {
            it("should validate a text element", function() {
              validate(version, type_prefix + '/text.json', 'text-fixture-good');
            });

            it("should validate a text element with channels", function() {
              validate(version, type_prefix + '/text.json', 'text-fixture-good-channels');
            });

            it("should not validate a non-text", function() {
              validate(version, type_prefix + '/text.json', 'text-fixture-bad', false);
            });

            it("should validate a text element with additional properties (0.5.1+)", function() {
              if ('text-fixture-good-additional-properties' in fixtures) {
                validate(version, type_prefix + '/text.json', 'text-fixture-good-additional-properties');
              };
            });

            it("should not validate a text element with block_properties dropcap that doesn't contain type string letter", function() {
              if ('text-fixture-good-additional-properties' in fixtures) {
                validate(version, type_prefix + '/text.json', 'story-fixture-bad-dropcap', false);
              };
            });

            it("should validate a text element with block_properties dropcap that does contain type string letter", function() {
              if ('text-fixture-good-additional-properties' in fixtures) {
                validate(version, type_prefix + '/text.json', 'story-fixture-good-dropcap', false);
              };
            });
          });

          describe("Raw Html", function() {
            it("should validate a raw_html element", function() {
              validate(version, type_prefix + '/raw_html.json', 'raw-html-fixture-good');
            });

            it("should not validate a non-raw_html", function() {
              validate(version, type_prefix + '/raw_html.json', 'raw-html-fixture-bad', false);
            });

          });

          describe("Header", function() {
            it("should validate a header element", function() {
              validate(version, type_prefix + '/header.json', 'header-fixture-good');
            });

            it("should not validate a header with 'text' property", function() {
              validate(version, type_prefix + '/header.json', 'header-fixture-bad', false);
            });
          });


          describe("Table", function() {
            it("should validate a table element", function() {
              validate(version, type_prefix + '/table.json', 'table-fixture-good');
            });

            it("should not validate a non-table", function() {
              validate(version, type_prefix + '/table.json', 'raw-html-fixture-bad', false);
            });
          });

          describe("Interstitial Link", function() {
            it("should validate a interstitial link", function () {
              validateIfFixtureExists(version, type_prefix + '/interstitial_link.json', 'interstitial-link-fixture-good');
              validateIfFixtureExists(version, type_prefix + '/interstitial_link.json', 'interstitial-link-fixture-good-2');
            });

            it("should not validate a non-interstitial link", function () {
              validateIfFixtureExists(version, type_prefix + '/interstitial_link.json', 'interstitial-link-fixture-bad', false);
            });
          });

          describe("Link List (0.10.0+)", function() {
            it("should validate a link list", function () {
              validateIfFixtureExists(version, type_prefix + '/link_list.json', 'link-list-fixture-good');
            });

            it("should validate a link list with a text item", function () {
              validateIfFixtureExists(version, type_prefix + '/link_list.json', 'link-list-fixture-good-text');
            });

            it("should not validate a link list with an element that is not a link or a text item", function () {
              validateIfFixtureExists(version, type_prefix + '/link_list.json', 'link-list-fixture-bad', false);
            });

            it("should validate a link list with text items only", function () {
              validateIfFixtureExists(version, type_prefix + '/link_list.json', 'link-list-fixture-good-all-text');
            });
          });

          describe("Element Group", function() {
            it("should validate an element group", function() {
              validateIfFixtureExists(version, type_prefix + '/element_group.json', 'element-group-fixture-good');
            });
          });

          describe("Quote", function() {
            it("should not validate a quote with an invalid citation", function() {
              validateIfFixtureExists(version, type_prefix + '/quote.json', 'quote-fixture-bad-citation', false);
            });
            it("should not validate a quote with no content elements", function() {
              validateIfFixtureExists(version, type_prefix + '/quote.json', 'quote-fixture-bad-content-elements', false);
            });
          });

          describe("Divider (0.10.0+)", function() {
            it("should not validate a divider with content", function() {
              validate(version, type_prefix + '/divider.json', 'divider-fixture-bad', false);
            });
          });

          describe("Custom Embed (0.10.0+)", function() {
            it("should validate a custom embed", function() {
              validate(version, type_prefix + '/custom_embed.json', 'custom_embed-fixture-good')
            });

            it("should not validate a custom embed with invalid config names", function() {
              validate(version, type_prefix + '/custom_embed.json', 'custom_embed-fixture-bad-1', false);
            });

            it("should not validate a custom embed without url and id", function() {
              validate(version, type_prefix + '/custom_embed.json', 'custom_embed-fixture-bad-2', false);
            });
          });


          describe("...all together now", function() {
            var valid_fixtures = [ "story-fixture-good", "story-fixture-references" ];
            valid_fixtures.forEach(function(fixtureName) {

              it("should validate every content element in a valid story: " + fixtureName, function() {
                var document = fixtures[fixtureName];

                document.content_elements.forEach(function(element) {

                  element.type.should.equalOneOf([ "blockquote", "code", "interstitial_link", "list", "oembed", "oembed_response", "raw_html", "table", "text", "reference", "image", "video", "audio", "story", "element_group", "quote", "correction", "numeric_rating", "endorsement"]);

                  switch(element.type) {
                  case "correction":
                    validate(version, type_prefix + '/correction.json', element);
                    break;
                  case "quote":
                    validate(version, type_prefix + '/quote.json', element);
                    break;
                  case "blockquote":
                    validate(version, type_prefix + '/blockquote.json', element);
                    break;
                  case "code":
                    validate(version, type_prefix + '/code.json', element);
                    break;
                  case "list":
                    validate(version, type_prefix + '/list.json', element);
                    break;
                  case "oembed":
                    validate(version, type_prefix + '/oembed.json', element);
                    break;
                  case "oembed_response":
                    // Oembed format changed in 0.5.7
                    validate(version, '/utils/oembed_response.json', element);
                    break;
                  case "raw_html":
                    validate(version, type_prefix + '/raw_html.json', element);
                    break;
                  case "table":
                    validate(version, type_prefix + '/table.json', element);
                    break;
                  case "text":
                    validate(version, type_prefix + '/text.json', element);
                    break;
                  case "reference":
                    validate(version, '/utils/reference.json', element);
                    break;
                  case "image":
                    validate(version, '/image.json', element);
                    break;
                  case "video":
                    validate(version, '/video.json', element);
                    break;
                  case "audio":
                    validate(version, '/audio.json', element);
                    break;
                  case "story":
                    validate(version, '/story.json', element);
                    break;
                  case "numeric_rating":
                    validate(version, type_prefix + '/numeric_rating.json', element);
                    break;
                  case "endorsement":
                    validate(version, type_prefix + '/endorsement.json', element);
                    break;
                  }
                });
              });

              it("should validate every promo item in a valid story: " + fixtureName, function() {
                var document = fixtures[fixtureName];

                Object.keys(document.promo_items).forEach(function(item_name) {
                  var item = document.promo_items[item_name];
                  item.type.should.equalOneOf([ "image", "video", "audio", "story", "reference" ]);

                  switch(item.type) {
                  case "image":
                    validate(version, '/image.json', item);
                    break;
                  case "video":
                    validate(version, '/video.json', item);
                    break;
                  case "audio":
                    validate(version, '/audio.json', item);
                    break;
                  case "story":
                    validate(version, '/story.json', item);
                    break;
                  case "reference":
                    validate(version, '/utils/reference.json', item);
                    break;
                  }
                });
              });
            });
          });
        });




        describe("Promo Items", function() {
          it("should allow raw_html item type under basic and any abitrary key", function() {
            validateIfFixtureExists(version, '/traits/trait_promo_items.json', 'trait-promo-item-raw-html-goog', true);
            validateIfFixtureExists(version, '/traits/trait_promo_items.json', 'trait-promo-item-raw-html-bad', false);
          });
        });

      });
    });
  });
});
