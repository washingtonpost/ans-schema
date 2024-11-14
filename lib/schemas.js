'use strict';

var schemas = {};
var schemasByVersion = {};
var dir = require('node-dir');
var path = require('path');
var _ = require('lodash');

var baseDir = path.join(path.dirname(module.filename), '../src/main/resources/schema/ans');

var callback = undefined;
var loaded = false;


// Load schema files for a given version into memory
var loadSchema = function loadSchema(version, done) {
  if (_.isNil(version) || _.isEmpty(version)) {
    done("version is required parameter");
    return;
  }

  if (_.isObject(schemasByVersion[version])) {
    done(null, schemasByVersion[version]);
    return;
  }

  var schemaDir = baseDir + '/' + version;  

  dir.readFiles(
    schemaDir, {
      match:  /.json$/
    },
    function(err, content, filename, next) {
      if (err) throw err;
      if (!schemasByVersion[version]) {
        schemasByVersion[version] = {};
      }
      var name = path.relative(schemaDir, filename);
      try {
        var content = JSON.parse(content);
        schemasByVersion[version][name] = content;
      }
      catch (err) {
        console.log("Could not load " + name);
      }
      next();
    },
    function(err, files) {
      if (err) {
        if (typeof done == 'function') {
          done(err);
          return;
        }
      }
      loaded = true;
      if (typeof done == 'function') {
        done(null, schemasByVersion[version]);
        return;
      }
    }
  );

};


// Load all schemas at once. Left in for backwards compatibility.
var loadAllSchemas = function loadAllSchemas(done) {
  dir.readFiles(
    baseDir, {
      match:  /.json$/
    },
    function(err, content, filename, next) {
      if (err) throw err;
      var name = path.relative(baseDir, filename);
      try {
        var content = JSON.parse(content);
        schemas[name] = content;
        var version = name.substring(0, name.indexOf('/'));
        /*_.set(schemasByVersion,
              '["' + version + '"].' + name.substring(name.indexOf('/') + 1),
              content);*/
      }
      catch (err) {
        console.log("Could not load " + name);
      }
      next();
    },
    function(err, files) {
      if (err) {
        if (typeof done == 'function') {
          done(err);
          return;
        }
      }
      loaded = true;
      if (typeof done == 'function') {
        done(null, schemas);
        return;
      }
    }
  );
};




module.exports = {

  'loadSchema': loadSchema,

  // For backwards compatibility
  'getSchemas': function(cb) {
    if (loaded) {
      cb(null, schemas);
    } else {
      loadAllSchemas(cb);
    }
  },


  // Direct accessors - won't work until schemas loaded,
  // so provided only for convenience

  'allSchemas': schemas,
  'schemasByVersion': schemasByVersion,

};
