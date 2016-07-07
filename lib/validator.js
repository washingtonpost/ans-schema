'use strict';
var _ = require('lodash');
var schemas = require('./schemas');
var version = require('./version');
var Ajv = require('ajv');

var STORY_ELEMENTS = '/story_elements';
var UTILS = '/utils';
var TRAITS = '/traits';

// Top-level content types
var TYPES = [ 'story', 'image', 'video', 'gallery', 'results', 'content' ];

var VERSIONS = _.map(
  _.filter(version.history, function (item) {
    return item.name.indexOf("0.5") > -1;
  }),
  function(item) {
    return item.name;
  }
);

var validatorsByVersion = {};

var AnsValidator = function(_ajv, _schemas) {
  this.ajv = _ajv;
  this.schemas = {};
  var _this = this;

  _.forEach(VERSIONS, function(version) {
    _this.schemas[version] = {};
    _.forEach(TYPES, function(type) {
      if (_.has(_schemas, version + '/' + type + ".json")) {
        var content = _schemas[version + '/' + type + ".json"];
        _this.schemas[version][type] = content;
        _this.ajv.addSchema(content);
      }
    });
  });

  var getSubNames = function getElementNames(version, subdir) {
    return _.map(
      _.filter(
        _.keys(_schemas),
        function(item) {
          return item.indexOf(version + subdir) === 0;
        }),
      function(item) {

        var name = item.substring(version.length + subdir.length + 1);
        return name.substring(0, name.indexOf("."));
      });
  };

  _.forEach(VERSIONS, function(version) {
    var element_names = getSubNames(version, STORY_ELEMENTS);
    _.forEach(element_names, function(name) {

      var content = _schemas[version + STORY_ELEMENTS + '/' + name + '.json'];
      _this.schemas[version][name] = content;
      _this.ajv.addSchema(content);
    });

    var util_names = getSubNames(version, UTILS);
    _.forEach(util_names, function(name) {

      var content = _schemas[version + UTILS + '/' + name + '.json'];
      _this.schemas[version][name] = content;
      _this.ajv.addSchema(content);

    });

    var trait_names = getSubNames(version, TRAITS);
    _.forEach(trait_names, function(name) {
      var content = _schemas[version + TRAITS + '/' + name + '.json'];
      _this.schemas[version][name] = content;
      _this.ajv.addSchema(content);
    });


  });

};

// Helper to force Ajv's validation syntax
// into a function that consistently returns an array.
AnsValidator.prototype.getValidationErrors = function getValidationErrors(schema, object) {
  //console.log(this.ajv);
  if (this.ajv.validate(schema, object)) {
    return [];
  } else {
    return this.ajv.errors;
  }
};


AnsValidator.prototype.findSchema = function findSchema(version, name) {
  if (_.has(this.schemas, version)) {
    if (_.has(this.schemas[version], name)) {
      return this.schemas[version][name];
    }
  }
  return null;
};

// Recursively validate an object and all relevant children
// against their respective element schemas.
AnsValidator.prototype.getAllContentErrors = function getAllContentErrors(ans, version, namespace) {
  var errors = [];
  var _this = this;

  // Validate item against its own self-declared schema
  var schema = this.findSchema(version, ans.type);
  if (schema === null) {
    errors = _.union(errors, [{ "dataPath": namespace + ".type",
                                "params": ans.type,
                                "message": "Could not find schema for specified type" }]);
  }
  else {
    errors = _.union(errors, _.map(
      this.getValidationErrors(schema, ans), function(error) {
        return _.mapValues(error, function(value, key) {
          if (key === "dataPath") {
            value = "" + value;
            return namespace + value;
          }
          else {
            return value;
          }
        });
      }));
  }

  // Recurse on items in content_elements
  if (_.has(ans, 'content_elements')) {
    errors = _.reduce(ans.content_elements, function(errors, element, i) {
      return _.union(
        errors, _this.getAllContentErrors(
          element, version, namespace + ".content_elements[" + i + "]"));
    }, errors);
  }

  // Ditto for promo_items
  if (_.has(ans, 'promo_items')) {
    errors = _.union(errors, _.reduce(
      ans.promo_items, function(errors, element, key) {
        return _.union(
          errors, _this.getAllContentErrors(
            element, version, namespace + ".promo_items." + key));
      }, errors));;
  }

  // Ditto for related_content.*
  if (_.has(ans, 'related_content')) {
    errors = _.union(errors, _.reduce(
      ans.related_content, function(errors, content_list, name) {
        return _.union(errors, _.reduce(content_list, function(errors, item, i) {
          return _.union(errors, _this.getAllContentErrors(
            item, version, namespace + ".related_content." + name + "[" + i + "]"));
        }, errors));
      }, errors));
  }

  return errors;
};


module.exports = {
  'AnsValidator': AnsValidator,
  'getValidatorForVersion': function(version, callback) {
    if (_.isObject(validatorsByVersion[version])) {
      callback(null, validatorsByVersion[version]);
    }
    else {
      var ajv = new Ajv({ allErrors: true });
      schemas.loadSchema(version, function(err, schema) {
        if (err) {
          callback(err);
          return;
        }

        var renamed_schema = _.mapKeys(schema, function(value, key) {
          return version + '/' + key;
        });
        var validator = new AnsValidator(ajv, renamed_schema);
        validatorsByVersion[version] = validator;
        callback(null, validator);
      });
    }
  }
};
