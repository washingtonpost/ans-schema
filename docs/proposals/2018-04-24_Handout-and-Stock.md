# Problem

Currently, `distributor.category` can be one of four values: `staff`, `wires`, `freelance`, or `other`. Anglerfish also needs to be able to specify two new values: content that was distributed from a stock media provider or promotional media distributed directly from a company.

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
    "name": "Big Brand Company",
    "category": "handout"
}
```

# Implementation

Jodie Burnett of Platform Services will implement this and add to the schema if this proposal is accepted.