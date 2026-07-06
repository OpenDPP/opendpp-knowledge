---
type: Schema
title: PassportIngestCreated
description: 201 envelope of POST /api/v1/passports.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportIngestCreated
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

201 envelope of `POST /api/v1/passports`. `passport` is the public redacted JSON-LD; `warnings`/`notices` are always present (possibly empty); `vcReady`/`vcReadyReason` report UNTP Verifiable-Credential readiness.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | "Digital Product Passport successfully validated and ingested", or "Draft passport saved" when draft: true. |
| `passport` | [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md) | yes | The PUBLIC redacted JSON-LD passport document (unsealed at creation: digitalSeal/proof are null). |
| `warnings` | array<[ValidationErrorItem](/schemas/ValidationErrorItem.md)> | yes | Non-blocking findings — a MIX of ESPR validation warnings (no code) and machine-coded advisories (a code per src/constants/api-advisories.ts, e.g. |
| `notices` | array<[AdvisoryItem](/schemas/AdvisoryItem.md)> | yes | Informational advisories about helpful things the API did (always coded): OPERATOR_AUTO_ATTRIBUTED (operatorId omitted → the workspace's sole bound operator us… |
| `vcReady` | boolean | no | #247: whether this passport can emit a UNTP Verifiable Credential — true only when a manufacturing facility with a country of production is linked (producedAtF… |
| `vcReadyReason` | string,null | no | Null when vcReady is true; otherwise a short, actionable reason (link a facility with a country of production). |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "message",
    "passport",
    "warnings",
    "notices"
  ],
  "description": "201 envelope of `POST /api/v1/passports`. `passport` is the public redacted JSON-LD; `warnings`/`notices` are always present (possibly empty); `vcReady`/`vcReadyReason` report UNTP Verifiable-Credential readiness.",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "description": "\"Digital Product Passport successfully validated and ingested\", or \"Draft passport saved\" when `draft: true`."
    },
    "passport": {
      "$ref": "#/components/schemas/PublicPassportJsonLd",
      "description": "The PUBLIC redacted JSON-LD passport document (unsealed at creation: `digitalSeal`/`proof` are null). The owner-only metadata key `facilityDetails` is always replaced with the literal string \"[REDACTED - Privileged Access Required]\" — even in this creator-facing echo, and even when the submitted metadata did not contain it. For `category: \"batteries\"`, the restricted legitimate-interest keys `detailedPerformance`, `lifecycleAndInUse`, and `circularityAndDisassembly` are masked the same way when present."
    },
    "warnings": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ValidationErrorItem"
      },
      "description": "Non-blocking findings — a MIX of ESPR validation warnings (no `code`) and machine-coded advisories (a `code` per src/constants/api-advisories.ts, e.g. `NON_GS1_PRODUCT_ID`, `PII_SHAPE_DETECTED`). Always present; empty for drafts. See `AdvisoryItem` for the coded shape."
    },
    "notices": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/AdvisoryItem"
      },
      "description": "Informational advisories about helpful things the API did (always coded): `OPERATOR_AUTO_ATTRIBUTED` (operatorId omitted → the workspace's sole bound operator used), `GTIN_AUTO_COPIED` (a valid GTIN/GRAI copied into metadata.gtin/grai). Always present; empty when nothing to note."
    },
    "vcReady": {
      "type": "boolean",
      "description": "#247: whether this passport can emit a UNTP Verifiable Credential — true only when a manufacturing facility with a country of production is linked (`producedAtFacility` + `countryOfProduction` are required by the UNTP DPP schema; a GLN is optional). The passport still publishes and resolves as AAS / JSON-LD / HTML regardless."
    },
    "vcReadyReason": {
      "type": [
        "string",
        "null"
      ],
      "description": "Null when `vcReady` is true; otherwise a short, actionable reason (link a facility with a country of production)."
    }
  }
}
```

## Used by

- [createPassport](/operations/createPassport.md) (`POST /api/v1/passports`)
