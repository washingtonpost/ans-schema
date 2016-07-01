'use strict';

var _ = require('lodash');
var current_version = require('../version');
var transform_utils = require('../transform_utils');

var version_incrementer = transform_utils.version_incrementer;
var top_level_types = transform_utils.top_level_types;
var accumulatorFor = transform_utils.accumulatorFor;

var upvert = function(input) {
  var output = version_incrementer("0.5.2")(input);

  return output;
};

module.exports = upvert;
