# Custom Embeds for the third party media services

# Problem

Organizations have third-party content that exists outside of the Arc system that they want to include in stories. This content could be content types that Arc doesn’t support or plan to support. For example, quizzes from third-party interactives builders or story cards that are created by the organization and managed themselves. Sometimes this content may be Arc-supported content types too. Customers can choose to use another video platform provider alongside other Arc tools. Some customers such as in Europe have advanced rights management needs that the Arc platform doesn’t currently support. 

Our customers want to (a) insert this third-party content in a way that is friendly to downstream systems and (b) streamline the workflow so users could search and insert these embeds without leaving Ellipsis. Otherwise, content producers would have to leave the Ellipsis story, go to the third-party platform, find the embed, copy the ID, go back to Ellipsis, and paste the ID. This would be a cumbersome workflow with many steps and go against the Ellipsis idea of providing efficient workflows in Ellipsis.

# Proposal

Our custom embed solution is part of a larger Ellipsis initiative to introduce a series of power-ups. These are features coming to Ellipsis that will empower organizations with specific workflow and metadata needs to work more efficiently in Ellipsis and meet their business requirements. These power-ups are how Ellipsis will provide extensibility for these areas, while keeping Ellipsis flexible for all users. 

Producers can add rich third-party content through Arc's custom embed offering. This method enables users to:

- (a) search for, for example, a video or video playlist from a third-party video platform media without leaving Ellipsis
- (b) select an item to insert in the story, and
- (c) edit metadata the org configures for that type of embed (e.g., whether to show ads or autoplay for videos).

Organizations can integrate a third-party embed service to allow content producers to search, insert, and edit article-specific metadata for custom embeds in stories.

# Example

A story may have a `cutom_embed` ANS element. The element will contain an embed object with an id and configuration fields, perhaps like so:

```
{
  "_id": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  type: "custom_embed",
  "subtype": "my_custom_type_1",
  "alignment": "left",
  "channels": [ "web" ],
  "embed": {
    "url": "https://www.google.com",
    "id": "456A",
    "config": {
      "foo": "bar"
     }      
  },
  additional_properties: {}
}
```
> Please note: `embed` is a completely opaque data structure to the ARC. The only requirement is it should be a valid JSON and have no `type`, `version` or `referent` fields on any depth level.

# Concerns

- No content restrictions, rights management on edit metadata
  - Publishing/unpublishing is controlled by them. Can’t use EL features to auto publish images with story.
- Customer has to provide form validation and required field configuration. Will all be within the iframe.
- Can’t stop bad data ingestion.
- Arc has limited validation on subtype and ID.
- Searchable or queryable on subtype and ID only.
- Custom embeds will not be queryable in Site Search or Content API, beyond subtype and ID.
  - E.g., the title of an embedded external video will not be factored into site search relevancy scores unless the title is included in the surrounding text.
- They will not be available for denormalization in the Content API.
- They will not have referent updates.  If the embed provider URL is changed in the Ellipsis settings screen, that change will not be reflected on older stories unless they are re-saved.
- If the embed-provider service is down, Ellipsis will try to show an error message that service is down.

## Isn't this somewhat duplicative with the existing `list` and `text` elements?

Identifying a semantic recipe on a page clearly is useful rendering information, as well as enabling search by ingredient.

# More information 
https://paper.dropbox.com/doc/Proposal-for-Custom-Embeds-for-Third-Party-Content--AaaRXVa4dvfjXydDlqv4FZn8Ag-C5Z2Ahqw14nZV3MnZi9Be

# Implementation

Yuriy Sannikov of Ellipsis team will implement this and add to the schema if this proposal is accepted.
