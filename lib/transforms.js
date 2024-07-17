'use strict';

var _ = require('lodash');
var transform_utils = require('./transform_utils');
var version = require('./version');
var Version = version.Version;


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



// Internal recursive function to do the actual upverting
var doUpvert = function doUpvert(ans, version_to) {
  if (ans instanceof Error) {
    return ans;
  }

  try {
    var version_from = new Version(version.parse_version(ans.version));
  }
  catch (error) {
    throw new Error("Could not detect old ANS version.", error);
  }
  var minor_version = version_from.major + "." + version_from.minor;

  // Stop recursion
  if (version_from.str() === version_to.str()) {
    return ans;
  }

  if(!version.is_semantic_version(version_from.str()) || !version.is_semantic_version(version_to.str())){
    return ans
  }

  if (!version_from.lt(version_to)) {
    throw new Error("Cannot upvert from " + version_from.str() +
                    " because it is not less than " + version_to.str());
  }

  if (_.has(upverters, version_from.str())) {
    var transformer = upverters[version_from.str()]
    return doUpvert(transformer(ans), version_to);
  }
  else {
    throw new Error("Unsupported version of ANS: " + version_from.str());
  };
};



// Run an ans object through each upverter in sequence from its starting version to desired version
var upvert = function upvert(input, version_to, strict) {
  var ans = _.cloneDeep(input);

  // Figure out starting and ending versions
  if (_.isNil(version_to)) {
    version_to = new Version(version);
  }
  else if (typeof version_to === "string") {
    version_to = new Version(version.parse_version(version_to));
  }

  if (!_.isBoolean(strict)) {
    strict = false;
  }

  var top_version = new Version(version.parse_version(ans.version));

  // If not strict mode, first sync all sub-object versions up to parent object
  if (!strict) {
    ans = doSync(ans, top_version);
  }

  // Upvert the top-level document
  return doUpvert(ans, version_to);
};



// Internal recursive function to synchronize inner document versions
var doSync = function doSync(document, version_to) {

  // End recursion on primitive types
  if (!_.isObject(document)) {
    return document;
  }

  // If this is a sub-doc, we recur with the sub-doc's version to ensure that all
  // children are the same version, and then upvert to the requested version
  if (_.isObject(document) &&
      !_.isNil(document.version) &&
      !_.isNil(document.type)) {

    //console.log("------This is a sub-document-----");
    if(!version.is_semantic_version(version_to.str()) || !version.is_semantic_version(document.version)){
      return document
    }

    var sub_doc_version = new Version(version.parse_version(document.version));

    if (sub_doc_version.lt(version_to) && top_level_types.includes(document.type)) {
      //console.log ("------Found lower version sub-doc, change requested version ------");
      document = doSync(document, sub_doc_version);

      //console.log("-----Upverting document to  " + version_to.str() + "------");
      document = doUpvert(document, version_to);

      return document;
    }
  }

  // Otherwise, continue traversing down the tree
  var continueSync = function(item) {
    return doSync(item, version_to);
  };

  document = _.transform(document, function (result, value, key, object) {
    if (key === "additional_properties") {
      result[key] = value;
    }
    else if (_.isArray(value)) {
      result[key] = _.map(value, continueSync);
    }
    else {
      result[key] = continueSync(value);
    }
  }, accumulatorFor(document));

  return document;
};


var sync = function sync(ans) {
  var ans = _.cloneDeep(ans);

  if (_.isNil(ans.version)) {
    throw new Error("Could not find version property on ANS document");
  }

  if (version.indexOf(ans.version) === -1) {
    throw new Error("'" + ans.version + "' is not a valid ANS version");
  }

  return doSync(ans, new Version(version.parse_version(ans.version)));
}





module.exports = { 'upverters': upverters, 'upvert': upvert, 'incrementer': version_incrementer, 'sync': sync };
