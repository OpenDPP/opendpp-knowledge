---
type: Schema
title: BatteryUnitEventNode
description: One append-only telemetry event (owner/grant tiers only).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitEventNode
tags:
  - schema
timestamp: 2026-06-26T00:00:00Z
---

One append-only telemetry event (owner/grant tiers only).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@type` | string | yes | — |
| `eventType` | string | yes | — |
| `stateOfHealth` | number,null | yes | Percent, 0-100. |
| `cycleCount` | integer,null | yes | — |
| `remainingCapacityAh` | number,null | yes | — |
| `temperatureC` | number,null | yes | — |
| `payload` | object,array,null | yes | Free-form additional telemetry/context supplied at ingestion. |
| `recordedAt` | string | yes | When the measurement was taken (client-supplied at ingestion). |

## JSON Schema

```json
{
  "type": "object",
  "description": "One append-only telemetry event (owner/grant tiers only).",
  "required": [
    "@type",
    "eventType",
    "stateOfHealth",
    "cycleCount",
    "remainingCapacityAh",
    "temperatureC",
    "payload",
    "recordedAt"
  ],
  "properties": {
    "@type": {
      "type": "string",
      "const": "BatteryUnitEvent"
    },
    "eventType": {
      "type": "string",
      "enum": [
        "SOH_MEASUREMENT",
        "CHARGE_CYCLE",
        "STATUS_CHANGE",
        "NEGATIVE_EVENT",
        "OTHER"
      ]
    },
    "stateOfHealth": {
      "type": [
        "number",
        "null"
      ],
      "description": "Percent, 0-100."
    },
    "cycleCount": {
      "type": [
        "integer",
        "null"
      ]
    },
    "remainingCapacityAh": {
      "type": [
        "number",
        "null"
      ]
    },
    "temperatureC": {
      "type": [
        "number",
        "null"
      ]
    },
    "payload": {
      "type": [
        "object",
        "array",
        "null"
      ],
      "additionalProperties": true,
      "description": "Free-form additional telemetry/context supplied at ingestion. Ingestion accepts any JSON object OR array, so both shapes can appear here."
    },
    "recordedAt": {
      "type": "string",
      "format": "date-time",
      "description": "When the measurement was taken (client-supplied at ingestion)."
    }
  }
}
```

## Used by

- schema [PublicBatteryUnitJsonLd](/schemas/PublicBatteryUnitJsonLd.md)
