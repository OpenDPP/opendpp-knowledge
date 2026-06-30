---
type: Schema
title: EconomicOperatorNode
description: Embedded economic-operator JSON-LD node (public in all tiers).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/EconomicOperatorNode
tags:
  - schema
timestamp: 2026-06-29T00:00:00Z
---

Embedded economic-operator JSON-LD node (public in all tiers).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@type` | string | yes | — |
| `id` | string | yes | — |
| `name` | string | yes | — |
| `regId` | string | yes | EORI number or official business-registry identifier (unique platform-wide), e.g. |
| `role` | string | no | Operator role in the supply chain, e.g. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Embedded economic-operator JSON-LD node (public in all tiers).",
  "required": [
    "@type",
    "id",
    "name",
    "regId"
  ],
  "properties": {
    "@type": {
      "type": "string",
      "const": "EconomicOperator"
    },
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "regId": {
      "type": "string",
      "description": "EORI number or official business-registry identifier (unique platform-wide), e.g. `EU-DEFAULT-001`."
    },
    "role": {
      "type": "string",
      "description": "Operator role in the supply chain, e.g. `MANUFACTURER`, `IMPORTER`, `RETAILER`. Always present in detail/resolution responses; absent from `GET /api/v1/passports` list items."
    }
  }
}
```

## Used by

- schema [PassportListItem](/schemas/PassportListItem.md)
- schema [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
