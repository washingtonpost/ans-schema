var ans = require('../lib/ans'),
    Ajv = require('ajv'),
    should = require('should'),
    _ = require('lodash'),
    loaded_schemas = {};

var version = ans.version.version;
var v = ans.version;
var json_validator = new Ajv({allErrors:true});
var validator = null;
var AnsValidator = ans.AnsValidator;

var getBaseStoryForVersion = function(version) {
  if (new v.Version(v.parse_version(version)).lt(v.parse_version("0.5.8"))) {
    return { "type": "story", "version": version };
  }
  else {
    return { "type": "story", "version": version, "format": "ans" };
  }
};

// Setup schemas and validators
describe("ANS Validator", function() {
  before(function(done) {
    ans.getSchemas(function(err, s) {
      Object.keys(s).forEach(function(key) {
        var schema = s[key];
        schema.id = 'https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/' + key;
        json_validator.addSchema(schema, schema.id);
      });
      loaded_schemas = s;
      validator = new AnsValidator(new Ajv({allErrors:true}), loaded_schemas);
      done();
    });
  });

  describe(" .getAllContentErrors", function() {
    it("should return no errors for an empty story", function() {
      var story = getBaseStoryForVersion(version);

      var errors = validator.getAllContentErrors(story, version, "");

      errors.length.should.eql(0);

    });

    it("should return an error if an invalid property is added", function() {
      var story = _.merge({"foo": "bar"}, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].message.should.eql("should NOT have additional properties");
    });

    it("should not return an error if a property is added to additional_properties", function() {
      var story = _.merge({ "additional_properties": { "foo": "bar" } }, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(0);
    });

    it("should return an error if a content element has a bad type", function() {
      var story = _.merge({ "content_elements": [ {"type": "foo", "content":"bar"} ] }, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].dataPath.should.eql(".content_elements[0].type");
    });

    it("should return no errors if elements validate against their own schema", function() {
      var story = _.merge({ "content_elements": [ {"type": "text", "content":"Some text"} ] }, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(0);
    });

    it("should return an error if a content element does not validate against its own schema",
       function() {
         var story = _.merge({ "content_elements": [ {"type": "text", "content": "Text", "text":"Some text"} ] }, getBaseStoryForVersion(version));
         var errors = validator.getAllContentErrors(story, version, "");
         errors.length.should.eql(1);
         errors[0].dataPath.should.eql(".content_elements[0]");
       });

    it("should return an error for each invalid content element", function() {
      var story = _.merge({ "content_elements": [ {"type": "text" }, {"type":"blockquote"} ] }, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(2);
    });

    it("should return errors on top-level object and elements", function() {
      var story = _.merge({ "content_elements": [ {"type": "text"} ] }, getBaseStoryForVersion(version));
      delete story.version;
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(2);
    });


    it("should return an error if a promo item has a bad type", function() {
      var story = _.merge({ "promo_items": {
        "basic": _.merge(getBaseStoryForVersion(version), {"type": "foo"})
      } }, getBaseStoryForVersion(version));

      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].dataPath.should.eql(".promo_items.basic.type");
    });

    it("should return no errors if promo items validate against their own schema", function() {
      var story = _.merge({ "promo_items": {
        "basic": getBaseStoryForVersion(version)
      }}, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(0);
    });

    it("should return an error if a promo item does not validate against its own schema", function() {
      var story = _.merge({ "promo_items": {
        "basic": _.merge({ "foo": "bar" }, getBaseStoryForVersion(version))
      } }, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].dataPath.should.eql(".promo_items.basic");
    });


    it("should return an error if a related content item has a bad type", function() {
      var story = _.merge({ "related_content": {
        "default": [
          _.merge(getBaseStoryForVersion(version), { "type": "foo" })
        ] } }, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].dataPath.should.eql(".related_content.default[0].type");
    });


    it("should return an error if a related content item does not validate against its own schema", function() {
      var story = _.merge({ "related_content": {
        "default": [
          _.merge(
            getBaseStoryForVersion(version), {
              "type": "image",
              "foo": "bar" })
        ] } }, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].dataPath.should.eql(".related_content.default[0]");
    });


    it("should return no errors if related content validates against its own schema", function() {
      var story = _.merge({ "related_content": {
        "default": [
          _.merge(getBaseStoryForVersion(version), {
            "type": "image",
            "height": 200 })
        ] } }, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(0);
    });


    it("should return no errors if a reference is included in content_elements", function() {
      var story = _.merge({ "content_elements": [{
        "type": "reference",
        "referent": {
          "type": "foo",
          "provider": "bar",
          "id": "goo"
        }
      }]}, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(0);
    });

    it("should return errors if an invalid reference is included in content_elements", function() {
      var story = _.merge({ "content_elements": [{
        "type": "reference",
        "job": "314"
      }]}, getBaseStoryForVersion(version));
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.not.eql(0);
    });


    it("should validate items with a hyphen in their type", function() {
      var image = _.merge(getBaseStoryForVersion(version), {
        "_id": "2",
        "additional_properties": {
          "alttext": "REUTERS"
        },
        "caption": "Indiana Pacers David West celebrates during Game 6 of their NBA Eastern Conference Final playoff series against the Miami Heat in Indianapolis, Indiana June 1, 2013.",
        "credits": {
          "photographer": [
            {
              "name": "BRENT SMITH",
              "type": "author"
            }
          ]
        },
        "owner": {
          "name": "REUTERS"
        },
        "revision": {
          "revision_id": ""
        },
        "type": "image",
        "url": "http://www.theglobeandmail.com/sports/basketball/article12301697.ece/BINARY/IND164_NBA.JPG"
      });

      var image_operation = {
        "_id": "1",
        "body": image,
        "date": "2013-06-02T03:18:49.053Z",
        "operation": "update",
        "organization_id": "sandbox.tgam",
        "type": "image-operation",
        "version": version
      };
      var errors = validator.getAllContentErrors(image_operation, version, "");
      errors.length.should.eql(0);

    });


  });


  describe(".getValidationErrors", function() {
    it("should return an empty list if an item validates", function() {
      var errors = validator.getValidationErrors(validator.findSchema(version, 'story'), getBaseStoryForVersion(version));
      errors.should.be.Array();
      errors.length.should.eql(0);
    });

    it("should return the JSON Schema validator errors if it does not validate", function() {
      var errors = validator.getValidationErrors(validator.findSchema(version, 'story'), {"type":"story"});

      json_validator.validate(loaded_schemas[version + '/story.json'], {"type":"story"});
      var expected = json_validator.errors;
      errors.should.deepEqual(expected);
    });

  });



});
