'use strict';
var _ = require('lodash');

var identity = function(x) { return x; };
var current_version = require('./version');
var util = require('./util');

var versions = {

  // 0.4.5 to 0.4.6
  '0.4.5': function(input) {
    var output = _.cloneDeep(input);
    output.version = '0.4.6';

    switch (input.type) {
    case "story":
      if (!_.isNil(output.credits)) {
        output.credits = _.reduce(output.credits, function(result, value) {

          var role = value.role;
          if (!_.has(result, role)) {
            result[role] = [];
          }

          result[role].push(value.credit);
          return result;
        }, {});
      }
      break;
    }

    return output;
  },

  // End of minor version chain
  '0.4.6': identity
};



var upvert = function upvert(ans, version_to) {
  if (_.isNil(version_to)) {
    version_to = current_version;
  }
  else if (typeof version_to === "string") {
    version_to = util.get_version(version_to);
  }

  var doUpvert = function doUpvert(ans, version_to) {
    if (ans instanceof Error) {
      return ans;
    }

    var version_from = util.get_version(ans.version);

    // Stop recursion
    if (version_from.version === version_to.version) {
      return ans;
    }

    if (_.has(versions, version_from.version)) {
      var transformer = versions[version_from.version]
      return doUpvert(transformer(ans), version_to);
    }
    else {
      return new Error("Unsupported version of ANS");
    };
  };

  return doUpvert(ans, version_to);
};




module.exports = { 'versions': versions, 'upvert': upvert };
