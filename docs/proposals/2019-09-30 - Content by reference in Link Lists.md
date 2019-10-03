## Problem
Currently, editors can only add URLs in `interstitial_link` to Link Lists. This presents a few issues:
1. it's not possible to use a Link List until all of the desired content is published
2. it's not as straightforward to fetch additional information about the story with just the URL

## Proposal
We propose to add additional traits, `Story`, `Video`, and `Gallery`, to `interstitial_link`, so we can add more types of elements by reference to link lists in addition of `image`.

However, unlink `image`, which is used only for presentation purpose, the `story`, `video`, and `gallery` will be used for a link to it's own content. Therefore, the `url` field should become unavailable when either of the reference to `story`, `video`, and `gallery` are being used.
## Example
```JSON
{
  "type": "interstitial_link",
  "subtype": "",
  "content": "British boxer bites opponent",
  "description": {
    "type": "text",
    "content": "A <em>British boxer</em> has had his license suspended after being disqualified for biting during a <strong>heavyweight</strong> fight."
  },
  "oneOf": [{
    "url": "https://www.washingtonpost.com/sports/2019/04/01/british-boxer-suffers-dental-breakdown-bites-opponent-ring/",
    "story": {
      "type": "reference",
      "referent": {
        "type": "story",
        "id": "BBB"
      }
    },
    "video": {
      "type": "reference",
      "reference": {
        "type": "video",
        "id": "CCC"
      }
    },
    "gallery": {
      "type": "reference",
      "reference": {
        "type": "gallery",
        "id": "DDD"
      }
    },
  }],
  "image": {
    "type": "reference",
    "referent": {
      "type": "image",
      "id": "AAA"
    }
  },
}
```
## Questions and Concerns

## Implementation
Taiwei Tuan of Composer team will implement this and add to the schema if the proposal is accepted.
