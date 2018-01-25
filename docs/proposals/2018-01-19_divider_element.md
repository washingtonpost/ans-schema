# DIVIDER ELEMENT PROPOSAL

# Problem

Partners what to be able to specify a division in a story to indicate a break. They can choose to style this division how ever they want. But typically in HTML it would be an hortizontal rule element. 

# Proposal

Add a `division` content element. It would have no properties to set. 

# Concerns

## We denied this request in the past

There was no formal proposal, it was brought up in one of the forum meetings. We said that it was more of a styling element and we did not want to add it in. TGAM wants this and other partners have expressed interest in the ability to add it. The only way to currently to do this is add a Raw HTML block and set the content to hr. The problem with raw html is mobile will most likely ignore it.

## Is there any other way to solve it?

We could use properties on all the elements to suggest a division before or after the element, but that seems very complicated to implement. Or as stated above, we could use raw_html, but that is not a universal solution. 

## How could it be extended in the future?

They can add custom subtypes or maybe an optional property to sepecify the type of division. We should not set a list, they can come up with them on their own. 

# Example

```javascript

{
  "_id": "1234567890",
  "type": "story",
  "version": "0.6.0",
  "content_elements": [
    {
      "_id": "123",
      "type": "text",
      "content": "this is my first paragraph"
    }, {
      "_id": "456",
      "type": "divider"
    }, {
      "_id": "789",
      "type": "text",
      "content": "this is my second paragraph"
    }
  ]
}

```


# Implementation

```javascript

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.6.0/story_elements/divider.json",
  "description": "A representation of a division in the content",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "type": {
      "enum": [
        "divider"
      ]
    },
    "_id": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.6.0/traits/trait_id.json"
    },
    "subtype": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.6.0/traits/trait_subtype.json"
    },
    "channels": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.6.0/traits/trait_channel.json"
    },
    "alignment": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.6.0/traits/trait_alignment.json"
    },
    "additional_properties": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.6.0/traits/trait_additional_properties.json"
    }
  },
  "required": []
}

```
