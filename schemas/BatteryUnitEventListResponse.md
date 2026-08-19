---
type: Schema
title: BatteryUnitEventListResponse
description: One page of a battery unit's append-only dynamic-data history, newest first.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitEventListResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

One page of a battery unit's append-only dynamic-data history, newest first.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `count` | integer | yes | Equals events.length; never exceeds the page limit. |
| `serialNumber` | string | yes | The unit's physical serial (GS1 AI-21 value). |
| `nextCursor` | string,null | yes | Opaque cursor for the next (older) page — pass it as the cursor query parameter. |
| `events` | array<[BatteryUnitEventRow](/schemas/BatteryUnitEventRow.md)> | yes | Newest first by recordedAt (ties broken by id), at most one page (limit) per response. |

## JSON Schema

```json
{
  "description": "One page of a battery unit's append-only dynamic-data history, newest first.",
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
      "description": "Equals `events.length`; never exceeds the page `limit`."
    },
    "serialNumber": {
      "type": "string",
      "description": "The unit's physical serial (GS1 AI-21 value)."
    },
    "nextCursor": {
      "type": [
        "string",
        "null"
      ],
      "description": "Opaque cursor for the next (older) page — pass it as the `cursor` query parameter. `null` when this page ends the history."
    },
    "events": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/BatteryUnitEventRow"
      },
      "maxItems": 500,
      "description": "Newest first by `recordedAt` (ties broken by `id`), at most one page (`limit`) per response."
    }
  },
  "required": [
    "success",
    "count",
    "serialNumber",
    "nextCursor",
    "events"
  ]
}
```

## Used by

- [listBatteryUnitEvents](/operations/listBatteryUnitEvents.md) (`GET /api/v1/units/{id}/events`)
