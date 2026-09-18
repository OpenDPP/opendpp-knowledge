---
type: Schema
title: EconomicOperatorNode
description: Embedded economic-operator JSON-LD node (public in all tiers).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/EconomicOperatorNode
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Embedded economic-operator JSON-LD node (public in all tiers).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@type` | string | yes | — |
| `id` | string | yes | — |
| `name` | string | yes | — |
| `regId` | string | yes | The identifier issued under regIdScheme — e.g. LT000000000001, an EU VAT identification number. |
| `regIdScheme` | string | yes | The EN 18219 clause 6 scheme regId is issued under — VAT, DUNS, LEI or GLN, each with an ISO/IEC 6523 ICD — so the header's economicOperatorId reads as ICD:ide… |
| `role` | string | no | Operator role in the supply chain, e.g. MANUFACTURER, IMPORTER, RETAILER. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Embedded economic-operator JSON-LD node (public in all tiers).",
  "required": [
    "@type",
    "id",
    "name",
    "regId",
    "regIdScheme"
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
      "description": "The identifier issued under `regIdScheme` — e.g. `LT000000000001`, an EU VAT identification number. Unique within the operator's workspace."
    },
    "regIdScheme": {
      "type": "string",
      "enum": [
        "VAT",
        "DUNS",
        "LEI",
        "GLN",
        "UNDECLARED"
      ],
      "description": "The EN 18219 clause 6 scheme `regId` is issued under — `VAT`, `DUNS`, `LEI` or `GLN`, each with an ISO/IEC 6523 ICD — so the header's `economicOperatorId` reads as `ICD:identifier`. `UNDECLARED` only on an operator that predates the declaration; its `economicOperatorId` is then the identifier as registered."
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
