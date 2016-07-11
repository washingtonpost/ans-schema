var ans = require('../lib/ans'),
    Ajv = require('ajv'),
    should = require('should'),
    _ = require('lodash'),
    loaded_schemas = {};

var version = ans.version.version;
var json_validator = new Ajv({allErrors:true});
var validator = null;
var AnsValidator = ans.AnsValidator;

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
      var story = { "type": "story", "version": version };

      var errors = validator.getAllContentErrors(story, version, "");

      errors.length.should.eql(0);

    });

    it("should return an error if an invalid property is added", function() {
      var story = { "type": "story", "version": version,
                    "foo": "bar" };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].message.should.eql("should NOT have additional properties");
    });

    it("should not return an error if a property is added to additional_properties", function() {
      var story = { "type": "story", "version": version,
                    "additional_properties": { "foo": "bar" } };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(0);
    });

    it("should return an error if a content element has a bad type", function() {
      var story = { "type": "story", "version": version,
                    "content_elements": [ {"type": "foo", "content":"bar"} ] };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].dataPath.should.eql(".content_elements[0].type");
    });

    it("should return no errors if elements validate against their own schema", function() {
      var story = { "type": "story", "version": version,
                    "content_elements": [ {"type": "text", "content":"Some text"} ] };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(0);
    });

    it("should return an error if a content element does not validate against its own schema",
       function() {
         var story = { "type": "story", "version": version,
                       "content_elements": [ {"type": "text", "content": "Text", "text":"Some text"} ] };
         var errors = validator.getAllContentErrors(story, version, "");
         errors.length.should.eql(1);
         errors[0].dataPath.should.eql(".content_elements[0]");
       });

    it("should return an error for each invalid content element", function() {
      var story = { "type": "story", "version": version,
                    "content_elements": [ {"type": "text" }, {"type":"image"} ] };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(2);
    });

    it("should return errors on top-level object and elements", function() {
      var story = { "type": "story",
                    "content_elements": [ {"type": "text"} ] };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(2);
    });


    it("should return an error if a promo item has a bad type", function() {
      var story = { "type": "story", "version": version,
                    "promo_items": { "basic": {"type": "foo", "version":version} } };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].dataPath.should.eql(".promo_items.basic.type");
    });

    it("should return no errors if promo items validate against their own schema", function() {
      var story = { "type": "story", "version": version,
                    "promo_items": {"basic": {"type": "image", "version":version} } };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(0);
    });

    it("should return an error if a promo item does not validate against its own schema", function() {
      var story = { "type": "story", "version": version,
                    "promo_items": {
                      "basic": { "type": "image", "version": version,
                                 "foo": "bar" } } };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].dataPath.should.eql(".promo_items.basic");
    });


    it("should return an error if a related content item has a bad type", function() {
      var story = { "type": "story", "version": version,
                    "related_content": {
                      "default": [
                        { "type": "foo", "version": version } ] } };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].dataPath.should.eql(".related_content.default[0].type");
    });


    it("should return an error if a related content item does not validate against its own schema", function() {
      var story = { "type": "story", "version": version,
                    "related_content": {
                      "default": [
                        { "type": "image",
                          "version": version,
                          "foo": "bar" } ] } };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(1);
      errors[0].dataPath.should.eql(".related_content.default[0]");
    });


    it("should return no errors if related content validates against its own schema", function() {
      var story = { "type": "story", "version": version,
                    "related_content": {
                      "default": [
                        { "type": "image",
                          "version": version,
                          "height": 200 } ] } };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(0);
    });


    it("should return no errors if a reference is included in content_elements", function() {
      var story = { "type": "story", "version": version,
                    "content_elements": [{
                      "type": "reference",
                      "referent": {
                        "type": "foo",
                        "provider": "bar",
                        "id": "goo"
                      }
                    }]
                  };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.eql(0);
    });

    it("should return errors if an invalid reference is included in content_elements", function() {
      var story = { "type": "story", "version": version,
                    "content_elements": [{
                      "type": "reference",
                      "job": "314"
                    }]
                  };
      var errors = validator.getAllContentErrors(story, version, "");
      errors.length.should.not.eql(0);
    });


  });


  describe(".getValidationErrors", function() {
    it("should return an empty list if an item validates", function() {
      var errors = validator.getValidationErrors(validator.findSchema(version, 'story'), { "type": "story", "version": version });
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
