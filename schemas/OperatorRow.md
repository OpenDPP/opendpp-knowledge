---
type: Schema
title: OperatorRow
description: An economic-operator record (EconomicOperator).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/OperatorRow
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-03T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

An economic-operator record (`EconomicOperator`). Operators are scoped to your workspace (each workspace keeps its own row for a given `regId`). Returned verbatim from the database (no field stripping); nullable fields are serialized as `null`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | Operator UUID. |
| `name` | string | yes | Legal/display name of the operator. |
| `regId` | string | yes | The identifier issued under regIdScheme — an EU VAT identification number, a D-U-N-S number, an LEI or a GS1 GLN. |
| `regIdScheme` | string | yes | The EN 18219 clause 6 scheme regId is issued under. |
| `eori` | string,null | yes | The operator's EU EORI (customs identifier), normalised, or null. |
| `role` | string | yes | Supply-chain role, free text — e.g. "MANUFACTURER", "IMPORTER", "RETAILER". |
| `archivedAt` | string,null | yes | Soft-delete / cessation-of-trading marker. |
| `createdAt` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "An economic-operator record (`EconomicOperator`). Operators are scoped to your workspace (each workspace keeps its own row for a given `regId`). Returned verbatim from the database (no field stripping); nullable fields are serialized as `null`.",
  "required": [
    "id",
    "name",
    "regId",
    "regIdScheme",
    "eori",
    "role",
    "archivedAt",
    "createdAt"
  ],
  "properties": {
    "id": {
      "type": "string",
      "description": "Operator UUID."
    },
    "name": {
      "type": "string",
      "description": "Legal/display name of the operator."
    },
    "regId": {
      "type": "string",
      "description": "The identifier issued under `regIdScheme` — an EU VAT identification number, a D-U-N-S number, an LEI or a GS1 GLN. Unique within your workspace and immutable once declared."
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
      "description": "The EN 18219 clause 6 scheme `regId` is issued under. Each has an ISO/IEC 6523 ICD — VAT `0223`, DUNS `0060`, LEI `0199`, GLN `0088` — which is how the EN 18223 `economicOperatorId` is written. `UNDECLARED` appears only on an operator that predates the declaration and whose identifier the migration could not classify: it cannot be sent, and such an operator is declared once via `PATCH`."
    },
    "eori": {
      "type": [
        "string",
        "null"
      ],
      "description": "The operator's EU EORI (customs identifier), normalised, or `null`. Carried beside `regId`: it has no ISO/IEC 6523 ICD and is not what the EN 18223 header names."
    },
    "role": {
      "type": "string",
      "description": "Supply-chain role, free text — e.g. `\"MANUFACTURER\"`, `\"IMPORTER\"`, `\"RETAILER\"`. Defaults to `\"MANUFACTURER\"` at registration."
    },
    "archivedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "Soft-delete / cessation-of-trading marker. Non-null = the operator is archived (its passports are retained and still publicly resolvable)."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

## Used by

- schema [RegisterOperatorResponse](/schemas/RegisterOperatorResponse.md)
- schema [UpdateOperatorResponse](/schemas/UpdateOperatorResponse.md)
- schema [OperatorListResponse](/schemas/OperatorListResponse.md)
- schema [OperatorGetResponse](/schemas/OperatorGetResponse.md)
