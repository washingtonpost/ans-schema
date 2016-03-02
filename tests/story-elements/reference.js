'use strict';

const Helper = require('../helper');
const schema = loadSchema('story-elements/reference');

describe('Reference', () => {
    it('succeeds', () => {
        return validateJson(schema, MockData.storyElements.reference());
    });

    it('fails', () => {
        let mock = MockData.storyElements.reference();
        delete mock['editable'];

        return failJson(schema, mock);
    });
});
