---
type: Schema
title: SerializeBatteryUnitsResponse
description: Returned (201) when at least one unit was created.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/SerializeBatteryUnitsResponse
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

Returned (201) when at least one unit was created. Partial success is possible: skipped items are reported in `errors` while `units` holds the created rows.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | E.g. |
| `count` | integer | yes | Number of units actually created (equals units.length). |
| `units` | array<[BatteryUnitRow](/schemas/BatteryUnitRow.md)> | yes | — |
| `errors` | array<string> | no | Present only when some items were skipped — one plain-English string per skipped item, generally prefixed [<serialNumber>]. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Returned (201) when at least one unit was created. Partial success is possible: skipped items are reported in `errors` while `units` holds the created rows.",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "description": "E.g. `Serialised 2 individual unit(s)` or `Serialised 1 individual unit(s), skipped 1`."
    },
    "count": {
      "type": "integer",
      "minimum": 1,
      "description": "Number of units actually created (equals `units.length`)."
    },
    "units": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/BatteryUnitRow"
      }
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Present only when some items were skipped — one plain-English string per skipped item, generally prefixed `[<serialNumber>]`."
    }
  },
  "required": [
    "success",
    "message",
    "count",
    "units"
  ]
}
```

## Used by

- [serializeBatteryUnits](/operations/serializeBatteryUnits.md) (`POST /api/v1/passports/{passportId}/units`)
