# Table of Contents Anchors for Content Elements

# Problem

Users want the ability to have a jump links within an article.

# Proposal

We propose adding two new content types, `Table of Contents` and `Anchor`.
- Anchor Link List / Table of Contents
- Anchor

# Anchor
A new content type used to create a hidden horizontal rule which will be utilized to auto generate a Link List/TOC. This hidden horizontal rule will have two properties, `content` and `id`.
- `content` : inner text that will be used to form the hyperlink link
- `id`: An id used to reference common links so that it may be treated as a "type" for filterning. This is seperated from the ANS `_id` which we will use as the id to target


# Table of Contents
A new content type which will auto generate a list of links based on Anchor's within an article.

When using the `Table of Contents` content type within a story, a user can place the TOC any where within the article. The TOC will auto generate a list of links based on the `Anchor`'s within it, starting from top to bottom. Each link will be formed based on the `Anchor`'s properties.
```
<a href="[_id]" data-type="[id]">[content]</a>
<a id="[_id]" />
```

# Anchor & TOC Example
```
"content_elements": [
    {
      "_id": "123",
      "type": "text",
      "content": "this is my first paragraph"
    }, {
      "_id": "456",
      "type": "toc",
      "items": [
        {
          "type": "anchor",
          "content": "taby",
          "id": "cats",
          "_id": 123
        }, {
          "type": "anchor",
          "content": "scottish fold",
          "id": "cats",
          "_id": 456
        },
        {
          "type": "anchor",
          "content": "lab",
          "id": "dogs",
          "_id": 789
        }, {
          "type": "anchor",
          "content": "greyhound",
          "id": "dogs",
          "_id": 1010
        },

    }, {
      "type": "anchor",
      "content": "taby",
      "id": "cats",
      "_id": 123
    }, {
      "_id": "789",
      "type": "text",
      "content": "this is about taby's"
    }, {
      "type": "anchor",
      "content": "scottish fold",
      "id": "cats",
      "_id": 456
    }, {
      "_id": "789",
      "type": "text",
      "content": "this is about scottish fold"
    },
    ...,
    ...,
    ...
  ]
```

# Concerns

## How will this be used to generate a table of contents or list of anchor links?
There will be two possible solutions for creating a TOC or a list of anchor links.
- Use the `Table of Contents` content type within `Ellipsis`
- Create a custom template within `PageBuilder`

When using a custom template within `PageBuilder`, the list of anchors can then be re-ordered and/or filtered with using the `id` trait of the `Anchor`.

# Alternatives Considered



