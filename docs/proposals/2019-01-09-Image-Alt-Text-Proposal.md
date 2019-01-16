# IMAGE ALT TEXT PROPOSAL

# Problem

Anglerfish users want to improve accessibility by adding `alt_text` to describe images to those using a screen reader.

# Proposal

Add an `alt_text` trait, represented as a string.

# Example

```
{
  "type": "image",
  "version": "0.8.1",
  "caption": "Celebrity Edge, the latest ship from Celebrity Cruises, debuted late November 2018.",
  "alt_text": "large cruise ship on the open sea with clear skies above"
}
```

# Concerns

## Why not use image caption to serve this purpose?

An image caption is a supplement to an image that often assumes a reader can view the image. Alt text is a tenet of accessible web development and aims to describe the image itself. An image often needs alt text and a caption.

# Implementation

Christine Movius of the Anglerfish Team will implement and add to the schema if this proposal is accepted.
