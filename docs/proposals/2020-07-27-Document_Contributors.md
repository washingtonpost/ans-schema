
# Problem

Throughout Arc, there is no canonical way to track who has created or contributed to a particular document. While each Revision of a Story has a user_id associated, with the introduction of the Publishing Platform, there are contributions to a document that can be made without creating a Revision (ie Circulations). Plus, to get the creator, you'd need a way to easily go get the first ever Revision, which can sometimes involve paginating through hundreds of Revisions.

Authors exist in Arc, but pose a problem when content is created by someone who is not really an Author in Arc (ie Admin users) OR created by someone other than the person that should appear on the final reader-facing page (ie ghost writers).

An upcoming use case of Arc Broadcast is a homepage view, which will show app users a feed of content created within their organization's Broadcast app. Ideally, this homepage would be able to show content created in Broadcast by the user themselves, in order to make it easy for the user to jump into their own content while on the go.

# Proposal

Add a `contributors` trait to the Story, Video, Image, Gallery, and Content Types that will hold key information about the person(s) who created and then later edited the Document.

For this MVP, a limit of length 1 on the array is acceptable, holding just the information on the `creator`. However, as we move forward with this feature in Broadcast, there may be a desire to hold a list of all contributors to the Document, which is why it is an Array.

Within the `contributor` object, each contributor will have three fields -- `user_id`, `display_name`, and `creator`. The first two are just Strings that hold an identifier and a human-readable display name. The last is a Boolean value for whether or not this person was the initial `creator` of the Document. (But I am very open to other/better suggestions on how to do this).

We will need `contributors[].user_id` at least to be an indexed field that can be search on in Content API, and probably `contributors[].creator` as well, if we do decide to pursue tracking a list of all contributors.


# Proposed Schema

```
"contributors": {
  "type": "array",
  "description": "An array containing contributor objects. Limited to a size of 1 for now.",
  "minItems": 1,
  "maxItems": 1,
  "items": {
    "type": "object",
    "description": "An object specifying a contributor to the Document.",
    "additionalProperties": false,
    "properties": {
      "user_id": {
        "type": "string",
        "description": "The unique identifier of the user, should be their email."
      },
      "display_name": {
        "type": "string",
        "description": "The display name for the user."
      },
      "creator": {
        "type": "boolean",
        "description": "T/F if the user is the original creator of the document."
      }
    },
    "required": ["user_id", "creator"]
  }
}
```

## Example

```
...
"contributors": [
 {
  "user_id": "megan.delaunay@washpost.com",
  "display_name": "Megan DeLaunay",
  "creator": True
 }
]
...
```

# Concerns

## Editorial Adoption

The `contributors` trait will be most useful once multiple editorial apps are using it, so we'll want to slot tickets on the Video Center, Photo Center, Composer, and Broadcast boards to set this field on the creation of Content.

For API Users, ie, creating content directly in Draft API or other creation APIs, it will be the user's responsibility to set this field if desired. Otherwise, it will be left blank.


# Implementation

The Broadcast team with help from Megan DeLaunay will implement this and add to the schema if this proposal is accepted.
