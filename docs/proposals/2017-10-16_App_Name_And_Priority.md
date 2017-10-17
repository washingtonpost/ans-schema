# Application Name and Priority

For the forthcoming priority queue feature in Content API, a way is needed to distinguish the priority of source events for priority ordering. The optional `priority` field is being added to all operation types to distinguish ingestion events from normal usage events. To ensure that this feature is used for its intended purpose, `app_name` will also be required for events requesting to set their own priority level. This field can be mapped to whitelists or blacklists by operation consumers.

Note that these fields are informational only -- there is no guarantee that any particular downstream consumer honor the priority setting.

Since these fields have been added to existing production environments already, the new fields will be present in both ANS 0.5.8 (current production version) and 0.5.9.

## Concerns

## What is the difference between `app_name` in the operations and `source.system` or `source.source_type` in the ANS content document? ##

See the source object: [https://github.com/washingtonpost/ans-schema/blob/master/src/main/resources/schema/ans/0.5.9/traits/trait_source.json]

`source.system` represents the name of the CMS or editor (e.g. 'ellipsis', 'wordpress') that was used by a writer, editor or producer to *input* the original document. If this is unknown, it should be omitted.  `source_type` represents, more generally, the mechanism used for content entry -- either `staff` or `wires` depending on whether the story was created in-house or imported from a wire feed.

`app_name` is more technical and literal than either of the above fields. It is used as a unique identifier of the application which is requesting that a given document be updated, published, deleted, etc. In some cases it may be the same as `source.system` but there is no reason this must be so.

For example, imagine a bulk migration script that imports documents from an existing WordPress installation within an organization.  In such a case, `source.system` would be "wordpress", `source.source_type` would likely be "staff" but `app_name` might be `wapo_importer_2017_10_10`.  But if a live-ingestor for that same WordPress installation were also configured, the `app_name` for future updates to the same content would be `wordpress`.

Note also that `app_name` is a property of the `operation` being requested, *not* the document being operated on.
