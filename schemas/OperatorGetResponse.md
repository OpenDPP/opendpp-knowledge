---
type: Schema
title: OperatorGetResponse
description: A single economic operator record.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/OperatorGetResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

A single economic operator record.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `operator` | [OperatorRow](/schemas/OperatorRow.md) | yes | — |

## JSON Schema

```json
{
  "description": "A single economic operator record.",
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
