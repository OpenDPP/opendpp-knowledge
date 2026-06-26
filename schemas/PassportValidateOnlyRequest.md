---
type: Schema
title: PassportValidateOnlyRequest
description: PassportValidateOnlyRequest
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportValidateOnlyRequest
tags:
  - schema
timestamp: 2026-06-26T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `productId` | string | yes | Product identifier (GTIN-14 / GRAI / SKU). |
| `operatorId` | string | no | Accepted by the body schema but IGNORED by the validate-only handlers. |
| `metadata` | [PassportMetadataInput](/schemas/PassportMetadataInput.md) | yes | — |

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
      "description": "Product identifier (GTIN-14 / GRAI / SKU). Required and checked non-empty (whitespace-only → 400), but not otherwise used by the dry-run."
    },
    "operatorId": {
      "type": "string",
      "description": "Accepted by the body schema but IGNORED by the validate-only handlers."
    },
    "metadata": {
      "$ref": "#/components/schemas/PassportMetadataInput"
    }
  }
}
```

## Used by

- [validatePassport](/operations/validatePassport.md) (`POST /api/v1/passports/validate-only`)
- [validatePassportPublic](/operations/validatePassportPublic.md) (`POST /api/v1/passports/validate-only-public`)
