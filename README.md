# ans-schema
JSON schema definition and supporting example/validation code for The Washington Post's ANS specification

*NOTE* This schema is in development and subject to change.

# Overview
ANS ("ARC Native Specification") is the collection of schema documents that comprise the Washington Post's definition of "content", in so far as content is passed back and forth between systems in the Arc ecosystem of applications.

## Schema files
ANS Schema files are defined with the [JSON Schema specification](https://spacetelescope.github.io/understanding-json-schema/index.html).  Schemas are defined in individual files under the [src/main/resrouces/schema/ans/_version_/](src/main/resources/schema/ans/0.5.5/) directory.

Small, self-contained, attributes such as "had copyright" or "had unique id" are modeled as **traits**, which are combined together or applied directly to more complicated schema objects for the purpose of re-usability.  The "content.json" schema, for example, composes the traits "credit", "locale", "location", and "copyright".

One can use a variety of third party tools to validate their content against the schema files hosted here on github publicly, such as [Ajv](https://github.com/epoberezkin/ajv).


## Examples
A few examples are provided of content documents that validate against the Washington Post ANS schema:

1. [An Example Story](tests/fixtures/schema/0.5.5/story-fixture-tiny-house.json)
2. [An Example Video](tests/fixtures/schema/0.5.5/video-fixture-nationals.json)
3. [An Example Image](tests/fixtures/schema/0.5.5/image-fixture-good.json)

## Submitting a Proposal

Changes to the ANS Schema should first be accepted by the ANS committee at The Washington Post.  To submit a proposal for a requested change to the schema, please [create an issue](https://github.com/washingtonpost/ans-schema/issues/new) in this repo's issue tracker.

A proposal should be a short document that includes the following:

* A brief example of desired change, including example JSON of an ANS document that adheres to the change. 
* A description of the reason or use case for the requested change
* Responses to any anticipated problems or concerned caused by this change.

## Contributing to this Repository

The standard method for contributing to this repository is pull requests.  For the time being, each new version requires a specific series of manual changes to the repository, listed below.

* Branch this repository.
* Copy the directory of current version of ANS to the proposed new version number.  (E.g., /src/main/resources/schema/ans/0.5.x). 
* Within this new directory, find+replace the old version number with the new one across all files.
* Make requested changes to the schema.
* Copy tests/fixtures/schema/old_version to tests/fixtures/schema/new_version
* Find+replace the version number in tests/fixtures/schema/new_version
* Updates fixtures in the new version as needed for tests. Add new fixtures where appropriate.
* Add a transform function to lib/transforms.js that converts ANS documents from old_version to new_version.
* Copy tests/fixtures/transforms/(old_version - 1) to tests/fixtures/transforms/old_version
* Add new tests to tests/schema-tests-05.js and tests/transform-tests-05.js for new functionality.
* Update lib/version.js with the new version number
* Add version number to tests/schema-tests-05.js
* Run npm test.
* Create pull request for this collection of changes.
  
