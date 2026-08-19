---
type: Schema
title: PassportBulkBadRequest
description: "The 400 bodies of bulk ingestion: every row failed (Bulk Ingestion Failed), or the request never reached row processing and returns the default request-rejection body."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportBulkBadRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

The 400 bodies of bulk ingestion: every row failed (`Bulk Ingestion Failed`), or the request never reached row processing and returns the default request-rejection body.

## JSON Schema

```json
{
  "description": "The 400 bodies of bulk ingestion: every row failed (`Bulk Ingestion Failed`), or the request never reached row processing and returns the default request-rejection body.",
  "oneOf": [
    {
      "$ref": "#/components/schemas/PassportBulkFailure"
    },
    {
      "$ref": "#/components/schemas/DefaultRequestRejectionError"
    }
  ]
}
```

## Used by

- [bulkIngestPassports](/operations/bulkIngestPassports.md) (`POST /api/v1/passports/bulk`)
