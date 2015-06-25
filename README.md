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
* Do we need to distinguish between images, videos and "generic media object"?
* what units are the height and width of an image in?  px?  unit-less?
* are required values up in referenced objects transitive? or do I need to spell out in every schema that "ans" and "content" are required?
** speaking of that, since "content" has "ans", I assume I can just list "content" as a property, right?
* What about traits like "skedable", "categorizable" or "trackable"?  Should that be a free-form, optional string field somewhere? or an enum?
* Should I switch all the "additionalProperties: false" to be "true"?  Or keep the ANS schema strict and allow for "wrapper" schemas that allow whatever they want to be tacked on 'around' the underlying schema?
* Why does the TestStory unit test case fail when I add a promo image to the story-fixture-good.json file?
```
"promo_image": {
        "content": {
            "id": "unique ANS id",
            "created_date": "2015-06-25T09:50:50.52Z",
            "credit": [
                {
                    "name": "Ansel Adams",
                    "role": "Photographer"
                }
            ]
        },
        "image_url": "https://tinyurl.com/mqyonhb",
        "caption": "Never gonna give you up",
        "subtitle": "Never gonna let you down",
        "width": 800,
        "height": 640
    },

error 
=====
com.github.fge.jsonschema.core.exceptions.InvalidSchemaException: fatal: invalid JSON Schema, cannot continue
Syntax errors:
[ {
  "level" : "error",
  "message" : "array must have at least one element",
  "domain" : "syntax",
  "schema" : {
    "loadingURI" : "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/v0_2/image.json#",
    "pointer" : ""
  },
  "keyword" : "required"
} ]

```
