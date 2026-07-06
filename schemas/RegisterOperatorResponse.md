---
type: Schema
title: RegisterOperatorResponse
description: RegisterOperatorResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RegisterOperatorResponse
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | Always "Economic Operator supplier registered successfully" (also when an existing operator was bound rather than created). |
| `operator` | [OperatorRow](/schemas/OperatorRow.md) | yes | — |
| `warnings` | array<[AdvisoryItem](/schemas/AdvisoryItem.md)> | yes | Non-blocking advisories (#404). |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "message",
    "operator",
    "warnings"
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
    },
    "warnings": {
      "type": "array",
      "description": "Non-blocking advisories (#404). Carries a single EORI-not-found note when the OPT-IN `EORI_EXISTENCE_CHECK` is enabled and a declared EORI is not found in the EU EOS register. Empty `[]` otherwise. Never blocks registration.",
      "items": {
        "$ref": "#/components/schemas/AdvisoryItem"
      }
    }
  }
}
```

## Used by

- [registerOperator](/operations/registerOperator.md) (`POST /api/v1/operators`)
