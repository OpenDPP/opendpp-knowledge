---
type: Schema
title: BatteryUnitStatus
description: Annex XIII battery-status vocabulary (Battery Reg.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitStatus
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

Annex XIII battery-status vocabulary (Battery Reg. (EU) 2023/1542). `RECYCLED` means the passport has ceased to exist (Art. 77(8)): the public unit view answers 410 Gone whenever `status` is `RECYCLED` **or** `ceasedAt` is set. Terminality is enforced via `ceasedAt`, which only the events-route transition stamps (and never clears): the predecessor-refusal check keys on `ceasedAt` alone, so a unit *created* with initial status `RECYCLED` (no `ceasedAt`) is already a public 410 tombstone yet can still be referenced as a predecessor; conversely, once `ceasedAt` is set the events endpoint will still accept later `status` values, but the 410 tombstone and the predecessor refusal persist.

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
  "description": "Annex XIII battery-status vocabulary (Battery Reg. (EU) 2023/1542). `RECYCLED` means the passport has ceased to exist (Art. 77(8)): the public unit view answers 410 Gone whenever `status` is `RECYCLED` **or** `ceasedAt` is set. Terminality is enforced via `ceasedAt`, which only the events-route transition stamps (and never clears): the predecessor-refusal check keys on `ceasedAt` alone, so a unit *created* with initial status `RECYCLED` (no `ceasedAt`) is already a public 410 tombstone yet can still be referenced as a predecessor; conversely, once `ceasedAt` is set the events endpoint will still accept later `status` values, but the 410 tombstone and the predecessor refusal persist."
}
```

## Used by

- schema [BatteryUnitRow](/schemas/BatteryUnitRow.md)
- schema [BatteryUnitCreateItem](/schemas/BatteryUnitCreateItem.md)
- schema [BatteryUnitJsonLd](/schemas/BatteryUnitJsonLd.md)
- schema [RecordBatteryUnitEventRequest](/schemas/RecordBatteryUnitEventRequest.md)
