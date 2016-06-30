#! /usr/bin/env node

var options_parser = require('node-options');
var ans = require('./schemas');
var version = require('./version');
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
  'version': version.major + "." + version.minor + "." + (version.patch + 1)
}

//console.log(options);

var current_version = version.version;
var prev_version = version.prev_version(current_version);


// Various commands
var commands = {
  'create': function create(opts, args) {
    var older_version = null;
    var old_version = version.version;
    var new_version = opts.version;


    async.waterfall(
      [
        function copySchema(callback) {
          console.log("Copying schemas...");
          var source = path.join(path.dirname(module.filename), BASE_DIR_SCHEMA, current_version);
          var destination = path.join(path.dirname(module.filename), BASE_DIR_SCHEMA, new_version);

          ncp(source, destination, {
            'transform': function transform(read, write) {
              read
                .pipe(replaceStream(current_version, new_version))
                .pipe(write);
            }}, callback);
        },
        function copySchemaTests(callback) {
          console.log("Copying tests...");
          var source = path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'schema', current_version);
          var destination = path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'schema', new_version);

          ncp(source, destination, {
            'transform': function transform(read, write) {
              read
                .pipe(replaceStream(current_version, new_version))
                .pipe(write);
            }}, callback);

        },
        function copyUpvertDownvertTests(callback) {
          console.log("Copying upvert/downvert tests...");

          // Upvert fixtures are a version behind
          var source = path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'transforms', prev_version);
          var destination = path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'transforms', current_version);

          ncp(source, destination, {}, callback);

        },
        function transformUpvertDownvertTests(callback) {
          var upverter = ans.transforms.upvert;
          var write_file_ops = [];

          // Iterate over files in directory,
          // read into closures for writing out after iteration complete
          dir.readFiles(
            path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'transforms', current_version),
            { 'match': /.json$/ },
            function(err, content, filename, next) {
              console.log("Upverting " + filename + " to " + current_version);

              var upverted = upverter(JSON.parse(content), current_version);

              var writeFileOp = function writeFileOp(callback) {
                //console.log("Writing "+ filename);
                fs.writeFile(filename, JSON.stringify(upverted, null, 2), callback);
              };
              write_file_ops.push(writeFileOp);
              next();
            },
            function writeAllFiles(err, files) {
              if (err !== null) {
                callback(err);
              }
              else {
                console.log("Writing upverted fixtures");
                async.waterfall(write_file_ops,callback);
              }
            }
          );
        },
        function appendVersion(callback) {
          console.log("Writing version history");
          var history = version.history;

          // Set upverter to true for current_version
          var last_item = history.pop();
          last_item.upverter = true;
          history.push(last_item);

          // Insert new version
          history.push({
            "name": new_version,
            "schema": true,
            "upverter": false,
            "downverter": false
          });
          var output = JSON.stringify(history, null, 2);
          fs.writeFile(path.join(path.dirname(module.filename), 'versions.json'), output, callback);
        }
      ],
      function error(err, result) {
        if (err !== null) {
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
          console.log("Deleting " + schema_path + " ...");
          rimraf(schema_path, {}, callback);
        },

        function deleteSchemaTests(callback) {
          var tests_path = path.join(path.dirname(module.filename), BASE_DIR_TESTS, "schema", opts.version);
          console.log("Deleting " + tests_path + " ...");
          rimraf(tests_path, {}, callback);
        },

        function deleteTransformTests(callback) {
          var tests_path = path.join(path.dirname(module.filename), BASE_DIR_TESTS, "transforms", current_version);
          console.log("Deleting " + tests_path + "...");
          rimraf(tests_path, {}, callback);
        },

        function removeVersion(callback) {
          console.log("Removing " + options.version + " from version history...");
          var history = version.history;
          var removed = false;
          _.forEach(history, function(item, index) {
            if (item.name === options.version) {
              history.splice(index, 1);
              removed = true;
              return false;
            }
          });

          if (removed === false) {
            callback("Could not find version " + options.version + " in version history.");
            return;
          }

          var output = JSON.stringify(history, null, 2);
          fs.writeFile(path.join(path.dirname(module.filename), 'versions.json'),
                       output, callback);
        }

      ],
      function error(err, result) {
        if (err !== null) {
          console.error("ERROR: " + err);
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