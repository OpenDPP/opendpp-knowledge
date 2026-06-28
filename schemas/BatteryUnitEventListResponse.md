---
type: Schema
title: BatteryUnitEventListResponse
description: BatteryUnitEventListResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitEventListResponse
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `count` | integer | yes | Equals events.length; never exceeds 500. |
| `serialNumber` | string | yes | The unit's physical serial (GS1 AI-21 value). |
| `events` | array<[BatteryUnitEventRow](/schemas/BatteryUnitEventRow.md)> | yes | Newest first by recordedAt, capped at the 500 most recent. |

## JSON Schema

```json
{
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "count": {
      "type": "integer",
      "minimum": 0,
      "maximum": 500,
      "description": "Equals `events.length`; never exceeds 500."
    },
    "serialNumber": {
      "type": "string",
      "description": "The unit's physical serial (GS1 AI-21 value)."
    },
    "events": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/BatteryUnitEventRow"
      },
      "maxItems": 500,
      "description": "Newest first by `recordedAt`, capped at the 500 most recent."
    }
  },
  "required": [
    "success",
    "count",
    "serialNumber",
    "events"
  ]
}
```

## Used by

- [listBatteryUnitEvents](/operations/listBatteryUnitEvents.md) (`GET /api/v1/units/{id}/events`)
