# Problem

To this point, ANS has remained a heavily HTML-centric document format, nowhere more so than in its treatment of text. To a large extent, this is pragmatic -- we continue to expect many uses cases for generating HTML documents from ANS, and from importing existing HTML content into the Arc ecosystem. However, this becomes increasingly infeasible to support as we continue to build ANS-native renderers for different platforms (such as iOS, Android and Apple News) and even presents challenges for existing HTML implementations.


## The Current Solution and Its Benefits

The current representation of text in ANS looks like this:
```
{
  "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAA",
  "type": "text",
  "content": "To this point, ANS has remained an <em>HTML-centric</em> document format."
}
```

Text is stored in the `content` attribute of a text content element and set of HTML tags that implicitly includes `<strong>`, `<em>`, `<a>` and others is expected to be used to format text. This allowable subset of HTML is undefined, undocumented, and unenforced.

This is useful for:

* _Importing Content_ - Many legacy CMSes, including ones in use at Washington Post, store content as HTML, and thus having a direct pathway for sections of HTML content into ANS is expedient;
* _WYSIWYG Web Editor_ - Virtually all web browsers support the "contenteditable" attribute to some degree, so using HTML for some of the formatting allows web based editors (such as Ellipsis) to take advantage of that fact;
* _HTML Templates_ - Simple HTML templates can copy the text value as-is with no additional parsing or rendering.

Any successor solution should seek to be as useful or more to the above end-users.


## Goals of this Proposal

According to this proposal, the ideal text formatting solution should also be feasible to use in:

* _Rainbow_ - Existing rainbow products already consume JSON formatted content;
* _iOS, Android, Apple News, and other non-HTML environments_ - Apple in particular is enthusiastic about its design-oriented Apple News format, which has features without direct HTML analogues;
* _Elasticsearch_ - It is a critical piece of the Content API with unique limitations on how data is stored that should be addressed in the schema when possible (HTML is not the worst, not the best format here).

It should also:

* Maintain existing HTML options (when practical) as a convenience options for current & similar ANS users;
* Limit text formatting to a reasonable set of options (somewhere in the range of "superscript yes, kerning no");
* Address existing limitations in representing element-element relationships that are not strictly sequential, and element-document relationships.


# Proposal

## Part I. Structured Text Object.

### `attributed_text` object describes structured text content

Attributed text object will have the following structure. Note that proposed structure is compatible with preexisting `text` story element (as of 0.5.8).

* a required `text` property with plain text content of type `string`,
* an optional `attributes` property with array of `attribute` objects describing formatting to be applied to the text,
* an optional `selections` property with array of `selection` objects describing text sub-strings and formatting,
* an optional `content` property with HTML formatted text content.

Example:
```
  {
    "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAA",
    "type": "text",
    "text": "The text attribute should contain plain text content only.",
    "selections": [ ... ]
    "content": "The <b>text</b> attribute should contain <i>plain text</i> content only."
  }
```

### `selection`s describe formatting for specific segments of a text string

Each `selection` object defines a part of a text string and what formatting attributes should be applied to it. An idea borrowed from Apple and Twitter.

* a required `start` and `length` integer properties define sub-string range,
* an optional `attributes` property with array of `attribute` objects.

Example:
```
    "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAA",
    "text": "The text attribute should contain plain text content only.",
    "selections": [
      {
        "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAB",
        "type": "selection",
        "start": 4,
        "length": 4,
        "attributes": [ ... ]
      },
      { ... }
    ]
    "content": "The <b>text</b> attribute should contain <i>plain text</i> content only."
```

### `attribute`s are modifications applied to the text string or selections

Each attribute element modifies the formatting of the text it is applied to. Initial list of supported attribute types shall be:

* strong,
* emphasis,
* strike,
* highlight,
* superscript,
* subscript,
* smallcaps,
* dropcaps,
* link.

Example:
```
        "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAB",
        "type": "selection",
        "start": 4,
        "length": 4,
        "attributes": [
          {
            "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAC",
            "type": "strong"
          }
        ]
```

Additionally, `link` attribute must have `url` property pointing to the linked content. Example:

```
        "attributes": [
          {
            "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAC",
            "type": "link"
            "url": "https://www.washingtonpost.com/..."
          }
        ]
```

This initial list of attributes can be extended at a later versions of the specification with additional attributes, or with additional properties on existing attributes, if such need arises. For example, `strong` attribute could be extended to include `weight` property:

```
        "attributes": [
          {
            "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAC",
            "type": "strong",
            "weight": 500
          }
        ]
```

### `content` is an HTML representation of the canonical `text` property

Each attributed text object can have an optional `content` element which contains HTML representation of that `text`. It is expected that, on input:

* `text`, and `attributes`, and `selections` properties are present, or recreated from the `content` property during import;
* `content` property is omitted, or contains only allowed subset of the HTML;

On output:

* `text`, and `attributes`, and `selections` properties are present;
* `content`  property can be omitted for non HTML clients;

This means that ARC producers, when HTML content is passed in, should validate and parse that HTML content into attributed text content. On the other hand, HTML centric consumers can ignore attributed text markup and use raw HTML representation directly.

Supported HTML subset will consist of tags and styles which can be directly mapped to the attribute types:

* for strong, `<b>` and `<strong>`,
* for emphasis, `<i>` and `<em>`,
* etc.


## Part II. Structured Text Applied to Story Elements

### All formatted content should be represented as a structured text content

Existing `text`, `blockquote`, `correction`, `header`, `interstitial_link` adopt the structure defined by `attributed_text` object. Following properties are replaced with `text`/`attributes`/`selections`/`text` properties as defined above:

* blockquote/content
* correction/text
* header/content
* interstitial_link/content
* text/content

The exception is the `code/content` property, which represents plain text computer code - without syntax highlighting or any other markup.


## Part III. Structured Text Applied to Properties

Existing properties which allow usage of the markup in text content should adopt `attributed_text` type instead of `string`. These include:

* author/bio
* image/caption
* tag/description
* video/transcript
* description (trait_description.json / dictionary.json)
* editor_note (via trait_editor_note.json)
* headlines (trait_headlines.json / dictionary.json)
* subheadlines (trait_subheadlines.json / dictionary.json)

Existing properties which use `text` where additional properties defined in `content_element` are not needed, should switch to `attributed_text`:

* quote/citation
* table/header/items
* table/rows/items/items


## Part IV. Document Usage of Raw HTML

### Define properties allowing raw HTML content

All `string` type properties which can have HTML content should be explicitly documented. These include:

* raw_html/content
* video/embed_html

### Define properties prohibiting HTML content

All other `string` type properties are assumed to have only plain text content. Examples include:

* image/subtitle
* code/content
* code/language
* address/street_address (via trait_address.json)
* copyright (via trait_copyright.json)
* location (via trait_location.json)
* label/basic/text (via trait_label.json)
* label/*/text (via trait_label.json)
* owner/name (via trait_owner.json)
* slug (via trait_slug.json)
* source/name (via trait_source.json)
* author/name
* author/org
* auxiliary/name (taxonomy)
* keyword/keyword (taxonomy)
* named_entity/name (taxonomy)
* site/name
* site/description
* tag/text
* topic/name
* video/rating


## Part V. Future Work

This proposal leaves room for defining other types of attributes, such a `link`, which could be used to denote relationship between elements and other content.

Determine if site/description and image/subtitle could contain attributed text.