# Problem

Audio stream files have ads stitched into the stream thus duration is different for those with ads as opposed to those without ads. I propose that we add duration to each stream element and a boolean to indicate whether or not an ad is stitched in.


# Proposal

Add duration and ad enabled boolean to each stream element inside of the streams array.


## Duration

Runtime of audio stream in milliseconds

## Ad_enabled

Boolean to indicate which streams have ads stitched in.


# Example

```
"streams": [
    {
      "url": "https://d2i9ke5o9i0vh8.cloudfront.net/testaccount/5ba153fe8d6aecec747e2914/20181001/5bb27e6fa3ac3e1b0371ffd6/5bb282a3e4b08410ba4c95d5_1351620000001-300040_t_1538425511336_44100_128_2.mp3",
      "bitrate": 128,
      "stream_type": "mp3",
      "length" : 8108508,
      "duration" : 507,
      "ad_enabled": false
    },
    {
      "url": "https://d2i9ke5o9i0vh8.cloudfront.net/testaccount/5c5e0a6dfdac568a8cee7c06/20190315/5c8bd7908d6ac5d5647d0061/5c8bec2652faff0009a69fdd_1351620000001-300040_t_1552673835995_44100_128_2.mp3",
      "bitrate": 128,
      "stream_type": "mp3",
      "length" : 8108800,
      "duration" : 680,
      "ad_enabled": true
    }
]

```

# Concerns

None

# Implementation


