'use strict';

var _ = require('lodash');
var current_version = require('../version');
var transform_utils = require('../transform_utils');

var version_incrementer = transform_utils.version_incrementer;
var top_level_types = transform_utils.top_level_types;
var accumulatorFor = transform_utils.accumulatorFor;

var upvert = function(input) {
  var output = version_incrementer("0.5.8")(input);

  /* Adds "format": "ans" to all top-level docs
   *
   *  FROM
   *
   *  {
   *    "type": "story",
   *    "version": "0.5.7"
   *  }
   *
   *  TO
   *
   *  {
   *    "type": "story",
   *    "version": "0.5.8",
   *    "format": "ans"
   *  }
   */
  var addFormatField = function(ans) {
    if (!_.isObject(ans)) {
      return ans;
    }

    if (_.has(ans, "type") && _.includes(["story", "image", "video", "gallery", "audio", "results"], ans.type)) {
      ans.format = "ans";
    }

    var result = _.transform(ans, function(result, value, key, object) {
      if (key === "additional_properties" || key === "referent_properties") {
        result[key] = value;
      }
      else if (_.isArray(value)) {
        result[key] = _.map(value, addFormatField);
      }
      else if (_.isObject(value)) {
        result[key] = addFormatField(value);
      }
      else {
        result[key] = value;
      }
    }, accumulatorFor(ans));
    return result;
  };

  return addFormatField(output);
};

module.exports = upvert;
