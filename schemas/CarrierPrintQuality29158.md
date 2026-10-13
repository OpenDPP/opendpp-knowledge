---
type: Schema
title: CarrierPrintQuality29158
description: An ISO/IEC 29158 Direct Part Mark quality grade (EN 18220 §5.6.2), for a symbol marked on the item's own surface (placement PRODUCT).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/CarrierPrintQuality29158
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-21T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

An ISO/IEC 29158 Direct Part Mark quality grade (EN 18220 §5.6.2), for a symbol marked on the item's own surface (placement `PRODUCT`).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `method` | string | yes | — |
| `grade` | string | yes | Symbol quality grade, A (best) to F. |

## JSON Schema

```json
{
  "type": "object",
  "description": "An ISO/IEC 29158 Direct Part Mark quality grade (EN 18220 §5.6.2), for a symbol marked on the item's own surface (placement `PRODUCT`).",
  "required": [
    "method",
    "grade"
  ],
  "additionalProperties": false,
  "properties": {
    "method": {
      "type": "string",
      "enum": [
        "ISO_IEC_29158"
      ]
    },
    "grade": {
      "type": "string",
      "enum": [
        "A",
        "B",
        "C",
        "D",
        "F"
      ],
      "description": "Symbol quality grade, A (best) to F."
    }
  }
}
```

## Used by

- schema [CarrierDeclaration](/schemas/CarrierDeclaration.md)
