# ans-schema
JSON schema definition and supporting example/validation code for The Washington Post's ANS specification

*NOTE* This schema is in development and subject to change.

# Overview
ANS ("ARC Native Specification") is the collection of schema documents that comprise the Washington Post's definition of "content", in so far as content is passed back and forth between systems in the Arc ecosystem of applications.

## Schema files
ANS Schema files are defined with the [JSON Schema specification](https://spacetelescope.github.io/understanding-json-schema/index.html).  Schemas are defined in individual files under the [src/main/resrouces/schema/ans/_version_/](src/main/resources/schema/ans/0.5.6/) directory.

Small, self-contained, attributes such as "had copyright" or "had unique id" are modeled as **traits**, which are combined together or applied directly to more complicated schema objects for the purpose of re-usability.  The "content.json" schema, for example, composes the traits "credit", "locale", "location", and "copyright".

One can use a variety of third party tools to validate their content against the schema files hosted here on github publicly, such as [Ajv](https://github.com/epoberezkin/ajv).


## Examples
A few examples are provided of content documents that validate against the Washington Post ANS schema:

1. [An Example Story](tests/fixtures/schema/0.5.6/story-fixture-tiny-house.json)
2. [An Example Video](tests/fixtures/schema/0.5.6/video-fixture-nationals.json)
3. [An Example Image](tests/fixtures/schema/0.5.6/image-fixture-good.json)

## Validating Locally ##

This project contains a node library that can be used to validate ANS documents locally.  It is the same validator used in the ANS Service: https://ans.arc.nile.works/validate/0.5.6

You can run the validator on the command line from the project directory to validate an ANS document:
```
npm install
npm run-script ans -- --ansdata='{"type":"story", "version":"0.5.6"}' --version=0.5.6 validate
npm run-script ans -- --ansfile=test.json --version=0.5.6 validate
```

You can also load the validator as a library in your node project:

```
var ans = require('ans-schema');

ans.getValidatorForVersion('0.5.6', function(err, validator) {
  var errors = validator.validate({"type":"story", "version":"0.5.6"});

  if (errors.length > 0) {
    console.log("There were some errors: " + JSON.stringify(errors));
  }
  else {
    console.log("It's valid!");
  }
});
```

## Submitting a Proposal ##

Changes to the ANS Schema should first be accepted by the ANS committee at The Washington Post.  To submit a proposal for a requested change to the schema, please [create an issue](https://github.com/washingtonpost/ans-schema/issues/new) in this repo's issue tracker.

A proposal should be a short document that includes the following:

* A brief example of desired change, including example JSON of an ANS document that adheres to the change.
* A description of the reason or use case for the requested change
* Responses to any anticipated problems or concerned caused by this change.

## Contributing to this Repository ##

The standard method for contributing to this repository is pull requests.  For the time being, each new version requires a specific series of manual changes to the repository, listed below.

* Branch or fork this repository.
* Run `npm install`
* Run `npm run-script ans -- --version=x.x.x create` where `x.x.x` is the new version of ANS you wish to create. This command will:
  * Generate new schema files (copied from the current version)
  * Generate new schema tests
  * Generate an upverter function from the current version to the new version
  * Generate test fixtures for this new upverter
  * Add the new version to the internal version sequence
* If for some reason you want to remove your new version, you can run: `npm run-script ans -- --version=x.x.x cleanup` to remove the files created by the above command.
* Run npm test.
* Create pull request for this collection of changes.
