---
type: Schema
title: RegisterOperatorRequest
description: "An economic operator to register: its legal name, its identifier under an EN 18219 clause 6 scheme, optionally its EORI and supply-chain role."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RegisterOperatorRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

An economic operator to register: its legal name, its identifier under an EN 18219 clause 6 scheme, optionally its EORI and supply-chain role.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | yes | Legal/display name. |
| `regId` | string | yes | The identifier issued under regIdScheme: an EU VAT identification number (e.g. DE811907980), a D-U-N-S number (150483782), an LEI (529900T8BM49AURSDO55) or a G… |
| `regIdScheme` | string | yes | Required: the EN 18219 clause 6 scheme regId is issued under, matched case-insensitively (uppercased server-side). |
| `eori` | string,null | no | Optional EU EORI (customs identifier), ^[A-Z]{2}[A-Za-z0-9]{1,15}$ after whitespace is stripped and letters upper-cased. |
| `role` | string | no | Supply-chain role, free text — e.g. MANUFACTURER, IMPORTER, RETAILER. |

## JSON Schema

```json
{
  "description": "An economic operator to register: its legal name, its identifier under an EN 18219 clause 6 scheme, optionally its EORI and supply-chain role.",
  "type": "object",
  "required": [
    "name",
    "regId",
    "regIdScheme"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Legal/display name. Ignored if your workspace already has an operator with this `regId` (the existing record is returned instead)."
    },
    "regId": {
      "type": "string",
      "description": "The identifier issued under `regIdScheme`: an EU VAT identification number (e.g. `DE811907980`), a D-U-N-S number (`150483782`), an LEI (`529900T8BM49AURSDO55`) or a GS1 GLN (`4012345000009`). Checked against the scheme's shape; fabricated `EORI-MOCK…` ids are rejected. Unique within your workspace; immutable once declared."
    },
    "regIdScheme": {
      "type": "string",
      "enum": [
        "VAT",
        "DUNS",
        "LEI",
        "GLN"
      ],
      "description": "Required: the EN 18219 clause 6 scheme `regId` is issued under, matched case-insensitively (uppercased server-side). Any other value — an EORI included — is rejected with `400`. Ignored when binding to an existing operator."
    },
    "eori": {
      "type": [
        "string",
        "null"
      ],
      "description": "Optional EU EORI (customs identifier), `^[A-Z]{2}[A-Za-z0-9]{1,15}$` after whitespace is stripped and letters upper-cased. Not the EN 18219 identifier — it has no ISO/IEC 6523 ICD — but what customs and the EU registry know the operator by. Omit or `null` for none."
    },
    "role": {
      "type": "string",
      "default": "MANUFACTURER",
      "description": "Supply-chain role, free text — e.g. `MANUFACTURER`, `IMPORTER`, `RETAILER`. Defaults to `MANUFACTURER`. Ignored when binding to an existing operator."
    }
  }
}
```

## Used by

- [registerOperator](/operations/registerOperator.md) (`POST /api/v1/operators`)
