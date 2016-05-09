# Formatting Text Content & More in ANS: A Proposal 

_NOTE: The following is merely a proposal and represents the opinion of
no one other than its author._

Special Thanks to Sean Soper, Will Van Wazer, Randy Findley, Eric Pascarello and others for generating ideas for this document.

## The Problem

To this point, ANS has remained a heavily HTML-centric document format, nowhere moreso than in its treatment of text.  To a large extent, this is pragmatic -- we continue to expect many uses cases for generating HTML documents from ANS, and from importing existing HTML content into the Arcosystem. However, this becomes increasingly infeasible to support as we continue to build ANS-native renderers for different platforms (such as iOS, Android and Apple News) and even presents challenges for existing HTML implementations.

### The Current Solution and Its Benefits

The current representation of text in ANS looks like this:
```
{
  "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAA",
  "type": "text",
  "content": "To this point, ANS has remained an <em>HTML-centric</em> documment format."
}
```

Text is stored in the `content` attribute of a text content element and set of HTML tags that implicitly includes `<strong>`, `<em>`, `<a>` and others is expected to be used to format text. (Note: this allowable subset of HTML is deliberately undefined and unenforced.)

This is useful for:
* _Importing Content_ - Many legacy CMSes, including ones in use at Washington Post, store content as HTML, and thus having a direct pathway for sections of HTML content into ANS is expedient.
* _WYSIWYG Editor_ - Virtually all browsers support the "contenteditable" attribute to some degree, so using HTML for some of the formatting allows Ellipsis to take advantage of that fact.
* _HTML Templates_ - Simple templates can copy the text value as-is with no additional parsing or rendering.

Any successor solution should seek to be as useful or more to the above end-users.

### Goals of this Proposal ###

According to this proposal, the ideal text formatting solution should also be of use to:

* _Rainbow_ - Existing rainbow products already uses a JSON document format
* _Apple News, iOS, Android, and other non-HTML rendering environments_ - Apple in particular is enthusiastic about its design-oriented Apple News format, which has some features without direct HTML analogues.
* _Elasticsearch_ is a critical piece of the Content API with unique limitations on how data is stored that should be addressed in the schema when possible (HTML is not the worst, not the best format here)

It should also:

* Maintain existing HTML options (when practical) as a convenience options for current & similar ANS users
* Limit text formatting to a reasonable set of options (somewhere in the range of "superscript yes, kerning no")
* Address existing limitations in representing element-element relationships that are not strictly sequential, and element-document relationships

## The Proposal ##

#### All "text" should be represented by a `text` content element ####

  * Blockquotes, Headers -> converted to header or blockquote element with inner text node
  * Text has `content` and/or `content_tree` property
    - `Content` is formatted HTML (as now), `content_tree` is text + selections
    - If both present on input, `content_tree` is canonical, `content` is discarded
        - Implementation: if only `content` present on input, it will be converted to content_tree at requestt-time in Story API (so content_tree is cached in Content API, but can be regenerated from Story API if necessary)
    - Both present in rendering (HTML may be phased out over time)

Example:
```
{
  "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAA",
  "type": "header",
  "content_elements": [
    {
      "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAB",
      "type": "text",
      "content": "To this point, ANS has remained an <em>HTML-centric</em> documment format.",
      "content_tree": {
        "text": "To this point, ANS has remained an HTML-centric document format.",
        "selections": ...
        "attributes": ...
      }
    }
  ]
}
```

#### Selections are specific segments of a text string

An idea borrowed from Apple and Twitter.

Best Shown By Example:
```
{
  "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAA",
  "type": "header",
  "content_elements": [
    {
      "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAB",
      "type": "text",
      "content": "To this point, ANS has remained an <em>HTML-centric</em> documment format.",
      "content_tree": {
        "text": "To this point, ANS has remained an HTML-centric document format.",
        "selections": [
          {
            "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAC",
            "type": "selection",
            "start": 35,
            "end": 47,
            "attributes": ...
          }
        ],
        "attributes": ...
      }
    }
  ]
}
```

#### Attributes are generic modifications than can be applied to content elements OR selections ####

The same approach used to add content_elements to a document is used to add attributes to an element or a selection.

Can relate to formatting, relationships, behavior, etc, but consistently named and treated across a variety of contexts.

* Plays nicely with elasticsearch
* Avoid duplication of specific properties across contexts (e.g., having an identical `link` property defined for several different elements, and for selections)

Best Shown By Example:
```
{
  "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAA",
  "type": "header",
  "content_elements": [
    {
      "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAB",
      "type": "text",
      "content": "To this point, ANS has remained an <em>HTML-centric</em> documment format.",
      "content_tree": {
        "text": "To this point, ANS has remained an HTML-centric document format.",
        "selections": [
          {
            "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAC",
            "type": "selection",
            "start": 35,
            "end": 47,
            "attributes": [
              {
                "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAD",
                "type": "attribute",
                "attribute_type": "text_style",
                "styles": [ "italics" ]
              }
            ]
          }
        ],
        "attributes": [
          {
            "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAE",
            "type": "attribute",
            "attribute_type": "link_url",
            "url": "https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.5.0/story-elements/text.json"
          }
        ]
      }
    }
  ]
}
```

#### With attributes + element ids, it's easy to imagine how "intentful relationships" can be implemented


```
[
{
  "_id": "1",
  "type": "text",
  "content_tree": {
    "text": "This is a paragraph of text. It is directly related to an image which should be shown alongside this very paragraph if at all possible.",
    "attributes": [{
      "type": "attribute",
      "attribute_type": "element_relationship",
      "element_id": "2",
      "relationship": "show_together"
    }]
  }
},
{
  "_id": "2",
  "type": "image",
  "url": "https://img.washingtonpost.com/rf/image_908w/2010-2019/WashingtonPost/2012/06/29/Outlook/Advance/Images/511969927-363.jpg",
  "attributes": [{
    "type": "attribute",
     "attribute_type": "element_relationship",
     "element_id": "1",
     "relationship": "show_together"
  }]
}
]
```

#### The "text_style" attribute defines general-purpose text formatting features ####

Proposed initial list to include:

* bold
* italics
* strikethrough
* superscript
* subscript
* smallcaps
* dropcaps
* highlight



### Additional semantic information about text that might pertain to rendering can be captured in other attributes ###

(Speculative)

For example, a "dateline" is a leading string text that may need to be visually differentiated in some contexts:

```
{
  "_id": "BBBBBBBBBBBBBBBBBBBBBBBBBB",
  "content": "Rio de Janeiro, Brazil — The Olympics started today",
  "content_tree": {
    "text": "Rio de Janeiro, Brazil — The Olympics started today",
    "selections": [{
      "type": "selection",
      "start": 0,
      "end": 24,
      "attributes": [{
        "type": "attribute",
        "attribute_type": "dateline"
      }]
    }]
  }
}
```

...Or a fraction

```
{
  "_id": "CCCCCCCCCCCCCCCCCCCCCCCCCC",
  "content": "Estimates place the loss at 23/100 of a gram",
  "content_tree": {
    "text": "Estimates place the loss at 23/100 of a gram",
    "selections": [{
      "type": "selection",
      "start": 29,
      "end": 34,
      "attributes": [{
        "type": "attribute",
        "attribute_type": "fraction",
        "numerator": 23,
        "denominator": 100
      }]
    }]
  }
}
```

### Suggested Initial Attribute List ###

I won't go into detail about every one of these, but the attribute types I see an immediate use for are:

* text_style
* link_url
* link_document
* element_relationship
* channels


## Potential Questions ##

#### So what is the relationship between `content` and `content_tree` in a text element, exactly? ####

`content` is a best-guess generic HTML rendering of what is stored in `content_tree`. Once a piece of content is stored in the Arcosystem, `content_tree` is the canonical representation of that text. Renderers may use the `content` attribute for convenience but are not obligated to do so. The exact point in time at which `content` is derived from `content_tree` should be irrelevant to end-users.  It should also be noted that many features supported as attributes may not be present in the `content` HTML-rendering.

Documents may be imported using only the `content` attribute; however, if this is done, `content` will be converted immediately to `content_tree` (via stripping and parsing HTML as necessary) and saved accordingly.

#### Why even have `content` then? ####

For convenience and backwards-compatibility.

#### Are there any other tangential benefits of this approach? ####

Text can be indexed in elasticsearch as text, without HTML getting in the way.   Solutions suggest themselves for certain requested problems like "How do I include a link to another as-yet unpublished ANS document?" and others.


#### What are the major drawbacks? ####

Document size and readability take a big hit. A lot of ambiguities with the HTML approach are still present in the new one. For example, if I change a text selection with the bold text style to include an additional word, how is that represented in the document -- a new, bolded selection of the final set of words, or the original selection with differing start/end properties? (Both are theoretically correct.)

I'm sure there are others!


##### What is the limit on text formatting we should support? #####

This line is blurry -- the medium is the message. Ideally, the formatting should be as generic and 'intentful' as possible. Any text change that will only make sense in conjunction with a specific font, or in a specific rendering environment should probably not be present.

##### What were the immediate catalysts for this proposal? #####

Specific feature requests from Content API users (image linking, text-wrap alignment) and general feature requests from future Rainbow users.




