'use strict';

var _ = require('lodash');
var current_version = require('../version');
var transform_utils = require('../transform_utils');

var version_incrementer = transform_utils.version_incrementer;
var top_level_types = transform_utils.top_level_types;
var accumulatorFor = transform_utils.accumulatorFor;

var upvert = function(ans) {
  // Update the version.
  ans = version_incrementer("0.5.6")(ans);

  // Convert 0.5.5 to 0.5.6
  var convert = function convert(ans) {
    if(!_.isObject(ans)) {
      return ans;
    }

    return _.transform(ans, function(result, value, key, object) {
      if ( key === "sites" ) {
        // Update all sites.  Add 'primary' attribute.
        if (value.length && value.length > 0) {
          var sites = value.map(function (site) {
            if (site.type === "site") {
              if (!_.isNil(site.additional_properties) &&
                  !_.isNil(site.additional_properties.primary) &&
                  _.isBoolean(site.additional_properties.primary)) {
                site.primary = site.additional_properties.primary;
              }
              else {
                site.primary = false;
              }
            }
            return site;
          });

          result[key] = sites;
        }
      } else if ( key === "owner") {
        // Update owner.  Add 'sponsored' attribute.
        value.sponsored = false;
        result[key] = value;
      } else if (_.isObject(ans)) {
        result[key] = convert(value);
      } else {
        result[key] = value;
      }

    }, accumulatorFor(ans));
  };

  return convert(ans);

};

module.exports = upvert;
