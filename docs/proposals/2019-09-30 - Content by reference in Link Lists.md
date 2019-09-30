## Problem
Currently, editors can only add URLs in `interstitial_link` to Link Lists. This presents a few issues:
1. it's not possible to use a Link List until all of the desired content is published
2. it's not as straightforward to fetch additional information about the story with just the URL

## Proposal
We propose to add additional traits, `Story`, `Video`, and `Gallery`, to `interstitial_link`, so we can add more types of elements by reference to link lists in addition of `image`.

## Example
```JSON
{
  "type": "interstitial_link",
  "subtype": "",
  "content": "British boxer bites opponent",
  "url": "https://www.washingtonpost.com/sports/2019/04/01/british-boxer-suffers-dental-breakdown-bites-opponent-ring/",
  "description": {
    "type": "text",
    "content": "A <em>British boxer</em> has had his license suspended after being disqualified for biting during a <strong>heavyweight</strong> fight."
  },
  "image": {
    "type": "reference",
    "referent": {
      "type": "image",
      "id": "AAA"
    }
  },
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
  }
}
```
## Questions and Concerns

## Implementation
Taiwei Tuan of Composer team will implement this and add to the schema if the proposal is accepted.
