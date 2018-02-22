# Line Count Planning #

## Problem ##
As the name of the application suggests, WebSked was originally conceived as a workflow management tool for publication of web content; however, with the implementation of a robust feature set for WebSked publications, WebSked has expanded its core feature set to support print planning as well. Given the strictures of print publication in general (e.g., the need to account for the physical space occupied by a given story), it is important that editors and journalists be able to see an accurate representation of the difference between the planned length of a story and the actual length of that same story.

Depending on a given client's print system, a different unit of measurement may be necessary to calculate the physical length of a given story on the printed page. WebSked will soon offer each Arc client the opportunity to set their preferred story length unit to the unit dictated by their print planning process. (N.B., all clients will have access to word count; they will also choose either **inches** or **lines** as their preferred unit of length for stories.)

Values for `line_count_planned` are already being ingested into WebSked; however, in data from the Content API, these values are currently stored under `planning.additional_properties` rather than `planning.story_length`, where they logically belong. Thus, the goal of this proposal is to ensure that upstream systems group all measures of story length under the appropriate property of the `planning` trait.

## Proposal ##
The WebSked team proposes adding `line_count_planned` and `line_count_actual` properties to the `story_length` property of the `planning` trait [https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.6.0/traits/trait_planning.json](https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.6.0/traits/trait_planning.json). The current `story_length` property is as follows:

```json

{
	"story_length": {
		"description": "Story length information.",
		"type": "object",
		"additionalProperties": false,
		"properties": {
			"word_count_planned": {
				"description": "The anticipated number of words in the story.",
				"type": "integer"
			},
			"word_count_actual": {
				"description": "Current number of words.",
				"type": "integer"
			},
			"inch_count_planned": {
				"description": "The anticipated length of the story in inches.",
				"type": "integer"
			},
			"inch_count_actual": {
				"description": "The current length of the story in inches.",
				"type": "integer"
			}
		}
	}
}

```

We propose adding `line_count_planned` and `line_count_actual` properties to `planning.story_length` as follows:

```json
{
	"story_length": {
		"description": "Story length information.",
		"type": "object",
		"additionalProperties": false,
		"properties": {
			"word_count_planned": {
				"description": "The anticipated number of words in the story.",
				"type": "integer"
			},
			"word_count_actual": {
				"description": "Current number of words.",
				"type": "integer"
			},
			"inch_count_planned": {
				"description": "The anticipated length of the story in inches.",
				"type": "integer"
			},
			"inch_count_actual": {
				"description": "The current length of the story in inches.",
				"type": "integer"
			},
			"line_count_planned": {
				"description": "The anticipated length of the story in lines.",
				"type": "integer"
			},
			"line_count_actual": {
				"description": "The current length of the story in lines.",
				"type": "integer"
			}
		}
	}
}

```

## Example ##

WebSked expects to ingest data in the format below. (Note that the story object has been truncated to focus on the relevant data.)

```json
{
	"_id": "BKZSUVTBGVACFEQDRW7QRXPHFY",
	"type": "story",
	"version": "0.6.0",
	"content_elements": [],
	"planning": {
		"story_length": {
			"inch_count_planned": 40,
			"line_count_planned": 10,
			"word_count_planned": 200
		}
	}
}

```

## Concerns ##

### How will this affect applications upstream of WebSked? ###
This change will primarily have an impact on Ellipsis (and other content authoring applications upstream of WebSked); nevertheless, the level of effort to implement the change should be minimal, as line count data per story are already available where values have been entered by a user.