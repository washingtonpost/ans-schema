# Problem

To be completed.

# Proposal

Two new possible values for distributor.category: `handout` and `stock`.

## Stock

A new possible value will be added to `distributor.category` to represent stock media distributed directly from a stock media provider, e.g., Shutterstock.

### Example

```
"distributor": {
    "name": "Shutterstock",
    "category": "stock"
}
```

## Handout

A new possible value will be added to `distributor.category` to represent promotional media distributed directly from a company, e.g. product branding.

### Example

```
"distributor": {
    "name": "",
    "category": "handout"
}
```

# Implementation

Jodie Burnett of Platform Services will implement this and add to the schema if this proposal is accepted.