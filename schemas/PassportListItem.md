---
type: Schema
title: PassportListItem
description: One JSON-LD passport document as it appears in GET /api/v1/passports list responses.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportListItem
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-03T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

One JSON-LD passport document as it appears in `GET /api/v1/passports` list responses. Same shape as `PublicPassportJsonLd` with list-specific divergences imposed by the route's declared response serialization: `economicOperator` never carries `role`; `manufacturingFacility` is always `null`; and the `@context` term map (second array element) is emptied to `{}`. **`proof` is not a member of a list item.** It was previously emitted as `{}` on a sealed passport, which stated that the passport carried a proof with no contents while the resource carried a full one; the member is gone rather than filled, because the proof runs to roughly 2 KB per passport including its certificate chain. Read the single passport for the verifiable `MerkleTreeAttestationProof`. `digitalSeal` stays on the list item and is non-null exactly when the passport is sealed.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | array<—> | yes | Exactly two entries: the context URL https://opendpp-node.eu/contexts/dpp/v1 and an inline term map covering the eighteen fixed document terms — DigitalProduct… |
| `@type` | string | yes | — |
| `@id` | string | yes | The passport's canonical GS1 Digital Link URI (same value as digitalLinkUri). |
| `id` | string | yes | Server-assigned passport UUID. |
| `productId` | string | yes | Caller-supplied product identifier: a GTIN-14 (^[0-9]{14}$ with valid GS1 modulo-10 check digit), a GRAI (^[0-9]{14}[A-Za-z0-9]{0,16}$), or a free-form SKU. |
| `digitalLinkUri` | string | yes | SKU/type-level GS1 Digital Link URI: {origin}/{01|8003}/{productId} — the bare primary key. |
| `productIdScheme` | string | yes | The EN 18219 clause 5 scheme productId was declared under at issue: GS1_DIGITAL_LINK (scheme 1 — a GS1 key carried as a GS1 Digital Link) or IDENTIFICATION_LIN… |
| `digitalProductPassportId` | string | yes | The identifier of this PASSPORT instance (EN 18223 Table 1 digitalProductPassportId): this node's own /passport/{id} URL for the SKU/type passport. |
| `uniqueProductIdentifier` | string | yes | The identifier of the PRODUCT in its web-linkable form (EN 18219, EN 18223 Table 1 uniqueProductIdentifier): the GS1 Digital Link of the SKU/type passport, or… |
| `granularity` | string | yes | Granularity level of the unique product identifier — EN 18223 4.1.2.2's closed enumeration — as the passport declared it at issue: model for a GTIN-keyed or Id… |
| `dppSchemaVersion` | string | yes | The reference standard whose schema the instance follows (EN 18223 Table 1): the dated designation of the standard the body's model and serialisation come from… |
| `dppStatus` | string | yes | Status of the DPP instance AS A DIGITAL RESOURCE (EN 18223 Table 1), not of the product. |
| `lastUpdated` | string | yes | Date and time of the latest update to the instance (ISO 8601, UTC) — the same instant as updatedAt. |
| `economicOperatorId` | string | yes | The responsible economic operator's identifier in EN 18219 form (EN 18223 Table 1): ISO/IEC 6523 ICD:identifier for the operator's clause 6 scheme — VAT 0223,… |
| `facilityId` | string | no | The Unique Facility Identifier of the linked manufacturing facility as a GS1 Digital Link carrying the location GLN under AI 414 (https://id.gs1.org/414/{gln}). |
| `contentSpecificationIds` | array<string> | no | The content specification(s) the instance follows: the URL of the ESPR category schema this node validated the metadata against (GET /api/v1/schemas/{category}… |
| `digitalSeal` | string,null | yes | ADVANCED electronic seal: base64 ECDSA prime256v1 (P-256) signature over the Merkle root of the key-sorted metadata. |
| `signingPublicKey` | string,null | yes | PEM public key that verifies digitalSeal. |
| `status` | string | yes | Passport lifecycle status (serialized as ACTIVE when unset). |
| `archivedAt` | string,null | yes | Soft-delete marker (owner off-boarded / decommissioned). |
| `retentionUntil` | string,null | yes | Minimum-availability deadline; the passport is never purged before this instant. |
| `createdAt` | string | yes | — |
| `updatedAt` | string | yes | — |
| `economicOperator` | — | yes | The economic operator (manufacturer/importer/retailer) responsible for the product. |
| `manufacturingFacility` | — | yes | GLN-backed Unique Facility Identifier node (EN 18219), or null when no facility is linked. |

## JSON Schema

```json
{
  "type": "object",
  "description": "One JSON-LD passport document as it appears in `GET /api/v1/passports` list responses. Same shape as `PublicPassportJsonLd` with list-specific divergences imposed by the route's declared response serialization: `economicOperator` never carries `role`; `manufacturingFacility` is always `null`; and the `@context` term map (second array element) is emptied to `{}`. **`proof` is not a member of a list item.** It was previously emitted as `{}` on a sealed passport, which stated that the passport carried a proof with no contents while the resource carried a full one; the member is gone rather than filled, because the proof runs to roughly 2 KB per passport including its certificate chain. Read the single passport for the verifiable `MerkleTreeAttestationProof`. `digitalSeal` stays on the list item and is non-null exactly when the passport is sealed.",
  "additionalProperties": true,
  "required": [
    "@context",
    "@type",
    "@id",
    "id",
    "productId",
    "digitalLinkUri",
    "productIdScheme",
    "digitalProductPassportId",
    "uniqueProductIdentifier",
    "granularity",
    "dppSchemaVersion",
    "dppStatus",
    "lastUpdated",
    "economicOperatorId",
    "digitalSeal",
    "signingPublicKey",
    "status",
    "archivedAt",
    "retentionUntil",
    "createdAt",
    "updatedAt",
    "economicOperator",
    "manufacturingFacility"
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
      "description": "Exactly two entries: the context URL `https://opendpp-node.eu/contexts/dpp/v1` and an inline term map covering the eighteen fixed document terms — `DigitalProductPassport`, `economicOperator`, `manufacturingFacility`, `digitalSeal`, `signingPublicKey`, `status`, `archivedAt`, `retentionUntil`, `productIdScheme` and the nine EN 18223 header attributes — plus one generated term per data element at the root (`https://opendpp-node.eu/ns/dpp#<elementId>`): one vocabulary, and it resolves at `GET /ns/dpp`."
    },
    "@type": {
      "type": "string",
      "const": "DigitalProductPassport"
    },
    "@id": {
      "type": "string",
      "format": "uri",
      "description": "The passport's canonical GS1 Digital Link URI (same value as `digitalLinkUri`)."
    },
    "id": {
      "type": "string",
      "description": "Server-assigned passport UUID."
    },
    "productId": {
      "type": "string",
      "description": "Caller-supplied product identifier: a GTIN-14 (`^[0-9]{14}$` with valid GS1 modulo-10 check digit), a GRAI (`^[0-9]{14}[A-Za-z0-9]{0,16}$`), or a free-form SKU."
    },
    "digitalLinkUri": {
      "type": "string",
      "format": "uri",
      "description": "SKU/type-level GS1 Digital Link URI: `{origin}/{01|8003}/{productId}` — the bare primary key. Individual units carry their physical serial under AI 21 (`…/21/{serialNumber}`)."
    },
    "productIdScheme": {
      "type": "string",
      "enum": [
        "GS1_DIGITAL_LINK",
        "IDENTIFICATION_LINK"
      ],
      "description": "The EN 18219 clause 5 scheme `productId` was declared under at issue: `GS1_DIGITAL_LINK` (scheme 1 — a GS1 key carried as a GS1 Digital Link) or `IDENTIFICATION_LINK` (scheme 2 — an EN IEC 61406-1 Identification Link under this node's domain for a non-GS1 identifier). Stated beside the identifier so a registry can keep it unique across identifier domains (EN 18219 4.1.2). Immutable once issued."
    },
    "digitalProductPassportId": {
      "type": "string",
      "format": "uri",
      "description": "The identifier of this PASSPORT instance (EN 18223 Table 1 `digitalProductPassportId`): this node's own `/passport/{id}` URL for the SKU/type passport. It identifies the passport, **not** the product — the product's identifier is `uniqueProductIdentifier` below, and the two are never the same value. `@id` and `digitalLinkUri` carry the product's link, so this attribute differs from both."
    },
    "uniqueProductIdentifier": {
      "type": "string",
      "format": "uri",
      "description": "The identifier of the PRODUCT in its web-linkable form (EN 18219, EN 18223 Table 1 `uniqueProductIdentifier`): the GS1 Digital Link of the SKU/type passport, or an EN IEC 61406 Identification Link where the product carries no GS1 key. Distinct from `digitalProductPassportId` above, which identifies the passport."
    },
    "granularity": {
      "type": "string",
      "enum": [
        "model",
        "batch",
        "item"
      ],
      "description": "Granularity level of the unique product identifier — EN 18223 4.1.2.2's closed enumeration — as the passport declared it at issue: `model` for a GTIN-keyed or Identification-Link passport, `item` for a serialised GRAI. `batch` is in the enumeration and never issued by this node."
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
    "digitalSeal": {
      "type": [
        "string",
        "null"
      ],
      "description": "ADVANCED electronic seal: base64 ECDSA prime256v1 (P-256) signature over the Merkle root of the key-sorted metadata. `null` when the passport has not been sealed."
    },
    "signingPublicKey": {
      "type": [
        "string",
        "null"
      ],
      "description": "PEM public key that verifies `digitalSeal`. `null` when unsealed."
    },
    "status": {
      "type": "string",
      "enum": [
        "DRAFT",
        "ACTIVE",
        "RECALLED",
        "DECOMMISSIONED"
      ],
      "description": "Passport lifecycle status (serialized as `ACTIVE` when unset). `DRAFT` is only ever visible to owner-tier callers — public/grant resolution of a draft returns 404."
    },
    "archivedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "Soft-delete marker (owner off-boarded / decommissioned). Archived passports remain publicly resolvable (ESPR persistence duty)."
    },
    "retentionUntil": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "Minimum-availability deadline; the passport is never purged before this instant."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    },
    "economicOperator": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/EconomicOperatorNode"
        },
        {
          "type": "null"
        }
      ],
      "description": "The economic operator (manufacturer/importer/retailer) responsible for the product. Public in all tiers."
    },
    "manufacturingFacility": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/PublicFacilityNode"
        },
        {
          "type": "null"
        }
      ],
      "description": "GLN-backed Unique Facility Identifier node (EN 18219), or `null` when no facility is linked. GLN, name, activity and country are public; street-address fields appear only in owner-tier responses."
    }
  }
}
```

## Used by

- schema [PassportListResponse](/schemas/PassportListResponse.md)
