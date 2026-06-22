---
type: Schema
title: BatteryUnitEventRow
description: One immutable per-unit telemetry record (raw persisted row).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitEventRow
tags:
  - schema
timestamp: 2026-06-22T00:00:00Z
---

One immutable per-unit telemetry record (raw persisted row). Append-only: no update or delete path exists.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | — |
| `batteryUnitId` | string | yes | — |
| `tenantId` | string | yes | — |
| `eventType` | [BatteryUnitEventType](/schemas/BatteryUnitEventType.md) | yes | — |
| `stateOfHealth` | number,null | yes | State of health, percent. |
| `cycleCount` | integer,null | yes | Cumulative full-equivalent cycles (truncated to an integer on write). |
| `remainingCapacityAh` | number,null | yes | Measured remaining capacity, ampere-hours. |
| `temperatureC` | number,null | yes | Observed temperature, °C. |
| `payload` | object,array,null | yes | Free-form additional telemetry/context as persisted: a JSON object or array (both pass the server's typeof check and are stored verbatim); null when omitted or… |
| `recordedAt` | string | yes | When the measurement was taken (client-supplied; server time when omitted). |
| `createdAt` | string | yes | Immutable append timestamp (server-assigned). |

## JSON Schema

```json
{
  "type": "object",
  "description": "One immutable per-unit telemetry record (raw persisted row). Append-only: no update or delete path exists.",
  "properties": {
    "id": {
      "type": "string"
    },
    "batteryUnitId": {
      "type": "string"
    },
    "tenantId": {
      "type": "string"
    },
    "eventType": {
      "$ref": "#/components/schemas/BatteryUnitEventType"
    },
    "stateOfHealth": {
      "type": [
        "number",
        "null"
      ],
      "minimum": 0,
      "maximum": 100,
      "description": "State of health, percent."
    },
    "cycleCount": {
      "type": [
        "integer",
        "null"
      ],
      "minimum": 0,
      "description": "Cumulative full-equivalent cycles (truncated to an integer on write)."
    },
    "remainingCapacityAh": {
      "type": [
        "number",
        "null"
      ],
      "minimum": 0,
      "description": "Measured remaining capacity, ampere-hours."
    },
    "temperatureC": {
      "type": [
        "number",
        "null"
      ],
      "minimum": -273.15,
      "maximum": 10000,
      "description": "Observed temperature, °C."
    },
    "payload": {
      "type": [
        "object",
        "array",
        "null"
      ],
      "description": "Free-form additional telemetry/context as persisted: a JSON object **or array** (both pass the server's `typeof` check and are stored verbatim); `null` when omitted or when the submitted value was dropped (any non-object, non-array value)."
    },
    "recordedAt": {
      "type": "string",
      "format": "date-time",
      "description": "When the measurement was taken (client-supplied; server time when omitted)."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Immutable append timestamp (server-assigned)."
    }
  },
  "required": [
    "id",
    "batteryUnitId",
    "tenantId",
    "eventType",
    "stateOfHealth",
    "cycleCount",
    "remainingCapacityAh",
    "temperatureC",
    "payload",
    "recordedAt",
    "createdAt"
  ]
}
```

## Used by

- schema [RecordBatteryUnitEventResponse](/schemas/RecordBatteryUnitEventResponse.md)
- schema [BatteryUnitEventListResponse](/schemas/BatteryUnitEventListResponse.md)
