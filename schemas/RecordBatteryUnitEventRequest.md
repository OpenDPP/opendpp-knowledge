---
type: Schema
title: RecordBatteryUnitEventRequest
description: One telemetry record.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RecordBatteryUnitEventRequest
tags:
  - schema
timestamp: 2026-06-22T00:00:00Z
---

One telemetry record. All measurements are optional and independently nullable; numeric ranges are enforced with 400 on violation.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `eventType` | [BatteryUnitEventType](/schemas/BatteryUnitEventType.md) | yes | — |
| `stateOfHealth` | number,null | no | State of health, percent (0–100). |
| `cycleCount` | number,null | no | Cumulative full-equivalent cycles. |
| `remainingCapacityAh` | number,null | no | Remaining capacity, ampere-hours. |
| `temperatureC` | number,null | no | Observed temperature, °C. |
| `payload` | object,array,null | no | Free-form JSON with additional telemetry/context. |
| `recordedAt` | string,number | no | When the measurement was taken. |
| `status` | [BatteryUnitStatus](/schemas/BatteryUnitStatus.md) | no | Optional status transition, applied to the unit in the same transaction when it differs from the current status (works with any eventType; conventionally paire… |

## JSON Schema

```json
{
  "type": "object",
  "description": "One telemetry record. All measurements are optional and independently nullable; numeric ranges are enforced with 400 on violation.",
  "properties": {
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
      "description": "State of health, percent (0–100)."
    },
    "cycleCount": {
      "type": [
        "number",
        "null"
      ],
      "minimum": 0,
      "maximum": 9007199254740991,
      "description": "Cumulative full-equivalent cycles. Fractional values are accepted but truncated to an integer before persisting."
    },
    "remainingCapacityAh": {
      "type": [
        "number",
        "null"
      ],
      "minimum": 0,
      "maximum": 9007199254740991,
      "description": "Remaining capacity, ampere-hours."
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
      "description": "Free-form JSON with additional telemetry/context. Objects **and arrays** pass the server's `typeof` check and are persisted verbatim; any other value (string, number, boolean) — and an explicit `null` — is silently dropped and stored as `null`."
    },
    "recordedAt": {
      "type": [
        "string",
        "number"
      ],
      "description": "When the measurement was taken. Any value accepted by JavaScript `Date` parsing (ISO 8601 recommended; epoch milliseconds also work); 400 if unparseable. Defaults to the server's current time."
    },
    "status": {
      "$ref": "#/components/schemas/BatteryUnitStatus",
      "description": "Optional status transition, applied to the unit in the same transaction when it differs from the current status (works with any `eventType`; conventionally paired with `STATUS_CHANGE`). Transitioning to `RECYCLED` stamps `ceasedAt` (if not already set; never cleared) and turns the public unit view into a 410 tombstone (Art. 77(8)); `status` itself is not locked afterwards — a later event may still set a different value — but `ceasedAt` persists, so the 410 and the predecessor refusal are permanent."
    }
  },
  "required": [
    "eventType"
  ]
}
```

## Used by

- [recordBatteryUnitEvent](/operations/recordBatteryUnitEvent.md) (`POST /api/v1/units/{id}/events`)
