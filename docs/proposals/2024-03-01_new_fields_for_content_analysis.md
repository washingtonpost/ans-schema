# New fields for integration of external analysis tool
Version>=`0.10.10`

# Problem

The current ANS schema does not have dedicated fields for categories, content topics, and entities within the Taxonomy section. This limitation complicates the integration and comparison of data sources such as TextRazor with existing fields in Clavis v2.

# Proposal

This document proposes the addition of three new fields to the ANS schema to improve data classification and facilitate the integration of external analysis tools.

* New fields in the Taxonomy section for ANS:
  * `categories`
  * `content_topics`
  * `entities`

These fields will be placed in the Taxonomy section, following the `auxiliaries` field and preceding the `tags` field, to ensure a structured and accessible data model.

## Fields

1. Categories

   
```
{
  "$schema": ...
  "id": ".../category.json",
  "title": "Category",
  "description": "Models a category used in classifying a piece of content.",
  "type": "object",
  "required": [
    "_id",
    "classifier"
    "name",
    "score",
  ],
  "additionalProperties": false,
  "properties": {
    "_id": {
      "type": "string",
      "description": "The unique ID for this category within its classifier."
    },
    "classifier": {
      "type": "string",
      "description": "The unique identifier for the classifier that matched this category."
    }
    "name": {
      "type": "string",
      "description": "The human readable label for this category."
    },
    "score": {
      "type": "number",
      "description": "The score assigned to this category between 0 and 1, where 1 is an exact match."
    },
   
  }
}
```

2. Content Topics
```
{
  "$schema": "...",
  "id": ".../content_topic.json",
  "title": "Content Topic",
  "description": "Models a keyword used in describing a piece of content.",
  "type": "object",
  "required": [
   "_id",
   "label",
   "score",
  ],
  "additionalProperties": false,
  "properties": {
  "_id": {
      "type": "string",
      "description": "The unique Wikidata ID for this topic."
    },
    "label": {
      "type": "string",
      "description": "A topic this piece of content is about."
    },
    "score": {
      "type": "number",
      "description": "The score assigned to this topic between 0 and 1, where 1 is an exact match."
    },
    
  }
}
```
   
3. Entities
```
{
  "$schema": "...",
  "id": ".../entity.json",
  "title": "Entity",
  "description": "Models a named entity (i.e. name of a person, place, or organization) used in a piece of content.",
  "type": "object",
  "required": [ 
    "label",
    "score"
  ],
  "additionalProperties": false,
  "properties": {
    "_id": {
      "type": "string",
      "description": "The unique Wikidata ID for this entity."
    },
    "custom_id": {
      "type": "string",
      "description": "A unique identifier for a custom-defined entity."
    },
    "label": {
      "type": "string",
      "description": "The actual string of text that was identified as a named entity."
    },
    "type": {
      "type": "string",
      "description": "A description of what the named entity is. E.g. 'organization', 'person', or 'location'."
    },
    "score": {
      "type": "number",
      "decription": "The score assigned to this entity between 0 and 1, where 1 is an exact match."
    }
  }
}
```
### Example
In the examples below, we are using "..." where the reference URL will be updated with the latest version numbers. Otherwise, definitions are:

```
"categories": {
      "type": "array",
      "items": {
        "$ref": ".../category.json"
      },
      "description": "A list of categories.  Categories are overall, high-level classification of what the content is about."
    },
"content_topics": {
      "type": "array",
      "items": {
        "$ref": ".../content_topic.json"
      },
      "description": "A list of topics. Topics are the subjects that the content is about."
    },
"entities": {
      "type": "array",
      "items": {
        "$ref": ".../entity.json"
      },
      "description": "A list of entities. Entities are proper nouns, like people, places, and organizations."
```

## Modified/Added Schema

* The following JSON schemas will be added or modified in ANS:
  * `/src/main/resources/schema/ans/0.10.10/utils/categories.json`
  * `/src/main/resources/schema/ans/0.10.10/utils/content_topics.json`
  * `/src/main/resources/schema/ans/0.10.10/utils/entities.json`


## Concerns

### Backward Compatibility
These changes are designed to be backward compatible, with additional fields enhancing the schema without affecting existing implementations.

### Data Size and Performance
Adding these fields could increase the size of ANS documents. Performance implications will be monitored, and optimizations will be considered as needed.

## Alternatives Considered
### Extension of the Additional Properties Field:
Initially, categories, content topics, and entities were considered for inclusion in the Additional Properties field. However, this approach was deemed less structured and harder to standardize across implementations.

## Implementation
The implementation of this integration will be carried out by the Intelligence team (aka Clavis team) with the support of the IFX team for the recipe. 


