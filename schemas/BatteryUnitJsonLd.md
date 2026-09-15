---
type: Schema
title: BatteryUnitJsonLd
description: "JSON-LD document for one serialised battery unit, privileged tenant view (isPrivileged=true): includes currentState + dynamicData telemetry (restricted to legitimate-interest holders/authorities on the public view, where a restrictedData m…"
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitJsonLd
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-03T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

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
| `digitalProductPassportId` | string | yes | The identifier of this PASSPORT instance (EN 18223 Table 1 digitalProductPassportId): this node's own /unit/{id} URL for the individual serialised unit. |
| `uniqueProductIdentifier` | string | yes | The identifier of the PRODUCT in its web-linkable form (EN 18219, EN 18223 Table 1 uniqueProductIdentifier): the GS1 Digital Link of the individual serialised… |
| `granularity` | string | yes | Granularity level of the unique product identifier (EN 18223 4.1.2.2): an individually serialised unit is always item. |
| `dppSchemaVersion` | string | yes | The reference standard whose schema the instance follows (EN 18223 Table 1): the dated designation of the standard the body's model and serialisation come from… |
| `dppStatus` | string | yes | Status of the DPP instance AS A DIGITAL RESOURCE (EN 18223 Table 1), not of the product. |
| `lastUpdated` | string | yes | Date and time of the latest update to the instance (ISO 8601, UTC) — the same instant as updatedAt. |
| `economicOperatorId` | string | yes | The responsible economic operator's identifier in EN 18219 form (EN 18223 Table 1): ISO/IEC 6523 ICD:identifier for the operator's clause 6 scheme — VAT 0223,… |
| `facilityId` | string | no | The Unique Facility Identifier of the linked manufacturing facility as a GS1 Digital Link carrying the location GLN under AI 414 (https://id.gs1.org/414/{gln}). |
| `contentSpecificationIds` | array<string> | no | The content specification(s) the instance follows: the URL of the ESPR category schema this node validated the metadata against (GET /api/v1/schemas/{category}… |
| `status` | [BatteryUnitStatus](/schemas/BatteryUnitStatus.md) | yes | — |
| `manufacturedAt` | string,null | yes | — |
| `repurposedFrom` | — | yes | Predecessor link. |
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
    "digitalProductPassportId": {
      "type": "string",
      "format": "uri",
      "description": "The identifier of this PASSPORT instance (EN 18223 Table 1 `digitalProductPassportId`): this node's own `/unit/{id}` URL for the individual serialised unit. It identifies the passport, **not** the product — the product's identifier is `uniqueProductIdentifier` below, and the two are never the same value. `@id` and `digitalLinkUri` carry the product's link, so this attribute differs from both."
    },
    "uniqueProductIdentifier": {
      "type": "string",
      "format": "uri",
      "description": "The identifier of the PRODUCT in its web-linkable form (EN 18219, EN 18223 Table 1 `uniqueProductIdentifier`): the GS1 Digital Link of the individual serialised unit, or an EN IEC 61406 Identification Link where the product carries no GS1 key. Distinct from `digitalProductPassportId` above, which identifies the passport."
    },
    "granularity": {
      "type": "string",
      "const": "item",
      "description": "Granularity level of the unique product identifier (EN 18223 4.1.2.2): an individually serialised unit is always `item`."
    },
    "dppSchemaVersion": {
      "type": "string",
      "const": "EN 18223:2026",
      "description": "The reference standard whose schema the instance follows (EN 18223 Table 1): the dated designation of the standard the body's model and serialisation come from, so a consumer picks its parser by it. Not this node's API contract version — that is `GET /api/v1/version`, and it says nothing about the body's model."
    },
    "dppStatus": {
      "type": "string",
      "example": "active",
      "description": "Status of the DPP instance AS A DIGITAL RESOURCE (EN 18223 Table 1), not of the product. An OPEN vocabulary — Table 1's values are examples and a legal act may add more — so it is deliberately not an enum here. This node emits `active` for a published passport (`status` ACTIVE or RECALLED — a recalled product's passport is still maintained), `inactive` for a DRAFT, `archived` once DECOMMISSIONED or when the owner was off-boarded (`archivedAt`). A unit is `archived` once tombstoned (RECYCLED)."
    },
    "lastUpdated": {
      "type": "string",
      "format": "date-time",
      "description": "Date and time of the latest update to the instance (ISO 8601, UTC) — the same instant as `updatedAt`. Never null: EN 18223 gives it cardinality 1, and the database maintains the column on every write."
    },
    "economicOperatorId": {
      "type": "string",
      "description": "The responsible economic operator's identifier in EN 18219 form (EN 18223 Table 1): ISO/IEC 6523 `ICD:identifier` for the operator's clause 6 scheme — VAT `0223`, DUNS `0060`, LEI `0199`, GLN `0088` — e.g. `0223:LT000000000001`. The scheme is `economicOperator.regIdScheme`; only an operator that predates the scheme declaration (`UNDECLARED`) is carried as registered. Never null: EN 18223 gives it cardinality 1, the operator is a non-null foreign key, and every serialisation venue loads that relation."
    },
    "facilityId": {
      "type": "string",
      "format": "uri",
      "description": "The Unique Facility Identifier of the linked manufacturing facility as a GS1 Digital Link carrying the location GLN under AI 414 (`https://id.gs1.org/414/{gln}`). Optional in EN 18223 (cardinality 0..1): when no facility is linked the attribute is OMITTED — never `null`, never a placeholder — so it is not a `required` key and a reader tests for its presence."
    },
    "contentSpecificationIds": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uri"
      },
      "description": "The content specification(s) the instance follows: the URL of the ESPR category schema this node validated the metadata against (`GET /api/v1/schemas/{category}`). Empty when the metadata names no category. Optional in EN 18223 (cardinality 0..*), so it is not a `required` key — this node always sends it."
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
      "description": "Predecessor link. **Always `null` on `GET /api/v1/units/{id}`** — the authenticated handler does not load the lineage relation; use the public resolver `GET /unit/{id}` to see resolved lineage."
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
    "digitalProductPassportId",
    "uniqueProductIdentifier",
    "granularity",
    "dppSchemaVersion",
    "dppStatus",
    "lastUpdated",
    "economicOperatorId",
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
