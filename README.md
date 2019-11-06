# ans-schema
JSON schema definition and supporting example/validation code for The Washington Post's ANS specification

*NOTE* This schema is in development and subject to change.

# Overview
ANS ("Arc Native Specification") is the collection of schema documents that comprise the Washington Post's definition of "content", in so far as content is passed back and forth between systems in the Arc ecosystem of applications.

## The current production version of ANS is 0.10.4
## The current development version of ANS is 0.10.5

## Schema files
ANS Schema files are defined with the [JSON Schema specification](https://spacetelescope.github.io/understanding-json-schema/index.html).  Schemas are defined in individual files under the [src/main/resrouces/schema/ans/_version_/](src/main/resources/schema/ans/0.10.0/) directory.

Small, self-contained, attributes such as "had copyright" or "had unique id" are modeled as **traits**, which are combined together or applied directly to more complicated schema objects for the purpose of re-usability.  The "content.json" schema, for example, composes the traits "credit", "locale", "location", and "copyright".

One can use a variety of third party tools to validate their content against the schema files hosted here on github publicly, such as [Ajv](https://github.com/epoberezkin/ajv).


## Examples
A few examples are provided of content documents that validate against the Washington Post ANS schema:

1. [An Example Story](tests/fixtures/schema/0.10.3/story-fixture-references.json)
2. [An Example Video](tests/fixtures/schema/0.10.3/video-fixture-nationals.json)
3. [An Example Image](tests/fixtures/schema/0.10.3/image-fixture-good.json)


## Contributing

See the [contributing documentation](CONTRIBUTING.md) for information about how to suggest changes to the ANS schema.

## Validating Locally ##

This project contains a node library that can be used to validate ANS documents locally.  It is the same validator used in the ANS Service: http://ans.arc2.nile.works/validate/0.9.0

You can run the validator on the command line from the project directory to validate an ANS document:

```
npm install
npm run-script ans -- --ansdata='{"type":"story", "version":"0.8.1"}' --version=0.10.3 validate

[
  {
    "keyword": "enum",
    "dataPath": ".version",
    "schemaPath": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.3/traits/trait_version.json/enum",
    "params": {},
    "message": "should be equal to one of values"
  }
]
```

A file can also be used as input:

```
npm run-script ans -- --ansfile=test.json --version=0.10.3 validate

```

You can also load the validator as a library in your node project:

```
var ans = require('ans-schema');

ans.getValidatorForVersion('0.10.3', function(err, validator) {
  var errors = validator.validate({"type":"story", "version":"0.5.8"});

  if (errors.length > 0) {
    console.log("There were some errors: " + JSON.stringify(errors));
  }
  else {
    console.log("It's valid!");
  }
});
```

## Other Commands ##

### upvert ###
Converts a valid document in an old version of ANS to newer version.

```
npm run-script ans -- --ansdata='{"type":"story", "version":"0.5.0", "content_elements":[{"type":"text", "content": "Foo!", "additonal_properties": { "foo":"bar"}}], "taxonomy":{"sections":[{ "type": "section", "version":"0.5.0"}]}}' upvert

{
  "type": "story",
  "version": "0.10.3",
  "content_elements": [
    {
      "type": "text",
      "content": "Foo!",
      "additional_properties": {
        "foo": "bar"
      }
    }
  ],
  "taxonomy": {
    "sites": [
      {
        "additional_properties": {
          "type": "section"
        },
        "version": "0.10.3",
        "type": "site",
        "name": "(unnamed)",
        "primary": false
      }
    ],
    "tags": []
  }
}
```

### sync ###

Fixes an invalid document composed of valid sub-documents of differing ANS versions. Essentially this converts a very specific kind of invalid document to a valid one by selective upverting.

```
npm run-script ans -- --ansdata='{"type":"story", "version":"0.10.3", "content_elements":[{"type":"gallery", "version":"0.8.1", "content_elements":[ {"type":"image", "version":"0.8.1", "url":"http://foo.com/img.jpg"}]}]}' sync

{
  "type": "story",
  "version": "0.10.3",
  "content_elements": [
    {
      "type": "gallery",
      "version": "0.10.3",
      "content_elements": [
        {
          "type": "image",
          "version": "0.10.3",
          "url": "http://foo.com/img.jpg"
        }
      ]
    }
  ]
}
```
## Creating a new ANS version
The script to create a new version: `npm run-script ans -- --version=x.xx.x create`

After running this, if you've created a new major or minor version, you'll need to update line 19 in this file so that the validate endpoint will work: `lib/validator.js`.

Make sure to also add a test file here: `tests/fixtures/schema/`. You can copy over the previous test file (`schema-tests-xx.js`) and rename it with your version number. When people open PRs for new schema changes, they can add tests to that file.
