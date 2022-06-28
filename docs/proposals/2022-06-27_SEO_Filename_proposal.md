# SEO Filename Proposal

# Problem

Image resizer links in Arc are pretty ugly. The only reference to an image filename is the Arc ID, like `ABCDEFGHIJKLMNOPQRSTUVWXYZ.jpg`. If clients want to improve the SEO scoring of their image links in Google, they need to be able to make that filename more realistic.

# Proposal

Like Canonical URLs do for gallery leaf pages, we want to introduce a string field SEO Filename. This field will be used by PageBuilder and others when generating Resizer V2 URLs by appending it before the asset key, like `/resizer/v2/this-is-an-seo-filename-ABCDEFGHIJKLMNOPQRSTUVWXYZ.jpg`

## SEO Filename

SEO Filename must be formatted like a slug, where the only allowed characters are alphanumeric and dashes. It must be at or below **X** characters

# Example

```
{
    "_id": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "additional_properties": {
        ...
    },
    "caption": "This is a caption.",
    ...
    "seo_filename": "this-is-an-seo-filename",
    "subtitle": "This is a subtitle.",
    "type": "image",
    "version": "0.10.9"
}
```

# Concerns

> Long SEO Filenames could break the URL size limit

Yes, and that is why we are being conservative about the character limit we are imposing.

# Alternatives Considered

We considered using Slug for this purpose, but Slugs are "internal" by definition -- SEO Filenames are meant to be external.

# Implementation

Jimmy Schleicher of Photo Center will implement this and add to the schema if this proposal is accepted.