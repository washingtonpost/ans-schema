# Adding Color Metadata to the paragraph

# Problem

Infobae wants to be able to highlight text in paragraphs. An example story is
https://www.infobae.com/opinion/2018/08/08/el-sonido-de-la-sororidad/

Colors are restricted to the text elements only. Hovewer, it might apply later to the other content elements.

# Proposal

Create a new field `colors` in the `story_elements/text.json`. Also, create a trait named `trait_colors`. It should be an array. Each item should contain the following fields:

- `start` of type `number` which contains a color start position in a text
- `length` of type `number` which will be a non-zero value of the colored text
- `class_name` of type `string` which will be a CSS class name applied to the HTML `<span>` element. Its name comes from the Ellipsis settings.

### trait_colors

```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/traits/trait_colors.json",
  "title": "Colors",
  "description": "Trait that applies a list of colors to a paragraph.",
  "type": "array",
  "items": {
    "type" : "object",
    "properties" : {
      "start" : {
        "description": "Color start position",
        "type" : "number",
        "minimum": 0
      },
      "length" : {
        "description": "Color length",
        "type" : "number",
        "minimum": 1
      },
      "class_name" : {
        "description": "A CSS class name to the HTML element for the Page Builder",
        "type" : "string",
        "minLength": 1
      }
    },
    "required": [ "start", "length", "class_name" ]
  }
}
```

### story_elements/text.json

```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/story_elements/text.json",
  "description": "A textual content element",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "type": {
      "type": "string",
      "enum": [ "text" ]
    },
    "_id": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/traits/trait_id.json"
    },
    "subtype": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/traits/trait_subtype.json"
    },
    "channels": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/traits/trait_channel.json"
    },
    "alignment": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/traits/trait_alignment.json"
    },
    "colors": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/traits/trait_colors.json"
    },
    "additional_properties": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.7.1/traits/trait_additional_properties.json"
    },
    "content": {
      "description": "The text of the paragraph.",
      "type": "string"
    }
  },
  "required": [ "type", "content" ]
}

```

# Concerns

Overlaps and out of range color ranges

Color selections should not overlap and not be out of the text length range. Overlapped color will be applied over the previous color and replace it in the occurrence order. Ranges out of the text length boundaries will be discarded or trimmed to the boundary.

# Implementation

Jon Peterson on the Anglerfish team will implement this and add it to the schema if this proposal is accepted.
