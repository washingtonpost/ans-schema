'use strict';

var _ = require('lodash');
var current_version = require('../version');
var transform_utils = require('../transform_utils');

var version_incrementer = transform_utils.version_incrementer;
var top_level_types = transform_utils.top_level_types;
var accumulatorFor = transform_utils.accumulatorFor;

var upvert = function(input) {
  var output = version_incrementer("0.5.3")(input);

  var convert = function convert(ans) {
    if (!_.isObject(ans)) {
      return ans;
    }
    var result = _.transform(ans, function(result, value, key, object) {
      if (key === "additional_properties") {
        result[key] = value;
      }
      else if (key === "promo_items") {
        if (_.keys(value).length === 0) {
          // Omit this from result
        }
        else {
          // Recur down the tree
          var promo_items = convert(value);

          if (!_.has(promo_items, 'basic')) {
            // Copy the first available promo_item into the 'basic' slot
            var first_key = _.keys(promo_items)[0];
            promo_items['basic'] = promo_items[first_key];
          }

          result[key] = promo_items;
        }
      }
      else if (key === "taxonomy") {

        var convertSection = function(section) {

          // Since we're migrating from an open to a closed schema, the new
          // object will almost certainly need an additional_properties object
          // Since this might already exist, let's preserve it if so and only
          // overwrite individual keys on an as-needed basis.
          var additional_properties = {};
          if (_.has(section, 'additional_properties')) {
            additional_properties = section.additional_properties;
          }
          var site = _.transform(section, function(section_result, section_value, section_key, section_object) {
            var keep_keys = ["_id", "version", "name", "description", "path"];
            if (keep_keys.indexOf(section_key) > -1) {
              section_result[section_key] = section_value;
            }
            else if (section_key === "parent") {
              section_result['parent_id'] = section_value;
            }
            else {
              section_result['additional_properties'][section_key] = section_value;
            }
          }, { "additional_properties": additional_properties });
          site['type'] = 'site';
          site['version'] = '0.5.3';

          if (!_.has(site, '_id')) {
            site['_id'] = site['path'];
          }

          // 'Name' is a required field - if found, use it, if not, make some guesses
          if (!_.has(site, 'name')) {
            if (_.has(section, 'title')) {
              site['name'] = section['title'];
            }
            else if (_.has(result, '_id')) {
              site['name'] = section['_id'];
            }
            else {
              site['name'] = '(unnamed)';
            }
          }

          return site;
        };

        var convertTag = function(tag) {
          return {
            "_id": tag,
            "text": tag
          };
        }

        var taxonomy = value;
        if (_.has(value, 'sections')) {
          taxonomy['sites'] = _.map(value['sections'], convertSection);
        }
        delete taxonomy['sections'];

        if (_.has(value, 'keywords')) {
          taxonomy['keywords'] = value['keywords'];
        }

        if (_.has(value, 'seo_keywords')) {
          taxonomy['seo_keywords'] = value['seo_keywords'];
        }

        if (_.has(value, 'tags')) {
          taxonomy['tags'] = _.map(value['tags'], convertTag);
        }

        result['taxonomy'] = taxonomy;
      }
      else if (_.isArray(value)) {

        var items = _.map(value, convert);
        result[key] = items;
      }
      else if (_.isObject(value)) {
        result[key] = convert(value);
      }
      else {
        result[key] = value;
      }
    }, accumulatorFor(ans));

    return result;
  }

  return convert(output);


};

module.exports = upvert;
