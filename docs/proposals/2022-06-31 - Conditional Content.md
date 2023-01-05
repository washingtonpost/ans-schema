# Conditional Content

Version>=0.10.9

# Overview

This document proposes ANS spec changes to support conditional content.

A `variant` object contains conditional content data for a story. 

> [/ans/0.10.9/utils/variant.json](https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.10.9/utils/variant.json)

A `content_zone` story element represents a location for inserting `variant` content into story content.

> [/ans/0.10.9/story_elements/content_zone.json](https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.10.9/story_elements/content_zone.json)

# Background

At Arc, we typically talk about newsrooms being organized by website, but many newsrooms have desks within them that are organized around particular markets or subject matter.

The hub-and-spoke relationship between a national content desk and multiple local market desks is being enhanced for stories.  The hub editor at the national content desk will create a story.  A spoke editor at a local market desk will be able to create a variant of the main story that contains unique content which shows on their local websites.

Conditional content enables Draft API to define variations of a story.  It also allows Content API to efficently render variations of stories.

## Variant object

[/ans/0.10.9/utils/variant.json](https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.10.9/utils/variant.json)

A `variant` defines a condition and content combination associated with a story.  A story may have 0 or many variants.

    variant = {
        // Condition of the variant
        "websites": [            
            "MySite1",
            "MySite2",
            ...
        ],

        // Content of the variant
        "content": {
            "$ref": "schema/ans/0.10.9/story.json",
        },

        // Meta-data
        "type": "variant"
        "name": "My Variant",
        "published": true
        "publish_date": "2022-10-09T07:20:50.00Z",
        "created_date": "2022-10-08T08:18:50.00Z",
        "last_updated_date": "2022-10-09T07:20:50.00Z",
    }

Limitations
* Only websites are supported as a condition.  Future conditions would need aditional changes to the ANS spec.
* Revisions for Variants are not supported.

## Content Zone story element

[/ans/0.10.9/story_elements/content_zone.json](https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.10.9/story_elements/content_zone.json)

To enable editors to place variant content into the main story content, we are introducing a new `content_zone` story element.

A `content_zone` element can be used as a story content element to define where `variant` content will be updated in the story content.  A variant may then define an `element_group` which references that `content_zone` in the main story content.  When the main story is requested in Content API, the `content_zone` element of the story will be replaced with the `element_group` content. 


Below is an example ANS object of a main story revision with a `content_zone` story element.  Below that is an example of a `variant` with an `element_group` referencing the `content_zone`.

    story_revision = {
        "type": "story",
        "version": "0.10.9",
        "canonical_website": "my-main-website",
        "content_elements": [
            {
                "content": "This is normal story content and will always appear when the story is requested from Content API",
                "type": "text"
            },
            {
                "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAA",
                "type": "content_zone",
                "additional_properties": {
                    "comments": [
                        "The content_zone element will never appear when the story is requested from Content API. It may be replaced from any matching the variants"
                }
            }
        ]
    }

    variant = {
        "websites": [            
            "my-main-website"
        ],
        "content": {
            "content_elements": [
                    {
                        "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAA",
                        "type": "element_group",
                        "content_elements": [
                            {
                                "content": "Some data for content zone AAAAAAAAAAAAAAAAAAAAAAAAAA",
                                "type": "text"
                            }
                        ]
                    }
                ],
                "type": "story",
                "version": "0.10.9"
            }
        },
    }


## Variations story element
