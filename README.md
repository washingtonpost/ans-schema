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
* is it good enough to encode "version" as part of the URL in the ID of a schema file? e.g.

```
"id": "https://raw.githubusercontent.com/was...es/schema/ans/v0_2/credit.json"
                                                            ^^^^^
```
* It doesn't appear as though the validator checks for references correctly (e.g. you can delete "id" from either of the fixtures and the credit.json tests pass just fine)  See [this example](https://github.com/fge/json-schema-validator/blob/master/src/main/resources/com/github/fge/jsonschema/examples/split/fstab.json) for maybe how to do that
* Do we need to distinguish between images and "generic media object"?
* what units are the height and width of an image in?  px?  unit-less?
* are required values up in referenced objects transitive? or do I need to spell out in every schema that "ans" and "content" are required?
** speaking of that, since "content" has "ans", I assume I can just list "content" as a property, right?
