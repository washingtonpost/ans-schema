# External Canonical URLs

## Problem

Arc XP currently only supports relative canonical URLs and there is an increasing need to support absolute canonical URLs that are outside of Arc's domains. 

### Why is this a problem?

As we go through the problem, I am going to use `canonical_url` when talking about Arc XP's specific ANS field and "Canonical URL" when talking about the more abstract concept of a source-of-truth URL. 

A Canonical URL for a piece of content is intended to represent the one true source of the content. Google and other search engines expect the Canonical URL value to be set in the `<head>` of a webpage using the `<link rel=canonical>` tag. The Canonical URL of a webpage does _not_ need to match the URL of the page. This is important to avoiding duplicated content in search results. Two webpages sharing the same Canonical URL will count as a single result. If Google finds two webapges that seem to share content but point to different Canonical URLs, both webpages take a hit in SEO. 

In Arc, the Canonical URL is set in `<link rel=canonical>` using a combination of `canonical_website` and `canonical_url` ANS fields. Arc assumes that the Canonical URL will always points to a website and url that is hosted in the same Arc organization. 


### Use Cases

Why would an organization need a Canonical URL outside of their own organization? Many organizations have deals with other content producers to share content, either via Wires, Streams, etc. When content is shared across the organizations, the hope is that the original organization gets credit for the content by keeping the original Canonical URL. Currently in Arc, organizations are forced to put their own URL on their webpage, dinging both themselves and the original content producer for SEO. 


## Proposal

We propose adding a new field to ANS called `external_canonical_url` that represents the Canonical URL of an article as it will be presented to Google/SEO in the `<link rel=canonical>` tag. This new top-level trait should exist on all types that have URLs: stories, galleries, and videos. 

### Proposed Workflow
The `external_canonical_url` field should be set at the time of content creation either in Draft API or Composer (or other apps for non-stories). The `external_canonical_url` should be able to accept any fully baked URL.

PageBuilder should also change their engine to check `external_canonical_url` before populating the `<link rel=canonical>` tag. If `external_canonical_url` is set, it should always be used in place of the current logic for combining `canonical_website` and `canonical_url`. 

### Trait Definition

```JSON
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.9/traits/trait_external_canonical_url.json",
  "title": "External Canonical URL",
  "description": "Holds the information about the Canonical URL of this content if outside of the organization",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "url": {
      "description": "The fully-baked URL",
      "type":"string",
      "format":"uri"
    },
    "provider": {
      "type": "string",
      "description": "The originating content producer of the content. (Example: Stacker)"
    }
  }
}
```

## In a Story


```JSON
{
  "type": "story",
  "version":"0.10.9",
  ...
  "external_canonical_url": {
    "url": "https://www.my-website.com/news/big-story",
    "provider": "Associated Press"
  },
  ...
}

```

### Open Questions
1. Should this be a top-level field or part of the existing `distributor` trait? 

## Concerns

### Usage of the Field

The biggest concern is misuse of this field. `canonical_url` is currently set automatically as a derived field, representing the URL of the content on its primary `canonical_website`. URLs themselves are often generated automatically within Arc as well. If this field is left open to end-users, there is always a risk of misuse, typos, or misalignment between the setting and consumption of the field. 

To mitigate this, the trait will be defined with a format of `uri` so that only a full valid URL can be stored in this field. 

## Implementation

The Publishing Platform team will implement the field in ANS along with releasing the ANS Schema. 

However, for this field to be properly used, we also need: 
1. PageBuilder support for consuming the field if it exists 
2. Composer support for exposing the field for users to set
3. PS support in Wires and other adapters if required. 

