# FOCAL POINT PROPOSAL

## Problem
Editorial users wish to be able to declare a focal point for images. Additionally, these users wish to be able to set a focal point over-ride for images when used in a Gallery, Story, Video, etc.

## Usage Patterns
- Anglerfish users will set a global focal point for an image
- Anglerfish users can set a focal point over-ride for a gallery cover image
- Ellipsis users can set a focal point on any image, be it featured image, or an image in the body
- Goldfish users can set a focal point on the video cover image

## Proposal
We propose adding a focal point trait for use in images. The focal point is a single pixel position identified on an image will be stored by a set of two integer values: X and Y coordinates. The focal point field will appear in the top-level of image ANS.

Enveloping ANS documents, such as Gallery and Story can over-ride an image's focal point. Gallery over-rides will appear in the image's new `gallery_properties` property, which is valid only in the context of an Image ANS within a gallery. Story and thumbnail over-rides will be done through referent_properties on the image.

### ANS Structure
Focal point values are X, Y coordinates that represent the visual 'center' of the image. When cropping/resizing images, renderers will use the focal point to find the center of the image.

The X-Y coordinates refers to the X and Y axis that are perpendicular lines intersecting at point referred to as the "focal point". The X axis is horizontal line and the Y axis the vertical line, and represent the LEFT, TOP of the image.

The X coordinate's range is 0->Image Height. The Y coordinate's range is 0->Image Width.

```
"focal_point": {
  "x": 0,
  "y": 0
}
```

### Example Focal Point
```
"focal_point": {
  "x": 460,
  "y": 300
}
```
The above example sets a focal point at the intersetion of 460px from the LEFT edge of the image, and 300px from the TOP of the image.

### Example image ANS with focal point
```
{
	"_id": "2K2QZFZXT5BPBPGFPKJIGL7D5Q",
	"address": {},
	"created_date": "2019-06-03T20:18:53Z",
  "focal_point": {
      "x": 850,
      "y": 480
    },
	"height": 4302,
	"image_type": "photograph",
	"last_updated_date": "2019-06-21T15:02:16Z",
	"licensable": false,
	"owner": {
		"id": "localhost",
		"sponsored": true
	},
	"source": {
		"edit_url": "https://localhost.arcpublishing.com/photo/2K2QZFZXT5BPBPGFPKJIGL7D5Q",
		"system": "Anglerfish"
	},
	"status": "true",
	"taxonomy": {
		"associated_tasks": []
	},
	"type": "image",
	"url": "https://arc-anglerfish-local-localhost.s3.amazonaws.com/public/2K2QZFZXT5BPBPGFPKJIGL7D5Q.jpeg",
	"version": "0.9.0",
	"width": 2868,
	"syndication": {
		"search": false,
		"external_distribution": false
	}
}
```

## Gallery Focal Point Per Image Over-ride
A Gallery can provide an individual over-ride per image in the gallery. These will be represented as `gallery_properties` on the Image ANS root. The new `gallery_properties` property is only valid in Image ANS within the context of a gallery.

### Example Gallery ANS over-riding the included image's focal point using `gallery_properties` of the image
```

{
	"_id": "4ALJMFC2KRAOFLCFVJ3WC7QNOA",
	"additional_properties": {
		"owner": "test.user@arcpublishing.com",
		"published": true,
		"restricted": false,
		"version": 31,
		"roles": []
	},
	"canonical_website": "raycom",
	"content_restrictions": {
		"content_code": ""
	},
	"copyright": "Specialty",
	"created_date": "2019-03-14T18:46:00Z",
	"credits": {
		"by": []
	},
	"description": {
		"basic": ""
	},
	"display_date": "2019-07-08T15:50:41Z",
	"first_publish_date": "2019-07-08T15:50:41Z",
	"headlines": {
		"basic": "Guitar Gallery"
	},
	"last_updated_date": "2019-07-08T17:13:01Z",
	"owner": {
		"id": "localhost",
		"name": "Staff Writer",
		"sponsored": false
	},
	"publish_date": "2019-07-08T16:41:18Z",
	"source": {
		"additional_properties": {
			"editor": "Anglerfish"
		},
		"edit_url": "https://localhost.arcpublishing.com/photo/gallery/4ALJMFC2KRAOFLCFVJ3WC7QNOA",
		"system": "Anglerfish"
	},
	"taxonomy": {
		"additional_properties": {},
		"sections": []
	},
	"type": "gallery",
	"version": "0.9.0",
	"websites": {
		"bar10": {
			"website_url": "/2019/07/08/guitar-gallery/"
		},
		"best-testing-website": {
			"website_url": "/2019/07/08/guitar-gallery/"
		},
		"digital-content-center": {
			"website_url": "/2019/07/08/guitar-gallery/"
		}
	},
	"content_elements": [{
		"_id": "2K2QZFZXT5BPBPGFPKJIGL7D5Q",
		"additional_properties": {
			"fullSizeResizeUrl": "/photo/resize/Oyx05jwTKr3nakiLHktQnO2eD3w=/arc-anglerfish-local-localhost/public/2K2QZFZXT5BPBPGFPKJIGL7D5Q.jpeg",
			"galleries": [{
				"headlines": {
					"basic": "Test with new Upload photos featuring guitars"
				},
				"_id": "RVOTZ67DHRCX3OKK775RKGCLPI"
			}],
			"galleryOrder": 12,
			"ingestionMethod": "manual",
			"keywords": [""],
			"mime_type": "image/jpeg",
			"originalName": "Fender Custom Shop 52 Tele (10 of 12).jpeg",
			"originalUrl": "https://arc-anglerfish-local-localhost.s3.amazonaws.com/public/2K2QZFZXT5BPBPGFPKJIGL7D5Q.jpeg",
			"owner": "test.user@arcpublishing.com",
			"proxyUrl": "/photo/resize/pUlgam_6M2eiyWdw1xNDsOLjkuA=/fit-in/330x230/arc-anglerfish-local-localhost/public/2K2QZFZXT5BPBPGFPKJIGL7D5Q.jpeg",
			"published": true,
			"resizeUrl": "http://resizer.shared.arcpublishing.com/pUlgam_6M2eiyWdw1xNDsOLjkuA=/fit-in/330x230/arc-anglerfish-local-localhost/public/2K2QZFZXT5BPBPGFPKJIGL7D5Q.jpeg",
			"restricted": false,
			"takenOn": "2019-05-10T13:20:35Z",
			"version": 33
		},
		"address": {},
		"created_date": "2019-06-03T20:18:53Z",
		"credits": {
			"by": []
		},
		"focal_point": {
			"x": 1146,
			"y": 806
		},
		gallery_properties: {
			"focal_point": {
				"x": 700,
				"y": 600
			}
		},
		"geo": {},
		"height": 4302,
		"image_type": "illustration",
		"last_updated_date": "2019-06-20T20:59:02Z",
		"licensable": false,
		"owner": {
			"id": "localhost",
			"sponsored": true
		},
		"source": {
			"edit_url": "https://localhost.arcpublishing.com/photo/2K2QZFZXT5BPBPGFPKJIGL7D5Q",
			"system": "Anglerfish"
		},
		"status": "true",
		"taxonomy": {
			"associated_tasks": []
		},
		"type": "image",
		"url": "https://arc-anglerfish-local-localhost.s3.amazonaws.com/public/2K2QZFZXT5BPBPGFPKJIGL7D5Q.jpeg",
		"version": "0.9.0",
		"width": 2868,
		"syndication": {
			"search": false,
			"external_distribution": false
		}
	}]
}
```

### Example story ANS over-riding the included image's focal point using referent_properties
```
{
  "_id": "25NZ3GMIYJFKNNT5CNM36ZMKEA",
  "type": "story",
  "version": "0.10.2",
  "content_elements": [
    {
      "type": "promo_reference",
      "referent": {
        "id": "67AWVTPPTFBHZD4ACJRU7FS4L4",
        "type": "image",
        "referent_properties": {
          "focal_point": {
              "x": 600,
              "y": 400
          },
        }
      }
    }
  ],
  "created_date": "2019-07-11T20:29:38.908Z",
  "last_updated_date": "2019-07-12T15:05:19.631Z",
  "canonical_url": "\/about-us\/test-slug-20190711-25nz3gmiyjfknnt5cnm36zmkea-story.html",
  "headlines": {
    "basic": "Testing adding content element"
  },
  "owner": {
    "sponsored": false,
    "name": "The Washington Post",
    "id": "staging"
  },
  "workflow": {
    "status_code": 1
  },
  "source": {
    "system": "ellipsis",
    "name": "wp",
    "source_type": "staff"
  },
  "additional_properties": {
    "has_published_copy": true,
    "is_published": true,
    "publish_date": "2019-07-11T21:52:06.790Z"
  }
}
```

## Concerns
No concerns at this time.

## Implementation
The Anglerfish team will implement and add to the schema if this proposal is accepted.
