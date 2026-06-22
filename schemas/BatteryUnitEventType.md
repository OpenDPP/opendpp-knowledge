---
type: Schema
title: BatteryUnitEventType
description: Per-unit dynamic-data event category (Annex XIII / Art.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitEventType
tags:
  - schema
timestamp: 2026-06-22T00:00:00Z
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
