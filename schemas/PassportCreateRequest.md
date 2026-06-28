---
type: Schema
title: PassportCreateRequest
description: PassportCreateRequest
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportCreateRequest
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `productId` | string | yes | Product identifier: a GTIN-14 (exactly 14 digits with a valid GS1 mod-10 check digit — auto-copied to metadata.gtin), a GRAI (14-digit numeric asset id with va… |
| `operatorId` | string | no | UUID of an EconomicOperator bound to your tenant workspace (403 if not bound). |
| `facilityId` | string | no | Optional UUID of a Facility (GLN-backed Unique Facility Identifier) in your workspace; 400 if not found. |
| `metadata` | [PassportMetadataInput](/schemas/PassportMetadataInput.md) | yes | — |
| `draft` | boolean | no | When true: skips ALL ESPR/traceability validation, stores the passport with status: "DRAFT" (not publicly resolvable), and emits no webhook. |
| `enrichment` | [PassportEnrichmentInput](/schemas/PassportEnrichmentInput.md) | no | — |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "productId",
    "metadata"
  ],
  "properties": {
    "productId": {
      "type": "string",
      "minLength": 1,
      "description": "Product identifier: a GTIN-14 (exactly 14 digits with a valid GS1 mod-10 check digit — auto-copied to `metadata.gtin`), a GRAI (14-digit numeric asset id with valid check digit + optional up to 16 alphanumeric serial chars, total 14–30 — auto-copied to `metadata.grai`), or a free-form SKU. Determines the GS1 Application Identifier (`01` vs `8003`) in the generated Digital Link URI. Whitespace-only values are rejected 400. Unique per economic operator (409 on duplicate)."
    },
    "operatorId": {
      "type": "string",
      "description": "UUID of an EconomicOperator bound to your tenant workspace (403 if not bound). Defaults to your workspace's first bound operator. Operator-scoped API keys force their own operator (403 on mismatch)."
    },
    "facilityId": {
      "type": "string",
      "description": "Optional UUID of a Facility (GLN-backed Unique Facility Identifier) in your workspace; 400 if not found."
    },
    "metadata": {
      "$ref": "#/components/schemas/PassportMetadataInput"
    },
    "draft": {
      "type": "boolean",
      "default": false,
      "description": "When true: skips ALL ESPR/traceability validation, stores the passport with `status: \"DRAFT\"` (not publicly resolvable), and emits no webhook. Publish later via a validated edit."
    },
    "enrichment": {
      "$ref": "#/components/schemas/PassportEnrichmentInput"
    }
  }
}
```

## Used by

- [createPassport](/operations/createPassport.md) (`POST /api/v1/passports`)
