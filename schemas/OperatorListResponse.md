---
type: Schema
title: OperatorListResponse
description: OperatorListResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/OperatorListResponse
tags:
  - schema
timestamp: 2026-06-29T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `count` | integer | yes | Number of operators returned (the list is not paginated). |
| `operators` | array<[OperatorRow](/schemas/OperatorRow.md)> | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "count",
    "operators"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "count": {
      "type": "integer",
      "description": "Number of operators returned (the list is not paginated)."
    },
    "operators": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/OperatorRow"
      }
    }
  }
}
```

## Used by

- [listOperators](/operations/listOperators.md) (`GET /api/v1/operators`)
