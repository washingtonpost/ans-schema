# Table of Contents Anchors for Content Elements

# Problem

Users want the ability to have a tabel of contents (TOC) in order to jump to different locations within an article.

# Proposal

We propose adding a new trait, `anchor` to content elements, which will contain the properties of `id` and `label`.
 * `id` will accept a string value which will be used to generate a hash seo friendly id.
 * `label` will accept a string value which will be used as the anchor's display text

# Trait in ANS Schema

# Examples
```
content_elements: [{
  anchor: {
    id: "things-to-do-in-dc",
    label: "Things to do in DC"
  },
  additional_properties: {}
  alignment: "left"
  channels: ["basic", "print"]
  content: "bla bla bla"
  level: 1
  type: "header",
  _id: "KKAE5ETLOVBLXCU7ZI4ELLVUJM"
}]
```

# Concerns

## How will this be used to generate a table of contents ?

There would be two features — one for the table of contents, and another for the article body. And one feature would loop through the content elements, and output a “tabel of contents” and in the article body, we would loop through the same content elements, outputing the `#anchor-tags` appropriately.

# Alternatives Considered


# Implementation


