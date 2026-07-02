---
type: Schema
title: BatteryUnitTombstoneJsonLd
description: Art.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitTombstoneJsonLd
tags:
  - schema
timestamp: 2026-07-02T00:00:00Z
---

Art. 77(8) tombstone (HTTP 410): once a battery is recycled its passport has ceased to exist. This minimal record confirms the unit existed, that it was recycled and when, plus the (still living) model-passport link. Grants and owner credentials do not override the tombstone on the public URL; the underlying data is retained internally for the statutory retention window.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | array<—> | yes | — |
| `@type` | string | yes | — |
| `@id` | string | yes | — |
| `id` | string | yes | — |
| `serialNumber` | string | yes | — |
| `status` | string | yes | — |
| `ceasedAt` | string,null | yes | When the unit's passport ceased to exist (stamped when the status transitioned to RECYCLED). |
| `notice` | string | yes | — |
| `ofModelUrl` | string,null | yes | Relative URL of the still-living SKU/type passport: /passport/{passportId}. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Art. 77(8) tombstone (HTTP 410): once a battery is recycled its passport has ceased to exist. This minimal record confirms the unit existed, that it was recycled and when, plus the (still living) model-passport link. Grants and owner credentials do not override the tombstone on the public URL; the underlying data is retained internally for the statutory retention window.",
  "additionalProperties": false,
  "required": [
    "@context",
    "@type",
    "@id",
    "id",
    "serialNumber",
    "status",
    "ceasedAt",
    "notice",
    "ofModelUrl"
  ],
  "properties": {
    "@context": {
      "type": "array",
      "minItems": 2,
      "maxItems": 2,
      "items": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          }
        ]
      }
    },
    "@type": {
      "type": "string",
      "const": "BatteryUnit"
    },
    "@id": {
      "type": "string",
      "format": "uri"
    },
    "id": {
      "type": "string"
    },
    "serialNumber": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "const": "RECYCLED"
    },
    "ceasedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "When the unit's passport ceased to exist (stamped when the status transitioned to RECYCLED)."
    },
    "notice": {
      "type": "string",
      "const": "This battery has been recycled. Its battery passport has ceased to exist (Regulation (EU) 2023/1542, Art. 77(8))."
    },
    "ofModelUrl": {
      "type": [
        "string",
        "null"
      ],
      "description": "Relative URL of the still-living SKU/type passport: `/passport/{passportId}`."
    }
  }
}
```

## Used by

- [resolvePublicBatteryUnit](/operations/resolvePublicBatteryUnit.md) (`GET /unit/{id}`)
