'use strict';

const Helper = require('./helper');
const schema = loadSchema('headlines');

describe('Headlines', () => {
    it('succeeds', () => {
        return validateJson(schema, MockData.headlines());
    });

    describe('Fails', () => {
        it('has no default', () => {
            let mock = MockData.headlines();
            delete mock['default'];

            return failJson(schema, mock);
        });

        it('only uses strings', () => {
            let mock = MockData.headlines();
            mock.default = chance.integer();

            return failJson(schema, mock);        
        });
    });
});
