# ans-schema
JSON schema definition and supporting example/validation code for The Washington Post's ANS specification

*NOTE* This schema is in development and subject to change.

# Overview
ANS ("ARC Native Specification") is the collection of schema documents that comprise the Washington Post's definition of "content", in so far as content is passed back and forth between systems in the Arc ecosystem of applications.

## Schema files
ANS Schema files are defined with the [JSON Schema specification](https://spacetelescope.github.io/understanding-json-schema/index.html).  Schemas are defined in individual files under the [src/main/resrouces/schema/ans/_version_/](src/main/resources/schema/ans/v0_4/) directory.

Small, self-contained, attributes such as "had copyright" or "had unique id" are modeled as **traits**, which are combined together or applied directly to more complicated schema objects for the purpose of re-usability.  The "content.json" schema, for example, composes the traits "credit", "locale", "location", and "copyright".  The other interesting schemas (story.json, image.json, and video.json) include/descend from that basic content schema and provide additional schema elements as appropriate.

One can use a variety of third party tools to validate their content against the schema files hosted here on github publicly.

## Schema Overview

## Examples
Two examples are provided of content documents that validate against the Washington Post ANS schema:

1. [An Example Story](src/test/resources/com/washingtonpost/arc/ans/v0_3/model/story-fixture-tiny-house.json)
2. [An Example Video](src/test/resources/com/washingtonpost/arc/ans/v0_3/model/video-fixture-nationals.json)
