# Problem

Some content can be restricted due to various reasons. We want to leave a placeholder for when these omissions occur with a message as to the reason why.

# Proposal

We propose that a new restricted content element can be returned in the place of a content element if it is restricted. Any sub-elements of the restricted content are also excluded.

## Example
```json
{
  "_id": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "type": "restricted_content",
  "version": "0.7.1",

  "restricted_content": {
    "type": "reference",
    "referent": {
      "id": "ABCFE...",
      "type": "gallery"
    }
  },

  "reasons": [{
    "restriction_id": "DEFGHIJKL",
    "message": "This content is not available on website baltimore-sun because of restriction 'Tribune-only restriction'."
  }]
}
```

# Concerns

## What do each of the IDs pertain to?

The id held in the top level object is the id for the restricted content replacement object. The id in the restricted_content field is the id of the content that is restricted. The id in the reasons field is the id of the restriction that applied to the content.


# Implementation

Omar Khan of Platform Services will implement this and add to the schema if this proposal is accepted.
