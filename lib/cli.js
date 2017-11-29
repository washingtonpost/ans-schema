#! /usr/bin/env node

var options_parser = require('node-options');
var ans = require('./schemas');
var version = require('./version');
var validator = require('./validator');
var transforms = require('./transforms');

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
var BASE_DIR_UPVERTERS = '../lib/upvert/';

// Set default options
var options = {
  'version': null,
  'ansdata': null,
  'ansfile': null
}

//console.log(options);



// Various commands
var commands = {
  'create': function create(opts, args) {
    var current_version = version.version;
    var prev_version = version.prev_version(current_version);

    var new_version = opts.version == null ?
        version.major + "." + version.minor + "." + (version.patch + 1) : opts.version;


    console.log("Current version: " + current_version);
    console.log("Creating version: " + new_version);

    async.waterfall(
      [
        function copySchema(callback) {
          var source = path.join(path.dirname(module.filename), BASE_DIR_SCHEMA, current_version);
          var destination = path.join(path.dirname(module.filename), BASE_DIR_SCHEMA, new_version);
          console.log("Copying schemas to " + destination + "...");

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
          var upverter = transforms.upvert;
          var write_file_ops = [];

          // Iterate over files in directory,
          // read into closures for writing out after iteration complete
          dir.readFiles(
            path.join(path.dirname(module.filename), BASE_DIR_TESTS, 'transforms', current_version),
            { 'match': /.json$/ },
            function(err, content, filename, next) {
              console.log("Upverting " + filename + " to " + current_version);

              var contentObj = JSON.parse(content);
              if (contentObj && contentObj.version) {
                var upverted = upverter(contentObj, current_version);

                var writeFileOp = function writeFileOp(callback) {
                  //console.log("Writing "+ filename);
                  fs.writeFile(filename, JSON.stringify(upverted, null, 2), callback);
                };
                write_file_ops.push(writeFileOp);
              }
              else {
                console.log("!!!!!! Could not upvert " + filename);
              }
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

        function addUpverter(callback) {
          console.log("Creating upverter stub...");
          var source = path.join(path.dirname(module.filename), BASE_DIR_UPVERTERS, 'template.js');
          var destination = path.join(path.dirname(module.filename), BASE_DIR_UPVERTERS, current_version + '.js');
          ncp(source, destination, {
            'transform': function transform(read, write) {
              read
                .pipe(replaceStream("NEXT_VERSION", new_version))
                .pipe(write);
            }}, callback);
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
    var current_version = opts.version === null ? version.version : opts.version;
    console.log("Current version: " + current_version);
    var prev_version = version.prev_version(current_version);
    console.log("Previous version: " + prev_version);

    if (current_version === null || prev_version === null) {
      console.error("ERROR: Could not determine current and previous version.");
      process.exit(-1);
    }

    async.waterfall(
      [
        function deleteSchema(callback) {
          var schema_path = path.join(path.dirname(module.filename), BASE_DIR_SCHEMA, current_version);
          console.log("Deleting " + schema_path + " ...");
          rimraf(schema_path, {}, callback);
        },

        function deleteSchemaTests(callback) {
          var tests_path = path.join(path.dirname(module.filename), BASE_DIR_TESTS, "schema", current_version);
          console.log("Deleting " + tests_path + " ...");
          rimraf(tests_path, {}, callback);
        },

        function deleteTransformTests(callback) {
          var tests_path = path.join(path.dirname(module.filename), BASE_DIR_TESTS, "transforms", prev_version);
          console.log("Deleting " + tests_path + "...");
          rimraf(tests_path, {}, callback);
        },

        function deleteUpverter(callback) {
          var upverter_path = path.join(path.dirname(module.filename), BASE_DIR_UPVERTERS, prev_version + '.js');
          console.log("Deleting " + upverter_path + "...");
          rimraf(upverter_path, {}, callback);
        },

        function removeVersion(callback) {
          console.log("Removing " + current_version + " from version history...");
          var history = version.history;
          var removed = false;
          _.forEach(history, function(item, index) {
            if (item.name === prev_version) {
              history[index].upverter = false;
            }
            if (item.name === current_version) {
              history.splice(index, 1);
              removed = true;
              return false;
            }
          });

          if (removed === false) {
            callback("Could not find version " + current_version + " in version history.");
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
  },


  'validate': function validate(opts, args) {
    var current_version = opts.version === null ? version.version : opts.version;
    //console.log("ANS version: " + current_version);

    if (current_version === null) {
      console.error("ERROR: Could not determine against which ANS version to validate.");
      process.exit(-1);
    }

    if (_.isNil(opts.ansfile) && _.isNil(opts.ansdata)) {
      console.error("ERROR: Either --ansfile or --ansdata is required for the validate command.");
      process.exit(-1);
    }

    var validateData = function(version, data) {
      validator.getValidatorForVersion(version, function(err, ansValidator) {
        if (err) {
          console.error(err);
          process.exit(-1);
        }
        var errors = ansValidator.getAllContentErrors(data, version, "");
        console.log(JSON.stringify(errors, null, 2));
        process.exit(0);
      });
    };

    if (!_.isNil(opts.ansfile)) {
      fs.readFile(opts.ansfile, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(-1);
        }
        else {
          validateData(current_version, JSON.parse(data));
        }
      });
    }
    else {
      validateData(current_version, JSON.parse(opts.ansdata));
    }

  },


  'upvert': function upvert(opts, args) {
    var current_version = opts.version === null ? version.version : opts.version;
    //console.log("ANS version: " + current_version);

    if (current_version === null) {
      console.error("ERROR: Could not determine to which ANS version to upvert.");
      process.exit(-1);
    }

    if (_.isNil(opts.ansfile) && _.isNil(opts.ansdata)) {
      console.error("ERROR: Either --ansfile or --ansdata is required for the upvert command.");
      process.exit(-1);
    }

    var upvertData = function(version, data) {
      var result = transforms.upvert(data, version, true)
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    };


    if (!_.isNil(opts.ansfile)) {
      fs.readFile(opts.ansfile, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(-1);
        }
        else {
          upvertData(current_version, JSON.parse(data));
        }
      });
    }
    else {
      upvertData(current_version, JSON.parse(opts.ansdata));
    }

  },

  'sync': function sync(opts, args) {
    if (_.isNil(opts.ansfile) && _.isNil(opts.ansdata)) {
      console.error("ERROR: Either --ansfile or --ansdata is required for the upvert command.");
      process.exit(-1);
    }

    var syncData = function(data) {
      //console.log("ANS Version: " + data.version);

      var result = transforms.sync(data);
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    };


    if (!_.isNil(opts.ansfile)) {
      fs.readFile(opts.ansfile, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(-1);
        }
        else {
          syncData(JSON.parse(data));
        }
      });
    }
    else {
      syncData(JSON.parse(opts.ansdata));
    }

  }

};



// Parse command line
var result = options_parser.parse(process.argv.slice(2), options);
var args = result.args;

if (result.errors || !_.includes(_.keys(commands), result.args[0])) {
console.error("USAGE: ans [--version=0.x.x] [--ansfile=filename.json] [--ansdata=\'{..}\'] <command>\n\nwhere <command> is one of:\n   " +
                _.reduce(_.keys(commands), function(x, str) { return x + ", " + str; }));
  process.exit(-1);
}

// Invoke command

ans.getSchemas(function(schemas) {
  // Wait until schemas are loaded
  commands[result.args[0]](options, args);
});
