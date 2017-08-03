# Trigger Metadata #


## Problem ##

Downstream consumers of Content API updates are not always be interested in referent updates, or may not be equally concerned with all types of referent updates. Currently, Content API updates do not provide any metadata about what changed in a document. This puts the onus on consumers to either process every update, regardless of source, or manually track state and compare the update with the current state to determine if processing is necessary.

## Proposed Solution ##

Add trigger metadata to outgoing updates which reflects the _primary trigger event_ that triggered the content api operation.

```
{
  "id" : "default_false_XYZ123",
  "type": "insert-story",
  "version" : "0.5.9",
  ...

  "trigger": {
    "type": "image",
    "id": "AB456",
  }
}
```

* *trigger.type* - Indicates the type of input that caused the operation. Possible values: "story", "gallery", "image", "video", "url", "site", "author" (Later, perhaps, "clavis").

* *trigger.id* - The id of the input document, if any, that caused the operation.

* *trigger.referent_update* - If true, this update was triggered indirectly.

## Implications ##

These new fields should be an optimization only. There is no new information added by these fields that could not be determined by diffing the state or consuming the trigger operations from the relevant primary source services.

These will not be guaranteed to be present in all cases by Content API, but they will be guaranteed to be correct if present.

There should be no effect for existing consumers. The fields are completely ignorable if you are already consuming and processing all updates.

## Questions ##

### Why not just provide a separate stream of full diffs like Dynamo/Kinesis? ###

This would be desirable in some ways but would necessitate new logic from all downstream consumers to take full advantage of it. Barring additional limitations, it would also increase the potential maximum message size (already we have pushed Kafka's max message size to 10MB.)

### What is the point of `trigger.referent_update`? Isn't it the same as `(type.indexOf(trigger.type) > -1 && (id.indexOf(trigger.id) > -1)`? ###

No. Since ANS documents can include references to themselves, it is possible for an update to a single document to also trigger referent updates to that same document.
