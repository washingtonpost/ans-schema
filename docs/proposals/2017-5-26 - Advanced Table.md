# Problem

Current ANS tables are not sufficient to support tables from methode.


# Proposal

Add a new table spec that mirrors the functionality of an HTML table, called `advanced_table`.

Key traits of the table:

* 4 data types - `advanced_table`, `row`, `data_cell`, `header_cell`
  * a `table` is a list of rows
  * a `row` is a list of cells
  * a `cell` is a list of content elements, restricted to text and raw_html
    * there are two implementations of a cell, `data_cell` and `header_cell`, similar to `<th>` and `<td>` tags
* order/layout assumptions - elements will have an assumed layout that clients may follow
  * for example, it is assumed that rows are ordered from top to bottom, and cells are ordered left to right
* no other rendering details will be included in the spec
  * adapters can use additional properties to specify rendering details, if desired


## Advanced Table

`advanced_table` is the parent object. It will be a content element, and contain a list of rows.

### Rows

List of rows that belong to the table. The order is assumed to be top to bottom.

### Title

ANS field. Name of the table.

### Citation

ANS text element. The source of the table, for example "The Washington Post".

### Credits

ANS credits object, for identifying the author(s) of the table.

### No height/width or other display options

These are intentionally left out.

If adapters need to include any style or rendering details, they can use additional properties on any component of a table - table, row, cell, or content element.


## Row

A `row` contains a list of cells. It will only be usable within a table.

### Cells

List of cells that belong to this row. The order is assumed to be left to right.


## Data Cell / header Cell

There are two types of cells, `data_cell` and `header_cell`. They will only be usable within a row.

Both `header_cell` and `data_cell` will contain a list of content elements. They have the same spec, except for the type.

### Cell Elements

A list of content elements that belong to the cell. This is restricted to elements of type `text` and `raw_html`.

The order of elements is assumed to be top to bottom.

Raw html is allowed here to make it possible to include more advanced markup, such as span tags. Currently, these tags are allowed in text elements, but I think this way is better for future proofing the advanced table.



## Alternatives

### Cell types

The spec could potentially have one type `cell`, and use subtype to distinguish between `data` and `header` cells.

One could argue that it may be better to have one `cell` type and to use subtype to indicate `header` vs `data`. This would make the schema smaller, but would also require clients check two fields on each cell when implementing logic. I don't have strong feelings on this either way.




## Concerns

### What happens if rows have different numbers of cells?

Based on the order of elements and the assumed layout (left to right, or top to bottom), it is clear where each element should go. If the user wants to leave empty space in the table, they should include empty elements. Otherwise, it will be assuemd that any mismatch in length will lead to space at the end of the element.


### Why do we need multiple elements in a cell?

We need to be able to represent multiple p tags within a cell. Furthermore, these p tags can include minor amounts of rendering information. While we don't want any of that rendering information to be in the schema, we do need to be able to put additional properties on each paragraph within a cell. Allowing mutiple elements within a cell makes this possible.

### Why do we need both raw_html and text elements in the cell?

Raw html makes it possible to include more advanced markup, such as span tags, on elements within a cell.

While this currently isn't a problem, because text elements do allow tags right now, my understanding is that this will change in the future. I believe allowing raw_html in a cell will future proof this functionality, and avoid unnecessary migrations.

An example from methode:  
```
<p><span>METHODOLOGY</span> \"MOSTLY, VALUE OVER MOMENTUM STOCKS\"</p>
```

### Why not use a different ANS object for stat/times series?

For example, look at this [article](https://www.washingtonpost.com/sports/nationals/ryan-zimmerman-returns-as-nationals-top-marlins-for-90th-win-3-2/2014/09/20/ff3a05b8-40ff-11e4-9587-5dafd96295f0_story.html).

We could potentially utilize a more specific ans object for these stat series, though it may not be worth it. By supporting complex tables from methode, we are also supporting these other use cases. While it does makes sense have a template to quickly create a stat series/timeline, it may not be worth putting an object explicitly into the schema itself.

From an adapter perspective, this would also require us to have logic to distinguish between a normal table and a stat series, which is more complicated than parsing html/xml in the `advanced_tabled` spec.


# Examples


## Basic Usage

```
{
    "type": "advanced_table",
    "title": "Sample ANS Table",
    "citation": {
        "type": "text",
        "content": "The Washington Post"
    },
    "credits": [{
        "type": "author",
        "name": "Matt Jakes"
    }],
    "rows": [
        {
            "type": "row",
            "cells": [
                {
                    "type": "header_cell",
                    "content_elements": []
                },
                {
                    "type": "header_cell",
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "X1"
                        }
                    ]
                },
                {
                    "type": "header_cell",
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "X2"
                        }
                    ]
                }
            ]
        },
        {
            "type": "row",
            "cells": [
                {
                    "type": "header_cell",
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "Y1"
                        }
                    ]
                },
                {
                    "type": "data_cell",
                    "subtype": "data_cell"
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "A"
                        }
                    ]
                },
                {
                    "type": "data_cell",
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "B"
                        }
                    ]
                }
            ]
        },
        {
            "type": "row",
            "cells": [
                {
                    "type": "header_cell",
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "Y2"
                        }
                    ]
                },
                {
                    "type": "data_cell",
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "B"
                        }
                    ]
                },
                {
                    "type": "data_cell",
                    "subtype": "data_cell"
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "B"
                        }
                    ]
                }
            ]
        }
    ]
}
```

The above table translated to markdown style (not actual valid markdown):

```
|    | X1 | X2 |
| Y1 | A  | B  |
| Y2 | B  | B  |
```

Or in html:  
```
<table>
    <tr>
        <th></th>
        <th>X1</th>
        <th>X2</th>
    </tr>
    <tr>
        <th>Y1</th>
        <td>A</td>
        <td>B</td>
    </tr>
    <tr>
        <th>Y2</th>
        <td>B</td>
        <td>B</td>
    </tr>
</table>
```

Note: This table isn't necessarily specifying this exact html output, but, by using some basic templating logic, this html is fully implied and can be constructed easily.


## Complex usage - A WAPO/Methode example

This is a real example from The Washington Post. Only the first data row is included in the example below.

https://www.washingtonpost.com/business/get-there/no-dont-buy-those-best-stocks-to-own-in-2017/2016/12/10/f7846708-bb39-11e6-91ee-1adddfe36cbe_story.html

```
{
    "type": "advanced_table",
    "title": "Tracking stock picker lists for 2016",
    "citation": {
        "type": "text",
        "content": "Source: Bloomberg News THE WASHINGTON POST"
    },
    "credits": [],
    "rows": [
        {
            "type": "row",
            "cells": [
                {
                    "type": "header_cell",
                    "additional_properties": {
                        "horiztonal_alignment": "center",
                        "vertical_alignment": "middle",
                        "width": "33.32%",
                        "colspan": 2
                    },
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "BARRON\'s"
                        },
                        {
                            "type": "text",
                            "content": "<span>METHODOLOGY</span> \"MOSTLY, VALUE OVER MOMENTUM STOCKS\""
                        }

                    ]
                },
                {
                    "type": "header_cell",
                    "additional_properties": {
                        "horiztonal_alignment": "center",
                        "vertical_alignment": "middle",
                        "width": "33.32%",
                        "colspan": 2
                    },
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "CNBC"
                        },
                        {
                            "type": "text",
                            "content": "<span>METHODOLOGY</span> \"A COMBINATION OF GROWTH AND DEFENSIVENESS\""
                        }
                    ]
                },
                {
                    "type": "header_cell",
                    "additional_properties": {
                        "horiztonal_alignment": "center",
                        "vertical_alignment": "middle",
                        "width": "33.32%",
                        "colspan": 2
                    },                    
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "FORBES"
                        },
                        {
                            "type": "text",
                            "content": "<span>METHODOLOGY</span> FOUR ADVISERS OFFERED STOCK PICKS FOR INCOME AND GROWTH"
                        }
                    ]
                }
            ]
        },
        {
            "type": "row",
            "cells": [
                {
                    "type": "data_cell",
                    "additional_properties": {
                        "horiztonal_alignment": "left",
                        "vertical_alignment": "middle",
                        "width": "21.92%",
                    },  
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "General Motors"
                        }
                    ]
                },
                {
                    "type": "data_cell",
                    "additional_properties": {
                        "horiztonal_alignment": "left",
                        "vertical_alignment": "middle",
                        "width": "11.4%",
                    },  
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "10.56%"
                        }
                    ]
                },
                {
                    "type": "data_cell",
                    "additional_properties": {
                        "horiztonal_alignment": "left",
                        "vertical_alignment": "middle",
                        "width": "21.76%",
                    },  
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "Chevron"
                        }
                    ]
                },
                {
                    "type": "data_cell",
                    "additional_properties": {
                        "horiztonal_alignment": "left",
                        "vertical_alignment": "middle",
                        "width": "11.58%",
                    },  
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "28.90%"
                        }
                    ]
                },
                {
                    "type": "data_cell",
                    "additional_properties": {
                        "horiztonal_alignment": "left",
                        "vertical_alignment": "middle",
                        "width": "23.29%",
                    },  
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "Seagate Tech"
                        }
                    ]
                },
                {
                    "type": "data_cell",
                    "additional_properties": {
                        "horiztonal_alignment": "left",
                        "vertical_alignment": "middle",
                        "width": "10.05%",
                    },  
                    "content_elements": [
                        {
                            "type": "text",
                            "content": "7.42%"
                        }
                    ]
                }
            ]
        }
    ]
}
```




# Implementation

Matt Jakes and the gregor team will implement the proposed changes in the schema if accepted.



