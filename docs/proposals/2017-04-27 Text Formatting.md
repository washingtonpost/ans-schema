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

## Part I. Structured Text Element.

### `text` story element should describe structured text content

Text element will have following structure:

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

### `selection` describe formatting for specific segments of a text string

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
* dropcaps.

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


## Part II. Structured Text Applied to Other Elements

### All formatted content should be represented as a structured text content

Existing `blockquote`, `code`, `correction`, `header`, `interstitial_link` adopt the same structure as a `text` element. Following properties are replaced with text/attributes/selections/text properties:

* blockquote/content
* code/content
* correction/text
* header/content
* interstitial_link/content
* text/content


## Part III. Document Usage of HTML

### Define properties allowing HTML content

All `string` type properties which can have HTML content should be explicitly documented. These include:

* raw_html/content
* video/embed_html

All other `string` type properties are assumed to have only plain text content. Examples include:

* image/subtitle
* image/caption
* code/language
* address/street_address (via trait_address.json)
* copyright (via trait_copyright.json)
* editor_note (via trait_editor_note.json)
* location (via trait_location.json)
* owner/name (via trait_owner.json)
* slug (via trait_slug.json)
* source/name (via trait_source.json)
* author/name
* author/org
* author/bio
* auxiliary/name (taxonomy)
* keyword/keyword (taxonomy)
* named_entity/name (taxonomy)
* site/name
* site/description
* tag/text
* tag/description
* topic/name
* video/rating


## Part IV. Future Work

This proposal leaves room for defining other types of attributes, such a `link`, which could be used to denote relationship between elements and other content.


# OPEN QUESTIONS #

* Should text (trait_label.json) support formatting/HTML?
* Should main (train_disctionary.json) support formatting/HTML?
