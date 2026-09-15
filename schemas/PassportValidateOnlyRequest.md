---
type: Schema
title: PassportValidateOnlyRequest
description: A metadata payload to validate against its ESPR category rules without persisting anything.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportValidateOnlyRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-03T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

A metadata payload to validate against its ESPR category rules without persisting anything.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `productId` | string | yes | Product identifier (GTIN-14 / GRAI / SKU). |
| `operatorId` | string | no | Accepted by the body schema but IGNORED by the validate-only handlers. |
| `metadata` | [PassportMetadataInput](/schemas/PassportMetadataInput.md) | yes | — |
| `carrier` | [CarrierDeclaration](/schemas/CarrierDeclaration.md) | no | Optional. |

## JSON Schema

```json
{
  "description": "A metadata payload to validate against its ESPR category rules without persisting anything.",
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
    },
    "carrier": {
      "$ref": "#/components/schemas/CarrierDeclaration",
      "description": "Optional. Checked against the EN 18220 vocabulary exactly as on create — an invalid declaration is a 400 here too, so a pre-flight check cannot pass a payload the save would refuse — and, when valid, advised on in `warnings` (a symbology this node does not draw, a granularity the product group's instrument does not expect). Nothing is persisted."
    }
  }
}
```

## Used by

- [validatePassport](/operations/validatePassport.md) (`POST /api/v1/passports/validate-only`)
- [validatePassportPublic](/operations/validatePassportPublic.md) (`POST /api/v1/passports/validate-only-public`)
