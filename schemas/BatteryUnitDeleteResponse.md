---
type: Schema
title: BatteryUnitDeleteResponse
description: Confirmation that a battery unit was deleted.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitDeleteResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-27T00:00:00Z
---

Confirmation that a battery unit was deleted.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
  "description": "Confirmation that a battery unit was deleted.",
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "const": "Battery unit deleted."
    }
  },
  "required": [
    "success",
    "message"
  ]
}
```

## Used by

- [deleteBatteryUnit](/operations/deleteBatteryUnit.md) (`DELETE /api/v1/units/{id}`)
