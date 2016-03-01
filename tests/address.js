'use strict';

const Helper = require('./helper');
const schema = loadSchema('address');

describe('Address', () => {
    it('succeeds', () => {
        validate(schema, MockData.address);
    });

    it('fails', () => {
        let mock = MockData.address;
        delete mock['street-address'];
        delete mock['extended-address'];
        mock['post-office-box'] = 'defining this requires also defining street address, which we don\'t, so this should be bad JSON';

        fail(schema, mock);
    });
});
