'use strict';

const Helper = require('./helper');
const schema = loadSchema('social');

describe('Social', () => {
    it('succeeds', () => {
        return validateJson(schema, MockData.social);
    });
});
