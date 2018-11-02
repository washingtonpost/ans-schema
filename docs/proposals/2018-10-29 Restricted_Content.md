# Problem

Some content can be restricted due to various reasons. We want to leave a placeholder for when these omissions occur with a message as to the reason why.

# Proposal

We propose that a new restricted content element can replace the content element when it is removed.

## Example
```json
{
  "_id": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "type": "story",
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

# Implementation

Omar Khan of Platform Services will implement this and add to the schema if this proposal is accepted.
