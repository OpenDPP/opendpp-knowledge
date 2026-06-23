---
type: Schema
title: BatteryUnitDeleteResponse
description: BatteryUnitDeleteResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitDeleteResponse
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
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
