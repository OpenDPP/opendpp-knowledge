---
type: Schema
title: UpdateOperatorResponse
description: UpdateOperatorResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/UpdateOperatorResponse
tags:
  - schema
timestamp: 2026-06-26T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `operator` | [OperatorRow](/schemas/OperatorRow.md) | yes | — |

## JSON Schema

```json
{
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
