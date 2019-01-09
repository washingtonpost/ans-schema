# IMAGE ALT TEXT PROPOSAL

# Problem

Anglerfish users want to improve accessibility by adding alt text to fully describe images to those using a screen reader.

# Proposal

Add an `alt_text` trait, represented as a string.

## Title

The recipe should have a title.

## Credits

The recipe should have an ANS credits object.

## Ingredients

Each ingredient should have an `amount` and a `name`.  E.g., "3 grams of baking soda" could be represented as:

```
{
  "type": "ingredient",
  "amount": "3 grams",
  "name": "baking soda"
}
```

## Instructions

Each instructions should be a text element.  Renderers can decide whether to render as a numbered list or a single paragraph.

# Example

```
{
  "type": "story",
  "version": "0.5.9",
  "content_elements": [{
    "type": "recipe",
    "title": "Greg's Broccoli",
    "credits": {
      "by": [{
        "type": "author",
        "name": "Gregory Engel"
      }]
    },
    "ingredients": [
    {
      "type": "ingredient",
      "amount": "1 spoon",
      "name": "minced garlic"
    }, {
      "type": "ingredient",
      "amount": "1/4 cup",
      "name": "olive oil"
    }, {
      "type": "ingredient",
      "amount": "1/4 cup",
      "name": "water"
    }, {
      "type": "ingredient",
      "amount": "2 crowns",
      "name": "broccoli"
    }
    ],
    "instructions": [
    {
        "type": "text",
        "content": "Add garlic, olive oil and broccoli to a frying pan on high heat and cook for 2 minutes."
    }, {
        "type": "text",
        "content": "Add water, cover, and cook for 20 minutes, stirring occasionally."
    }
    ]
  }]
}
```

# Concerns

## Why not use image caption to serve this purpose?

An image caption is a supplement to an image that often assumes that a reader can view the image itself. Alt text is a tenet of accessible web development and aims to fully describe the image. An image often needs alt text and a caption.

# Implementation

Christine Movius of the Anglerfish/Platform Team will implement and add to the schema if this proposal is accepted.
