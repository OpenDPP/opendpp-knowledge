---
type: Schema
title: BatteryUnitTombstoneJsonLd
description: "Tombstone (HTTP 410): once a battery is recycled its passport has ceased to exist."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitTombstoneJsonLd
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-03T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Tombstone (HTTP 410): once a battery is recycled its passport has ceased to exist. This minimal record confirms the unit existed, that it was recycled and when, plus the (still living) model-passport link. Grants and owner credentials do not override the tombstone on the public URL; the underlying data is retained internally for the statutory retention window.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `digitalProductPassportId` | string | yes | The identifier of this PASSPORT instance (EN 18223 Table 1 digitalProductPassportId): this node's own /unit/{id} URL for the individual serialised unit. |
| `uniqueProductIdentifier` | string | yes | The identifier of the PRODUCT in its web-linkable form (EN 18219, EN 18223 Table 1 uniqueProductIdentifier): the GS1 Digital Link of the individual serialised… |
| `granularity` | string | yes | Granularity level of the unique product identifier (EN 18223 4.1.2.2): an individually serialised unit is always item. |
| `dppSchemaVersion` | string | yes | The reference standard whose schema the instance follows (EN 18223 Table 1): the dated designation of the standard the body's model and serialisation come from… |
| `dppStatus` | string | yes | Status of the DPP instance AS A DIGITAL RESOURCE (EN 18223 Table 1), not of the product. |
| `lastUpdated` | string | yes | Date and time of the latest update to the instance (ISO 8601, UTC) — the same instant as updatedAt. |
| `economicOperatorId` | string | yes | The responsible economic operator's identifier in EN 18219 form (EN 18223 Table 1): ISO/IEC 6523 ICD:identifier for the operator's clause 6 scheme — VAT 0223,… |
| `facilityId` | string | no | The Unique Facility Identifier of the linked manufacturing facility as a GS1 Digital Link carrying the location GLN under AI 414 (https://id.gs1.org/414/{gln}). |
| `contentSpecificationIds` | array<string> | no | The content specification(s) the instance follows: the URL of the ESPR category schema this node validated the metadata against (GET /api/v1/schemas/{category}… |
| `@context` | array<—> | yes | — |
| `@type` | string | yes | — |
| `@id` | string | yes | — |
| `id` | string | yes | — |
| `serialNumber` | string | yes | — |
| `status` | string | yes | — |
| `ceasedAt` | string,null | yes | When the unit's passport ceased to exist (stamped when the status transitioned to RECYCLED). |
| `notice` | string | yes | — |
| `ofModelUrl` | string,null | yes | Relative URL of the still-living SKU/type passport: /passport/{passportId}. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Tombstone (HTTP 410): once a battery is recycled its passport has ceased to exist. This minimal record confirms the unit existed, that it was recycled and when, plus the (still living) model-passport link. Grants and owner credentials do not override the tombstone on the public URL; the underlying data is retained internally for the statutory retention window.",
  "required": [
    "@context",
    "@type",
    "@id",
    "id",
    "serialNumber",
    "digitalProductPassportId",
    "uniqueProductIdentifier",
    "granularity",
    "dppSchemaVersion",
    "dppStatus",
    "lastUpdated",
    "economicOperatorId",
    "status",
    "ceasedAt",
    "notice",
    "ofModelUrl"
  ],
  "properties": {
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
      }
    },
    "@type": {
      "type": "string",
      "const": "BatteryUnit"
    },
    "@id": {
      "type": "string",
      "format": "uri"
    },
    "id": {
      "type": "string"
    },
    "serialNumber": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "const": "RECYCLED"
    },
    "ceasedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "When the unit's passport ceased to exist (stamped when the status transitioned to RECYCLED)."
    },
    "notice": {
      "type": "string",
      "const": "This battery has been recycled. Its battery passport has ceased to exist (Regulation (EU) 2023/1542, Art. 77(8))."
    },
    "ofModelUrl": {
      "type": [
        "string",
        "null"
      ],
      "description": "Relative URL of the still-living SKU/type passport: `/passport/{passportId}`."
    }
  }
}
```

## Used by

- [resolvePublicBatteryUnit](/operations/resolvePublicBatteryUnit.md) (`GET /unit/{id}`)
