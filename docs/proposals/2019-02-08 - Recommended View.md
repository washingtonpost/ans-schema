# Proposal for a new field to indicate optimal rendering method

# Problem

Some ANS documents have an critical content to the story contained within content elements such as `raw_html` that allow for content that is not well defined by the ANS format. The unpredicability of `raw_html` makes rendering of this content unstable or impossible to some downstream rendering applications (ex. Mobile). In other cases, other rendering applications may have additional information that is not supplied to ANS. 

Two examples of the latter (see below for more details):
  - Static graphics pages where the ANS version is the fallback
  - A story that uses AR in `raw_html` that would be better served on a device

Applications can make their best guess as to whether there is enough information within the ANS document, but sometimes that information is not available within the ANS format, and it is useful for a user of the publishing system to indicate the optimal or preferred rendering application. Other rendering applications could adjust either by falling back to a browser in the case of `website` preferred, or a banner directing users to experience the article on a different platform.

# Proposal

Add a `preferred_method` (open to other names) field to a new `rendering_guides` trait to describe the optimal rendering method of the story.

## Preferred Rendering Method

Each story has an array of strings that represent the optimal rendering for the content. Blank means there is no preference. If the rendering application is aware of these other options, it can decide to either use one of them, render messaging to the user, or render the story as normal.

NOTE: Example values are just a suggestion and open to other names. The idea I want to convey here is that they are not naming specific applications, but rather specific methods of rendering.

# Example 1

Graphics team has created a static article with lots of bespoke animations and user interactive elements. They've also created an ANS version that is used for publishing to Apple News, but does not contain the same interactive elements. The website team has redirected the url to the static content. The Graphics team would like the native apps to open a webview to maximize the user experience, but also publish automatically to Apple News.

```
{
  "type": "story",
  "version": "0.5.9",
  //...
  "rendering_guides": {
    preferred_method: ["website"]
  }
}
```

Native application reading this can use the information to render summaries, alerts, etc, but when opening the article, the app will pop-up a webview. Alternatively, if this has been downloaded to the app but the user has no network they can render the native version. Apple News publisher can translate this into the Apple News format as a hard link to a web page doesn't make sense.

# Example 2

The team developing sponsored content has made a AR experience that is only supported by Native Apps. The website rendering layer sees this field and displays the content, still getting eyes on the sponsored content. The website team has developed a feature that can text an article to a user's phone so when they see this field/value, the site rendering will put a banner at the top of the page that says "This experience is best on your mobile device! Do you want to send it to your phone?"

```
{
  "type": "story",
  "version": "0.5.9",
  //...
  "rendering_guides": {
    preferred_method: ["native"]
  }
}
```

# Concerns

## Does this put too much rendering concern in the document?

Yes, but so does using `raw_html` or providing different rendering content than contained with the document. This information will at least make it explicit that document is incomplete as opposed to situations were the missing or `raw_html` content is merely additive.

# Alternatives Considered

## Why not simply not render any content that has the problematic `raw_html`?

We already make decisions about whether an article is able to be viewed in our applications, but given the problem it is not always easy to tell. Often we or the content creators want a way to override the default behavior.

## Why not just have a flag to force a webview?

That would work for our immediate needs too, but when thinking about that option, I felt like it was serving a highly specific need. The examples above are intended to show how this concept might apply to other cases, and this was an effort to make a more useful solution.

# Implementation

Rob Cannon of Native App Backend will implement this and add to the schema if this proposal is accepted.