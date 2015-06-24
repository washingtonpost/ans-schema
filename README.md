# ans-schema
JSON schema definition and supporting example/validation code for The Washington Post's ANS specification

# Overview
ANS ("abitrarily named specification") is the collection of schema documents and generated source files that comprise the Washington Post's definition of "content", in so far as content is passed back and forth between systems in the Arc ecosystem of applications.

## Schema files
ANS Schema files are defined with the [JSON Schema specification](https://spacetelescope.github.io/understanding-json-schema/index.html).  Schemas are defined in individual files under the src/main/resrouces/schema/ans/[version]/ directory. 

## Contributing
First, make sure you can build and validate all the current schemas.
* If you don't already have it, get maven
```brew install maven     # for OSX```
* Run all unit tests validating all current schemas:
```mvn -U clean package```
* Make edits, and update/add validation unit tests as needed

# Notes/questions
1. is it good enough to encode "version" as part of the URL in the ID of a schema file? e.g.
```"id": "https://raw.githubusercontent.com/was...es/schema/ans/v0_2/credit.json"```
