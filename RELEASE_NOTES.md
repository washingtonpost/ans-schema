# ANS Release Notes

## 0.4.0 TBD Release Date

## 0.3.1 2015/09/25

* Fix bug where the "type" attribute was being deserialized into JSON twice.
* Adding a small ANSVersion enumeration class to standardize on what people should enter in the ANS.version field

## 0.3.0 2015/09/14

* Under development
* Provides a new ANS top-level class/schema to enable Story objects to refer to Lists<ANS> instead of just an HTML String blob
* Implements new types of ANS content like Text, Blockquote, etc
* Sub-classed empty Story and Gallery class from what *used* to be called Story and is now called Collection.
* Added a "version" property at the root-level ANS object to hold the value of the ANS schema the ANS object conforms to
* Removing "title" property in favor of just "headline" which now becomes a tuple of (headline, display) to support multiple headline variants for the same story

## 0.2.0 2015/08/27

* DEPRECATED / DEVELOPMENT VERSION - do not use this version
* Includes the arc-0.2 specification and corresponding Java classes
