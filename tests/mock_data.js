'use strict';

const Chance = require('chance');
const chance = new Chance();

exports.address = {
    'street-address': chance.address(),
    'extended-address': `Suite ${chance.integer({ min: 100, max: 500 })}`,
    'locality': `${chance.city()}, ${chance.state()}`,
    'postal-code': chance.zip(),
    'country-name': chance.country()    
};
