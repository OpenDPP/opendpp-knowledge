---
type: Schema
title: PassportBulkRow
description: One bulk-ingestion row.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportBulkRow
tags:
  - schema
timestamp: 2026-06-29T00:00:00Z
---

One bulk-ingestion row. The HTTP layer only requires each row to be an object; rows missing `productId` or `metadata`, failing ESPR validation, referencing unbound operators/unknown facilities, or duplicating an existing `(productId, operatorId)` pair are SKIPPED and reported as strings in the response `errors[]` — they never fail the whole request (unless every row fails). Bulk rows do not support `draft` or `enrichment`, are always created with `status: "ACTIVE"`, skip the EPCIS traceability audit, and do NOT get `metadata.gtin`/`metadata.grai` auto-injected.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `productId` | string | no | GTIN-14 / GRAI / free-form SKU (required in practice; rows without it are skipped with an error string). |
| `operatorId` | string | no | Optional EconomicOperator UUID bound to your workspace; defaults to the workspace's first bound operator. |
| `facilityId` | string | no | Optional Facility UUID in your workspace; unknown ids skip the row. |
| `metadata` | [PassportMetadataInput](/schemas/PassportMetadataInput.md) | no | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "One bulk-ingestion row. The HTTP layer only requires each row to be an object; rows missing `productId` or `metadata`, failing ESPR validation, referencing unbound operators/unknown facilities, or duplicating an existing `(productId, operatorId)` pair are SKIPPED and reported as strings in the response `errors[]` — they never fail the whole request (unless every row fails). Bulk rows do not support `draft` or `enrichment`, are always created with `status: \"ACTIVE\"`, skip the EPCIS traceability audit, and do NOT get `metadata.gtin`/`metadata.grai` auto-injected.",
  "properties": {
    "productId": {
      "type": "string",
      "description": "GTIN-14 / GRAI / free-form SKU (required in practice; rows without it are skipped with an error string)."
    },
    "operatorId": {
      "type": "string",
      "description": "Optional EconomicOperator UUID bound to your workspace; defaults to the workspace's first bound operator. Operator-scoped API keys force their operator."
    },
    "facilityId": {
      "type": "string",
      "description": "Optional Facility UUID in your workspace; unknown ids skip the row."
    },
    "metadata": {
      "$ref": "#/components/schemas/PassportMetadataInput"
    }
  },
  "additionalProperties": true
}
```

## Used by

- schema [PassportBulkRequest](/schemas/PassportBulkRequest.md)
