# Collections initial feature set and schema

## Problem

To date, ANS has no dedicated way of representing curated lists of content to be displayed in sequence.  Some users have used the `content_elements` field with on a story document to receive full inflation of sub-documents, and others have used `related_content` in a similar way.  However, both are ad hoc implementations to get around the lack of the feature rather than an intended use case of an ANS feature directly.  As a result, these implementations have been subject to restrictions and limitations that make them less than ideal.

This document suggests several new ANS features to address this problem directly.

## New ANS Feature: Promo References

A new object type will be added to ANS with an accompanying feature in Content API: the promo reference.

A promo reference will have the same form as any other reference, but with a few key differences:
 * Unlike regular references, promo references will resolve against a *denormalized* document view, and therefore may include additional denormalized content.

 * Promo references will not count against the normal reference limit. (Content API currently rejects documents with more than 300 discrete references.) A single document will be limited to 500 promo references.

 * Promo references will only be denormalized at query time. They will not be denormalized when written onto the Content Event Stream.

 * A promo reference is denormalized into an object with only the following fields:
   * _id
   * version
   * type
   * subtype
   * headlines
   * subheadlines
   * description
   * label
   * promo_items
   * credits
   * taxonomy
   * websites
   * canonical_website
   * canonical_url
   * short_url
   * display_date
   * publish_date
   * language
   * alignment
   * (...additional fields may be added at a later time.)

 * Promo references only reference story, gallery and video documents.  Additional reference types may be added at a later time.

 * Promo references have the same form as a regular reference in most other respects, but their type is `promo_reference`.


### New ANS Content Type: Collections

A new document type `collection` represents in ANS a curated sequence of content. A collection has the same ANS fields as a `story`. However, collections have some significant behavioral differences.

    * `content_elements` in a `collection` may only consist of promo references

    * When fetching a single collection via the Content API, a maximum of 10 items from `content_elements` may be returned in a denormalized view. Pagination parameters (the same as the current /search endpoint) will also be supported.

    * When a collection object is returned as part of search results, `content_elements` may be omitted entirely.



### New ANS Feature: Content Aliases

A new field in ANS `content_aliases` represents alternate names by which a document may be fetched.  A single document can have multiple content aliases, which are arbitrary strings that conform to `/^(a-z)(a-z0-9-)$/`.

Documents can therefore be fetched  by alias and website, or alias, type and website. E.g. `/?alias=foo-bar&website=chicago-tribune` or `?alias=foo-bae&website=chicago-tribune&type=collection`.  Multiple distinct documents can exist with the same alias.  In this way, users can simulate having variations on a single document across websites. Searching for multiple documents with the same alias will also be supported.

Content API will *not* enforce uniqueness of an alias either within or across websites. Production applications that wish to prevent alias collisions should either query Content API to find existing uses of an alias or add an alias namespacing strategy to their application.  *Should a Content API fetch request matches multiple documents with the same alias, the result will be chosen randomly.*

```json
{
  "content_aliases": ["my-homepage-collection", "johns-hot-takes"],
}
```



## Example of three features in unison (input document)

```json
{
  "_id": "ABCDEFGHIJKLMNOPQRSTUVWZYZ",
  "type": "collection",
  "version": "0.7.0",

  "credits": {
    "by": [
      {
        "type": "reference",
        "referent": {
          "type": "author",
          "id": "engelg",
          "provider": ""
        }
      }
    ]
  },

  "headlines": {
    "basic": "My Awesome Stories"
  },

  "subheadlines": {
    "basic": "The best stories, the best collection."
  },

  "description": {
    "basic": "I wonder why the wonder falls."
  },

  "promo_items": {
    "basic": {
      "type": "image",
      "version": "0.7.0",
      "url": "http://www.washingtonpost.com/logo.jpg"
    }
  },

  "content_aliases": ["my-homepage-collection"],

  "websites": {
    "a": {}
  },

  "content_elements": [
    {
      "type": "promo_reference",
      "referent": {
        "id": "ABCDE...",
        "type": "story",
        "referent_properties": {
          "headlines": {
            "basic": "Overridden Headline"
          }
        }
      }
    },

    {
      "type": "promo_reference",
      "referent": {
        "id": "ABCFE...",
        "type": "gallery",
        "referent_properties": {
          "credits": {
            "by": [
              {
                "type": "author",
                "verion": "0.6.1",
                "byline": "Greg"
              }
            ]
          }
        }
      }
    }
  ]
}
```
