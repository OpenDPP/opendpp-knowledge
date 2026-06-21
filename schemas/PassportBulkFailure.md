---
type: Schema
title: PassportBulkFailure
description: 400 body of POST /api/v1/passports/bulk when EVERY row failed.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportBulkFailure
tags:
  - schema
timestamp: 2026-06-20T00:00:00Z
---

400 body of `POST /api/v1/passports/bulk` when EVERY row failed. Note: `errors` is an array of STRINGS (not objects) and there is NO `message` field.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `error` | string | yes | — |
| `errors` | array<string> | yes | One human-readable string per failed row, prefixed [SKU: <productId>] where the productId was readable. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "error",
    "errors"
  ],
  "description": "400 body of `POST /api/v1/passports/bulk` when EVERY row failed. Note: `errors` is an array of STRINGS (not objects) and there is NO `message` field.",
  "properties": {
    "success": {
      "type": "boolean",
      "const": false
    },
    "error": {
      "type": "string",
      "const": "Bulk Ingestion Failed"
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "One human-readable string per failed row, prefixed `[SKU: <productId>]` where the productId was readable."
    }
  }
}
```

## Used by

- [bulkIngestPassports](/operations/bulkIngestPassports.md) (`POST /api/v1/passports/bulk`)
