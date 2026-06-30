---
type: Reference
title: Battery Units
description: Per-unit battery serialization (real serials, GS1 AI 21) under a SKU-level passport, plus append-only telemetry events (state of health, charge cycles, status changes) per the EU Battery Regulation.
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - battery-units
timestamp: 2026-06-29T00:00:00Z
---

Per-unit battery serialization (real serials, GS1 AI 21) under a SKU-level passport, plus append-only telemetry events (state of health, charge cycles, status changes) per the EU Battery Regulation.

## Operations

- [validateBatteryUnits](/operations/validateBatteryUnits.md) — `POST /api/v1/passports/{passportId}/units/validate` — Pre-flight: validate battery-unit identifiers without persisting (#263)
- [listBatteryUnits](/operations/listBatteryUnits.md) — `GET /api/v1/passports/{passportId}/units` — List serialised battery units under a passport
- [serializeBatteryUnits](/operations/serializeBatteryUnits.md) — `POST /api/v1/passports/{passportId}/units` — Serialise individual battery units under a passport (bulk, up to 200)
- [getBatteryUnit](/operations/getBatteryUnit.md) — `GET /api/v1/units/{id}` — Get one battery unit as JSON-LD with its dynamic-data history
- [deleteBatteryUnit](/operations/deleteBatteryUnit.md) — `DELETE /api/v1/units/{id}` — Permanently delete a battery unit and its telemetry
- [listBatteryUnitEvents](/operations/listBatteryUnitEvents.md) — `GET /api/v1/units/{id}/events` — List a battery unit's telemetry history (newest first, max 500)
- [recordBatteryUnitEvent](/operations/recordBatteryUnitEvent.md) — `POST /api/v1/units/{id}/events` — Append an immutable telemetry event to a battery unit
