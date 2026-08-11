---
type: Schema
title: BatteryUnitStatus
description: Annex XIII battery-status vocabulary (EU Battery Regulation).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitStatus
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-09T00:00:00Z
---

Annex XIII battery-status vocabulary (EU Battery Regulation). `RECYCLED` means the passport has ceased to exist: the public unit view answers 410 Gone whenever `status` is `RECYCLED` **or** `ceasedAt` is set. `RECYCLED` is terminal however it is reached: a unit *created* with initial status `RECYCLED` has `ceasedAt` stamped at creation, exactly like one transitioned there via the events route (the stamp is never cleared). A terminal unit is refused as a `predecessorUnitId`, and the events endpoint refuses every further event (400 `Terminal Unit Status`), so neither `status` nor telemetry can change again.

## JSON Schema

```json
{
  "type": "string",
  "enum": [
    "IN_SERVICE",
    "DECOMMISSIONED",
    "RECALLED",
    "REPURPOSED",
    "REMANUFACTURED",
    "REUSED",
    "WASTE",
    "RECYCLED"
  ],
  "description": "Annex XIII battery-status vocabulary (EU Battery Regulation). `RECYCLED` means the passport has ceased to exist: the public unit view answers 410 Gone whenever `status` is `RECYCLED` **or** `ceasedAt` is set. `RECYCLED` is terminal however it is reached: a unit *created* with initial status `RECYCLED` has `ceasedAt` stamped at creation, exactly like one transitioned there via the events route (the stamp is never cleared). A terminal unit is refused as a `predecessorUnitId`, and the events endpoint refuses every further event (400 `Terminal Unit Status`), so neither `status` nor telemetry can change again."
}
```

## Used by

- schema [BatteryUnitRow](/schemas/BatteryUnitRow.md)
- schema [BatteryUnitCreateItem](/schemas/BatteryUnitCreateItem.md)
- schema [BatteryUnitJsonLd](/schemas/BatteryUnitJsonLd.md)
- schema [RecordBatteryUnitEventRequest](/schemas/RecordBatteryUnitEventRequest.md)
