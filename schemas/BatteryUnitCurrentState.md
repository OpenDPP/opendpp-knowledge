---
type: Schema
title: BatteryUnitCurrentState
description: Latest recorded measurement of the unit (owner/grant tiers only).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitCurrentState
tags:
  - schema
timestamp: 2026-06-17T00:00:00Z
---

Latest recorded measurement of the unit (owner/grant tiers only). All measurement fields are `null` when the latest event did not carry them.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `stateOfHealth` | number,null | yes | State of health, percent (0-100). |
| `cycleCount` | integer,null | yes | Cumulative full-equivalent charge cycles. |
| `remainingCapacityAh` | number,null | yes | Measured remaining capacity in ampere-hours. |
| `temperatureC` | number,null | yes | Observed temperature in degrees Celsius. |
| `recordedAt` | string | yes | When the measurement was taken (client-supplied). |

## JSON Schema

```json
{
  "type": "object",
  "description": "Latest recorded measurement of the unit (owner/grant tiers only). All measurement fields are `null` when the latest event did not carry them.",
  "required": [
    "stateOfHealth",
    "cycleCount",
    "remainingCapacityAh",
    "temperatureC",
    "recordedAt"
  ],
  "properties": {
    "stateOfHealth": {
      "type": [
        "number",
        "null"
      ],
      "description": "State of health, percent (0-100)."
    },
    "cycleCount": {
      "type": [
        "integer",
        "null"
      ],
      "description": "Cumulative full-equivalent charge cycles."
    },
    "remainingCapacityAh": {
      "type": [
        "number",
        "null"
      ],
      "description": "Measured remaining capacity in ampere-hours."
    },
    "temperatureC": {
      "type": [
        "number",
        "null"
      ],
      "description": "Observed temperature in degrees Celsius."
    },
    "recordedAt": {
      "type": "string",
      "format": "date-time",
      "description": "When the measurement was taken (client-supplied)."
    }
  }
}
```

## Used by

- schema [BatteryUnitJsonLd](/schemas/BatteryUnitJsonLd.md)
- schema [PublicBatteryUnitJsonLd](/schemas/PublicBatteryUnitJsonLd.md)
