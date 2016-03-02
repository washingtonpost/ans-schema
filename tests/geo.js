'use strict';

const Helper = require('./helper');
const schema = loadSchema('geo');

describe('Geo', () => {
    it('succeeds', () => {
        return validateJson(schema, MockData.geo());
    });

    it('fails', () => {
        return failJson(schema, { 'longitude': 'should be a number' });
    });
});
