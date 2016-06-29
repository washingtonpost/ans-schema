#! /usr/bin/env node

var options_parser = require('node-options');
var ans = require('./schemas');
var current_version = require('./version');
var utils = require('./util')
var _ = require('lodash');
var async = require('async');
var dir = require('node-dir');
var ncp = require('ncp').ncp;
var replaceStream = require('replacestream');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var dir = require('node-dir');

var BASE_DIR_SCHEMA = '../src/main/resources/schema/ans/';
var BASE_DIR_TESTS = '../tests/fixtures/';

// Set default options
var options = {
  'version': current_version.major + "." + current_version.minor + "." + (current_version.patch + 1)
}

//console.log(options);



// Various commands
var commands = {
  'create': function create(opts, args) {
    var older_version = null;
    var old_version = current_version.version;
    var new_version = opts.version;


    async.waterfall(
      [
        function loadSchema(callback) {
          console.log("Loading schemas...");
          ans.getSchemas(callback);
        },

        function setPreviousVersion(schemas, callback) {
          console.log(callback);
          console.log(schemas);
          console.log("Generating versions....");
          var enumerable_versions = _.filter(_.keys(ans.schemasByVersion), function(item) {
            return item.indexOf('v') === -1;
          });
          console.log(enumerable_versions);

          var older_version = enumerable_versions[enumerable_versions.length - 2];
          callback(null);
        },

        function copySchema(callback) {
          console.log("Copying schemas...");
          var source = path.join(path.dirname(module.filename), BASE_DIR_SCHEMA, old_version);
          var destination = path.join(path.dirname(module.filename), BASE_DIR_SCHEMA, new_version);

          ncp(source, destination, {
            'transform': function transform(read, write) {
              read
                .pipe(replaceStream(old_version, new_version))
                .pipe(write);
            }}, callback);
        },
        function copySchemaTests(callback) {
          if (err) {
            console.log("" + err);
          } else {
            console.log("Copying tests...");
            var source = path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'schema', old_version);
            var destination = path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'schema', new_version);

            ncp(source, destination, {
              'transform': function transform(read, write) {
                read
                  .pipe(replaceStream(old_version, new_version))
                  .pipe(write);
              }}, callback);
          }
        },
        function copyUpvertDownvertTests(callback) {
          console.log("Copying upvert/downvert tests...");

          // Upvert fixtures are a version behind
          var source = path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'transforms', older_version);
          var destination = path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'transforms', old_version);

          ncp(source, destination, {}, callback);

        },
        function transformUpvertDownvertTests(callback, err) {
          var upverter = ans.transforms.upvert;
          var write_file_ops = [];

          // Iterate over files in directory, read into closures for writing out after iteration complete
          dir.readFiles(
            path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'trasnforms', older_version),
            { 'match': /.json$/ },
            function(err, content, filename, next) {
              console.log("Upverting " + filename + " to " + old_version);
              var upverted = upverter(content, old_version);
              var writeFileOp = function writeFileOp(callback) {
                fs.writeFile(filename, upverted, callback);
              };
              fileWriteOps.push(writeFile);
            },
            function writeAllFiles(err) {
              if (err) {
                callback(err);
              }
              else {
                async.waterfall(write_file_ops,callback);
              }
            }
          );
        },
        function incrementVersionAndStub(callback) {
          callback(null);
        }
      ],
      function error(err, result) {
        if (err) {
          console.error("Error: " + err);
        }
      }
    );
  },

  'cleanup': function cleanup(opts, args) {
    async.waterfall(
      [
        function deleteSchema(callback) {
          var schema_path = path.join(path.dirname(module.filename), BASE_DIR_SCHEMA, opts.version);
          rimraf(schema_path, {}, callback);
        },
        function deleteSchemaTests(callback) {
          var tests_path = path.join(path.dirname(module.filename), BASE_DIR_TESTS, "schema", opts.version);
          rimraf(tests_path, {}, callback);
        }
      ],
      function error(err, result) {
        if (err) {
          console.error("Error: " + err);
        }
      }
    );
  }
};



// Parse command line
var result = options_parser.parse(process.argv.slice(2), options);
var args = result.args;

if (result.errors || !_.includes(_.keys(commands), result.args[0])) {
  console.error("USAGE: ans [--version=0.x.x] <command>\n\nwhere <command> is one of:\n   " + _.reduce(_.keys(commands), function(x, str) { return x + ", " + str; }));
  process.exit(-1);
}

// Invoke command

ans.getSchemas(function(schemas) {
  // Wait until schemas are loaded
  commands[result.args[0]](options, args);
});
