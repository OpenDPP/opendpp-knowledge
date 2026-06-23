---
type: Schema
title: AasIngestCreated
description: 201 envelope of POST /api/v1/passports/aas/ingest.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/AasIngestCreated
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

201 envelope of `POST /api/v1/passports/aas/ingest`. Returned for both newly created passports and in-place updates of existing UNSEALED passports. No webhook event is emitted by this endpoint.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `passportId` | string | yes | — |
| `productId` | string | yes | — |
| `isSealed` | boolean | yes | True when the environment embedded an eidasVerificationSeal submodel (the seal is then stored on the passport). |
| `signatureVerified` | boolean | yes | True when the embedded seal verified against the tenant's server-held eIDAS public key. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "message",
    "passportId",
    "productId",
    "isSealed",
    "signatureVerified"
  ],
  "description": "201 envelope of `POST /api/v1/passports/aas/ingest`. Returned for both newly created passports and in-place updates of existing UNSEALED passports. No webhook event is emitted by this endpoint.",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "const": "Digital Product Passport successfully ingested from AAS"
    },
    "passportId": {
      "type": "string"
    },
    "productId": {
      "type": "string"
    },
    "isSealed": {
      "type": "boolean",
      "description": "True when the environment embedded an `eidasVerificationSeal` submodel (the seal is then stored on the passport)."
    },
    "signatureVerified": {
      "type": "boolean",
      "description": "True when the embedded seal verified against the tenant's server-held eIDAS public key. Always false for unsealed documents. (A sealed-but-unverified document never reaches 201 — it fails 400.)"
    }
  }
}
```

## Used by

- [ingestPassportFromAas](/operations/ingestPassportFromAas.md) (`POST /api/v1/passports/aas/ingest`)
