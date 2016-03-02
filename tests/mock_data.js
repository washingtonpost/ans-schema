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

exports.audio = {
    'sourceUrl': chance.url({ extensions: ['mp3'] }),
    'mimetype': 'audio/mp3',
    'autoplay': chance.bool(),
    'controls': chance.bool(),
    'preload': chance.bool(),
    'loop': chance.bool()
};
