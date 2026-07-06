---
type: Schema
title: BatteryUnitCreateItem
description: One unit to serialise.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitCreateItem
tags:
  - schema
timestamp: 2026-07-04T00:00:00Z
---

One unit to serialise. Validation is per-item: an invalid item is skipped (its error string collected) without failing the rest of the batch.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `serialNumber` | string | yes | Required. |
| `manufacturedAt` | string,number | no | Optional. |
| `status` | [BatteryUnitStatus](/schemas/BatteryUnitStatus.md) | no | Optional initial status. |
| `predecessorUnitId` | string | no | Optional Art. |
| `predecessorStatus` | string | no | Optional; only meaningful with predecessorUnitId. |

## JSON Schema

```json
{
  "type": "object",
  "description": "One unit to serialise. Validation is per-item: an invalid item is skipped (its error string collected) without failing the rest of the batch.",
  "properties": {
    "serialNumber": {
      "type": "string",
      "pattern": "^[A-Za-z0-9._-]{1,20}$",
      "description": "Required. The battery's real physical serial (GS1 AI-21). Trimmed, then must match `^[A-Za-z0-9._-]{1,20}$` (GS1 AI-21's 20-character maximum) — a longer serial is rejected at ingest with a per-item error. Must be unique within the passport (duplicates are skipped with an item error)."
    },
    "manufacturedAt": {
      "type": [
        "string",
        "number"
      ],
      "description": "Optional. Any value accepted by JavaScript `Date` parsing (ISO 8601 recommended; epoch milliseconds also work). Invalid dates skip the item."
    },
    "status": {
      "$ref": "#/components/schemas/BatteryUnitStatus",
      "description": "Optional initial status. Defaults to `IN_SERVICE`. Note: creating a unit directly with `RECYCLED` makes the public view a 410 tombstone but does NOT stamp `ceasedAt` (only the events-route transition does), so such a unit can still be referenced as a predecessor.",
      "default": "IN_SERVICE"
    },
    "predecessorUnitId": {
      "type": "string",
      "description": "Optional Art. 77(7) linkage: id of an existing unit **in your tenant** (any passport) that this battery was repurposed/remanufactured from. A recycled predecessor (`ceasedAt` set) is refused — the check keys on `ceasedAt`, which only the events-route `RECYCLED` transition stamps. Atomically with creation, a `STATUS_CHANGE` event (`{status, successorUnitId, successorSerial}`) is appended to the predecessor and its status set to `predecessorStatus`."
    },
    "predecessorStatus": {
      "type": "string",
      "enum": [
        "REPURPOSED",
        "REMANUFACTURED",
        "REUSED"
      ],
      "default": "REPURPOSED",
      "description": "Optional; only meaningful with `predecessorUnitId`. The status the predecessor transitions to. Defaults to `REPURPOSED`."
    }
  },
  "required": [
    "serialNumber"
  ]
}
```

## Used by

- schema [SerializeBatteryUnitsRequest](/schemas/SerializeBatteryUnitsRequest.md)
