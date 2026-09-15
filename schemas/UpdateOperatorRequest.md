---
type: Schema
title: UpdateOperatorRequest
description: Every field is optional.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/UpdateOperatorRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-03T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Every field is optional. `name` and `role` must be non-empty strings after trimming; anything else (missing, non-string, whitespace-only) is silently ignored. `eori` may be set, changed or cleared with `null` (syntax-checked, `400` if malformed). `regId` and `regIdScheme` are immutable once declared (EN 18219 §4.2.2) — the one exception is an operator whose `regIdScheme` is `UNDECLARED`, which is declared exactly once by sending both, against the same clause 6 rules as a registration; any later change is `400`. An omitted body or an empty object `{}` is accepted and returns the unchanged row.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | no | New display name (trimmed). |
| `role` | string | no | New supply-chain role, free text (trimmed) — e.g. MANUFACTURER, IMPORTER, RETAILER. |
| `eori` | string,null | no | The EU EORI to set, or null to clear it. |
| `regIdScheme` | string | no | Only for an UNDECLARED operator: the clause 6 scheme being declared, together with regId. |
| `regId` | string | no | Only for an UNDECLARED operator: the identifier under the scheme being declared. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Every field is optional. `name` and `role` must be non-empty strings after trimming; anything else (missing, non-string, whitespace-only) is silently ignored. `eori` may be set, changed or cleared with `null` (syntax-checked, `400` if malformed). `regId` and `regIdScheme` are immutable once declared (EN 18219 §4.2.2) — the one exception is an operator whose `regIdScheme` is `UNDECLARED`, which is declared exactly once by sending both, against the same clause 6 rules as a registration; any later change is `400`. An omitted body or an empty object `{}` is accepted and returns the unchanged row.",
  "properties": {
    "name": {
      "type": "string",
      "description": "New display name (trimmed)."
    },
    "role": {
      "type": "string",
      "description": "New supply-chain role, free text (trimmed) — e.g. `MANUFACTURER`, `IMPORTER`, `RETAILER`."
    },
    "eori": {
      "type": [
        "string",
        "null"
      ],
      "description": "The EU EORI to set, or `null` to clear it."
    },
    "regIdScheme": {
      "type": "string",
      "enum": [
        "VAT",
        "DUNS",
        "LEI",
        "GLN"
      ],
      "description": "Only for an `UNDECLARED` operator: the clause 6 scheme being declared, together with `regId`."
    },
    "regId": {
      "type": "string",
      "description": "Only for an `UNDECLARED` operator: the identifier under the scheme being declared."
    }
  }
}
```

## Used by

- [updateOperator](/operations/updateOperator.md) (`PATCH /api/v1/operators/{id}`)
