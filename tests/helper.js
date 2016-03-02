'use strict';

const assert = require('assert');
const fs = require('fs');

global.MockData = require(`${__dirname}/mock_data`);

global.loadSchema = (schemaName, version) => {
    if (version === undefined) {
        version = 'v0_4';
    }

    let contents = fs.readFileSync(`${__dirname}/../src/main/resources/schema/ans/${version}/${schemaName}.json`);

    return JSON.parse(contents);
};

let cache = new Map();
cache.put = cache.set;
cache.del = cache.delete;

const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, cache: cache });

let loaded = false;
let loadSchemas = () => {
    if (loaded) {
        return Promise.resolve();
    }

    let execFile = require('child_process').execFile;
    let dirPath = `${__dirname}/../src/main/resources/schema/ans/v0_4`;

    return new Promise((resolve) => {
        execFile('find', [dirPath, '-name', '\*.json'], function(err, stdout, stderr) {
          let files = stdout.split('\n');

          for (let file of files) {
              if (file.length > 0) {
                  let content = fs.readFileSync(file, 'utf8');
                  ajv.addSchema(JSON.parse(content));
              }
          }

          loaded = true;
          resolve();
        });
    });
};

global.validateJson = (schema, mock) => {
    return loadSchemas()
    .then(() => {
        assert(ajv.validate(schema, mock) === true);
    });
};

global.failJson = (schema, mock) => {
    return loadSchemas()
    .then(() => {
        assert(ajv.validate(schema, mock) === false);
    });
};
