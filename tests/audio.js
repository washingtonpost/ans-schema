'use strict';

const Helper = require('./helper');
const schema = loadSchema('audio');

describe('Audio', () => {
    it('succeeds', () => {
        return validateJson(schema, MockData.audio);
    });

    it('fails', () => {
        let mock = MockData.audio;
        delete mock['sourceUrl'];

        return failJson(schema, mock);
    });
});
