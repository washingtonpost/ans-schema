
# Problem

Character count exists in Composer but isn't reflected in ANS. As we bring on clients with character-based languages, we should treat character counts as an equal citizen like word and line count, and allow for planning.

# Proposal

Add additional traits `character_count_planned` and `character_count_actual` under `Planning -> Story Length` to reflect planned and actual character counts.

# Proposed Schema

```
{
    "story_length": {
    "description": "Story length information.",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "character_count_planned": {
        "description": "The anticipated number of characters in the story.",
        "type": "integer"
      },
      "character_count_actual": {
        "description": "Current number of characters.",
        "type": "integer"
      }
    }
  }
}
```

# Concerns

No concerns at this time.

# Implementation

The Composer team will implement this and add to the schema if this proposal is accepted.
