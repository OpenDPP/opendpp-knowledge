---
type: Schema
title: RestoreOperatorResponse
description: RestoreOperatorResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RestoreOperatorResponse
tags:
  - schema
timestamp: 2026-07-02T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `restoredPassports` | integer | yes | Number of archived passports returned to the active catalogue (archivedAt and retentionUntil cleared). |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "restoredPassports"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "restoredPassports": {
      "type": "integer",
      "minimum": 0,
      "description": "Number of archived passports returned to the active catalogue (`archivedAt` and `retentionUntil` cleared). Passports independently DECOMMISSIONED are not restored and not counted."
    }
  }
}
```

## Used by

- [restoreOperator](/operations/restoreOperator.md) (`POST /api/v1/operators/{id}/restore`)
