# Problem

Video subtitle (caption) files are produced in varied formats (SRT, WEBVTT, etc), languages, and confidence scores for quality of transcription.  Currently, the subtitle trait does not have these attributes at the individual caption file level. Downstream, the player exposes the language of the subtitles for the user’s choosing. Without the language attribute in the subtitle trait, “unknown” is erroneously shown in the caption language dropdown. 


# Proposal

Add language code, language label, and confidence ranking attributes to the subtitle_url in the video_subtitle element.


## Confidence

Score give for the quality of the transcription.  The range is 0.0 to 1.0.

## Language

The language of the transcription.

## Language_code

The three letter language code from the ISO 639 standard.


# Example

```
"subtitles": {
      "confidence": 1.0,
      "urls": [
        {
          "format": "WEB_VTT",
          "url": "https://closedcaptions.posttv.com/2017/12/13/5b593c38-e01c-11e7-b2e9-8c636f076c76/3_1513190211004/5b593c38-e01c-11e7-b2e9-8c636f076c76_5a3144dee4b0d6b173bf2785.vtt”,
          “confidence”: 1.0,
	  "language": 
	   {
     		"language_code": "eng",
     		"language_display": "English"
   	   }
        },
        {
          "format": "DFXP",
          "url": "https://closedcaptions.posttv.com/2017/12/13/5b593c38-e01c-11e7-b2e9-8c636f076c76/3_1513190212012/5b593c38-e01c-11e7-b2e9-8c636f076c76_5a3144dee4b0d6b173bf2785.dfxp"
          “confidence”: 1.0,
          "language": 
	   {
     		"language_code": "eng",
     		"language_display": "English"
   	   }
        },
        {
          "format": "RAW_TEXT",
          "url": "https://closedcaptions.posttv.com/2017/12/13/5b593c38-e01c-11e7-b2e9-8c636f076c76/3_1513190212052/5b593c38-e01c-11e7-b2e9-8c636f076c76_5a3144dee4b0d6b173bf2785.txt"
          “confidence”: 1.0,
          "language": 
	   {
     		"language_code": "eng",
     		"language_display": "English"
   	   }
        },
        {
          "format": "SRT",
          "url": "https://closedcaptions.posttv.com/2017/12/13/5b593c38-e01c-11e7-b2e9-8c636f076c76/3_1513190212092/5b593c38-e01c-11e7-b2e9-8c636f076c76_5a3144dee4b0d6b173bf2785.srt"
          “confidence”: 1.0,
          "language": 
	   {
     		"language_code": "eng",
     		"language_display": "English"
   	   }
        }
      ]
    },

```

# Concerns

None

# Implementation

The Goldfish team will implement this and add to the schema if this proposal is accepted.
