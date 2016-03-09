'use strict';

const Chance = require('chance');
global.chance = new Chance();

const moment = require('moment');

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

// Add tags
exports.taxonomy = () => {
    let keywords = [];
    for (let i=0; i < chance.integer({ min: 2, max: 5 }); i++) {
        keywords.push(exports.keyword());
    }

    return { 'keywords': keywords };
};

exports.headlines = () => {
    let obj = {
        'default': chance.sentence()
    };

    for (let i=0; i < chance.integer({ min: 2, max: 5 }); i++) {
        obj[chance.word({ syllables: 3 })] = chance.sentence();
    }

    return obj;
};

exports.credit = () => {
    let credit = chance.pickOne([ exports.storyElements.reference(), exports.author() ]);
    let role = chance.word();

    return {
        role: role,
        credit: credit
    };
};

exports.storyElements = {
    reference: () => {
        return {
            'editable': true,
            'type': 'reference',
            'referent': {
                'type': 'author',
                'service': chance.url(),
                'id': chance.guid(),
                'provider': chance.url()
            }
        };
    }
};

exports.story = () => {
    let date = moment().utc();
    let format = 'YYYY-MM-dd[T]HH:mm:ss.SS[Z]';

    let obj = {
        '_id': chance.guid(),
        'type': 'story',
        'version': '0.5',
        'created_date': date.format(format),
        'last_updated_date': date.format(format),
        'credits': [],
        'language': 'en',
        'location': chance.city(),
        'geo': exports.geo(),
        'address': exports.address(),
        'copyright': `${date.year()} ${chance.company()}`
    };

    for (let i=0; i < chance.integer({ min: 0, max: 3 }); i++) {
        obj.credits.push(exports.credit());
    }

    return obj;
}
