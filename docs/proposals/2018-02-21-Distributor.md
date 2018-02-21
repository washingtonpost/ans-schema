# Problem

To date, ANS has represented the external origin of content through two main traits: `owner` and `source`.  The `source` trait covers the technical point of ingestion or creation (CMS, external id, etc) and is (mostly) straightforward. The `owner` trait is more convoluted, but is most reliably used to store the technical name of a content repository owner (organization id).

However, there is also a need for data about the *legal* owner of a piece of content, including distribution rights and a general answer to the question of *who* entered a piece of content into the CMS. (This is the distinct from the question of *who authored the content* (`credits`) and *how the content was added* (`source`). Previously, this data has been haphazardly spread across `owner`, `source` and `additional_properties`. This has lead to confusion for users and conflicts for applications.

# Proposal

We propose that a new trait `distributor` be added to accomodate this use case and propose an implementation plan to phase out the previous locations of this data.

For backwards compatibility, we suggest *no changes* to the existing fields:
  * `owner.id`
  * `owner.sponsored`
  * `source.source_id`
  * `source.system`
  * `source.edit_url`
  * `copyright`

The following fields are to be *deprecated* and ultimately fall into desuetude:
  * `source.name`
  * `source.type`
  * `owner.name`

The following fields should be added:
  * `distributor.name` -- The human-readable name of the person or organization controls the distribution rights for a piece of content. E.g. Reuters, AP, Getty. *This replaces some previous uses of `owner.name` and `source.name`.*
  * `distributor.category` -- The category of distribution method, e.g. Staff/Wire/Feelance/Stock/Handout.  *This replaces some previous uses of `source.type`.*


## Example

```json
{
  "_id": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "type": "story",
  "version": "0.6.0",

  "credits": {
    "by": [
      {
        "type": "author",
        "version": "0.6.0",
        "byline": "Professor Gregory Engel",
        "name": "Gregory R. Engel"
      }
    ]
  },

  "owner": {
    "id": "washpost",
    "sponsored": true
  },

  "source": {
    "source_id": "1234567890",
    "system": "WordPress",
    "edit_url": "http://wp-admin.washpost.com/edit.php?id=1234567890"
  },

  "distributor": {
    "name": "Reuters",
    "category": "Wire"
  }
}
```

In this example, the content was ingested via a wire feed from Reuters. It is currently editable in WordPress with an id of 1234567890.  It is being stored in the Washington Post Content API and should be marked as sponsored content. It should be rendered as being written by "Professor Gregory Engel."


# Implementation Plan

The implementation will be carried out in three phases.  Each phase will last approximately 20 business days.

### Phase One

The new `distributor` fields will be added to a new version of ANS. Applications will begin writing to the new `distributor` fields alongside the previous locations where they have written this data. They will continue to read from the old locations.

This phase is intended for testing and verifying that the new fields can be populated as expected.

### Phase Two

Applications will begin to read primarily from the new locations and use the previous locations as a fallback.  Writes will be exclusively to the new fields.

During this phase, organizations and applications can begin migrating data from the old to the new locations. End-to-end data pipeline testing can also take place.

### Phase Three

Applications will exclusively use the new field locations for reading and writing. Final pick-up migrations can take place.



# Questions

### When will the implementation plan begin?

Acceptance by all major stakeholders and the merging of this PR will constitute the beginning of Phase One.

### My organization has a large amount of data and does not want to re-ingest it through the entire content pipeline.

We don't want you to, either! If it is critical that all data be migrated to the new formats in a timely manner, please speak to the respective team owners to coordinate plans for behind-the-scenes migrations.
