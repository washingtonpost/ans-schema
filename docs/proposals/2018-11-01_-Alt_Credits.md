# Problem

On certain stories, newsroom users want to override or hide the photographer and credit names that are set in the downstream display channels they own (i.e., website, AMP, and native apps). 

However, this information should not be modified in all downstream contexts. Shared stories over wires should contain the original credits for legal and other reasons. Consumers should be able to choose whether to use the alternate credits or not. 

# Proposal

Add an 'alternate_credits' trait on all ANS elements, also explicitly suggested usage within `referent_properties`.

Consuming templates should be updated to use the `alternate_credits` trait if it is available and they desire to use it.


## Alternate Credits Trait

* `alternate_credits` will have the same structure as `credits` but potentially different data. 


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
           "alternate_credits": {
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
      "alternate_credits": {
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
