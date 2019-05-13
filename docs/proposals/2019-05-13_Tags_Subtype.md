# Problem

Users want to be able to add tags to stories without using the Tags API and they should be searchable by subtype and able to be differentiated between different use cases, such as manual vs. automatic

# Proposal

We propose that the necessary subtype field in tags be included in the ANS schema so that users can search on it.

## Example
```json
{
  "_id": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "type": "story",
  "version": "0.10.1",

  "taxonomy": {
    "tags": {
      "_id": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "text": "some text",
      "description": "some description",
      "slug": "some-slug",
      "subtype": "some subtype"
    }
  }
}
```

# Implementation

Omar Khan of Platform Services will implement this and add to the schema if this proposal is accepted.
