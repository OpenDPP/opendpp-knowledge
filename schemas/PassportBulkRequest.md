---
type: Schema
title: PassportBulkRequest
description: PassportBulkRequest
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportBulkRequest
tags:
  - schema
timestamp: 2026-07-04T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `passports` | array<[PassportBulkRow](/schemas/PassportBulkRow.md)> | yes | 1–200 rows. |
| `dryRun` | boolean | no | When true, every row is validated and the duplicate/operator/facility checks run, but nothing is written — the response is 200 and reports which rows are OK (r… |
| `upsert` | boolean | no | When true, a row whose (productId, operator) already exists updates the existing passport instead of being reported as a duplicate (a sealed passport is never… |

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
    },
    "dryRun": {
      "type": "boolean",
      "description": "When `true`, every row is validated and the duplicate/operator/facility checks run, but **nothing is written** — the response is **200** and reports which rows are OK (`results`) vs failed (`errors[]`). Powers a pre-import preview."
    },
    "upsert": {
      "type": "boolean",
      "description": "When `true`, a row whose `(productId, operator)` already exists **updates** the existing passport instead of being reported as a duplicate (a sealed passport is never overwritten). Enables idempotent re-import of a corrected catalog."
    }
  }
}
```

## Used by

- [bulkIngestPassports](/operations/bulkIngestPassports.md) (`POST /api/v1/passports/bulk`)
