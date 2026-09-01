---
type: Schema
title: BulkBatteryUnitEventsRequest
description: A batch of telemetry records for one unit.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BulkBatteryUnitEventsRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

A batch of telemetry records for one unit. Telemetry only — a record carrying `status` is refused per-item; status transitions go through the single-event endpoint.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `events` | array<object> | yes | — |

## JSON Schema

```json
{
  "description": "A batch of telemetry records for one unit. Telemetry only — a record carrying `status` is refused per-item; status transitions go through the single-event endpoint.",
  "type": "object",
  "required": [
    "events"
  ],
  "properties": {
    "events": {
      "type": "array",
      "minItems": 1,
      "maxItems": 500,
      "items": {
        "type": "object",
        "required": [
          "eventType"
        ],
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
            "description": "State of Health, %."
          },
          "cycleCount": {
            "type": [
              "number",
              "null"
            ],
            "minimum": 0,
            "description": "Cumulative full-equivalent cycles; truncated to an integer before persisting."
          },
          "remainingCapacityAh": {
            "type": [
              "number",
              "null"
            ],
            "minimum": 0,
            "description": "Measured remaining capacity, Ah."
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
            "description": "Free-form context, persisted verbatim; any non-object, non-array value is dropped (stored as `null`)."
          },
          "recordedAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the measurement was taken; defaults to server time when omitted."
          }
        }
      }
    }
  }
}
```

## Used by

- [bulkRecordBatteryUnitEvents](/operations/bulkRecordBatteryUnitEvents.md) (`POST /api/v1/units/{id}/events/bulk`)
