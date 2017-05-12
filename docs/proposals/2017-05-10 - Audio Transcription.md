# Problem

The Arc Voice project needs a way to indicate directives regarding the audio transcription of content stored in the Content API.  Specifically, it needs to be able to determine:

* Should this piece of content receive an audio transcription?
* Has this piece of content already been transcribed, and if so, where does the transcription live?

Additionally, in the future, we may also seek additional information about the audio transcription, including the following:

* Has a user or upstream process requested any transcription settings particular to this piece of content? (e.g. voice?, audio quality? language?)
* What is the text/captions of the audio transcription?

This proposal attempts to address the first two questions posed above while leaving room for the latter two questions in a future proposal if desired.

# Proposal

A new trait on story documents that contains information about audio transcription. Ultimately, these fields might look something like this:


## Future Example

(not all fields below are included in this proposal)
```
{
  "type": "story",
  "version": "0.5.9",
  "headlines": {
    "basic": "Dog Bites Man"
  },

  "transcription": {
    "audio": [{
      "options": {
        "enabled": true,

        // Additional Settings to be added at a later date (maybe), e.g.
        "voice": "joanna",
        "speed": "fast"

      },

      // Populated by transcription generator at save-time
      // May duplicate / alter settings above if decisions made differently than requested
      "options_used": {
        "voice": "joanna"
        "template_used": "base",
        "speed": "normal"
      },


      // The actual audio content - trying to mimic existing video type
      "output": {
        "type": "audio",
        "version": "0.5.9",
        "streams": [{
          "filesize": 3323421,
          "stream_type": "mp3",
          "audio_codec": "mpeg",
          "url": "https://s3.amazonaws.com/arc-content-api/polly/test-speech.mp3",
          "bitrate": 96
        }],
        "created_date": "2017-01-01T12:00:00.0Z",
        "last_updated_date": "2017-01-01T12:00:00.0Z"
      },


    }],

    // Additional transcriptions later? E.g. plaintext? Video?
  }
}
```

But for now, this proposal will suggest the following changes.

## New Audio element

The heretofore unused `audio` type will be changed to better mirror behavior in the video element.

Most notably a `streams` field will be added, which will contain audio stream objects  a subset of the existing video streams)

Each audio stream may have the following fields:

* `filesize` -- in bytes
* `stream_type` -- file format
* `audio_codec` -- audio encoding
* `url` -- location of file
* `bitrate` -- audio bitrate


```
     {
        "type": "audio",
        "version": "0.5.9",
        "streams": [{
          "filesize": 3323421,
          "stream_type": "mp3",
          "audio_codec": "mpeg",
          "url": "https://s3.amazonaws.com/arc-content-api/polly/test-speech.mp3",
          "bitrate": 96
        }],
        "created_date": "2017-01-01T12:00:00.0Z",
        "last_updated_date": "2017-01-01T12:00:00.0Z"
     }
```

## Transcription Field

The transcription field will appear on story contet. It is an object with names of different types of transcriptions (e.g. `audio`) for its keys.  Each value will be an array of objects (in case more than one transcription of each type exists. E.g., if short/long versions were generated.)

For this proposal, only "audio" will be allowed.

## Audio Transcriptions

Each audio transcription object will have three top-level fields:

* options -- settings that were requested by users or ingestors at content creation time
* options_used -- settings that were applied by the transcription renderer (in case these differ, e.g., because a requested option was not available)
* output -- an audio content object

### Options

* enabled -- if true, an attempt will be made to generate audio for this content

### Options Used

* enabled -- if true, audio was generated for this content
* template -- the name of the transcription template applied
* voice -- the name of the voice selected when rendering was generated

### Output

An `audio` content type, amended to include a `streams` field, similar to the `video` streams.  (See above)


# Example

```
{
  "transcription": {
    "audio": [{
      "options": {
        "enabled": true
      },
      "options_used": {
        "enabled": true,
        "template": "base",
        "voice": "joanna"
      },
      output: {
        "type": "audio",
        "version": "0.5.9",
        "streams": [{
          "filesize": 3323421,
          "stream_type": "mp3",
          "audio_codec": "mpeg",
          "url": "https://s3.amazonaws.com/arc-content-api/polly/test-speech.mp3",
          "bitrate": 96
        }],
        "created_date": "2017-01-01T12:00:00.0Z",
        "last_updated_date": "2017-01-01T12:00:00.0Z"
      }
    }]
  }
}

## Concerns

### Doesn't this break compatibility with the existing audio field?

AFAIK, the existing audio object is not in use.  But if it is, we can rename this type, or simply make these changes additive.
