# Problem

`distributor.category` currently describes images from staff photographers, freelance photographers, and wire services. However, there are two other categories that are not covered -- stock images and handout images -- that we are proposing to add to the categories for `distributor`. Stock images are provided by stock photo providers such as iStockPhoto and Shutterstock which specifically sell photos that can be purchased and used in different contexts. Handout images are images provided by a subject in the article and used for promotional marketing (e.g., theater company provides a photo of a scene from the play) or non-promotional purposes (e.g., victim's family provides photo of the victim). Handout images tend to be one-time use only.

# Proposal

Two new possible values for distributor.category: `handout` and `stock`.

## Stock

A new possible value will be added to `distributor.category` to represent stock media distributed directly from a stock media provider, e.g., Shutterstock, iStockPhoto.

### Example

```
"distributor": {
    "name": "Shutterstock",
    "category": "stock"
}
```

## Handout

A new possible value will be added to `distributor.category` to represent media provided by a subject in an article that is used for promotional or non-promotional purposes, e.g. product branding, photo of a victim provided by their family.

### Example

```
"distributor": {
    "name": "Big Brand Company",
    "category": "handout"
}
```

# Implementation

Jodie Burnett of Platform Services will implement this and add to the schema if this proposal is accepted.