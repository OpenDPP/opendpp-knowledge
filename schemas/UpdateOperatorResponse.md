---
type: Schema
title: UpdateOperatorResponse
description: The economic operator as stored after the update.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/UpdateOperatorResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-09T00:00:00Z
---

The economic operator as stored after the update.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `operator` | [OperatorRow](/schemas/OperatorRow.md) | yes | — |

## JSON Schema

```json
{
  "description": "The economic operator as stored after the update.",
  "type": "object",
  "required": [
    "success",
    "operator"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "operator": {
      "$ref": "#/components/schemas/OperatorRow"
    }
  }
}
```

## Used by

- [updateOperator](/operations/updateOperator.md) (`PATCH /api/v1/operators/{id}`)
