# Allow Text Elements in Link Lists Proposal

# Problem

Some clients like the content-element-group-like nature of Link Lists but have use cases where the content editor isn’t actually linking out. They’d like to make the URL optional. This would be an org-level setting but currently interstitial links require a URL.

# Proposal

Make the URL in a link list entry optional, or, to put it another way, allow link lists to support text elements in addition to interstitial links.

# Example

```
"items": {
      "title": "Links",
      "description": "The links in this list.",

      "type": "array",
      "items": {
        "oneOf": [
          {
            "type": "interstitial_link",
            "content": "The title to my link",
            "url": "www.google.com",
          },
          {
            "type": "text",
            "content": "This is just a text element that's part of a link list. It won't link anywhere."
          }
        ]
      },
      "minItems": 1,
      "maxItems": 10
    }
```

# Concerns

No concerns at this time.

# Implementation

The Composer team will implement this and add to the schema if this proposal is accepted.