'use strict';

const Helper = require('./helper');
const schema = loadSchema('author');

describe('Author', () => {
    it('succeeds', () => {
        return validateJson(schema, MockData.author());
    });

    it('fails', () => {
        let mock = MockData.author();
        mock.type = 'Not valid';

        return failJson(schema, mock);
    });
});
