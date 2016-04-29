# ans-schema
JSON schema definition and supporting example/validation code for The Washington Post's ANS specification

*NOTE* This schema is in development and subject to change.

# Overview
ANS ("ARC Native Specification") is the collection of schema documents that comprise the Washington Post's definition of "content", in so far as content is passed back and forth between systems in the Arc ecosystem of applications.

## Schema files
ANS Schema files are defined with the [JSON Schema specification](https://spacetelescope.github.io/understanding-json-schema/index.html).  Schemas are defined in individual files under the [src/main/resrouces/schema/ans/_version_/](src/main/resources/schema/ans/0.5.4/) directory.

Small, self-contained, attributes such as "had copyright" or "had unique id" are modeled as **traits**, which are combined together or applied directly to more complicated schema objects for the purpose of re-usability.  The "content.json" schema, for example, composes the traits "credit", "locale", "location", and "copyright".

One can use a variety of third party tools to validate their content against the schema files hosted here on github publicly, such as [Ajv](https://github.com/epoberezkin/ajv).


## Examples
Two examples are provided of content documents that validate against the Washington Post ANS schema:

1. [An Example Story](tests/fixtures/schema/0.5.4/story-fixture-tiny-house.json)
2. [An Example Video](tests/fixtures/schema/0.5.4/video-fixture-nationals.json)
