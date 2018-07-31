# Allowed Websites Proposal

## Problem

Now that the desirable content-sharing effects of multisite have been realized, the undesirable content-sharing effects
are also being realized. Specifically, the ability for certain websites to access and re-publish content that they do not
have the legal right to. A common example of this is images licensed for use for a particular website but not for an organization
at large. Multisite organizations need a way to prevent indicate that certain content should never be rendered in
certain contexts regardless of what authors or editors attempt to do.

## Proposed Solution

An `forbidden.websites` property will be added to the `content_restrictions` trait.  `forbidden.websites` will contain a list of 
website ids that may *never* display the content. Websites included on this list will be understood to be forbidden from ever seeing this content
in a reader-facing context. A special value `"*"` will be allowed that may be used to indicate that a piece of content is
forbidden on all websites. The absence of `forbidden.websites` should be understood to mean the same as the value `[]` -- that 
no website is forbidden from rendering this content.

## Example

```
{
  "type": "story",
  "version": "0.7.1",
  
  "headlines": {
    "basic": "Dog Bites Man"
  },
  
  "content_restrictions": {
    "forbidden": {
      "websites": ["the-herald"]
    }
  },
  
  "revision": {
    "published": true
  },
  
  "websites": {
    "the-times": {
      "website_section": {
        "type": "section",
        "version": "0.7.1",
        "_id": "/news",
        "_website": "the-times",
        "path": "/news"
      },
      "website_url": "/news/dog-bites-man"
    }
  }
}
```

In the above example, "Dog Bites Man" is *available* to be published to The Times and The Post. 
It is currently published only on The Times. It may never be published on The Herald unless the content restrictions 
are also changed.

## Questions 

*Who is responsible for enforcing the content restrictions?*

Rendering applications (PB Templates, Apps) will ultimately be responsible for omitting restricted content.  
Middleware applications such as Content API may add flags to retrieval endpoints to remove these earlier in 
the stream if desired. Content production applications may also apply some validation at content save/publish time.

*Who is responsible for populating this value?*

Organizations who wish to take advantage of content restrictions are responsible for populating this value
and enforcing correctness. Production applications are responsible only for allowing this field to be edited.

*What happens to existing documents that do not have this field?*

Nothing. The absence of `forbidden.websites` should be taken to mean that there are no restrictions.

*When I add a new website to my organization, and it doesn't have image license X, do I have to update every single image in 
license X to forbid the new website?*

Yes, organizations may need a migration to ensure that restricted content remains restricted 
to or from the correct websites. 

To mitigate this in the future, we may add a future reference to the forthcoming `website_group` under `forbidden` to make this process
easier.

*Can this be used for documents other than images?*

Yes, all core ANS types should support it.

*What happens if I request a forbidden document from the content API?*

At present, nothing. However, we may add an optional flag in the future to allow users to ask Content API to enforce restrictions.
There are use cases where you do and do not want data about the forbidden content, and therefore it is useful to turn this on or
off depending upon the context.

*What happens if I attempt to view or edit a forbidden document in Ellipsis, Anglerfish, Goldfish, or WebSked?*

Nothing, except that this field will be editable. 

       
  
