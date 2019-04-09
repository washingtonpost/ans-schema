# Table of Contents Anchors for Content Elements

# Problem

Users want the ability to have a jump links within an article.

# Proposal

We propose adding two new content types, `Table of Contents` and `Anchor Divider`.
- Anchor Link List / Table of Contents
- Anchor Divider

# Anchor Divider
A new content type used to create a hidden horizontal rule which will be utilized to auto generate a Link List/TOC. This hidden horizontal rule will have two properties, `text` and `id`.
- `text` : inner text that will be used to form the hyperlink link
- `id`: An id used to reference common links so that it may be treated as a "type" for filterning. This is seperated from the ANS `_id` which we will use as the id to target


# Table of Contents
A new content type which will auto generate a list of links based on Anchor Dividers within an article.

When using the `Table of Contents` content type within a story, a user can place the TOC any where within the article. The TOC will auto generate a list of links based on the `Anchor Divider`'s within it, starting from top to bottom. Each link will be formed based on the `Anchor Divider`'s properties.
```
<a href="[_id]" name="[id]">[text]</a>
```

# Concerns

## How will this be used to generate a table of contents or list of anchor links?
There will be two possible solutions for creating a TOC or a list of anchor links.
- Use the `Table of Contents` content type within `Ellipsis`
- Create a custom template within `PageBuilder`

When using a custom template within `PageBuilder`, the list of anchors can then be re-ordered and/or filtered with using the `id` trait of the `Anchor Divider`.

# Alternatives Considered



