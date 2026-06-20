---
type: Schema
title: PublicBatteryUnitJsonLd
description: Public JSON-LD document for one individual serialised battery unit (Reg.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PublicBatteryUnitJsonLd
tags:
  - schema
timestamp: 2026-06-20T00:00:00Z
---

Public JSON-LD document for one individual serialised battery unit (Reg. (EU) 2023/1542 Art. 77(2)). The listed required keys are always present. EXACTLY ONE of two tier-dependent groups is added: anonymous (public) responses carry `restrictedData` (Annex XIII(2)-(4) notice) and OMIT `currentState`/`dynamicData` entirely; owner/grant (privileged) responses carry `currentState` (latest measurement or `null`) and `dynamicData` (up to 500 events, newest first) and omit `restrictedData`. The embedded `ofModel` passport is masked by the caller's tier like `GET /passport/{id}`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | array<—> | yes | The context URL https://opendpp-node.eu/contexts/dpp/v1 plus a fixed inline term map for the battery-unit terms. |
| `@type` | string | yes | — |
| `@id` | string | yes | The unit's GS1 Digital Link URI (AI-21 = the real physical serial). |
| `id` | string | yes | — |
| `serialNumber` | string | yes | The physical battery serial (the real GS1 AI-21 value; unique within its SKU/type passport). |
| `digitalLinkUri` | string | yes | — |
| `status` | string | yes | Annex XIII battery-status vocabulary. |
| `manufacturedAt` | string,null | yes | — |
| `repurposedFrom` | — | yes | Art. |
| `successorUnits` | array<[BatteryUnitLineageRef](/schemas/BatteryUnitLineageRef.md)> | yes | Units re-placed on the market under a new passport derived from this one (empty array when none). |
| `ofModel` | [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md) | yes | The SKU/type-level passport this physical unit is an instance of, masked by the caller's tier. |
| `restrictedData` | [BatteryUnitRestrictedDataNotice](/schemas/BatteryUnitRestrictedDataNotice.md) | no | Present ONLY in anonymous (public-tier) responses. |
| `currentState` | — | no | Present ONLY in owner/grant-tier responses: the most recent recorded measurement, or null when the unit has no events. |
| `dynamicData` | array<[BatteryUnitEventNode](/schemas/BatteryUnitEventNode.md)> | no | Present ONLY in owner/grant-tier responses: append-only telemetry history, newest first, capped at the 500 most recent events. |
| `createdAt` | string | yes | — |
| `updatedAt` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Public JSON-LD document for one individual serialised battery unit (Reg. (EU) 2023/1542 Art. 77(2)). The listed required keys are always present. EXACTLY ONE of two tier-dependent groups is added: anonymous (public) responses carry `restrictedData` (Annex XIII(2)-(4) notice) and OMIT `currentState`/`dynamicData` entirely; owner/grant (privileged) responses carry `currentState` (latest measurement or `null`) and `dynamicData` (up to 500 events, newest first) and omit `restrictedData`. The embedded `ofModel` passport is masked by the caller's tier like `GET /passport/{id}`.",
  "additionalProperties": false,
  "required": [
    "@context",
    "@type",
    "@id",
    "id",
    "serialNumber",
    "digitalLinkUri",
    "status",
    "manufacturedAt",
    "repurposedFrom",
    "successorUnits",
    "ofModel",
    "createdAt",
    "updatedAt"
  ],
  "properties": {
    "@context": {
      "type": "array",
      "minItems": 2,
      "maxItems": 2,
      "items": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          }
        ]
      },
      "description": "The context URL `https://opendpp-node.eu/contexts/dpp/v1` plus a fixed inline term map for the battery-unit terms."
    },
    "@type": {
      "type": "string",
      "const": "BatteryUnit"
    },
    "@id": {
      "type": "string",
      "format": "uri",
      "description": "The unit's GS1 Digital Link URI (AI-21 = the real physical serial)."
    },
    "id": {
      "type": "string"
    },
    "serialNumber": {
      "type": "string",
      "pattern": "^[A-Za-z0-9._-]{1,64}$",
      "description": "The physical battery serial (the real GS1 AI-21 value; unique within its SKU/type passport)."
    },
    "digitalLinkUri": {
      "type": "string",
      "format": "uri"
    },
    "status": {
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
      "description": "Annex XIII battery-status vocabulary. A `RECYCLED` (or ceased) unit is never served as a 200 — its URL answers 410 with the tombstone document instead."
    },
    "manufacturedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time"
    },
    "repurposedFrom": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/BatteryUnitLineageRef"
        },
        {
          "type": "null"
        }
      ],
      "description": "Art. 77(7) lineage: the original unit this repurposed/remanufactured battery came from. The link itself is public."
    },
    "successorUnits": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/BatteryUnitLineageRef"
      },
      "description": "Units re-placed on the market under a new passport derived from this one (empty array when none)."
    },
    "ofModel": {
      "$ref": "#/components/schemas/PublicPassportJsonLd",
      "description": "The SKU/type-level passport this physical unit is an instance of, masked by the caller's tier."
    },
    "restrictedData": {
      "$ref": "#/components/schemas/BatteryUnitRestrictedDataNotice",
      "description": "Present ONLY in anonymous (public-tier) responses."
    },
    "currentState": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/BatteryUnitCurrentState"
        },
        {
          "type": "null"
        }
      ],
      "description": "Present ONLY in owner/grant-tier responses: the most recent recorded measurement, or `null` when the unit has no events."
    },
    "dynamicData": {
      "type": "array",
      "maxItems": 500,
      "items": {
        "$ref": "#/components/schemas/BatteryUnitEventNode"
      },
      "description": "Present ONLY in owner/grant-tier responses: append-only telemetry history, newest first, capped at the 500 most recent events."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

## Used by

- [resolvePublicBatteryUnit](/operations/resolvePublicBatteryUnit.md) (`GET /unit/{id}`)
