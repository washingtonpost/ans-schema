## Problem

Organizations have requested a way to include sidebars, related content boxes, or other recirculation links within the body of an article. A curated solution -- where users have reasonable control over the presentation and selection of the items on an individual -- is highly-desirable.

Existing solutions are either too generic (`element_group`, `story`) to interpret well in a UX, or too limited (`related_content`, `promo_items`) to be useful in this capacity, or cannot be meaningfully extended in a non-breaking way.


## Proposal

Add a new content element `links_list` that contains a narrowly-targeted set of functionality around inline recirculation boxes. Applicable to stories only.

A links_list may have:
* A plaintext title
* A subtype (selected from an enumerated-list configured on a per-organization basis)
* A sequence of up to 10 and at least one `links_list_item`s, each of which has:
    * A subtype
    * A plaintext title (required)
    * A link (required)
    * A description (ANS `text` element)
    * An image (ANS `image` or `reference` to an image)


## Example

```json
{
  "type": "story",
  "version": "0.10.x",

  "headlines": {
    "basic": "Man Bites Dog"
  },

  "content_elements": [
    {
      "type": "links_list",

      "subtype": "sidebar",
      "title": "More 'Biting' Stories",

      "items": [
        {
          "type": "links_list_item",
          "subtype": "blue-label",

          "title": "Lorem ipsum",
          "link": "http://www.google.com",
          "description": {
            "type": "text",
            "content": "<b>Foo</b> bar <em>baz</em>"
          },

          "image": {
            "type": "reference",
            "referent": {
              "type": "image",
              "id": "AAA"
            }
          }
        },
        {
          "title": "Reddit",
          "link": "http://www.reddit.com"
        }
      ]
    }
  ]
}
```

## Implementation

Gregory Engel in coordination with the Ellipsis team will implement the schema for this proposal.


## Questions and Concerns

### Can't you already essentially do this by using an embedded `story`, a reference to a `story`, or an `element_group`?

Sort of. The main problem with an `element_group` and an inline `story` is that the user can essentially include any possible content element within them. This causes confusion when rendering either in reader-facing or producer-facing contexts. What does this group of elements actually *mean*? How much should be rendered? It's also simply difficult to implement in a way that still looks and flows well in every single case. In short, they're simply too flexible.

A `reference` limits you to stories that already exist and have been created elsewhere. This faces the same problems as the previous two, and more.

### Okay, but what about a `list`? That's narrowly scoped. Can't you extend the possible list types and list item types?

The user intent behind a `list` an outline or bulleted list. A `links_list` is a dedicated space, positioned within a document, that is demarcated on its own and contains links to other documents.

### What about `related_content`?

It would be difficult to add positioning, a title, and per-element subtypes and images to the existing implementation of `related_content`.

### Why does your example include `subtype`?

The `subtype` drives the front-end presentation on a per-organization basis. Similar to its usage in the rest of ANS, it allows an organization to have multiple front-end variants that are edited in the same way.

### Why is `title` plaintext but `description` is a `text`?

So that you can italicize, bold, and include separate links in the description.

### Why can `image` be a reference, but each `list_item` cannot be a story reference?

Images need to have content restrictions applied, so it is important to use ANS references to them where possible. That is less frequently true for stories, and almost never true for mere story *headlines*.

Users may also want to link to stories or pages not within Arc. Users may also want to re-title links to other stories within Arc. These are expected use cases.

The implicit tradeoff here -- that updates to headlines and urls of linked stories will not be automatically reflected in the body of stories that link to them via a `links_list` -- is, IMHO, acceptable.

Also, as a practical matter, story references (as currently implemented) make payload sizes very large.

### Doesn't `links_list` sound a lot like `linked_list`?

I am open to suggestions for better names!
