'use strict';

const Helper = require('./helper');
const schema = loadSchema('trait-taxonomy');

describe('Taxonomy', () => {
    it('succeeds', () => {
        return validateJson(schema, MockData.taxonomy());
    });
});
