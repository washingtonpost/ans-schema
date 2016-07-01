'use strict';

var _ = require('lodash');
var current_version = require('../version');
var transform_utils = require('../transform_utils');

var version_incrementer = transform_utils.version_incrementer;
var top_level_types = transform_utils.top_level_types;
var accumulatorFor = transform_utils.accumulatorFor;

var upvert = function (input) {
  var output = version_incrementer("0.5.1")(input);

  var convert = function convert(ans) {

    if (!_.isObject(ans)) {
      return ans;
    }
    var result = _.transform(ans, function(result, value, key, object) {
      if (key === "additional_properties") {
        result[key] = value;
      }
      else if (key === "additonal_properties" &&
               _.has(object, "type") &&
               [ "text", "header" ].indexOf(object.type) > -1) {
        result["additional_properties"] = value;
      }
      else if (_.isArray(value)) {

        var items = _.map(value, convert);
        result[key] = items;
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

  return convert(output);
};

module.exports = upvert;
