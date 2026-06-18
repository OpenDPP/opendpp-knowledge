---
type: Schema
title: RegisterOperatorResponse
description: RegisterOperatorResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RegisterOperatorResponse
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | Always "Economic Operator supplier registered successfully" (also when an existing operator was bound rather than created). |
| `operator` | [OperatorRow](/schemas/OperatorRow.md) | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "message",
    "operator"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "description": "Always `\"Economic Operator supplier registered successfully\"` (also when an existing operator was bound rather than created)."
    },
    "operator": {
      "$ref": "#/components/schemas/OperatorRow"
    }
  }
}
```

## Used by

- [registerOperator](/operations/registerOperator.md) (`POST /api/v1/operators`)
