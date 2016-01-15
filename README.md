# ans-schema
JSON schema definition and supporting example/validation code for The Washington Post's ANS specification

*NOTE* This schema is in development and subject to change.

# Overview
ANS ("ARC Native Specification") is the collection of schema documents and generated source files that comprise the Washington Post's definition of "content", in so far as content is passed back and forth between systems in the Arc ecosystem of applications.

The latest version of the ANS schema is the 0.3.6-SNAPSHOT release, which includes Java model objects for use in deserializing ARC JSON files.  Include this artifact in your POM.xml like:
```
<dependency>
    <groupId>com.washingtonpost.arc.ans</groupId>
    <artifactId>ans-schema</artifactId>
    <version>0.3.6</version>
</dependency>
```

## Schema files
ANS Schema files are defined with the [JSON Schema specification](https://spacetelescope.github.io/understanding-json-schema/index.html).  Schemas are defined in individual files under the [src/main/resrouces/schema/ans/_version_/](src/main/resources/schema/ans/v0_3/) directory.

Small, self-contained, attributes such as "had copyright" or "had unique id" are modeled as **traits**, which are combined together or applied directly to more complicated schema objects for the purpose of re-usability.  The "content.json" schema, for example, composes the traits "dated", "credited", "locale", "located", and "copyrighted".  The interesting schemas (collection.json, image.json, and video.json) include/descend from that basic content schema and provide additional schema elements as appropriate.

One can use a variety of third party tools to validate their content against the schema files hosted here on github publicly.

## Schema Overview
The ARC Schema is rooted at an "ANS" node that defines an ID and Type field; the ID should be a globally unique identifier to the concrete/subclass instance of content and the Type field should describe to higher-level languages what type of content the concrete instance is (i.e. "story", "image", "video", etc.)

The hierarchy of content is diagramed here:

![Diagram of ANS Schema](http://www.gliffy.com/go/publish/image/8791623/L.png)

## Examples
Two examples are provided of content documents that validate against the Washington Post ANS schema:

1. [An Example Story](src/test/resources/com/washingtonpost/arc/ans/v0_3/model/story-fixture-tiny-house.json)
2. [An Example Video](src/test/resources/com/washingtonpost/arc/ans/v0_3/model/video-fixture-nationals.json)

## Contributing
First, make sure you can build and validate all the current schemas.
* If you don't already have it, get maven

```brew install maven     # for OSX```

* Run all unit tests validating all current schemas:

```mvn -U clean package```

* Make edits, and update/add validation unit tests as needed

This artifact uses the Maven Jacoco code coverage plugin with an extremely strict 100% line coverage enforcement to ensure all JSON-to-Object mappings are stressed correctly, and that all .equals, .hashCode and .toString methods are correctly tested.
