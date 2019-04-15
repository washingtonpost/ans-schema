# Table of Contents Anchors for Content Elements

# Problem

Users want the ability to have a jump links within an article.

# Proposal

We propose adding two new content types, `Table of Contents` and `Anchor`.
- Anchor Link List / Table of Contents
- Anchor

# Anchor
A new content type used to create a hidden horizontal rule which will be utilized to auto generate a Link List/TOC. This hidden horizontal rule will have two properties, `content` and `id`.
- `content` : inner text that will be used to form the hyperlink link
- `id`: An id used to reference common links so that it may be treated as a "type" for filterning. This is seperated from the ANS `_id` which we will use as the id to target


# Table of Contents
A new content type which will auto generate a list of links based on Anchor's within an article.

When using the `Table of Contents` content type within a story, a user can place the TOC any where within the article. The TOC will auto generate a list of links based on the `Anchor`'s within it, starting from top to bottom. Each link will be formed based on the `Anchor`'s properties.
```
<a href="[_id]" data-type="[id]">[content]</a>
<a id="[_id]" />
```

# Anchor Schema Example
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.0/story_elements/anchor.json",
  "description": "An anchor link within an article",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "type": {
      "enum": [ "anchor" ]
    },
    "_id": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.0/traits/trait_id.json"
    },
    "additional_properties": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.0/traits/trait_additional_properties.json"
    },
    "id": {
      "title": "Anchor ID",
      "description": "The ID used to identify similarly used anchors",
      "type": "string"
    },
    "content": {
      "title": "Anchor Link Text",
      "description": "The text that should be used to link to the anchor .",
      "type": "string"
    }
  },
  "required": [ "type", "content" ]
}
```

# TOC Schema Example
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.0/story_elements/toc.json",
  "title": "Table of Contents",
  "description": "A list of anchor links embedded in a story. Can be used as jump links within an article.",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "type": {
      "enum": [ "toc" ]
    },
    "_id": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.0/traits/trait_id.json"
    },
    "subtype": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.0/traits/trait_subtype.json"
    },
    "channels": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.0/traits/trait_channel.json"
    },
    "alignment": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.0/traits/trait_alignment.json"
    },

    "additional_properties": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.0/traits/trait_additional_properties.json"
    },

    "items": {
      "title": "Anchor Links list",
      "description": "The anchors within the article",

      "type": "array",
      "items": {
        "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.10.0/story_elements/anchor.json"
      },
      "minItems": 1,
      "maxItems": 10
    }
  },
  "required": [ "type", "items" ]
}
```

# Concerns

## How will this be used to generate a table of contents or list of anchor links?
There will be two possible solutions for creating a TOC or a list of anchor links.
- Use the `Table of Contents` content type within `Ellipsis`
- Create a custom template within `PageBuilder`

When using a custom template within `PageBuilder`, the list of anchors can then be re-ordered and/or filtered with using the `id` trait of the `Anchor`.

# Alternatives Considered



