# Auth Proposal

# Problem

The Signing Service produces SHA256-signed HMAC tokens that are used to validate requests for Arc objects on the front-end. Those front-ends must make a call to Signing Service for each object that it wants to display.

# Proposal

Add a field `auth` which contains a mapping of integer -> HMAC token, where the integer is the version of the secret key in SSM.

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

Yes but it is the signed token, so there is no risk of exposing the secret key. Plus, it's only valid for that single Arc object.

# Alternatives Considered

Users of projects like Resizer V2 could call Signing Service itself to retrieve HMAC tokens for images it uses. However this could lead to significant latency bloat depending on the amount of images on a page or gallery. Signing Service does not support sending multiple strings and receiving multiple HMAC tokens at the moment.


# Implementation

Jimmy Schleicher of Photo Center will implement this and add to the schema if this proposal is accepted.