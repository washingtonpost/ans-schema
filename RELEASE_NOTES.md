# ANS Release Notes

### TBD ###

* Adds `rating` element
* Adds `endorsement` element

### 1.3.3 2017/05/16 ##

* Add `trait_voice_transcripts` to stories
* Adds `streams` to `audio`

### 1.3.2 2017/04/28 ##

* Reworks `trait_publishing`

### 1.3.1 2017/04/24 ##

* Fixes bug in 0.5.7->0.5.8 upverter where an empty string in `additional_properties.workflow.status` would cause `.planning.workflow.status_code` to be set to 0 instead of not set at all.

### 1.3.0 2017/04/14 ##

* Adds `publishing` trait to 0.5.8
* 0.5.8 release candidate

### 1.2.19 2017/04/13 ##

* Makes tag, source, comments objects open-ended (fully backwards-compatible with 0.5.7)
* Adds named entities
* Adds submit_date to story, image operations
* Adds corrections to video object
* Fixes various validator bugs

### 1.2.15 2017/03/21 ###

* Make related_content.redirect a reserved slot for a redirect object.
* Adds corrections element, changes trait_corrections to use element

### 1.2.14 2017/03/02 ###

* Adds `workflow` and `pitches` #106
* Changes `table` type so that rows and cells are represented by their own object and cells can contain content_elements rather than a mere text node. #107

### 1.2.13 2017/01/27 ###

* Adds `created` flag to content operations
* Adds `edit_url`

### 1.2.12 2017/01/27 ##

* Adds `embed_html`

### 1.2.11 2017/01/26

* Fixes issue where `alignment` not present on references

### 1.2.10 2017/01/16 ###

* Adds `comments`

### 1.2.9 2017/01/13 ###

* Adds `additional_properties` to taxonomy

### 1.2.8 2017/01/10 ###

* Adds `quote` element #89

### 1.2.7 2017/01/09 ###

* Adds `alignment` property on all elements #85
* Adds `element_group` element #84
* Adds `description`, `slug`, `additional_properties` properties to tags #87
* Disables non-spec properties on tags #87

### 1.2.6 2017/01/05 ###

* Creates ANS 0.5.8
  * Adds `alignment` property
  * Adds `element_group` content element

### 1.2.5 2016/11/30 ###

* Adds `primary_site` to taxonomy

### 1.2.4 2016/11/11 ###

* Adds `licensable` to images
* Adds `channels` to top-level content items (standardizes on "channels" instead of "channel")
* Fixes `description` in images

### 1.2.3 2016/08/31 ###

* Adds url operation, redirect object, new fields to image_operation to ANS 0.5.7

### 1.2.2 2016/07/28 ###

* Adds ANS 0.5.7
  - Deleted oembed element (merged into reference object)
  - Added oembed_response element
  - Added referent_properties to reference object
  - Added _id, subtype, channel to reference object (makes compatible with elements)
  - Added content_restrictions trait to content objects
  - Add 'display_date' and 'publish_date' to story_opertation objects

### 1.2.1 2016/07/13 ###

* Fixes issue where schemas whose type included a hyphen would never successfully validate (operations)

### 1.2.0 2016/07/13 ###

* Adds 'sync' functionality to fix document composed of multi-version sub-documents

### 1.1.0 2016/07/08 ###

* Adds AnsValidator
* Improves transformer testing
* Fixes minor issues with upverters, tests
* Removes unused fixtures

### 1.0.2 2016/07/06 ###

* Adds gallery operation
* Adds tests for image and gallery operations
* Fixes lots of tests that were not being run properly
* Fixes bug in 0.5.5->0.5.6 upverter that generated invalid reference objects in taxonomy.sites

### 1.0.1 2016/07/01 ###

* ANS Version de-coupled from package version
* Adds library command line for generating new ANS version stubs, cleaning up

### 0.5.6 2016/6/27 ###

* Add corrections to story object, including text and correction_type (to distinguish "clarification" from "correction", etc)
* Adds interstitial_links content element
* Adds reference as a type under related_content, promo_items
* Adds first_publish_date
* Adds source.source_id
* Adds owner.name, owner.sponsored
* Adds syndication.external_distribution, syndication.search
* Adds taxonomy.stock_symbols
* Adds site.primary

### 0.5.5 2016/5/10 ###

* Added 'user_id' and 'published' to revision object
* Added 'slug' to story, video, image, gallery and author objects
* Created schemas for Clavis Topics and Auxiliaries.
* Modified the Keyword schema to match that of the Clavis datatype.
* Score is now a required field in the Keyword schema.

### 0.5.4 2016/4/27 ###

* Moves extraneous properties in planning trait and reference object into additional_properties, enables strict validation

### 0.5.3 2016/4/20 ###

* Removed `sections` from taxonomy and added `sites`. Sites define several fields and validate strictly - previously freeform sections will be upverted to sites as best as possible, stuffing unknown fields into `additional_properties`
* Allows a `reference` to be used in the sites list
* Fixed a bug where schema for `tags` appeared to allow objects but in fact only allowed strings. Tag objects with `_id` and `text` will now validate.
* Made `basic` a required index in the `promo_items` dictionary

### 0.5.2 2016/4/18 ###

* Added `additional_properties` to image.json

### 0.5.1 2016/4/14 ###

* Correct misspelled `additonal_properties` in text, header elements


### 0.5.0 2016/4/13 ###

* camelCase and hypen-ated variable names everywhere converted to under_score
* `author.description` renamed `author.bio`
* (type == "author") required on author objects
* Changed `.default` everywhere to `.basic`
* Story, Video, Image, Audio and Results objects, and others no longer allow unspecified properties outside of `additional_properties`
* Most content_elements do not allow unspecified properties outside of `additional_properties`
* Dropped `"editable": true` from story elements and dropped story_element meta-type
* Separated tests for 0.4.x and 0.5.0
* Separate transformers for 0.4.x and 0.5.x version sequences
* Slight directory re-organization


### 0.4.3 2016/1/29 ###

* Added test coverage

### 0.4.0 2016/1/28 ###

* Added nodejs module backing
* Removed Java POJOs to focus on schema
* Re-factored schema to better distinguish content types, content elements, and summaries

### 0.3.6 2016/1/15 ###

* Added code sample, table, and header content elements
* Made "text" a require field for text objects

### 0.3.5 2015/11/18 ###

* Added a StorySummary object to offer a lower-weight option for Story transmission over the wire
* Made sure Content.getLastUpdatedDateAsInstant and .getCreatedDateAsInstant were null safe if their underlying Strings were null/empty

### 0.3.4 2015/11/23 ###

* Added "channel" attribute to allow for per-channel variation of content elements

### 0.3.3 2015/11/16 ###

* Adding raw_html type
* Adding blockquote and list types
* Making Image.height and Image.widht Integers (instead of ints) so unset JSON values will not result in deserialized "0" values
* Changing lastUpdatedDate and createdDate from java.util.Date to Strings of enforced RFC3339 format
* Added Audio type
* Added Oembed type

### 0.3.2 2015/10/08 ###

* Really fixing bug where the "type" attribute was being deserialized twice. The fix put in the 0.3.1 release technically works, but is incompatible with some other Jackson/Mongo frameworks being used "downstream" of this artifact.
* Renaming Video.type to Video.videoType and VideoStream.type to VideoStream.streamType to avoid ambiguity about what "Video.type" refers to (answer: it should be the ANS type of the Video object)

### 0.3.1 2015/09/25 ###

* Fix bug where the "type" attribute was being deserialized into JSON twice.
* Adding a small ANSVersion enumeration class to standardize on what people should enter in the ANS.version field

### 0.3.0 2015/09/14 ###

* Under development
* Provides a new ANS top-level class/schema to enable Story objects to refer to Lists<ANS> instead of just an HTML String blob
* Implements new types of ANS content like Text, Blockquote, etc
* Sub-classed empty Story and Gallery class from what *used* to be called Story and is now called Collection.
* Added a "version" property at the root-level ANS object to hold the value of the ANS schema the ANS object conforms to
* Removing "title" property in favor of just "headline" which now becomes a tuple of (headline, display) to support multiple headline variants for the same story

#### 0.2.0 2015/08/27 ####

* DEPRECATED / DEVELOPMENT VERSION - do not use this version
* Includes the arc-0.2 specification and corresponding Java classes
