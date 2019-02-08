# Proposal for a new field to indicate optimal rendering method

# Problem

Some ANS documents have an critical content to the understanding of the story contained within content elements such as `raw_html` that allow for content that is not well defined by the ANS format. The unpredicability of `raw_html` makes rendering of this content unstable or impossible to some downstream rendering applications (ex. Mobile). In other cases, other rendering applications may have additional information that is not supplied to ANS. Two examples of the latter:
  - Static graphics pages where the ANS version is the fallback
  - A story that uses AR in `raw_html` that would be better served on a device

Applications can make their best guess as to whether there is enough information within the ANS document, but sometimes that information is not available at all, and it is useful for a user of the publishing system to indicate the optimal or preferred rendering application. Other rendering applications could adjust by falling back to a browser in the case of www preferred, or a banner directing users to experience the article on a different platform.

# Proposal

Add a `recommended_view` (open to other names) trait to describe the optimal rendering perspective of the story element.

## Recommended View

Each story can have an array of strings that represent the the ideal rendering for the content. Blank means there is no preference. When seeing these values if the rendering application is aware of these other options it can either fallback to one of them, or render messaging to the user.

# Example

```
{
  "type": "story",
  "version": "0.5.9",
  //...
  "recommended_view": ["www", "native-app"]
}
```

NOTE: Example values are just a suggestion and open to other names. The idea I want to convey here is that they are not naming specific applications, but rather specific methods of rendering.

# Concerns

## Does this put too much rendering concern in the document?

Yes, but so does using `raw_html` or providing different rendering content than contained with the document. This information will at least make it explicit that document is incomplete as opposed to situations were the missing or `raw_html` content is merely additive.

# Alternatives Considered

## Why not simply not render any content that has the problematic `raw_html`?

We already make decisions about whether an article is able to be viewed in our applications, but given the problem it is not always easy to tell. Often we or the content creators want a way to override the default behavior.

# Implementation

Gregory Engel of Platform Services will implement this and add to the schema if this proposal is accepted. Not sure if the is the right thing to put here or to indicate that I am willing to write up the schema change.
