# Problem

Integrating with the Author Service requires use of the credit trait to credit each author with their contribution to the video content. Currently the credit trait in ANS cannot correctly represent video content credits for all contributors.  Besides a the primary video editor/producer, there are host talents and contributors who should also be credited for video content and each one should be distinguishable in the ANS for the purposes of crediting them appropriately on the article page.  Thus, I propose the following change.   


# Proposal

Add "host_talent" and "contributors" properties to the credit_trait which is identical to the "by" property but representing content contributors other than the primary editors/producers.


## Host_talent

A moderator, interviewer, main on-camera talent.

## Contributors

The editors, shooters, producers, and graphic editors of the work.


# Example

```
"credits": {
    "host_talent": [
      {
        "type": "author",
        "name": "Mary Beth Albright"
      }
    ],
    "by": [
      {
        "type": "author",
        "name": "Linda Williams",
        "org": "The Washington Post"
      }
    ],
    "contributors": [
      {
        "type": "author",
        "name": "Billy Tucker"
      },
      {
        "type": "author",
        "name": "Malcolm Cook"
      },
      {
        "type": "author",
        "name": "Michelle Jaconi"
      },
      {
        "type": "author",
        "name": "Allie Caren"
      },
      {
        "type": "author",
        "name": "Martine Powers"
      },
      {
        "type": "author",
        "name": "Alexis Diao"
      },
      {
        "type": "author",
        "name": "Madhulika Sikka"
      }
    ]
  }
```

# Concerns

None

# Implementation

The Goldfish team will implement this and add to the schema if this proposal is accepted.
