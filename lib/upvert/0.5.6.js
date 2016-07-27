'use strict';

var _ = require('lodash');
var current_version = require('../version');
var transform_utils = require('../transform_utils');

var version_incrementer = transform_utils.version_incrementer;
var top_level_types = transform_utils.top_level_types;
var accumulatorFor = transform_utils.accumulatorFor;

var upvert = function(input) {
  var output = version_incrementer("0.5.7")(input);

  // Convert oembed to reference
  var convert = function convert(ans) {
    if (!_.isObject(ans)) {
      return ans;
    }

    if (_.has(ans, 'type') && ans.type === 'oembed') {
      return {
        "type": "reference",
        "_id": ans._id,
        "subtype": ans.subtype,
        "channel": ans.channels,
        "additional_properties": ans.additional_properties,
        "referent": {
          "type": "oembed",
          "id": ans.objectUrl,
          "provider": ans.providerUrl
        }
      };
    }

    return _.transform(ans, function(result, value, key, object) {
      if ( key === "additional_properties") {
        result[key] = value;
      } else if (key === "referent") {
        result[key] = value;
      } else {
        result[key] = convert(value);
      }
    }, accumulatorFor(ans));

  };

  return convert(output);

};

module.exports = upvert;
