'use strict';
var _ = require('lodash');
var schemas = require('./schemas');
var version = require('./version');
var v = version;
var Ajv = require('ajv');

var STORY_ELEMENTS = '/story_elements';
var UTILS = '/utils';
var TRAITS = '/traits';

// Top-level content types
//var TYPES = [ 'story', 'image', 'video', 'gallery', 'results', 'content' ];
var TYPES = [];

var VERSIONS = _.map(
  _.filter(version.history, function (item) {
    return ["0.5", "0.6", "0.7", "0.8", "0.9"].some(v => item.name.indexOf(v) > -1);
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

    TYPES = _.filter(_.map(_.filter(_.keys(_schemas), function(item) {
      return item.indexOf(version + "/") === 0;
    }), function(item) {
      return item.substring(version.length + 1, item.indexOf(".json"))
    }), function(item) {
      return item.indexOf("/") === -1;
    });

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
    else {
      // Workaround for schemas whose type was determined before the "no hyphens" rule
      if (!_.isNil(name)) {
        var alt_name = name.replace("-", "_");
        if (_.has(this.schemas[version], alt_name)) {
          return this.schemas[version][alt_name];
        }
      }
    }
  }
  return null;
};


AnsValidator.prototype.validate = function validate(ans) {
  return this.getAllContentErrors(ans, ans.version, "");
};

var ver057 = new v.Version({'major':0,'minor':5,'patch':7});

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

  // Recurse on items in rows, cells
  if (_.has(ans, 'rows') && ans.type !== 'table' && ans.type.indexOf("table") === 0) {
    var ver_object = new v.Version(v.parse_version(version));
    if (ver_object.gt(ver057)) {
      errors = _.reduce(ans.rows, function(errors, row, i) {
        return _.union(
          errors, _this.getAllContentErrors(
            row, version, namespace + ".rows[" + i + "]"));
      }, errors);
    }
  }

  if (_.has(ans, 'cells') && ans.type.indexOf("table_row") === 0) {
    var ver_object = new v.Version(v.parse_version(version));
    if (ver_object.gt(ver057)) {
      errors = _.reduce(ans.cells, function(errors, cell, i) {
        return _.union(
          errors, _this.getAllContentErrors(
            cell, version, namespace + ".cells[" + i + "]"));
      }, errors);
    }
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
