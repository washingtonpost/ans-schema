
## Problem

The `author_type` field is available in the Author Service but not in ANS. Reader-templates can only access it via `additional_properties.original`.

Author Type represents the type of an author. Example values might include `freelancer`, `guest author` and `staff writer`. Valid values are specific to an organization, and it may be displayed to readers. 

## Proposal

Add a `subtype` field to the `author` utility object. This corresponds to the Author Service field labeled Author Type. It behaves in a way similar to that field and to the more general `subtype` trait. Specific allowed values and usage are organzation-defined.

## Example


```
{
  "type": "story",
  "_id": "AAAAAAAAAAAAAAAAAAAAAAAAAA",
  
  "credits": {
    "by": [
      {
        "byline": "Gregory Engel",
        "subtype": "Guest Writer"
      }
    ]
  }  
}
```

## Concerns

*Does this field need to be validated in any way?*

No, it should be considered free-entry text.

*Can't I already access this data in credits.by.additional_properties.original.author_type since Author Service dumps the whole payload there?*

Yes. For backwards compatibility, it will be continue to be present there as well. But this is cleaner, and let's us add search options later on if we need to.

