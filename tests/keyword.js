'use strict';

const Helper = require('./helper');
const schema = loadSchema('keyword');

describe('Keyword', () => {
    it('succeeds', () => {
        return validateJson(schema, MockData.keyword());
    });

    it('fails', () => {
        let mock = MockData.keyword();
        mock.frequency = chance.floating();

        return failJson(schema, mock);
    });
});
