# Problem

On certain stories, newsroom users want to override or hide the photographer and credit names that are set in the downstream display channels they own (i.e., website, AMP, and native apps). In some cases, they may have added a note to the story indicating the photo credits independent of the photo itself.

However, this information should not be modified in all downstream contexts. Shared stories over wires should contain the original credits for legal and other reasons. Direct ANS consumers that render documents to readers should use the overridden credits when possible.  However, when converting data into a "generic" format, such as an RSS feed, Apple News, or other common formats, the original credit should be preserved for maximum compatibility. E.g., an image may parsed from such a format independent of the story, and although the credit may be clear in the context of the story, it would not be present with the extracted photo outside of the context of that story. For cases like these, the original credit should be preserved.


# Proposal

Add a 'vanity_credits' trait on all ANS elements, also explicitly suggested usage within `referent_properties`.

Consuming clients that render content directly to readers should be updated to use the `vanity_credits` trait when present.
Consuming clients that translate ANS into a format used by third parties should ignore the field.


## Alternate Credits Trait

* `vanity_credits` will have the same structure as `credits` but potentially different data. 


## Example Usage

Before denormalization.

```
{
  "type": "story",
  "version": "0.8.0",
   
  "content_elements": [
     {
       "type": "reference",
       "referent": {
         "type": "image",
         "id": "DEFGHIJKLMNOPQRSTUVWXYZABC",
         "referent_properties": {
           "vanity_credits": {
             "by": [
               {
                 "type": "author",
                 "version": "0.8.0",
                 "byline": "If you do not wish to display the actual photographer, you can display this message instead."
               }
             ]
           }
         }
       }
     }
  ]
}
```

After denormalization.

```
{
  "type": "story",
  "version": "0.8.0",
   
  "content_elements": [
    {
      "type": "image",
      "_id": "DEFGHIJKLMNOPQRSTUVWXYZABC",
      "version": "0.8.0",
      "url": "https://www.washingtonpost.com/foo.jpg",
      "credits": {
        "by": [
          {
            "type": "author",
            "version": "0.8.0",
            "byline": "Jim Phelps"
          }
        ]
      },  
      "vanity_credits": {
        "by": [
          {
            "type": "author",
            "version": "0.8.0",
            "byline": "If you do not wish to display the actual photographer, you can display this message instead."
          }
        ]
      }
    }
  ]
}
```

# Implementation

Core Services team will implement the schema change, Ellipsis team will implement the feature.
