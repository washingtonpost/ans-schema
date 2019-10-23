## Problem
Currently, editors can only add URLs in `interstitial_link` to Link Lists. This presents a few issues:
1. it's not possible to use a Link List until all of the desired content is published
2. it's not as straightforward to fetch additional information about the story with just the URL

## Proposal
We propose to add additional traits, `Story`, `Video`, and `Gallery`, to `interstitial_link`, so we can add more types of elements by ~reference~  promo_references to link lists in addition of `image`.

However, unlink `image`, which is used only for presentation purpose, the `story`, `video`, and `gallery` will be used for a link to it's own content. Therefore, the `url` field should become unavailable when either of the ~reference~ promo_references to `story`, `video`, and `gallery` are being used.
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
      "type": "promo_references",
      "referent": {
        "type": "story",
        "id": "BBB"
      }
    },
    "video": {
      "type": "promo_references",
      "referent": {
        "type": "video",
        "id": "CCC"
      }
    },
    "gallery": {
      "type": "promo_references",
      "referent": {
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
**So is the idea that an `interstitial_link` now can link to a url, a story, video or gallery? But only one of those would ever be present?**<br>
Yes and Yes

**Does this mean “show a gallery here” or “show a link to a gallery here?**<br>
This means show a link to a gallery here.

**What about the potential performance impact if a content producer adds 20 story reference `interstitial_link`s in a Link List?**<br>
Link Lists are capped at 10 content elements.

**Using `reference` would slow down Content API since all of references will be inflated by it, any have alternative approach?**<br>
One alternative we could explore is taking the same proposal, but use `promo_references` instead. Essentially the same idea from the Composer side, but it would not inflate in CA. This means the items wouldn’t be searchable (probably fine) but the bigger drawback would be dev work / performance hit on the front-end. - Greg

**Are the limit for the number of interstitial links not necessary, since we are partially-denormalizing?**<br>
Prefer to still have a limit set, 100 or fewer.

## Implementation
Taiwei Tuan of Composer team will implement this and add to the schema if the proposal is accepted.
