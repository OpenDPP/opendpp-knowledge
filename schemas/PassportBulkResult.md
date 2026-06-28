---
type: Schema
title: PassportBulkResult
description: 201 partial-success envelope of POST /api/v1/passports/bulk.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportBulkResult
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
---

201 partial-success envelope of `POST /api/v1/passports/bulk`. Returned whenever at least one row was inserted, even if other rows failed. Each result row carries a `vcReady` UNTP Verifiable-Credential readiness signal (#247).

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
  "description": "201 partial-success envelope of `POST /api/v1/passports/bulk`. Returned whenever at least one row was inserted, even if other rows failed. Each result row carries a `vcReady` UNTP Verifiable-Credential readiness signal (#247).",
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
          "digitalLinkUri",
          "vcReady"
        ],
        "properties": {
          "productId": {
            "type": "string"
          },
          "digitalLinkUri": {
            "type": "string",
            "format": "uri",
            "description": "Generated GS1 Digital Link URI `https://opendpp-node.eu/{01|8003}/{productId}`."
          },
          "vcReady": {
            "type": "boolean",
            "description": "#247: whether this row's passport can emit a UNTP Verifiable Credential — true only when a manufacturing facility with a country of production is linked. On a `dryRun` preview this reflects the EFFECTIVE facility after import (the row's facility, else the existing passport's preserved one)."
          },
          "vcReadyReason": {
            "type": [
              "string",
              "null"
            ],
            "description": "Null when `vcReady` is true; otherwise a short, actionable reason (link a facility with a country of production)."
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
