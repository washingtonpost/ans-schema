'use strict';

var _ = require('lodash');
var current_version = require('./version');
var transform_utils = require('./transform_utils');
var version = require('./version');

var version_incrementer = transform_utils.version_incrementer;
var accumulatorFor = transform_utils.accumulatorFor;
var top_level_types = transform_utils.top_level_types;


var upverters = {};

// Load upverters
_.forEach(version.history, function(item, index) {
  if (item.upverter === true) {
    upverters[item.name] = require('./upvert/' + item.name);
  }
});

// Run an ans object through each upverter in sequence from its starting version to desired version
var upvert = function upvert(ans, version_to) {
  if (_.isNil(version_to)) {
    version_to = current_version;
  }
  else if (typeof version_to === "string") {
    version_to = current_version.parse_version(version_to);
  }


  var doUpvert = function doUpvert(ans, version_to) {
    if (ans instanceof Error) {
      return ans;
    }

    var version_from = current_version.parse_version(ans.version);
    var minor_version = version_from.major + "." + version_from.minor;

    // Don't upvert across minor or major version changes for now
    if (version_from.major !== version_to.major ||
        version_from.minor !== version_to.minor) {
      throw new Error("Upverting from " + version_from.version + " to " +
                       version_to.version + " is not supported at this time");
    }

    // Stop recursion
    if (version_from.version === version_to.version) {
      return ans;
    }

    if (_.has(upverters, version_from.version)) {
      var transformer = upverters[version_from.version]
      return doUpvert(transformer(ans), version_to);
    }
    else {
      throw new Error("Unsupported version of ANS: " + version_from.version);
    };
  };

  return doUpvert(ans, version_to);
};


module.exports = { 'upverters': upverters, 'upvert': upvert, 'incrementer': version_incrementer };
