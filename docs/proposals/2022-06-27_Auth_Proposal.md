# Auth Proposal

# Problem

The [Signing Service](https://github.com/WPMedia/signing-service) was created to provide Photo Center & PageBuilder HMAC tokens which allow the use of images on the frontend. Without a field to store these tokens in, users would have to call the Signing Service for each image they want to display using [Resizer V2](https://github.com/WPMedia/arc-photo-resizer).

# Proposal

Add a field `auth` which contains a mapping of integer -> HMAC token, where the integer is the version of the secret key in Signing Service. The secret key is stored in SSM and is only known by Signing Service and in Akamai/Edge. 

When an image is requested on a customer site, a signed token must be passed in a query parameter `auth`. The customer's Akamai property will sign its own token and compare it to the one passed in `auth`.

For displaying Photo Center images, Photo Center will provide the `auth` object in all image ANS, including signed tokens with all available secret versions from Signing Service.

For displaying external images, PageBuilder (or another user) must call the Signing Service with the full URL of the image to be used as the token in `auth`.

## Key

There may be more than 1 currently-enabled secret version at a given time for an organization. Users will know which version they're using, so the `auth` object's keys should be the secret version integer from Signing Service's SSM storage.

## Value

The values corresponding to each secret version integer will be the HMAC token produced by Signing Service for this object.

# Example

```
{
    "_id": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "additional_properties": {
        ...
    },
    "auth": {
        "1": "c86ec5d13cb475fb790d627c1f9754c4ebb90718d4daaa1d027731e2075b9b05",
        "2": "8765d450481157336afff9e8e57f67ce14a7d627e50e7c652f3a6360243e2c6b"
    },
    "caption": "This is a caption.",
    ...
    "subtitle": "This is a subtitle.",
    "type": "image",
    "version": "0.10.9"
}
```

# Concerns

> Aren't you exposing a token in ANS?

It is just the signed token, so there is no risk of exposing the secret key, and the token is only valid for that single image.

> What prevents someone from reading the token from ANS embedded on a website and using it?

We decided to accept this risk now that we aren't worried about the performance of Thumbor in ECS. Akamai is much more durable and has protections in place for DDOS & other exploits.

# Alternatives Considered

Users of projects like Resizer V2 could call Signing Service itself to retrieve HMAC tokens for images it uses. However this could lead to significant latency bloat depending on the amount of images on a page or gallery. Signing Service does not support sending multiple strings and receiving multiple HMAC tokens at the moment.


# Implementation

Jimmy Schleicher of Photo Center will implement this and add to the schema if this proposal is accepted.