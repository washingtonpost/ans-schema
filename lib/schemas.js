'use strict';

var schemas = {};
var dir = require('node-dir');
var path = require('path');

var baseDir = path.join(path.dirname(module.filename), '../src/main/resources/schema/ans');

var callback = undefined;
var loaded = false;
var version = require('./version');
var transforms = require('./transforms');


// display contents of files in this script's directory
dir.readFiles(
  baseDir, {
    match:  /.json$/
  },
  function(err, content, filename, next) {
    if (err) throw err;
    var name = path.relative(baseDir, filename);
    schemas[name] = JSON.parse(content);
    next();
  },
  function(err, files) {
    if (err) throw err;
    loaded = true;
    if (typeof callback == 'function') {
      callback(schemas);
    }
  }
);


module.exports = {
  'version': version,
  'getSchemas': function(cb) {
    if (loaded) {
      cb(schemas);
    } else {
      callback = cb;
    }
  },

  'getTransforms': function(cb) {
    cb(transforms);
  },

  // Direct accessors - won't work until schemas loaded,
  // so provided only for convenience

  'schemas': schemas,
  'transforms': transforms

};
