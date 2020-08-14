# Collection Query Backfill 

## Problem

Backfilling Collections with query results is a complex process that requires implementation across multiple systems.
This document proposes a first solution to achieve the near-term deliverable.

## Proposal

In order to limit scope on both the rendering and publishing sides, we only allow specifying a single section or tag. The Collections API would be updated to support this via the API and presumably UI as well.

### Example

We would update the ANS spec to allow specifying a single website or tag:

```JSON
{
  "type": "collection",
  "dynamic_items": {
    "type": "sections"
    "ids": ["/politics"]
  },
}
```

```JSON
{
  "type": "collection",
  "dynamic_items": {
    "type": "tags"
    "ids": ["basketball"]
  },
  ...
}
```

When Content API fetches collections with the dynamic_items property (or whatever we want to name it), it will merge them in from a query.

## Concerns

### How are website restrictions handled?

Collections are currently limited to a single website, but there are product plans to expand that to multiple websites. Sections exist on an individual website. From a technical perspective, tags are a much cleaner solution, but we could implement a rule where a section backfill is ignored on websites other than the primary website. I think that’s a bad experience, though.

### How are dynamically filled items marked inside the collection?

We could add is_dynamic_item under additional_properties, but I’m open to alternatives.

### How does Content API backfill the collections?

#### Section-based example query:

`https://api.washpost.arcpublishing.com/content/v4/search/published?website=washpost&q=type:story+AND+taxonomy.sites._id:%22/politics%22&sort=display_date:desc&size=10`

#### Tag-based example query:

`https://api.washpost.arcpublishing.com/content/v4/search/published?website=washpost&q=type:story+AND+taxonomy.tags.slug:obama&sort=display_date:desc&size=10`

### Are there limits on the number of dynamically-filled items?

I suggest limiting it to the same as Content API’s general limit, which would be a total of 100 items.

### How do we mitigate load from fetching these documents?

If necessary, we could cache the results of the backfill query in Redis for, say, 15 minutes, and populate the collection from that if present. This would trade CPU cost for storage cost, and could be a problem if the number of backfilled collections grows sufficiently.

## Implementation

The Arc PubStack team will implement this if the proposal is accepted. The ticket already exists in the PubStack Jira Board: [PSTK-1362](https://arcpublishing.atlassian.net/browse/PSTK-1362)
