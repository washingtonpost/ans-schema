# Alternatives to Raw HTML

# Problem

The content element `raw_html` is often used to inject Javascript into an ANS document which makes it difficult for downstream applications to render natively. Even if the application tries to render it as a embeded browser, there is no guarentee that it will render correctly in all applications. And some applications (ex Apple TV or $50 Kindle) may not have the input or processing capabilities needed to effectively render the experience.

# Proposal

Add a required `alternative` trait to the `raw_html` content element, that contains an array of one content element (allows for multiple later) that can notionally replace the `raw_html` block. The content in the array can only be of type `text`, `image`, `gallery` or `video`. When `upvert`ing this trait should be filled this with a `text` element that has a stock `This content is not available on this platform` message (or similar).

## Alternatives

Each `raw_html` element should have an `alternative` and at least a `basic` array with non-`raw_html` content. An example of the default behaviour:

```
{
  "type": "raw_html",
  "content": "<script src=\"https://www.washingtonpost.com/stat/cool.js\"></script>",
  "alternative": [
    {
      "type": "text",
      "content": "<b>This content is unavailable on this platform</b>"
    }
  ]
}
```

# Example 1

The graphics team has created a JS rendered graphic that scales to browser viewport size. They also generate static `.png`s as a fallback for mobile and tablet.

```
{
  "type": "raw_html",
  "content": "<div class=\"graphics\"><!-- Graphics HTML and JS --></div>",
  "alternative": [
    {
      "type": "image",
      "url": "https://www.coolpublishing.com/graphics/alt-cool-1.png"
    }
  ]
}
```

# Example 2 (future implementation of multiple elements)

The social team is trying to build awareness of the Twitch channel so they are embedding the Twitch stream where normally we would use the Goldfish live video. They provide the normal video as an alternative as well as a note to encourage users to open the twitch channel.

```
{
  "type": "raw_html",
  "content": "<iframe src=\"https://player.twitch.tv/?channel=coolpublishing\" frameborder=\"0\" allowfullscreen=\"true\" scrolling=\"no\" height=\"378\" width=\"620\"></iframe><a href=\"https://www.twitch.tv/coolpublishing?tt_content=text_link&tt_medium=live_embed\" style=\"padding:2px 0px 4px; display:block; width:345px; font-weight:normal; font-size:10px; text-decoration:underline;\">Watch live video from coolpublishing on www.twitch.tv</a>",
  "alternative": [
    {
      "type": "video",
      // PostTV, etc ...
    },
    {
      "type": "text",
      "content": "<b>We are also streaming live on <a href=\"https://www.twitch.tv/coolpublishing\">Twitch</a></b>"
    }
  ]
}
```

# Concerns

## Wouldn't this be better flipped? Where the `raw_html` was available as an alternative to an content_element? 

Yes, honestly, in my opinion that is the "right" way to handle `raw_html`. The `raw_html` element should ONLY be allowed as an alternative to "pure" ANS content elements and in a well-known named one (ex `browser`) to help rendering applications make the right decision on content. The `raw_html` element is an escape hatch to ANS and defeats many of the benefits of ANS to the rendering layer. There should never be `raw_html` at the root level of the content element list. What I am calling the `basic` alternative above should be the content element or collection in an `element_group` and the `raw_html` could be in the alternatives for those applications that can use it. 

Realistically though, given momentum and the frequent use of raw_html now, I am not sure that this answer would be tenable, so the proposal is a version of this that is more backwards compatible.

## Does there need to be multiple alternatives by name? Couldn't it just be one list?

_EDIT: Changed to this suggestion based on feedback_

Yes, that would definitely solve the issue we are having, but my thinking was that the naming would be a signal as to the capabilities desired by these alternatives. In the proposal `basic` here suggests that you only need to be able to support ANS elements to render this alternative. In the example in the previous question `browser` signifies that it should be rendered in a browser-like environment.

## Couldn't you use channels instead?

Possibly, but I think this is a better solution because channels require the user to know the capabilities of the rendering system, while this trait leaves it up to the downstream rendering system to determine what they are capable of rendering. It might seem counter intuitive, but I feel this asks less of the user in terms of thinking about rendering systems. 

Consider the example of Android/Kindle devices. They have a wide range of processing capability. Given the right content some devices might decide they are capable of rendering some segment of content where others do not. Channels deal in much broader terms, so in this scenario you might put the `image` fallback in the `mobile` channel, and that would exclude the higher performance mobile devices.

Here the user is merely asked to provide an alternative to the problematic content and does not require them to think about what systems need which version.

# Implementation

Rob Cannon of Native App Backend will implement this and add to the schema if this proposal is accepted.