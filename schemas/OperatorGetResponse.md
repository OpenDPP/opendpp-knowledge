---
type: Schema
title: OperatorGetResponse
description: OperatorGetResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/OperatorGetResponse
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
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

- [getOperator](/operations/getOperator.md) (`GET /api/v1/operators/{id}`)
