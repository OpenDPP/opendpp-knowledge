---
type: Schema
title: SerializeBatteryUnitsRequest
description: "Either a single unit object, or a batch wrapper {units: [...]}."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/SerializeBatteryUnitsRequest
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

Either a single unit object, or a batch wrapper `{units: [...]}`. Precedence: when `units` is present **and is an array** it is used; otherwise the whole body is treated as one unit. (`anyOf`, not `oneOf`: a body carrying both a top-level `serialNumber` and a `units` array matches both shapes and is accepted by the server — `units` wins.)

## JSON Schema

```json
{
  "description": "Either a single unit object, or a batch wrapper `{units: [...]}`. Precedence: when `units` is present **and is an array** it is used; otherwise the whole body is treated as one unit. (`anyOf`, not `oneOf`: a body carrying both a top-level `serialNumber` and a `units` array matches both shapes and is accepted by the server — `units` wins.)",
  "anyOf": [
    {
      "$ref": "#/components/schemas/BatteryUnitCreateItem"
    },
    {
      "type": "object",
      "properties": {
        "units": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/BatteryUnitCreateItem"
          },
          "minItems": 1,
          "maxItems": 200,
          "description": "1–200 units per request. An empty array is rejected with 400 `Bad Request`; more than 200 likewise."
        }
      },
      "required": [
        "units"
      ]
    }
  ]
}
```

## Used by

- [validateBatteryUnits](/operations/validateBatteryUnits.md) (`POST /api/v1/passports/{passportId}/units/validate`)
- [serializeBatteryUnits](/operations/serializeBatteryUnits.md) (`POST /api/v1/passports/{passportId}/units`)
