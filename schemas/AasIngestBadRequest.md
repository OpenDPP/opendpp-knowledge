---
type: Schema
title: AasIngestBadRequest
description: "The 400 bodies of AAS ingestion: the standard error triple (bad request / signature verification / ingestion failure), or an ESPR validation failure with per-field errors[]."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/AasIngestBadRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

The 400 bodies of AAS ingestion: the standard error triple (bad request / signature verification / ingestion failure), or an ESPR validation failure with per-field `errors[]`.

## JSON Schema

```json
{
  "description": "The 400 bodies of AAS ingestion: the standard error triple (bad request / signature verification / ingestion failure), or an ESPR validation failure with per-field `errors[]`.",
  "anyOf": [
    {
      "$ref": "#/components/schemas/Error"
    },
    {
      "$ref": "#/components/schemas/AasIngestValidationError"
    }
  ]
}
```

## Used by

- [ingestPassportFromAas](/operations/ingestPassportFromAas.md) (`POST /api/v1/passports/aas/ingest`)
