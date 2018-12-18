# IMAGE TYPE PROPOSAL

# Problem

Anglerfish users want to categorize images by type, so that they can be queried in search, and have
different fields be visible/required based on this type.

# Proposal

Add an `image_type` trait, represented as a machine-readable enumeration of the types: `["photograph", "infographic", "illustration", "thumbnail"]`

## Photograph

### Definition

A capture of real life.

### Rights and Usage

A large proportion of photographs are not owned by the customer. If owned by the customer, indefinitely. If not, third-party is usually not generous because context in which image is shown is critical as well as proper attribution to the image's owner and distributor. However photos can also come from stock image providers who permit the image to be used in any context. These images are often one-time use only, but customers can also have contracts with news organizations to use the image indefinitely.

## Graphic

### Definition

A work created to explain information.

### Rights and Usage

Depends on how large customer's graphics staff is. If large, then most infographics are owned by the customer. If owned by the customer, indefinitely. If not, third-party is usually not generous.

## Illustration

### Definition

A creative work made for expression.

### Rights and Usage

Most infographics are owned by the customer. If owned by the customer, indefinitely. If not, third-party is usually not generous.

## Thumbnail

### Definition

The promotional image for a video that appears before video is played to draw audience to consume the video.

### Rights and Usage

Depends on how large customer's video staff is. If large, then most infographics are owned by the customer. If owned by the customer, indefinitely. If not, third-party is usually not generous.


# Example

```
{
  "_id": "EA4DHYHLSNAELPFORAMBWPRJYA",
  "type": "image",
  "image_type": "photograph",
  "version": "0.8.1",
  "created_date": "2018-06-25T09:50:50.52Z",
  "credits": {
    "by": [
      {
        "name": "Dwayne Johnson",
        "byline": "Dwayne 'The Rock' Johnson",
        "type": "author",
        "version": "0.8.1"
      }
    ]
  },
  ...
```

# Concerns

## Is it restrictive to limit the types to an enumerated set?

These four types were chose because they were the highest-level image categories that we could conceive. This separation is meant to categorize images for searching purposes. If users wish to customize which fields are shown/required in the edit page for a certain image type, they can make a 'Template', which is derived from a type, where they can specify just that.

# Implementation

Jimmy Schleicher of the Anglerfish/Platform Team will implement and add to the schema if this proposal is accepted.
