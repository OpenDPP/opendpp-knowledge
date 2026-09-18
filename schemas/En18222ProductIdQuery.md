---
type: Schema
title: En18222ProductIdQuery
description: The product identifiers to resolve.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/En18222ProductIdQuery
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

The product identifiers to resolve. EN 18222 Table 4 names the input parameter `productId` and gives it cardinality 1..*; Table 16 describes the same body as "a set of Product IDs".

**This schema declares Table 4's form, and the node also accepts two others**: a bare JSON array — `["09501101530003"]` — for a client written literally to Table 16's wording, and the same object keyed `productIds`, which is the plural an English reader of Table 16 reaches for. They are accepted and not declared for one reason: a schema that is "an array or an object" has no single generated type in Java or Python, so declaring the union would cost every SDK a model it cannot compile. One documented shape, one generated model, and a client that guessed differently still works instead of receiving a 400.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `productId` | array<string> | yes | EN 18219 unique product identifiers, 1..*, at most 500 per request. |

## JSON Schema

```json
{
  "type": "object",
  "description": "The product identifiers to resolve. EN 18222 Table 4 names the input parameter `productId` and gives it cardinality 1..*; Table 16 describes the same body as \"a set of Product IDs\".\n\n**This schema declares Table 4's form, and the node also accepts two others**: a bare JSON array — `[\"09501101530003\"]` — for a client written literally to Table 16's wording, and the same object keyed `productIds`, which is the plural an English reader of Table 16 reaches for. They are accepted and not declared for one reason: a schema that is \"an array or an object\" has no single generated type in Java or Python, so declaring the union would cost every SDK a model it cannot compile. One documented shape, one generated model, and a client that guessed differently still works instead of receiving a 400.",
  "required": [
    "productId"
  ],
  "properties": {
    "productId": {
      "type": "array",
      "description": "EN 18219 unique product identifiers, 1..*, at most 500 per request.",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1,
      "maxItems": 500
    }
  }
}
```

## Used by

- [readDPPIdsByProductIds](/operations/readDPPIdsByProductIds.md) (`POST /v1/dppsByProductIds`)
