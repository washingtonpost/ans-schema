'use strict';

var _ = require('lodash');
var current_version = require('../version');
var transform_utils = require('../transform_utils');

var version_incrementer = transform_utils.version_incrementer;
var top_level_types = transform_utils.top_level_types;
var accumulatorFor = transform_utils.accumulatorFor;

var upvert = function(input) {
  var output = version_incrementer("0.5.5")(input);

  var convert = function convert(ans) {
    var result = _.transform(ans, function(result, value, key, object) {
      if ( key === "additional_properties") {
        result[key] = value;
      }
      else if ( key === "keywords" ) {
        if ( value.length && value.length > 0 ) {
          var keywords = value.map(function(a) {
            if ( !_.has(a, "score") ) {
              a["score"] = 0.0;
            }
            return a;
          });

          result[key] = keywords;
        }
      }
      else if (_.isArray(value)) {
        result[key] = _.map(value, convert);
      }
      else if (_.isObject(value)) {
        result[key] = convert(value);
      }
      else {
        result[key] = value;
      }

    }, accumulatorFor(ans));

    return result;
  };

  var results = convert(output);

  // Promote slug fields where found
  var convertSlug = function convertSlug(ans) {
    if (!_.isObject(ans)) {
      return ans;
    }
    else if (_.isArray(ans)) {
      return _.map(ans, convertSlug);
    }
    else if (_.isObject(ans)) {
      // Recur over everything
      var result = _.transform(ans, function(result, value, key, object) {
        result[key] = convertSlug(value);
      }, {});

      // On the way out, promote additional_properties.slug to slug
      if (_.has(result, "type") &&
          _.indexOf(["story", "image", "video", "gallery", "author"], result.type) > -1 &&
          _.has(result, "additional_properties.slug") &&
          !_.has(result, "slug")) {
        result.slug = result.additional_properties.slug;
      }

      return result;
    }
  };

  return convertSlug(results);

};

module.exports = upvert;
