---
type: Schema
title: DeleteOperatorResponse
description: "Outcome of removing an economic operator: whether it was archived rather than deleted, and how many of its passports were archived with it."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/DeleteOperatorResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

Outcome of removing an economic operator: whether it was archived rather than deleted, and how many of its passports were archived with it.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `archived` | boolean | yes | true = the operator was archived (soft-deleted; passports retained, restorable). |
| `archivedPassports` | integer | no | Number of active passports archived alongside the operator. |

## JSON Schema

```json
{
  "description": "Outcome of removing an economic operator: whether it was archived rather than deleted, and how many of its passports were archived with it.",
  "type": "object",
  "required": [
    "success",
    "archived"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "archived": {
      "type": "boolean",
      "description": "`true` = the operator was archived (soft-deleted; passports retained, restorable). `false` = the operator was hard-deleted (it had no passports)."
    },
    "archivedPassports": {
      "type": "integer",
      "minimum": 0,
      "description": "Number of active passports archived alongside the operator. Present only on the primary archive path (operator had passports); absent on hard deletes and on the foreign-key fallback archive."
    }
  }
}
```

## Used by

- [deleteOperator](/operations/deleteOperator.md) (`DELETE /api/v1/operators/{id}`)
