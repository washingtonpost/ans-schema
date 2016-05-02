'use strict';

var _ = require('lodash');
var current_version = require('./version');
var util = require('./util');

var top_level_types = ["story", "video", "image", "gallery"];

// Given a version number, generates a function that sets input.version to that version number
var version_incrementer = function(new_version) {
  return function version(input) {

    var doVersion = function doVersion(ans) {
      // Recur through the object tree, looking for version
      _.forIn(ans, function(value, key) {
        if (_.isObject(value)) {
          ans[key] = version(value);
        }
        if (_.isArray(value)) {
          _.forEach(value, function(element, index) {
            if (_.isObject(element)) {
              ans[key][index] = version(element);
            }
          });
        }
      });

      if (_.has(ans, 'version') ||
          _.indexOf(top_level_types, _.get(ans, 'type')) > -1) {
        return _.set(ans, 'version', new_version);
      }
      else {
        return ans;
      }
    };

    var output = _.cloneDeep(input);
    return doVersion(output);
  };
};

// Helper
var accumulatorFor = function(object) {
  if (_.isArray(object)) {
    return [];
  }
  return {};
}


var versions = {
  "0.4": {
    // Convert 0.4.5 to 0.4.6
    '0.4.5': function(input) {
      var output = _.cloneDeep(input);
      output.version = '0.4.6';

      var addCredits = function addCredits(ans) {
        // Recur through the object tree, looking for credits
        _.forIn(ans, function(value, key) {
          if (_.isObject(value)) {
            addCredits(value);
          }
          else if (_.isArray(value)) {
            _.forEach(value, function(element, index) {
              if (_.isObject(element)) {
                addCredits(element);
              }
            });
          }
        });

        if (_.has(ans, "type") &&
            _.indexOf(top_level_types, ans.type) > -1 &&
            _.has(ans, "credits")) {

          ans.credits = _.reduce(ans.credits, function(result, value) {

            var role = value.role;
            if (!_.has(result, role)) {
              result[role] = [];
            }

            result[role].push(value.credit);
            return result;
          }, {});
        }

      };

      addCredits(output);

      return output;
    },

    // If there no breaking changes between versions,
    // use the version incrementer
    '0.4.6': version_incrementer('0.4.7')
  },
  "0.5": {
    "0.5.0": function (input) {
      var output = version_incrementer("0.5.1")(input);

      var convert = function convert(ans) {

        if (!_.isObject(ans)) {
          return ans;
        }
        var result = _.transform(ans, function(result, value, key, object) {
          if (key === "additional_properties") {
            result[key] = value;
          }
          else if (key === "additonal_properties" &&
              _.has(object, "type") &&
              [ "text", "header" ].indexOf(object.type) > -1) {
            result["additional_properties"] = value;
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
      };

      return convert(output);
    },

    "0.5.1": version_incrementer("0.5.2"),

    "0.5.2": function(input) {
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
    },


    "0.5.3": function(input) {
      var output = version_incrementer("0.5.4")(input);

      if (_.has(output, "planning")) {
        var planning = output.planning;

        // 0.5.3 and earlier incorrectly put properties on a sub-planning object
        if (_.has(planning, "planning")) {
          var inner_planning = planning.planning;
          delete planning.planning;
          _.merge(planning, inner_planning, planning);
        }

        var scheduling_additional_props = {};
        var story_length_additional_props = {};

        if (_.has(planning, "scheduling")) {
          var scheduling = planning.scheduling;
          // Copy *published_date to *publish_date if latter not present
          if (_.has(scheduling, "scheduled_published_date") &&
              !_.has(scheduling, "scheduled_publish_date")) {
            scheduling.scheduled_publish_date = scheduling.scheduled_published_date;
          }

          if (_.has(scheduling, "scheduled_published_date") &&
              !_.has(scheduling, "scheduled_publish_date")) {
            scheduling.scheduled_publish_date = scheduling.scheduled_published_date;
          }

          var valid_keys = [ "planned_publish_date", "scheduled_publish_date",
                             "will_have_gallery", "will_have_graphic",
                             "will_have_image", "will_have_video" ];

          planning.scheduling = _.transform(scheduling, function(result, value, key, object) {
            if (_.indexOf(valid_keys, key) > -1) {
              result[key] = value;
            }
            else {
              result['additional_properties'][key] = value;
            }
          }, { "additional_properties": {} });
          scheduling_additional_props = planning.scheduling.additional_properties;
        }

        // Story length section is unchanged, but move extraneous field to additional_properties
        if (_.has(planning, "story_length")) {
          var valid_keys = [ "word_count_planned", "word_count_actual", "inch_count_planned", "inch_count_actual" ];

          planning.story_length = _.transform(planning.story_length, function(result, value, key, object) {
            if (_.indexOf(valid_keys, key) > -1) {
              result[key] = value;
            }
            else {
              result['additional_properties'][key] = value;
            }
          }, { "additional_properties": {} });
          story_length_additional_props = planning.story_length.additional_properties;
        }

        var additional_properties = {};
        _.merge(additional_properties, {
          "scheduling": scheduling_additional_props,
          "story_length": story_length_additional_props,
          "additional_properties": planning.additional_properties
        });

        delete planning.scheduling.additional_properties;
        delete planning.story_length.additional_properties;

        additional_properties = _.transform(planning, function(result, value, key, object) {
          if (_.indexOf([ "scheduling", "story_length", "additional_properties" ], key) < 0) {
            result[key] = value;
          }
        }, additional_properties);

        planning = _.transform(planning, function(result, value, key, object) {
          if (_.indexOf(["scheduling", "story_length"], key) > -1) {
            result[key] = value;
          }
        }, {});


        if (_.keys(additional_properties).length > 0) {
          planning.additional_properties = additional_properties;
        }

        output.planning = planning;
      }


      // Convert references
      var convertRef = function convertRef(ans) {

        if (!_.isObject(ans)) {
          return ans;
        }
        else if (_.isArray(ans)) {
          return _.map(ans, convertRef);
        }
        else if (_.isObject(ans)) {
          if (_.has(ans, "type") && ans.type === "reference") {
            var reference = _.transform(ans, function(result, value, key, object) {
              if (_.indexOf([ "type", "referent"], key) > -1) {
                result[key] = value;
              }
              else {
                result['additional_properties'][key] = value;
              }
            }, { "additional_properties": {} });

            var inner_props = _.transform(reference.referent, function(result, value, key, object) {
              if (_.indexOf(["type", "service", "id", "provider"], key) === -1) {
                result[key] = value;
              }
            }, {});

            reference.referent = _.transform(reference.referent, function(result, value, key, object) {
              if (_.indexOf(["type", "service", "id", "provider"], key) > -1) {
                result[key] = value;
              }
            }, {});

            _.merge(reference.additional_properties, inner_props, reference.additional_properties);

            if (_.keys(reference.additional_properties).length === 0) {
              delete reference.additional_properties;
            }

            return reference;
          }
          else {
            return _.transform(ans, function(result, value, key, object) {
              if (key === "additional_properties") {
                result[key] = value;
              }
              else {
                result[key] = convertRef(value);
              }
            }, {});
          }
        }

        return ans;
      };

      return convertRef(output);
    },

    "0.5.4": version_incrementer("0.5.5")
       

  }
};



var upvert = function upvert(ans, version_to) {
  if (_.isNil(version_to)) {
    version_to = current_version;
  }
  else if (typeof version_to === "string") {
    version_to = util.get_version(version_to);
  }

  var doUpvert = function doUpvert(ans, version_to) {
    if (ans instanceof Error) {
      return ans;
    }

    var version_from = util.get_version(ans.version);
    var minor_version = version_from.major + "." + version_from.minor;

    // Don't upvert across minor or major version changes for now
    if (version_from.major !== version_to.major ||
        version_from.minor !== version_to.minor) {
      throw new Error("Upverting from " + version_from.version + " to " +
                       version_to.version + " is not supported at this time");
    }

    // Stop recursion
    //console.log(version_from.version);
    //console.log(version_to.version);
    if (version_from.version === version_to.version) {
      return ans;
    }

    if (_.has(versions[minor_version], version_from.version)) {
      var transformer = versions[minor_version][version_from.version]
      return doUpvert(transformer(ans), version_to);
    }
    else {
      throw new Error("Unsupported version of ANS: " + version_from.version);
    };
  };

  return doUpvert(ans, version_to);
};


module.exports = { 'versions': versions, 'upvert': upvert };
