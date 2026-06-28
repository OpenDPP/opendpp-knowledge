---
type: Schema
title: BatteryUnitRow
description: One physical serialised battery (raw persisted row — these routes declare no Fastify response schema, so all model fields are returned as-is).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitRow
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
---

One physical serialised battery (raw persisted row — these routes declare no Fastify response schema, so all model fields are returned as-is). A `BatteryUnit` is an individual instance of a SKU/type-level passport, carrying its real serial in GS1 AI-21.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | — |
| `serialNumber` | string | yes | The battery's real physical serial number (GS1 AI-21 value). |
| `digitalLinkUri` | string | yes | Per-unit GS1 Digital Link: {BASE_URL}/{01|8003}/{productId}/21/{serialNumber} — AI 01 for GTIN (and non-GS1 SKUs), 8003 for GRAI. |
| `passportId` | string | yes | The SKU/type-level passport this unit is an instance of. |
| `tenantId` | string | yes | Owning tenant id (the demo tenant uses the fixed id tenant-demo-opendpp; regular tenants use UUIDs). |
| `manufacturedAt` | string,null | yes | — |
| `status` | [BatteryUnitStatus](/schemas/BatteryUnitStatus.md) | yes | — |
| `ceasedAt` | string,null | yes | Stamped when the events endpoint transitions status to RECYCLED (Art. |
| `predecessorUnitId` | string,null | yes | Art. |
| `createdAt` | string | yes | — |
| `updatedAt` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "One physical serialised battery (raw persisted row — these routes declare no Fastify response schema, so all model fields are returned as-is). A `BatteryUnit` is an individual instance of a SKU/type-level passport, carrying its real serial in GS1 AI-21.",
  "properties": {
    "id": {
      "type": "string"
    },
    "serialNumber": {
      "type": "string",
      "pattern": "^[A-Za-z0-9._-]{1,20}$",
      "description": "The battery's real physical serial number (GS1 AI-21 value). 1–20 URL-safe characters; GS1 recommends ≤ 20."
    },
    "digitalLinkUri": {
      "type": "string",
      "format": "uri",
      "description": "Per-unit GS1 Digital Link: `{BASE_URL}/{01|8003}/{productId}/21/{serialNumber}` — AI `01` for GTIN (and non-GS1 SKUs), `8003` for GRAI. Unique platform-wide."
    },
    "passportId": {
      "type": "string",
      "description": "The SKU/type-level passport this unit is an instance of."
    },
    "tenantId": {
      "type": "string",
      "description": "Owning tenant id (the demo tenant uses the fixed id `tenant-demo-opendpp`; regular tenants use UUIDs)."
    },
    "manufacturedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time"
    },
    "status": {
      "$ref": "#/components/schemas/BatteryUnitStatus"
    },
    "ceasedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "Stamped when the events endpoint transitions `status` to `RECYCLED` (Art. 77(8) cease-to-exist); never cleared afterwards, even if a later event changes `status` again. Non-null means the public unit view is a 410 tombstone and the unit is refused as a `predecessorUnitId`. Note: a unit *created* with initial status `RECYCLED` does NOT get `ceasedAt` stamped (the public view still tombstones on the status alone, but the predecessor refusal does not apply)."
    },
    "predecessorUnitId": {
      "type": [
        "string",
        "null"
      ],
      "description": "Art. 77(7) lineage: the original unit this battery was repurposed/remanufactured from (`null` for first-life units)."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "id",
    "serialNumber",
    "digitalLinkUri",
    "passportId",
    "tenantId",
    "manufacturedAt",
    "status",
    "ceasedAt",
    "predecessorUnitId",
    "createdAt",
    "updatedAt"
  ]
}
```

## Used by

- schema [SerializeBatteryUnitsResponse](/schemas/SerializeBatteryUnitsResponse.md)
- schema [BatteryUnitListResponse](/schemas/BatteryUnitListResponse.md)
