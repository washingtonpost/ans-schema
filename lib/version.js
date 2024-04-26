'use strict';
var history = require('./versions.json');

var Version = function Version(parts) {
  this.major = parts.major;
  this.minor = parts.minor;
  this.patch = parts.patch;
};

Version.prototype.str = function str() {
  return this.major + "." + this.minor + "." + this.patch;
};

Version.prototype.compare = function compare(other_version) {
  if (this.major > other_version.major) {
    return 1;
  }
  if (this.major == other_version.major) {
    if (this.minor > other_version.minor) {
      return 1;
    }
    if (this.minor == other_version.minor) {
      if (this.patch > other_version.patch) {
        return 1;
      }
      if (this.patch == other_version.patch) {
        return 0;
      }
      if (this.patch < other_version.patch) {
        return -1;
      }
    }
    if (this.minor < other_version.minor) {
      return -1;
    }
  }
  if (this.major < other_version.major) {
    return -1;
  }

  throw new Error("Could not compare " + JSON.stringify(this) + " to " + JSON.stringify(other_version));
};

Version.prototype.lt = function lt(other_version) {
  return this.compare(other_version) === -1;
};

Version.prototype.gt = function gt(other_version) {
  return this.compare(other_version) === 1;
};

Version.prototype.eq = function eq(other_version) {
  return this.compare(other_version) === 0;
};


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

var is_semantic_version = function is_semantic_version(version_string) {
  try {
    var version = parse_version(version_string);
    if (version &&
        version.major !== null && version.major !== undefined && !isNaN(version.major) &&
        version.minor !== null && version.minor !== undefined && !isNaN(version.minor) &&
        version.patch !== null && version.patch !== undefined && !isNaN(version.patch)) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
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

var indexOf = function indexOf(version) {
  for (var i = 0; i < history.length; i++) {
    var current = history[i];
    if (current.name === version) {
      return i;
    }
  }
  return -1;
};

var VERSION = history[history.length - 1].name;

var _module = parse_version(VERSION);
_module.history = history;
_module.parse_version = parse_version;
_module.prev_version = prev_version;
_module.Version = Version;
_module.indexOf = indexOf;
_module.is_semantic_version = is_semantic_version;

module.exports = _module;
