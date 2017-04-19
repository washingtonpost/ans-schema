# SAMPLE PROPOSAL - THIS IS NOT A REAL FEATURE REQUEST

# Problem

A user needs to embed a recipe within a story.

# Proposal

Add a `recipe` content element, represented as a list of ingredients and instructions.

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

## Isn't this somewhat duplicative with the existing `list` and `text` elements?

Identifying a semantic recipe on a page clearly is useful rendering information, as well as enabling search by ingredient.

# Implementation

Gregory Engel of Platform Services will implement this and add to the schema if this proposal is accepted.
