---
type: Schema
title: PublicPassportJsonLd
description: The public, redacted JSON-LD Digital Product Passport document (application/ld+json).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PublicPassportJsonLd
tags:
  - schema
timestamp: 2026-06-20T00:00:00Z
---

The public, redacted JSON-LD Digital Product Passport document (`application/ld+json`). All listed top-level keys are ALWAYS present (`null` where not applicable). Additionally, every key of the (masked) `metadata` object — except the reserved document keys (`@context`, `@type`, `@id`, `id`, `productId`, `digitalLinkUri`, `digitalSeal`, `signingPublicKey`, `status`, `archivedAt`, `retentionUntil`, `proof`, `createdAt`, `updatedAt`, `economicOperator`, `manufacturingFacility`, `metadata`) — is ALSO flattened onto the document root for direct semantic-graph querying (hence `additionalProperties: true`); flattened values are identical to the corresponding `metadata` values, including redaction placeholders. Tier-masked metadata keys are replaced (in both places) with the literal string `[REDACTED - Privileged Access Required]`. Masking by tier: anonymous public callers lose the per-category restricted keys (category `batteries`: `detailedPerformance`, `lifecycleAndInUse`, `circularityAndDisassembly` — masked only when actually present) AND the owner-only key `facilityDetails`; legitimate-interest/authority grant holders lose only `facilityDetails`; owner-tier responses are unmasked and additionally include the facility street address fields. Note: `facilityDetails` is placeholder-masked in EVERY non-owner response, even when the underlying metadata never contained the key — in that case it has no entry in `proof.redactedLeaves`. Each masked key that exists in the sealed metadata keeps its true Merkle leaf hash in `proof.redactedLeaves`, so the eIDAS seal stays verifiable offline after redaction (see `MerkleTreeAttestationProof` for the reconstruction rule).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | array<—> | yes | Exactly two entries: the context URL https://opendpp-node.eu/contexts/dpp/v1 and an inline term map covering the 9 fixed DPP terms (DigitalProductPassport, eco… |
| `@type` | string | yes | — |
| `@id` | string | yes | The passport's canonical GS1 Digital Link URI (same value as digitalLinkUri). |
| `id` | string | yes | Server-assigned passport UUID. |
| `productId` | string | yes | Caller-supplied product identifier: a GTIN-14 (^[0-9]{14}$ with valid GS1 modulo-10 check digit), a GRAI (^[0-9]{14}[A-Za-z0-9]{0,16}$), or a free-form SKU. |
| `digitalLinkUri` | string | yes | SKU/type-level GS1 Digital Link URI: {BASE_URL}/{01|8003}/{productId}/21/{passportId} (AI-21 carries the passport UUID at SKU level; individual units carry the… |
| `digitalSeal` | string,null | yes | eIDAS ADVANCED electronic seal: base64 ECDSA prime256v1 (P-256) signature over the Merkle root of the key-sorted metadata. |
| `signingPublicKey` | string,null | yes | PEM public key that verifies digitalSeal. |
| `status` | string | yes | Passport lifecycle status (serialized as ACTIVE when unset). |
| `archivedAt` | string,null | yes | Soft-delete marker (owner off-boarded / decommissioned). |
| `retentionUntil` | string,null | yes | Minimum-availability deadline; the passport is never purged before this instant. |
| `proof` | — | yes | Present (non-null) only when the passport is sealed (digitalSeal set). |
| `createdAt` | string | yes | — |
| `updatedAt` | string | yes | — |
| `economicOperator` | — | yes | The economic operator (manufacturer/importer/retailer) responsible for the product. |
| `manufacturingFacility` | — | yes | GLN-backed Unique Facility Identifier node (EN 18219), or null when no facility is linked. |
| `metadata` | object | yes | The ESPR category metadata, tier-masked: keys above the caller's tier hold the literal string [REDACTED - Privileged Access Required] instead of their value. |

## JSON Schema

```json
{
  "type": "object",
  "description": "The public, redacted JSON-LD Digital Product Passport document (`application/ld+json`). All listed top-level keys are ALWAYS present (`null` where not applicable). Additionally, every key of the (masked) `metadata` object — except the reserved document keys (`@context`, `@type`, `@id`, `id`, `productId`, `digitalLinkUri`, `digitalSeal`, `signingPublicKey`, `status`, `archivedAt`, `retentionUntil`, `proof`, `createdAt`, `updatedAt`, `economicOperator`, `manufacturingFacility`, `metadata`) — is ALSO flattened onto the document root for direct semantic-graph querying (hence `additionalProperties: true`); flattened values are identical to the corresponding `metadata` values, including redaction placeholders. Tier-masked metadata keys are replaced (in both places) with the literal string `[REDACTED - Privileged Access Required]`. Masking by tier: anonymous public callers lose the per-category restricted keys (category `batteries`: `detailedPerformance`, `lifecycleAndInUse`, `circularityAndDisassembly` — masked only when actually present) AND the owner-only key `facilityDetails`; legitimate-interest/authority grant holders lose only `facilityDetails`; owner-tier responses are unmasked and additionally include the facility street address fields. Note: `facilityDetails` is placeholder-masked in EVERY non-owner response, even when the underlying metadata never contained the key — in that case it has no entry in `proof.redactedLeaves`. Each masked key that exists in the sealed metadata keeps its true Merkle leaf hash in `proof.redactedLeaves`, so the eIDAS seal stays verifiable offline after redaction (see `MerkleTreeAttestationProof` for the reconstruction rule).",
  "additionalProperties": true,
  "required": [
    "@context",
    "@type",
    "@id",
    "id",
    "productId",
    "digitalLinkUri",
    "digitalSeal",
    "signingPublicKey",
    "status",
    "archivedAt",
    "retentionUntil",
    "proof",
    "createdAt",
    "updatedAt",
    "economicOperator",
    "manufacturingFacility",
    "metadata"
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
      "description": "Exactly two entries: the context URL `https://opendpp-node.eu/contexts/dpp/v1` and an inline term map covering the 9 fixed DPP terms (`DigitalProductPassport`, `economicOperator`, `manufacturingFacility`, `metadata`, `digitalSeal`, `signingPublicKey`, `status`, `archivedAt`, `retentionUntil`) plus one generated term per metadata key (`https://opendpp-node.eu/contexts/dpp/v1#<key>`)."
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
      "description": "SKU/type-level GS1 Digital Link URI: `{BASE_URL}/{01|8003}/{productId}/21/{passportId}` (AI-21 carries the passport UUID at SKU level; individual units carry their physical serial instead)."
    },
    "digitalSeal": {
      "type": [
        "string",
        "null"
      ],
      "description": "eIDAS ADVANCED electronic seal: base64 ECDSA prime256v1 (P-256) signature over the Merkle root of the key-sorted metadata. `null` when the passport has not been sealed."
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
    "proof": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/MerkleTreeAttestationProof"
        },
        {
          "type": "null"
        }
      ],
      "description": "Present (non-null) only when the passport is sealed (`digitalSeal` set)."
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
    },
    "metadata": {
      "type": "object",
      "additionalProperties": true,
      "description": "The ESPR category metadata, tier-masked: keys above the caller's tier hold the literal string `[REDACTED - Privileged Access Required]` instead of their value."
    }
  }
}
```

## Used by

- [getPassport](/operations/getPassport.md) (`GET /api/v1/passports/{id}`)
- [resolvePublicPassport](/operations/resolvePublicPassport.md) (`GET /passport/{id}`)
- [resolveGs1Gtin](/operations/resolveGs1Gtin.md) (`GET /01/{gtin14}`)
- [resolveGs1Grai](/operations/resolveGs1Grai.md) (`GET /8003/{grai}`)
- schema [BatteryUnitJsonLd](/schemas/BatteryUnitJsonLd.md)
- schema [PassportIngestCreated](/schemas/PassportIngestCreated.md)
- schema [PassportUpdateResponse](/schemas/PassportUpdateResponse.md)
- schema [PassportSealResponse](/schemas/PassportSealResponse.md)
- schema [PassportStatusUpdateResponse](/schemas/PassportStatusUpdateResponse.md)
- schema [PublicBatteryUnitJsonLd](/schemas/PublicBatteryUnitJsonLd.md)
- schema [WebhookEnvelope](/schemas/WebhookEnvelope.md)
