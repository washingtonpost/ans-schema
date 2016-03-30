'use strict';

module.exports = {
  get_version: function(str) {
    var dot1 = str.indexOf(".");
    var dot2 = str.indexOf(".", dot1 + 1);
    var version = {
      "version": str,
      "major": parseInt(str.substring(0, dot1)),
      "minor": parseInt(str.substring(dot1 + 1, dot2)),
      "patch": parseInt(str.substring(dot2 + 1))
    };
    return version;
  }

};
