# Adding Geo-Restriction Information to the content_restrictions Trait

# Problem

Certain clients need the ability to restrict content based on a user's geographical location, and to decide the amount of time that a piece of content is allowed to be publically viewed. To support this, documents must be associated with restrictions in some way.

# Proposal

We propose extending the `content_restrictions` trait to include a `geo` field, which maps to an object that contains the restriction information the document should be associated with. For the moment, only videos should be allowed to use the `geo` field.

## restrictions

The `geo` object should have a `restrictions` field. This field would map to an array of restriction objects, each of which contains a `restriction_id`. The `restrictions` array should be limited to a size of 1 for now.

## Example
```
{
  "type": "video",
  "version": "0.10.4",
  "content_restrictions": {
    "geo": {
      "restrictions": [{
        "restriction_id": "abcdefghijklmnopqrstuvwxyz"
      }]
    }
  }
}
```

# Concerns

## Why not store the document/restriction associations in PubStack, or in a dedicated new service?

While this would eliminate the need for a later migration, it isn't feasible under the current time constraints.

# Implementation

The Core Services team will implement this if the proposal is accepted. The ticket already exists in the Content API project: [CA-1917](https://arcpublishing.atlassian.net/browse/CA-1917)
