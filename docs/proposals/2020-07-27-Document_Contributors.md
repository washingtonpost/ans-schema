
# Problem

Throughout Arc, there is no canonical way to track who has created or contributed to a particular document. While each Revision of a Story has a user_id associated, with the introduction of the Publishing Platform, there are contributions to a document that can be made without creating a Revision (ie Circulations). Plus, to get the creator, you'd need a way to easily go get the first ever Revision, which can sometimes involve paginating through hundreds of Revisions.

Authors exist in Arc, but pose a problem when content is created by someone who is not really an Author in Arc (ie Admin users) OR created by someone other than the person that should appear on the final reader-facing page (ie ghost writers).

An upcoming use case of Arc Broadcast is a homepage view, which will show app users a feed of content created within their organization's Broadcast app. Ideally, this homepage would be able to show content created in Broadcast by the user themselves, in order to make it easy for the user to jump into their own content while on the go.

# Proposal

Add a `contributors` trait to the Story, Video, Image, Gallery, and Content Types that will hold key information about the person(s) who created and then later edited the Document.

For this MVP, the `contributors` trait will have one key field, `created_by`, which holds an object with a `display_name` and unique identifier, `user_id` of a given person.

In the future, there is likely a scenario in which we want to track *all* contributors to a document, in which case we can add another subfield for this, which is why I've proposed a `contributor` and then `created_by` subfield. The theory then being we could add an `updated_by` field which holds an array of contributors. 


We will need `contributors.created_by.user_id` at least to be an indexed field that can be search on in Content API.


# Proposed Schema

```
{
  "title": "Contributors",
  "description": "Trait that holds information on who created and contributed to a given document in Arc.",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "created_by": {
      "description": "The Creator of the Document.",
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string"
          "description": "The unique ID of the Arc user who created the Document"
        },
        "display_name": {
          "type": "string"
          "description": "The display name of the Arc user who created the Document"
        }
      }
    }
  }
}
```

## Example

```
...
"contributors": {
  "created_by" : {
    "user_id": "megan.delaunay@washpost.com",
    "display_name": "Megan DeLaunay",
  }
}
...
```

# Concerns

## Editorial Adoption

The `contributors` trait will be most useful once multiple editorial apps are using it, so we'll want to slot tickets on the Video Center, Photo Center, Composer, and Broadcast boards to set this field on the creation of Content.

For API Users, ie, creating content directly in Draft API or other creation APIs, it will be the user's responsibility to set this field if desired. Otherwise, it will be left blank.

## Exposed Editorial Fields

Isn't this just another Editorial Field that will now be accessible via Content API? Aren't we trying to get rid of those? Yes and also yes.

In the long term, the preference would definitely be to have a separate product (as a part of Draft API) that is geared towards searching and rendering for Editorial-specific fields, like the `planning` trait, these `contributors`, `inline_comments`, and others. Ticket PPSE-65 addresses a short term option for this, which is to by default not expose those fields in Content API. There are other options that can make this even more robust until an Editorial Search product is available within the Publishing Platform.


# Implementation

The Broadcast team with help from Megan DeLaunay will implement this and add to the schema if this proposal is accepted.
