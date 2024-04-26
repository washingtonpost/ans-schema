'use strict';

var _ = require('lodash');
var Version = require('./version')

var top_level_types = ["story", "video", "image", "gallery", "results", "audio", "redirect"];
var recursion_keys = [ 'promo_items', 'related_content', 'content_elements' ];

// Given a version number, generates a function that sets input.version to that version number
var version_incrementer = function(new_version) {
  return function version(input) {

    var doVersion = function doVersion(ans) {
      if (_.get(ans, 'type') === 'reference') {
        return ans;
      }

      // Recur through the object tree, looking for version
      _.forIn(ans, function(value, key) {
        if (_.isObject(value)) {
          if (key === 'additional_properties') {
            ans[key] = value;
          }
          else {
            ans[key] = doVersion(value);
          }
        }
        if (_.isArray(value)) {
          _.forEach(value, function(element, index) {
            if (_.isObject(element)) {
              ans[key][index] = doVersion(element);
            }
          });
        }
      });
      

      if ((_.has(ans, 'version') && Version.is_semantic_version(ans.version))||
          _.indexOf(top_level_types, _.get(ans, 'type')) > -1) {
        return _.set(ans, 'version', new_version);
      }
      else {
        return ans;
      }
    };

    var output = _.cloneDeep(input);
    return doVersion(output);
  };
};


// Move all but allowed fields into additional_properties
var limitFields = function limitFields(allowed_fields, original) {
  var additional_properties = _.has(original, 'additional_properties') && _.isObject(original.additional_properties) ?
      _.cloneDeep(original.additional_properties) : {};

  var updated = _.transform(original, function(result, value, key, object) {
    if (_.includes(allowed_fields, key)) {
      result[key] = value;
    }
    else {
      additional_properties[key] = value;
    }
  }, {});

  // If previous additional_properties existed, merge with new additional_properties
  if (_.size(additional_properties) > 0) {
    if (_.has(updated.additional_properties) && _.isObject(updated.additional_properties)) {
      _.merge(updated.additional_properties, additional_properties, updated.additional_properties);
    }
    else {
      updated.additional_properties = additional_properties;
    }
  }

  // If we don't have any additional properties, delete additional_properties
  if (_.size(updated.additional_properties) === 0) {
    delete updated.additional_properties;
  }


  return updated;
};


var field_name_valid = /^[a-zA-Z0-9_]*$/;
var field_name_invalid_char = /[^a-zA-Z0-9_]/g

// Rename fields
var cleanFieldNames = function cleanFieldNames(original) {

  var invalid_field_names = [];
  var result = _.transform(original, function(result, value, key, object) {
    if (field_name_valid.test(key) === false) {
      var cleaned_name = '__renamed_' + key.replace(field_name_invalid_char, '_');
      var final_name = cleaned_name;
      var i = 0;
      while (_.has(object, final_name)) {
        final_name = cleaned_name + '_' + ++i;
      }
      result[final_name] = value;
      delete result[key];
    }
  }, original);

  return result;
};


var accumulatorFor = function(object) {
  if (_.isArray(object)) {
    return [];
  }
  return {};
};

module.exports = {
  'top_level_types': top_level_types,
  'version_incrementer': version_incrementer,
  'accumulatorFor': accumulatorFor,
  'recursion_keys': recursion_keys,
  'limitFields': limitFields,
  'cleanFieldNames': cleanFieldNames
};
