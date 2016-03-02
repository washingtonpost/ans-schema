'use strict';

const Helper = require('./helper');
const schema = loadSchema('audio');

describe('Audio', () => {
    it('succeeds', () => {
        validate(schema, MockData.audio);
    });

    it('fails', () => {
        let mock = MockData.audio;
        delete mock['sourceUrl'];

        fail(schema, mock);
    });
});
