---
type: Schema
title: PassportBulkResult
description: 201 partial-success envelope of POST /api/v1/passports/bulk.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportBulkResult
tags:
  - schema
timestamp: 2026-06-20T00:00:00Z
---

201 partial-success envelope of `POST /api/v1/passports/bulk`. Returned whenever at least one row was inserted, even if other rows failed.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | Template: "Bulk CSV ingestion finished. |
| `insertedCount` | integer | yes | Number of rows actually inserted (= results.length). |
| `results` | array<object> | yes | — |
| `errors` | array<string> | no | Human-readable per-row failure strings, prefixed [SKU: <productId>] (or "Missing or invalid productId in spreadsheet row"). |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "message",
    "insertedCount",
    "results"
  ],
  "description": "201 partial-success envelope of `POST /api/v1/passports/bulk`. Returned whenever at least one row was inserted, even if other rows failed.",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "description": "Template: \"Bulk CSV ingestion finished. Registered <n> passports, skipped <m> rows with errors.\""
    },
    "insertedCount": {
      "type": "integer",
      "minimum": 0,
      "description": "Number of rows actually inserted (= `results.length`)."
    },
    "results": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "productId",
          "digitalLinkUri"
        ],
        "properties": {
          "productId": {
            "type": "string"
          },
          "digitalLinkUri": {
            "type": "string",
            "format": "uri",
            "description": "Generated GS1 Digital Link URI `https://opendpp-node.eu/{01|8003}/{productId}/21/{passportId}`."
          }
        }
      }
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Human-readable per-row failure strings, prefixed `[SKU: <productId>]` (or \"Missing or invalid productId in spreadsheet row\"). Present ONLY when at least one row failed — omitted otherwise."
    }
  }
}
```

## Used by

- [bulkIngestPassports](/operations/bulkIngestPassports.md) (`POST /api/v1/passports/bulk`)
