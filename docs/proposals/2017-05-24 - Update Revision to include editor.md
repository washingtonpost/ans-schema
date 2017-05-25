# Add Editor to Revision Trait
## Problem

There is no way to know what changed the story when it was saved. 
It would be nice to glance at any revision and know if it was Ellipsis, 
or something else. We do have the source information, but that is what 
started it, not what updated it. 

## Proposal

Add an optional `editor_id` property to the revision trait which holds a 
string that represents a key for what made the change. If the `editor_id` 
property is not set with a new revision, than the old value would be 
removed from the revision object.

```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.5.9/traits/trait_revision.json",
  "title": "Revision",
  "description": "Trait that applies revision information to a document. In the Arc ecosystem, many of these fields are populated in stories by the Story API.",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "revision_id": {
      "description": "The unique id of this revision.",
      "type": "string"
    },
    "parent_id": {
      "description": "The unique id of the revision that this revisions was branched from, or preceded it on the current branch.",
      "type": "string"
    },
    "branch": {
      "description": "The name of the branch this revision was created on.",
      "type": "string"
    },
    "editions": {
      "description": "A list of identifiers of editions that point to this revision.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "user_id": {
      "type": "string",
      "description": "The unique user id of the person who created this revision."
    },
    "published": {
      "type": "boolean",
      "description": "Whether or not this revision's parent story is published, in any form or place"
    },
    "editor_id": {
      "description": "The id of the system that made changes to the ANS object.",
      "type": "string"
    },
    "additional_properties": {
      "$ref": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.5.9/traits/trait_additional_properties.json"
    }
  }
}
```
