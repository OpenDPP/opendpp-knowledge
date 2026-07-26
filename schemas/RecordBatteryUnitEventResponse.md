---
type: Schema
title: RecordBatteryUnitEventResponse
description: RecordBatteryUnitEventResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RecordBatteryUnitEventResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-26T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `event` | [BatteryUnitEventRow](/schemas/BatteryUnitEventRow.md) | yes | — |

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
      "const": "Dynamic data recorded"
    },
    "event": {
      "$ref": "#/components/schemas/BatteryUnitEventRow"
    }
  },
  "required": [
    "success",
    "message",
    "event"
  ]
}
```

## Used by

- [recordBatteryUnitEvent](/operations/recordBatteryUnitEvent.md) (`POST /api/v1/units/{id}/events`)
