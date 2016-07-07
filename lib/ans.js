'use strict';

var schemas = require('./schemas'),
    version = require('./version'),
    transforms = require('./transforms'),
    validator = require('./validator');


module.exports = {
  'version': version,

  'getSchemas': schemas.getSchemas,
  'getSchemaForVersion': schemas.loadSchema,
  'schemas': schemas.allSchemas,
  'schemasByVersion': schemas.schemasByVersion,

  'getTransforms': function(cb) {
    cb(null, transforms);
  },
  'transforms': transforms,

  'AnsValidator': validator.AnsValidator,
  'getValidatorForVersion': validator.getValidatorForVersion

};
