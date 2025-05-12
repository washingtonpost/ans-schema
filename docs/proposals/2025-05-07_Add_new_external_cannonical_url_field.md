# Adding new field canonical_url_external for story traits
Version>=`0.10.11`

# Problem

Customers need to support canonical URLs that are outside of Arc’s domains. This is a source of truth URL, and it often comes up in situations where an Arc client is receiving and paying for third party content, and has a need to attribute that URL back to the origin source for SEO purposes. 

When content is shared across the organizations, the hope is that the original organization gets credit for the content by keeping the original Canonical URL. 

Currently in Arc, organizations are forced to put their own URL on their webpage, dinging both themselves and the original content producer for SEO.

# Proposal

This document proposes addition of new fields to ANS schema which will allow Arc users to attribute page URLs back to origin source for SEO purposes.

* New fields in story ANS schema:
    * `canonical_url_external` 

# Example
```
{
    "_id": "unique ANS id",
    "type": "story",
    "version": "0.10.11",
    "copyright": "(c) 2015 The Washington Post, Inc.",
    "canonical_url_external": "http://www.washingtonpost.com/local/anesthesiologist-trashes-sedated-patient-jury-orders-her-to-pay-500000/2015/06/23/cae05c00-18f3-11e5-ab92-c75ae6ab94b5_story.html",
}
```


# Implementation

Pagebuilder would need to configure their engine to check for the existence of `canonical_url_external` before populating the <link> tag

`canonical_url_external` should be shown in Composer Settings

Refer:[Proposal Doc](https://arcpublishing.atlassian.net/wiki/x/boCypg)
