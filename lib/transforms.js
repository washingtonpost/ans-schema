'use strict';
var _ = require('lodash');
var current_version = require('./version');
var util = require('./util');

var top_level_types = ["story", "video", "image", "gallery"];

// Given a version number, generates a function that sets input.version to that version number
var version_incrementer = function(new_version) {
  return function version(input) {

    var doVersion = function doVersion(ans) {
      // Recur through the object tree, looking for version
      _.forIn(ans, function(value, key) {
        if (_.isObject(value)) {
          ans[key] = version(value);
        }
        if (_.isArray(value)) {
          _.forEach(value, function(element, index) {
            if (_.isObject(element)) {
              ans[key][index] = version(element);
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

var versions = {
  "0.4": {
    // Convert 0.4.5 to 0.4.6
    '0.4.5': function(input) {
      var output = _.cloneDeep(input);
      output.version = '0.4.6';

      var addCredits = function addCredits(ans) {
        // Recur through the object tree, looking for credits
        _.forIn(ans, function(value, key) {
          if (_.isObject(value)) {
            addCredits(value);
          }
          else if (_.isArray(value)) {
            _.forEach(value, function(element, index) {
              if (_.isObject(element)) {
                addCredits(element);
              }
            });
          }
        });

        if (_.has(ans, "type") &&
            _.indexOf(top_level_types, ans.type) > -1 &&
            _.has(ans, "credits")) {

          ans.credits = _.reduce(ans.credits, function(result, value) {

            var role = value.role;
            if (!_.has(result, role)) {
              result[role] = [];
            }

            result[role].push(value.credit);
            return result;
          }, {});
        }

      };

      addCredits(output);

      return output;
    },

    // If there no breaking changes between versions,
    // use the version incrementer
    '0.4.6': version_incrementer('0.4.7')
  },
  "0.5": {
    "0.5.0": function (input) {
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
        }, {});

        return result;
      }

      return convert(output);
    },

    "0.5.1": version_incrementer("0.5.2")
  }
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
    var minor_version = version_from.major + "." + version_from.minor;

    // Don't upvert across minor or major version changes for now
    if (version_from.major !== version_to.major ||
        version_from.minor !== version_to.minor) {
      throw new Error("Upverting from " + version_from.version + " to " +
                       version_to.version + " is not supported at this time");
    }

    // Stop recursion
    //console.log(version_from.version);
    //console.log(version_to.version);
    if (version_from.version === version_to.version) {
      return ans;
    }

    if (_.has(versions[minor_version], version_from.version)) {
      var transformer = versions[minor_version][version_from.version]
      return doUpvert(transformer(ans), version_to);
    }
    else {
      throw new Error("Unsupported version of ANS: " + version_from.version);
    };
  };

  return doUpvert(ans, version_to);
};


module.exports = { 'versions': versions, 'upvert': upvert };
