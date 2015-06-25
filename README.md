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
* Should the image schema have a "channel" on it or a "type" (e.g. "this is the promo image for the story on mobile devices"?)

For Tim - 
* What's the intent of the keyword.frequency field?
* Right now the taxonomy.json schema just wraps a list of keywords; in the Java POC there's also "ancestors" and "topics" - what is the intent of those?  If we don't need them, should I just delete "taxonomy" and put the list of keywords directly on a story?
* I got rid of story.promo_image in favor of just having story.promo_images, and I assume promo_images[0] can just be the promo image, right?