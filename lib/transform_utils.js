'use strict';

var _ = require('lodash');

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

      if (_.has(ans, 'version') ||
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
  'recursion_keys': recursion_keys
};
