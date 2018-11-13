# Adding raw_html type into promo_items

# Problem

Tronc wants to set an arbitrary raw HTML as a promo item. This should include `basic` key in the `promo_items` object. Currently, only [reference](https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.7.1/utils/reference.json) and [content](https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.7.1/content.json) types are allowed under `promo_items`.

# Proposal

Add [raw_html](https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.7.1/story_elements/raw_html.json) as a supported type to the both `basic` and all other keys under `promo_items` object.

### trait_promo_items

```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/traits/trait_promo_items.json",
  "title": "Promo Items",
  "type": "object",
  "description": "Lists of promotional content to use when highlighting the story. In the Arc ecosystem, references in these lists will be denormalized.",
  "properties": {
    "basic": {
      "oneOf": [
        {
          "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/content.json"
        },
        {
          "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/utils/reference.json"
        },
        {
          "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/story_elements/raw_html.json"
        }
      ]
    }
  },
  "patternProperties": {
    ".*": {
      "oneOf": [
        {
          "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/content.json"
        },
        {
          "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/utils/reference.json"
        },
        {
          "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/story_elements/raw_html.json"
        }
      ]
    }
  }
}
```

# Concerns

A `basic` key has its own set of validation rules. This might be done for a reason. By default Ellipsis treat `basic` key as an `image` type, however, it's flexible.

# Implementation

Yury Sannikov from Ellipsis team will implement this and add it to the schema if this proposal is accepted.