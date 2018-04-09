# Problem

Anglerfish needs to be able to store the human-readable, web-displayable, legally-safe distributor's name for an image. The closest field that captures this is Source. However, the way users use Source names in Anglerfish doesn't necessarily represent the *legal* source name for an organization or distributor.

# Proposal

Add an `affiliation` element to the ANS credits object. Since credits can only contain list objects, `affiliation` will be a one-element list of an "author" object, whose `name` field will hold the appropriate affiliation name for that photo.

# Example

See the `credits` field of this photo ANS below:

```
{
  "_id": "27V2I6H6WVHV5CMNCM4UHY3PGY",
  "additional_properties": {
    "galleries": [
      
    ],
    "ingestionMethod": "manual",
    "keywords": [
      
    ],
    "originalName": "file000698862236.jpg",
    "originalUrl": "https:\/\/arc-anglerfish-local-localhost.s3.amazonaws.com\/public\/27V2I6H6WVHV5CMNCM4UHY3PGY.jpg",
    "owner": "test.user@arcpublishing.com",
    "proxyUrl": "\/photo\/resize\/3-VY-lAtjzdLUBK-PMqSogGzsDs=\/arc-anglerfish-local-localhost\/public\/27V2I6H6WVHV5CMNCM4UHY3PGY.jpg",
    "published": true,
    "resizeUrl": "http:\/\/anglerfish-staging-thumbor.internal.arc2.nile.works\/3-VY-lAtjzdLUBK-PMqSogGzsDs=\/arc-anglerfish-local-localhost\/public\/27V2I6H6WVHV5CMNCM4UHY3PGY.jpg",
    "restricted": false,
    "roles": [
      
    ],
    "version": 3
  },
  "address": {
    
  },
  "created_date": "2018-04-09T21:32:42+00:00",
  "credits": {
    "affiliation": [
      {
        "additional_properties": {
          
        },
        "name": "Getty",
        "type": "author"
      }
    ],
    "by": [
      {
        "additional_properties": {
          
        },
        "referent": {
          "id": "find",
          "provider": "http:\/\/arc-author-service-arc2-stage.internal.arc2.nile.works\/api?limit=1&q={\"_id\":\"find\"}",
          "type": "author"
        },
        "type": "reference"
      }
    ]
  },
  "geo": {
    
  },
  "height": 1902,
  "last_updated_date": "2018-04-09T22:18:15+00:00",
  "licensable": false,
  "owner": {
    "id": "localhost",
    "sponsored": true
  },
  "source": {
    "name": "localhost",
    "source_type": "Staff\/Freelance",
    "additional_properties": {
      
    }
  },
  "taxonomy": {
    "additional_properties": {
      
    }
  },
  "type": "image",
  "url": "https:\/\/arc-anglerfish-local-localhost.s3.amazonaws.com\/public\/27V2I6H6WVHV5CMNCM4UHY3PGY.jpg",
  "version": "0.6.0",
  "width": 2386
}
```

# Concerns

## This is an ugly way to do this, Jimmy

I know. However, this is the conclusion that us and Greg Engel came to for the time being.

# Implementation

James Schleicher of the Anglerfish team will implement this and add to the schema if this proposal is accepted.
