---
type: Schema
title: PassportListResponse
description: Envelope of GET /api/v1/passports.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportListResponse
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

Envelope of GET /api/v1/passports. The response is serialized against a declared response schema: top-level keys other than these four are stripped. There is NO total count.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | Always true on 200. |
| `page` | integer | yes | Effective page after server-side clamping (min 1). |
| `limit` | integer | yes | Effective page size after server-side clamping (default 10, max 100). |
| `passports` | array<[PassportListItem](/schemas/PassportListItem.md)> | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Envelope of GET /api/v1/passports. The response is serialized against a declared response schema: top-level keys other than these four are stripped. There is NO total count.",
  "required": [
    "success",
    "page",
    "limit",
    "passports"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "description": "Always true on 200."
    },
    "page": {
      "type": "integer",
      "minimum": 1,
      "description": "Effective page after server-side clamping (min 1)."
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "description": "Effective page size after server-side clamping (default 10, max 100)."
    },
    "passports": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/PassportListItem"
      }
    }
  }
}
```

## Used by

- [listPassports](/operations/listPassports.md) (`GET /api/v1/passports`)
