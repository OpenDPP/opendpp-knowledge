---
type: Schema
title: AasIngestCreated
description: 201 envelope of POST /api/v1/passports/aas/ingest.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/AasIngestCreated
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

201 envelope of `POST /api/v1/passports/aas/ingest`. Returned for both newly created passports and in-place updates of existing UNSEALED passports. No webhook event is emitted by this endpoint. `vcReady`/`vcReadyReason` report UNTP Verifiable-Credential readiness (#247) and `warnings` carries the non-GS1 advisory (#249), for parity with `POST /api/v1/passports`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `passportId` | string | yes | — |
| `productId` | string | yes | — |
| `isSealed` | boolean | yes | True when the environment embedded an eidasVerificationSeal submodel (the seal is then stored on the passport). |
| `signatureVerified` | boolean | yes | True when the embedded seal verified against the tenant's server-held eIDAS public key. |
| `vcReady` | boolean | yes | #247: whether the ingested passport can emit a UNTP Verifiable Credential — true only when a manufacturing facility with a country of production is linked. |
| `vcReadyReason` | string,null | no | Null when vcReady is true; otherwise a short, actionable reason (link a facility with a country of production). |
| `warnings` | array<[ValidationErrorItem](/schemas/ValidationErrorItem.md)> | yes | #249: non-blocking advisories. |

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
    "signatureVerified",
    "vcReady",
    "warnings"
  ],
  "description": "201 envelope of `POST /api/v1/passports/aas/ingest`. Returned for both newly created passports and in-place updates of existing UNSEALED passports. No webhook event is emitted by this endpoint. `vcReady`/`vcReadyReason` report UNTP Verifiable-Credential readiness (#247) and `warnings` carries the non-GS1 advisory (#249), for parity with `POST /api/v1/passports`.",
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
    },
    "vcReady": {
      "type": "boolean",
      "description": "#247: whether the ingested passport can emit a UNTP Verifiable Credential — true only when a manufacturing facility with a country of production is linked. AAS ingestion does not set a facility, so a newly created passport is false; an in-place update preserves whatever facility the existing passport had."
    },
    "vcReadyReason": {
      "type": [
        "string",
        "null"
      ],
      "description": "Null when `vcReady` is true; otherwise a short, actionable reason (link a facility with a country of production)."
    },
    "warnings": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ValidationErrorItem"
      },
      "description": "#249: non-blocking advisories. Always present (empty array when none); carries the non-GS1 advisory when the resolved `productId` is not a GS1 GTIN-14/GRAI."
    }
  }
}
```

## Used by

- [ingestPassportFromAas](/operations/ingestPassportFromAas.md) (`POST /api/v1/passports/aas/ingest`)
