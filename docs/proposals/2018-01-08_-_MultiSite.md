# Multi-Site Support in ANS

To support publishing to multiple `website` destinations in Arc, new fields are being added. Existing single-site organizations can ignore these fields without losing functionality, although they are encourage to begin using the new fields when appropriate.

## Changes

### New Reference Type -- Section

The new `section` type supplants the previous `site` type. References to a `section` must also specify a `website` in addition to an `id` for denormalization purposes.  `site` objects and references will continue to be supported, but will not denormalize against any website except the "default" website for an organization.

### New Fields

* `taxonomy.sections` - A replacement for `taxonomy.sites` but with the new section type.  A list of all sections across all websites that this document belongs to.

* `taxonomy.primary_section` - A partial replacement for `taxonomy.primary_site`. The primary section (within a website) that this document belongs to.

* `canonical_website` - Specified on an ANS website to indicate which website, of all websites within an organization, should be considered the canonical host of this document for SEO purposes. Typically this is the website that originally created the document.

* `website` - Available only when fetching from Content API for this release. Indicates which `website` copy is being rendered.

* `website_url` - Available only when fetching from Content API for this release. Indicates what url to use for url lookups when the specified `website` is requested.

* `websites` - A global object populated with website-specific data. Each key in this object represents a website for which this content exists (e.g., is published to.). Each key points to an object which may contain up to two fields:
  * `website_section` - The website-specific section (or section reference) that this document belongs to. Unlike taxonomy.sections and taxonomy.primary_section, this is not queryable. May be used by the URL Service to generate URLs.
  * `website_url` - The website-specific url for the keyed website. May be denormalized from URL service if not present.

### New Behavior

`canonical_url` -- In 0.6.0 documents, `canonical_url`, if not provided at ingestion time, will calculated by looking for the `website_url` value for the `canonical_website` in the `websites` dictionary. If `websites` and `canonical_website` are not present, will denormalize from URL service as before.

## Example

```json
{
  "type": "story",
  "version": "0.6.0",

  "canonical_website": "latimes",
  "canonical_url": "/sports/lakers/yay-lakers-win",

  "website": "tribune",
  "website_url": "/sports/bulls/boo-bulls-lose",

  "websites": {
    "latimes": {
      "website_section": {
        "type": "section",
        "version": "0.6.0",
        "_id": "/sports/lakers",
        "_website": "latimes",
        "name": "Lakers"
      }
    },

    "tribune": {
      "website_section": {
        "type": "reference",
        "referent": {
          "type": "section",
          "id": "/sports/bulls",
          "website": "tribune"
        }
      }
    },

    "balsun": {
      "website_url": "/sports/lakers-defeat-bulls"
    }
  },


  "headlines": {
    "basic": "Lakers Defeat Bulls"
  },


  "content_elements": [
    {
      "type": "text",
      "content": "The Lakers defeated the Bulls!"
    }
  ],


  "taxonomy": {
    "primary_section": {
      "type": "reference",
      "referent": {
        "type": "section",
        "id": "/sports",
        "website": "latimes"
      }
    },
    "sections": [
      {
        "type": "section",
        "version": "0.6.0",
        "_id": "/sports/bulls",
        "_website": "tribune",
        "name": "Bulls",
        "parent_id": "/sports",
        "parent": {
          "default": "/sports"
        }
      },
      {
        "type": "section",
        "version": "0.6.0",
        "_id": "/sports/lakers",
        "_website": "latimes",
        "name": "Lakers"
      },
      {
        "type": "section",
        "version": "0.6.0",
        "_id": "/sports",
        "_website": "balsun",
        "name": "Sports"
      }
    ]
  }
}
```
