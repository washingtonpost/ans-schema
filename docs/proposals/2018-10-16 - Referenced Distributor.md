# REFERENCED DISTRIBUTOR

# Problem

Users can currently only reference distributors directly. Users need to be able to reference distributors by id.

# Proposal

Add an alternative set of fields to the distributor content element.

## Id

The distributor entry should contain the referenced distributor's id.

## Mode

This enum field will distinguish between whether this field is being used as a referenced or custom distributor.

# Example

```
{
  "type": "story",
  "version": "0.7.2",
  "distributor": {
    "id": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "mode": "reference"
  }
}
```

# Concerns

## Will this overlap with the existing distributor schema?

The mode enum exists to specify which format the distributor schema is using. This mode property can be checked prior to other handling.

# Implementation

Omar Khan of Platform Services will implement this and add to the schema if this proposal is accepted.
