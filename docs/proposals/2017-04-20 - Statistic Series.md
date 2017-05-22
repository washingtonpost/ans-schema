# Problem

Ellipsis needs to render statistics in a series with supplementary text. (This is the replacement for the timeline and rail templates in Methode.)

# Proposal

A content element dedicated to displaying a single set of related statistics in a series.  Each statistic can be labelled and described, and laid out in a horizontal or vertical manner.

# Example


https://www.washingtonpost.com/sports/nationals/ryan-zimmerman-returns-as-nationals-top-marlins-for-90th-win-3-2/2014/09/20/ff3a05b8-40ff-11e4-9587-5dafd96295f0_story.html?utm_term=.bc80951132c7

```
{
  "_id": "AAAAAAAAAAABCDEFGH",
  "type": "statistic_series",

  "direction": "vertical",

  "citation": {
    "type": "text",
    "content": "Source: The Washington Post"
  },

  "items":
  [
    {
      "label": {
        "type": "text",
        "content": "Up to July 31"
      },
      "statistic": {
        "type": "text",
        "content": "64-41"
      },
      "description": {
        "type":"text",
        "content": "Cespedes Trade"
      },
      "detail": {
        "type": "text",
        "content": "Oakland’s record on the day the Athletics swapped slugger Yoenis Cespedes for pitcher Jon Lester. The A’s were a game ahead o f the Angels in the AL West"
      }
    },
    {
      "label": {
        "type": "text",
        "content": "After July 31",
      },
      "statistic": {
        "type": "text",
        "content": "18-28"
      },
      "description": {
        "type":"text",
        "content": "A's is for awful"
      },
      "detail": {
        "type": "text",
        "content": "Oakland’s record from Aug. 1 through Friday, after which the Athletics trailed the Angels by 10.5 games"
      },
      {
      "label": {
        "type": "text",
        "content": "Oakland's Ops",
      },
      "statistic": {
        "type": "text",
        "content": ".615"
      },
      "description": {
        "type":"text",
        "content": "Bats in a slump"
      },
      "detail": {
        "type": "text",
        "content": "Oakland’s OPS over the past 30 days, the lowest in the American League"
      },
    {
      "label": {
        "type": "text",
        "content": "Derek Jeter Ops",
      },
      "statistic": {
        "type": "text",
        "content": ".606"
      },
      "description": {
        "type":"text",
        "content": "Final season struggle"
      },
      "detail": {
        "type": "text",
        "content": "OPS for Yankees SS Derek Jeter. Only one American League player with enough plate appearances to qualify for the batting title — Houston’s Matt Dominguez — has a lower OPS for the season"
      }
    ]
}
```

# Example 2

https://www.washingtonpost.com/sports/wizards/2014-nba-playoffs-wizards-lose-19-point-lead-fall-to-paul-george-and-pacers/2014/05/11/c08ec1e8-d979-11e3-bda1-9b46b2066796_story.html?utm_term=.a3ed7ec11c17

```
{
  "_id": "AAAAAAAAAAABCDEFGH",
  "type": "statistic_series",

  "direction": "vertical",

  "citation": {
    "type": "text",
    "content": "Source: The Washington Post"
  },

  "items":
  [
    {
      "label": {
        "type": "text",
        "content": "First Quarter"
      },

      "statistic": {
        "type": "text",
        "content": "57.9"
      },
      "description": {
        "type": "text",
        "content": "11 for 19"
      }
    },
    {
      "label": {
        "type": "text",
        "content": "Second Quarter"
      },
      "statistic": {
        "type": "text",
        "content": "52.2"
      },
      "description": {
        "type": "text",
        "content": "12 for 23"
      }
    }
  ]
}

```

# Concerns

## Why not a table?

The use case is much more specific. All these elements share a common template in The Washington Post and almost never change.

# Implementation

Content API / Platform Services will implement in 0.5.9.
