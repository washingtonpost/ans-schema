
# Problem

Arc uses ANS as its shared language between all components. Whenever a client has data to store that doesn't have a field in ANS, it is stuck in `additional_properties`. Additional properties has become a wasteland of inconsistent, unstructured, messsy data because of this. Each organization has different data within `additional_properties,` and there's no guarantee that all content is created with these properties. 

Additional properties can also only be set via API, and Composer has no way of displaying or setting anything in Additional Properties because it is so unstrcuted. 

The goal of the Custom Metadata product is to enable clients to have org-specific data stored in a consistent, structured way. This enables the data to be configured via Composer as well as the API, and is the first step towards a path of having queryable custom metadata eventually. 

# Proposal

Add a `custom` trait to the Story type that will hold up to ten `field_{num}` properties that can hold any string. Elsewhere, first in Composer and eventually in Publishing Platform, there will be an org-specific mapping of each `field_{num}` to whatever that field represents in their organization. 


# Proposed Schema

```
{
  "title": "Custom",
  "description": "Trait that holds up to 10 custom metadata properties for each story",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "field_1": {
      "description": "First custom field.",
      "type": "string",
    },
    "field_2": {
      "description": "Second custom field.",
      "type": "string",
    },
    "field_3": {
      "description": "Third custom field.",
      "type": "string",
    },
    "field_4": {
      "description": "Fourth custom field.",
      "type": "string",
    },
    "field_5": {
      "description": "Fifth custom field.",
      "type": "string",
    },
    "field_6": {
      "description": "Sixth custom field.",
      "type": "string",
    },
    "field_7": {
      "description": "Seventh custom field.",
      "type": "string",
    },
    "field_8": {
      "description": "Eighth custom field.",
      "type": "string",
    },
    "field_9": {
      "description": "Ninth custom field.",
      "type": "string",
    },
    "field_10": {
      "description": "Tenth custom field.",
      "type": "string",
    }
  }
}
```

## Example

### Within ANS:

```
...
"custom": {
  "field_1" : "cooking desk",
  "field_2" : "italian",
}
...
```

### Within Composer:
```
...
"client_name": {
  "field_1" : "Author Desk",
  "field_2" : "Recipe Cuisine",
}
...
```

# Concerns

## Validation

One of the goals of Custom Metadata is to be able to support types other than basic Strings that have further validation. For example, for Client `XYZ Publishing` we may want to configure `field_1` to be an enum of their allowable Author Desks. Then, we'd want to validate that the value given in `field_1` of the Story is actually one of those values. We also want to validate against DateTime types, etc. In this proposal, the ONLY validation happening would be against this ANS Schema, which can ONLY do client-agnostic validation that the given values are strings and that they are named `field_1` through `field_10`. 


# Implementation

TBD.
