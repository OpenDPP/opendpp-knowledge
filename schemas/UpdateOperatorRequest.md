---
type: Schema
title: UpdateOperatorRequest
description: Both fields are optional.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/UpdateOperatorRequest
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

Both fields are optional. Values must be non-empty strings after trimming; anything else (missing, non-string, whitespace-only) is silently ignored. `regId` and `regIdScheme` cannot be changed. An omitted body or an empty object `{}` is accepted and returns the unchanged row.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | no | New display name (trimmed). |
| `role` | string | no | New supply-chain role, free text (trimmed) — e.g. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Both fields are optional. Values must be non-empty strings after trimming; anything else (missing, non-string, whitespace-only) is silently ignored. `regId` and `regIdScheme` cannot be changed. An omitted body or an empty object `{}` is accepted and returns the unchanged row.",
  "properties": {
    "name": {
      "type": "string",
      "description": "New display name (trimmed)."
    },
    "role": {
      "type": "string",
      "description": "New supply-chain role, free text (trimmed) — e.g. `MANUFACTURER`, `IMPORTER`, `RETAILER`."
    }
  }
}
```

## Used by

- [updateOperator](/operations/updateOperator.md) (`PATCH /api/v1/operators/{id}`)
