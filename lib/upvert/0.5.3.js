'use strict';

var _ = require('lodash');
var current_version = require('../version');
var transform_utils = require('../transform_utils');

var version_incrementer = transform_utils.version_incrementer;
var top_level_types = transform_utils.top_level_types;
var accumulatorFor = transform_utils.accumulatorFor;

var upvert = function(input) {
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

    if (_.has(planning, "scheduling.additional_properties")) {
      delete planning.scheduling.additional_properties;
    }
    if (_.has(planning, "story_length.additional_properties")) {
      delete planning.story_length.additional_properties;
    }

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

    // Delete empty additional_properties.scheduling & .story_length objects if present
    if (_.has(additional_properties, "scheduling") &&
        _.isObject(additional_properties.scheduling) &&
        _.size(additional_properties.scheduling) === 0) {
      delete additional_properties.scheduling;
    }

    if (_.has(additional_properties, "story_length") &&
        _.isObject(additional_properties.story_length) &&
        _.size(additional_properties.story_length) === 0) {
      delete additional_properties.story_length;
    }


    if (_.size(additional_properties) > 0) {
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

};

module.exports = upvert;
