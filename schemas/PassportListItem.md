---
type: Schema
title: PassportListItem
description: One JSON-LD passport document as it appears in GET /api/v1/passports list responses.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportListItem
tags:
  - schema
timestamp: 2026-06-29T00:00:00Z
---

One JSON-LD passport document as it appears in `GET /api/v1/passports` list responses. Same shape as `PublicPassportJsonLd` with list-specific divergences imposed by the route's declared response serialization: `economicOperator` never carries `role`; `manufacturingFacility` is always `null`; the `@context` term map (second array element) is emptied to `{}`; and `proof` is emptied to `{}` on sealed items (`null` on unsealed) — fetch the single passport for the verifiable proof block.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | array<—> | yes | Exactly two entries: the context URL https://opendpp-node.eu/contexts/dpp/v1 and an inline term map covering the 9 fixed DPP terms (DigitalProductPassport, eco… |
| `@type` | string | yes | — |
| `@id` | string | yes | The passport's canonical GS1 Digital Link URI (same value as digitalLinkUri). |
| `id` | string | yes | Server-assigned passport UUID. |
| `productId` | string | yes | Caller-supplied product identifier: a GTIN-14 (^[0-9]{14}$ with valid GS1 modulo-10 check digit), a GRAI (^[0-9]{14}[A-Za-z0-9]{0,16}$), or a free-form SKU. |
| `digitalLinkUri` | string | yes | SKU/type-level GS1 Digital Link URI: {BASE_URL}/{01|8003}/{productId} (AI-21 carries the passport UUID at SKU level; individual units carry their physical seri… |
| `digitalSeal` | string,null | yes | eIDAS ADVANCED electronic seal: base64 ECDSA prime256v1 (P-256) signature over the Merkle root of the key-sorted metadata. |
| `signingPublicKey` | string,null | yes | PEM public key that verifies digitalSeal. |
| `status` | string | yes | Passport lifecycle status (serialized as ACTIVE when unset). |
| `archivedAt` | string,null | yes | Soft-delete marker (owner off-boarded / decommissioned). |
| `retentionUntil` | string,null | yes | Minimum-availability deadline; the passport is never purged before this instant. |
| `proof` | — | yes | {} when sealed, null when unsealed. |
| `createdAt` | string | yes | — |
| `updatedAt` | string | yes | — |
| `economicOperator` | — | yes | The economic operator (manufacturer/importer/retailer) responsible for the product. |
| `manufacturingFacility` | null | yes | Always null in list responses (facility nodes are only embedded on single-passport reads). |
| `metadata` | object | yes | The ESPR category metadata, tier-masked: keys above the caller's tier hold the literal string [REDACTED - Privileged Access Required] instead of their value. |

## JSON Schema

```json
{
  "type": "object",
  "description": "One JSON-LD passport document as it appears in `GET /api/v1/passports` list responses. Same shape as `PublicPassportJsonLd` with list-specific divergences imposed by the route's declared response serialization: `economicOperator` never carries `role`; `manufacturingFacility` is always `null`; the `@context` term map (second array element) is emptied to `{}`; and `proof` is emptied to `{}` on sealed items (`null` on unsealed) — fetch the single passport for the verifiable proof block.",
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
      "description": "SKU/type-level GS1 Digital Link URI: `{BASE_URL}/{01|8003}/{productId}` (AI-21 carries the passport UUID at SKU level; individual units carry their physical serial instead)."
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
          "type": "object",
          "additionalProperties": false,
          "description": "Always the empty object on sealed items — proof contents are stripped by the list serialization."
        },
        {
          "type": "null"
        }
      ],
      "description": "`{}` when sealed, `null` when unsealed. The full `MerkleTreeAttestationProof` is only available on single-passport reads."
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
      "type": "null",
      "description": "Always `null` in list responses (facility nodes are only embedded on single-passport reads)."
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

- schema [PassportListResponse](/schemas/PassportListResponse.md)
