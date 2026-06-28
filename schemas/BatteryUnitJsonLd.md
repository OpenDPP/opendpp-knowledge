---
type: Schema
title: BatteryUnitJsonLd
description: "JSON-LD document for one serialised battery unit, privileged tenant view (isPrivileged=true): includes currentState + dynamicData telemetry (restricted to legitimate-interest holders/authorities on the public view, where a restrictedData m…"
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitJsonLd
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
---

JSON-LD document for one serialised battery unit, **privileged tenant view** (`isPrivileged=true`): includes `currentState` + `dynamicData` telemetry (restricted to legitimate-interest holders/authorities on the public view, where a `restrictedData` marker appears instead — never on this endpoint).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | array<string,object> | yes | JSON-LD context: the shared https://opendpp-node.eu/contexts/dpp/v1 IRI plus an inline term map for the battery-unit vocabulary. |
| `@type` | string | yes | — |
| `@id` | string | yes | The unit's GS1 Digital Link URI (same value as digitalLinkUri). |
| `id` | string | yes | — |
| `serialNumber` | string | yes | — |
| `digitalLinkUri` | string | yes | — |
| `status` | [BatteryUnitStatus](/schemas/BatteryUnitStatus.md) | yes | — |
| `manufacturedAt` | string,null | yes | — |
| `repurposedFrom` | — | yes | Art. |
| `successorUnits` | array<[BatteryUnitLineageRef](/schemas/BatteryUnitLineageRef.md)> | yes | Units repurposed/remanufactured from this one. |
| `ofModel` | [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md) | yes | The SKU/type-level passport this unit is an instance of. |
| `currentState` | — | yes | — |
| `dynamicData` | array<[BatteryUnitDynamicDataEvent](/schemas/BatteryUnitDynamicDataEvent.md)> | yes | Full telemetry history, newest first by recordedAt, capped at the 500 most recent events. |
| `createdAt` | string | yes | — |
| `updatedAt` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "JSON-LD document for one serialised battery unit, **privileged tenant view** (`isPrivileged=true`): includes `currentState` + `dynamicData` telemetry (restricted to legitimate-interest holders/authorities on the public view, where a `restrictedData` marker appears instead — never on this endpoint).",
  "properties": {
    "@context": {
      "type": "array",
      "description": "JSON-LD context: the shared `https://opendpp-node.eu/contexts/dpp/v1` IRI plus an inline term map for the battery-unit vocabulary.",
      "items": {
        "type": [
          "string",
          "object"
        ]
      }
    },
    "@type": {
      "type": "string",
      "const": "BatteryUnit"
    },
    "@id": {
      "type": "string",
      "format": "uri",
      "description": "The unit's GS1 Digital Link URI (same value as `digitalLinkUri`)."
    },
    "id": {
      "type": "string"
    },
    "serialNumber": {
      "type": "string",
      "pattern": "^[A-Za-z0-9._-]{1,20}$"
    },
    "digitalLinkUri": {
      "type": "string",
      "format": "uri"
    },
    "status": {
      "$ref": "#/components/schemas/BatteryUnitStatus"
    },
    "manufacturedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time"
    },
    "repurposedFrom": {
      "oneOf": [
        {
          "$ref": "#/components/schemas/BatteryUnitLineageRef"
        },
        {
          "type": "null"
        }
      ],
      "description": "Art. 77(7) predecessor link. **Always `null` on `GET /api/v1/units/{id}`** — the authenticated handler does not load the lineage relation; use the public resolver `GET /unit/{id}` to see resolved lineage."
    },
    "successorUnits": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/BatteryUnitLineageRef"
      },
      "description": "Units repurposed/remanufactured from this one. **Always `[]` on `GET /api/v1/units/{id}`** (relation not loaded; see `repurposedFrom`)."
    },
    "ofModel": {
      "$ref": "#/components/schemas/PublicPassportJsonLd",
      "description": "The SKU/type-level passport this unit is an instance of. On this authenticated endpoint it is rendered in the **owner (privileged, unredacted) variant**: legitimate-interest-tier metadata keys and owner-only keys (e.g. `facilityDetails`) are NOT masked, unlike the anonymous public document this schema describes. The passport's own `@context` inline map always carries 9 fixed terms (DigitalProductPassport, economicOperator, manufacturingFacility, metadata, digitalSeal, signingPublicKey, status, archivedAt, retentionUntil) plus one dynamically generated term per metadata key."
    },
    "currentState": {
      "oneOf": [
        {
          "$ref": "#/components/schemas/BatteryUnitCurrentState"
        },
        {
          "type": "null"
        }
      ]
    },
    "dynamicData": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/BatteryUnitDynamicDataEvent"
      },
      "maxItems": 500,
      "description": "Full telemetry history, newest first by `recordedAt`, capped at the 500 most recent events."
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
    "currentState",
    "dynamicData",
    "createdAt",
    "updatedAt"
  ]
}
```

## Used by

- [getBatteryUnit](/operations/getBatteryUnit.md) (`GET /api/v1/units/{id}`)
