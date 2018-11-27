# Adding robot_instructions

# Problem

Currently, there is no dedicated way in ANS to indicate how a standalone content like story, image, or video should be treated by robots or crawlers. For example, if we need to block a story from appearing in Google search, we need to add a meta tag `<meta name="googlebot" content="noindex">` to prevent Google indexing it. Therefore this proposal is to provide a configurable way for the authoring applications to add instructions for different robots, so the content serving applications can add appropriate meta tags in the content.

# Proposal

We propose to add a new trait `robot_instructions` which contains keys as the robot types with a list of instructions for each of the robot.

### trait_robot_instructions

```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://raw.githubusercontent.com/washingtonpost/ans-schema/master/src/main/resources/schema/ans/0.8.1/traits/trait_robot_instructions.json",
  "title": "Robot Instructions",
  "type": "object",
  "description": "Lists of instructions for different types of robots",
  "patternProperties": {
    "^[\w-]+$": {
      "type": "array",
      "description": "Instructions for the robot",
      "items": {
        "type": "string"
      }
    }
  }
}
```

### Sample Story

```
{
  "type": "story",
  "version": "0.8.1",
  "robot_instructions": {
    "googlebot": ["noindex", "nofollow"],
    "Googlebot-News": ["noindex"]
  }
}
```

# Concerns

Do we need to be more restrict on the instruction strings using enum noindex, nofollow, none, ...etc (listing all allowed strings)?

# Implementation

Cheng-Hsin Weng from Ellipsis team will implement this and add it to the schema if this proposal is accepted.
