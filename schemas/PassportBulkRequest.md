---
type: Schema
title: PassportBulkRequest
description: PassportBulkRequest
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportBulkRequest
tags:
  - schema
timestamp: 2026-06-22T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `passports` | array<[PassportBulkRow](/schemas/PassportBulkRow.md)> | yes | 1–200 rows. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "passports"
  ],
  "properties": {
    "passports": {
      "type": "array",
      "minItems": 1,
      "maxItems": 200,
      "items": {
        "$ref": "#/components/schemas/PassportBulkRow"
      },
      "description": "1–200 rows. The bounds are enforced before any row is processed; violations return the default `{statusCode, code, error, message}` error body."
    }
  }
}
```

## Used by

- [bulkIngestPassports](/operations/bulkIngestPassports.md) (`POST /api/v1/passports/bulk`)
