---
type: Schema
title: BatteryUnitDynamicDataEvent
description: One telemetry event in the JSON-LD dynamicData history (privileged view only).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitDynamicDataEvent
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

One telemetry event in the JSON-LD `dynamicData` history (privileged view only).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@type` | string | yes | — |
| `eventType` | [BatteryUnitEventType](/schemas/BatteryUnitEventType.md) | yes | — |
| `stateOfHealth` | number,null | yes | — |
| `cycleCount` | integer,null | yes | — |
| `remainingCapacityAh` | number,null | yes | — |
| `temperatureC` | number,null | yes | — |
| `payload` | object,array,null | yes | The persisted free-form payload — a JSON object or array (arrays pass the write-path typeof check), null when absent. |
| `recordedAt` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "One telemetry event in the JSON-LD `dynamicData` history (privileged view only).",
  "properties": {
    "@type": {
      "type": "string",
      "const": "BatteryUnitEvent"
    },
    "eventType": {
      "$ref": "#/components/schemas/BatteryUnitEventType"
    },
    "stateOfHealth": {
      "type": [
        "number",
        "null"
      ]
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
      "description": "The persisted free-form payload — a JSON object **or array** (arrays pass the write-path `typeof` check), `null` when absent."
    },
    "recordedAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "@type",
    "eventType",
    "stateOfHealth",
    "cycleCount",
    "remainingCapacityAh",
    "temperatureC",
    "payload",
    "recordedAt"
  ]
}
```

## Used by

- schema [BatteryUnitJsonLd](/schemas/BatteryUnitJsonLd.md)
