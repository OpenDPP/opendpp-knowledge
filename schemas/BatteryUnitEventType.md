---
type: Schema
title: BatteryUnitEventType
description: Per-unit dynamic-data event category (Annex XIII / Art. 77 telemetry).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitEventType
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

Per-unit dynamic-data event category (Annex XIII / Art. 77 telemetry).

## JSON Schema

```json
{
  "type": "string",
  "enum": [
    "SOH_MEASUREMENT",
    "CHARGE_CYCLE",
    "STATUS_CHANGE",
    "NEGATIVE_EVENT",
    "OTHER"
  ],
  "description": "Per-unit dynamic-data event category (Annex XIII / Art. 77 telemetry)."
}
```

## Used by

- schema [BatteryUnitEventRow](/schemas/BatteryUnitEventRow.md)
- schema [BatteryUnitDynamicDataEvent](/schemas/BatteryUnitDynamicDataEvent.md)
- schema [RecordBatteryUnitEventRequest](/schemas/RecordBatteryUnitEventRequest.md)
- schema [BulkBatteryUnitEventsRequest](/schemas/BulkBatteryUnitEventsRequest.md)
