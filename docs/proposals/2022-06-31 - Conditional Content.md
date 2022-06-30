# Conditional Content

Version>=0.10.9

# Background

At Arc, we typically talk about newsrooms being organized by website, but many newsrooms have desks within them that are organized around particular markets or subject matter.

The hub-and-spoke relationship between a national content desk and multiple local market desks is being enhanced for stories.  The hub editor (national content desk) will create a story.  A spoke editor (local market desk) will be able to create a variant of the main story that contains unique content which shows on their local websites.

To facilitate this, the hub editor will be able to place a new content item on their story to designate where a spoke editor can add their unique local content.  A spoke editor will create unique content that appears in place of the new content items for this local variant of the story.  All editors can all work on their version of the story without locking each other.

## Content Elements

https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.10.9/story_elements/content_zone.json

A new ANS content element will be defined to represent a `content zone` in the `content_elements` array of a Story document.  It can be added to a hub story’s content_elements.  It cannot be added to the content of a variant.  This element will be replaced with content from a variant when applicable.

## Story Variants

https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.10.9/utils/variant.json

A `variant` is a new ANS element which represents conditional content for a Story document.  A variant relates to a single story.  Multiple variants may related to the same story.  Each variant contains a list of websites (the condition).  If the Story is requested from a website set on a variant, then the data defined on the variant will be used in place of the main story data.