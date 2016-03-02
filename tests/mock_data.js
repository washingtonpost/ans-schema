'use strict';

const Chance = require('chance');
global.chance = new Chance();

exports.address = () => {
    return {
        'street-address': chance.address(),
        'extended-address': `Suite ${chance.integer({ min: 100, max: 500 })}`,
        'locality': `${chance.city()}, ${chance.state()}`,
        'postal-code': chance.zip(),
        'country-name': chance.country()
    };
};

exports.audio = () => {
    return {
        'type': 'audio',
        'sourceUrl': chance.url({ extensions: ['mp3'] }),
        'mimetype': 'audio/mp3',
        'autoplay': chance.bool(),
        'controls': chance.bool(),
        'preload': chance.bool(),
        'loop': chance.bool()
    };
};

exports.geo = () => {
    return {
        'latitude': chance.latitude(),
        'longitude': chance.longitude()
    };
};

exports.social = () => {
    let site = chance.word({ syllables: 3 });

    return {
        'site': chance.capitalize(site),
        'url': `http://${site}.${chance.tld()}/${chance.word()}`
    };
};

exports.image = () => {
    return {
        'type': 'image',
        'subtitle': chance.paragraph(),
        'caption': chance.paragraph(),
        'url': chance.url({ extensions: ['jpg', 'png'] }),
        'width': chance.integer({ min: 500, max: 2000 }),
        'height': chance.integer({ min: 500, max: 2000 })
    };
};

exports.author = () => {
    let links = [];
    for (let i=0; i < chance.integer({ min: 2, max: 4 }); i++) {
        links.push(exports.social());
    }

    return {
        'type': 'author',
        'name': chance.name(),
        'org': chance.sentence({ words: 3 }),
        'image': exports.image(),
        'description': chance.paragraph(),
        'url': chance.url(),
        'social_links': links
    };
};

exports.keyword = () => {
    return {
        'keyword': chance.word(),
        'score': chance.floating({ min: 0, max: 1 }),
        'frequency': chance.integer({ min: 1, max: 20 })
    };
};
