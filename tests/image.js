'use strict';

const Helper = require('./helper');
const schema = loadSchema('image');

describe('Image', () => {
    it('succeeds', () => {
        return validateJson(schema, MockData.image);
    });

/* 
    Currently there are no required fields on images due to the need to create image object in Arc before having the URL available. 
    To resolve this issue we are considering adding states to schemas so you would have a single `image` schema and then add'l
    schemas such as `image-saved`, `image-published`, etc which would have those required fields and that the consuming APIs
    would use.

    it('fails', () => {
        let mock = MockData.image;
        delete mock['url'];

        return failJson(schema, mock);
    });
*/
});
