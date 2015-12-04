# ANS Release Notes

## 0.4.0 TBD Release Date

## 0.3.5 TBD Release Date

* Added a StorySummary object to offer a lower-weight option for Story transmission over the wire 
* Made sure Content.getLastUpdatedDateAsInstant and .getCreatedDateAsInstant were null safe if their underlying Strings were null/empty

## 0.3.4 2015/11/23

* Added "channel" attribute to allow for per-channel variation of content elements

## 0.3.3 2015/11/16

* Adding raw_html type
* Adding blockquote and list types
* Making Image.height and Image.widht Integers (instead of ints) so unset JSON values will not result in deserialized "0" values
* Changing lastUpdatedDate and createdDate from java.util.Date to Strings of enforced RFC3339 format
* Added Audio type
* Added Oembed type

## 0.3.2 2015/10/08

* Really fixing bug where the "type" attribute was being deserialized twice. The fix put in the 0.3.1 release technically works, but is incompatible with some other Jackson/Mongo frameworks being used "downstream" of this artifact.
* Renaming Video.type to Video.videoType and VideoStream.type to VideoStream.streamType to avoid ambiguity about what "Video.type" refers to (answer: it should be the ANS type of the Video object)

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
