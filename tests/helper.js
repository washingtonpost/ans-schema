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

const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

global.validate = (schema, mock) => {
    assert(ajv.validate(schema, mock) === true);
};

global.fail = (schema, mock) => {
    assert(ajv.validate(schema, mock) === false);
};