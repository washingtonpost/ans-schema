'use strict';

var _ = require('lodash');
var current_version = require('../version');
var transform_utils = require('../transform_utils');

var version_incrementer = transform_utils.version_incrementer;
var top_level_types = transform_utils.top_level_types;
var accumulatorFor = transform_utils.accumulatorFor;

var convertAuthor = function convertAuthor(author) {
  var newAuthor = _.cloneDeep(author);

  // Promote string fields from additional properties if missing
  var new_string_fields = [ 'first_name', 'last_name', 'middle_name', 'suffix', 'location', 'division', 'email',
                            'role', 'expertise', 'affiliation', 'languages', 'long_bio', 'byline' ];

  _.forEach(new_string_fields, function(fieldName) {
    if (_.has(newAuthor, fieldName) === false &&
        _.has(author, 'additional_properties.' + fieldName) &&
        _.isString(_.get(author, 'additional_properties.' + fieldName))) {
      newAuthor[fieldName] = _.get(author, 'additional_properties.' + fieldName);
    }
  });

  // Promote books from additional_properties
  if (_.has(newAuthor, 'books') === false && (_.has(author, 'additional_properties.books'))) {
    var newBooks = [];
    var books = _.get(author, 'additional_properties.books');
    if (_.isArray(books)) {
      _.forEach(books, function(book) {
        var newBook = {};

        if (_.isString(_.get(book, 'book_title'))) {
          newBook.book_title = _.get(book, 'book_title');
        }
        if (_.isString(_.get(book, 'book_url'))) {
          newBook.book_url = _.get(book, 'book_url');
        }

        if (_.has(newBook, 'book_title')) {
          newBooks.push(newBook);
        }
      });
      if (newBooks.length > 0) {
        newAuthor.books = newBooks;
      }
    }
  }

  // Promote education from additional_properties
  if (_.has(newAuthor, 'education') === false && (_.has(author, 'additional_properties.education'))) {
    var newSchools = [];
    var schools = _.get(author, 'additional_properties.education');
    if (_.isArray(schools)) {
      _.forEach(schools, function(school) {
        var newSchool = {};

        if (_.isString(_.get(school, 'school_name'))) {
          newSchool.school_name = _.get(school, 'school_name');
          newSchools.push(newSchool);
        }
      });
      if (newSchools.length > 0) {
        newAuthor.education = newSchools;
      }
    }
  }

  // Promote awards from additional_properties
  if (_.has(newAuthor, 'awards') === false && (_.has(author, 'additional_properties.awards'))) {
    var newAwards = [];
    var awards = _.get(author, 'additional_properties.awards');
    if (_.isArray(awards)) {
      _.forEach(awards, function(award) {
        var newAward = {};

        if (_.isString(_.get(award, 'award_name'))) {
          newAward.award_name = _.get(award, 'award_name');
          newAwards.push(newAward);
        }
      });
      if (newAwards.length > 0) {
        newAuthor.awards = newAwards;
      }
    }
  }

  // If socialLinks exists, but social_links does not, use it
  if ((_.has(newAuthor, 'social_links') == false) && _.has(newAuthor, 'socialLinks')) {
    newAuthor.social_links = newAuthor.socialLinks;
  }

  // Guarantee byline field
  if (_.has(newAuthor, 'byline') == false) {
    if (_.has(author, 'name')) {
      newAuthor.byline = _.get(author, 'name');
    }
    else {
      newAuthor.byline = '';
    }
  }



  newAuthor.version = '0.5.9';

  var valid_author_properties = [
    '_id', 'type', 'version', 'name', 'image', 'url', 'social_links', 'slug', 'first_name',
    'middle_name', 'last_name', 'suffix', 'byline', 'location', 'division', 'email',
    'role', 'expertise', 'affiliation', 'languages', 'bio', 'long_bio',
    'books', 'education', 'contributor', 'org', 'socialLinks', 'additional_properties' ];

  return _.pick(newAuthor, valid_author_properties);
};

// Generic recur-and-convert down object tree
var convert = function convert(ans) {
  if (!_.isObject(ans)) {
    return ans;
  }

  if (_.isArray(ans)) {
    return _.map(ans, convert);
  }

  if (_.has(ans, 'type')) {
    if (ans.type === 'author') {
      return convertAuthor(ans);
    }
  }

  return _.transform(ans, function(result, value, key, object) {
    if (key === 'additional_properties' || key === 'referent_properties' || key === 'referent') {
      result[key] = value;
    }
    else {
      result[key] = convert(value);
    }
  }, accumulatorFor(ans));
};


var upvert = function(input) {
  var output = version_incrementer("0.5.9")(input);

  return convert(output);
};

module.exports = upvert;
