'use strict';
var history = require('./versions.json');

var parse_version = function parse_version(str) {
  var dot1 = str.indexOf(".");
    var dot2 = str.indexOf(".", dot1 + 1);
    var version = {
      "version": str,
      "major": parseInt(str.substring(0, dot1)),
      "minor": parseInt(str.substring(dot1 + 1, dot2)),
      "patch": parseInt(str.substring(dot2 + 1))
    };
    return version;
};

var prev_version = function prev_version(version) {
  var prev = null;
  for (var i = 0; i < history.length; i++) {
    var current = history[i];
    if (current.name === version) {
      return prev.name;
    }
    prev = current;
  }
  return null;
};

var VERSION = history[history.length - 1].name;

var _module = parse_version(VERSION);
_module.history = history;
_module.parse_version = parse_version;
_module.prev_version = prev_version;

module.exports = _module;
