'use strict';
var _ = require('lodash');
var current_version = require('./version');
var util = require('./util');

// Given a version number, generates a function that sets input.version to that version number
var version_incrementer = function(new_version) {
  return function(input) {
    return _.set(_.cloneDeep(input), 'version', new_version);
  };
};

var versions = {

  // Convert 0.4.5 to 0.4.6
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

  // If there no required changes between versions,
  // use the version incrementer
  '0.4.6': version_incrementer('0.4.7')

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
