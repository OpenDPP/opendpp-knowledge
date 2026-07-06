---
type: Schema
title: BatteryUnitSerialisationFailedError
description: 400 body when every item in the serialisation batch failed.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitSerialisationFailedError
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

400 body when **every** item in the serialisation batch failed. Note: `errors` is an array of plain strings and there is **no `message` field** (unlike the standard error triple).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `error` | string | yes | — |
| `errors` | array<string> | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "400 body when **every** item in the serialisation batch failed. Note: `errors` is an array of plain strings and there is **no `message` field** (unlike the standard error triple).",
  "properties": {
    "success": {
      "type": "boolean",
      "const": false
    },
    "error": {
      "type": "string",
      "const": "Serialisation Failed"
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1
    }
  },
  "required": [
    "success",
    "error",
    "errors"
  ]
}
```

## Used by

- [serializeBatteryUnits](/operations/serializeBatteryUnits.md) (`POST /api/v1/passports/{passportId}/units`)
