# ans-schema
JSON schema definition and supporting example/validation code for The Washington Post's ANS specification

*NOTE* This schema is in development and subject to change.

# Overview
ANS ("ARC News Specification") is the collection of schema documents and generated source files that comprise the Washington Post's definition of "content", in so far as content is passed back and forth between systems in the Arc ecosystem of applications.

## Schema files
ANS Schema files are defined with the [JSON Schema specification](https://spacetelescope.github.io/understanding-json-schema/index.html).  Schemas are defined in individual files under the [src/main/resrouces/schema/ans/_version_/](src/main/resources/schema/ans/v0_2/) directory. 

Small, self-contained, attributes such as "had copyright" or "had unique id" are modeled as **traits**, which are combined together or applied directly to more complicated schema objects for the purpose of re-usability.  The base "content.json" schema, for example, composes the traits "dated", "credited", "locale", "located", and "copyrighted".  The interesting schems (story.json, image.json, and video.json) include/descend from that basic content schema and provide additional schema elements as appropriate.

One can use a variety of third party tools to validate their content against the schema files hosted here on github publicly.

## Examples
Two examples are provided of content documents that validate against the Washington Post ANS schema:

1. [An Example Story](src/test/resources/com/washingtonpost/arc/ans/v0_2/model/story-fixture-tiny-house.json)
2. [An Example Video](src/test/resources/com/washingtonpost/arc/ans/v0_2/model/story-fixture-nationals.json)

## Contributing
First, make sure you can build and validate all the current schemas.
* If you don't already have it, get maven

```brew install maven     # for OSX```

* Run all unit tests validating all current schemas:

```mvn -U clean package```

* Make edits, and update/add validation unit tests as needed

This artifact uses the Maven Jacoco code coverage plugin with an extremely strict 100% line coverage enforcement to ensure all JSON-to-Object mappings are stressed correctly, and that all .equals, .hashCode and .toString methods are correctly tested.

