---
type: Schema
title: PassportUpdateResponse
description: 200 envelope of PUT /api/v1/passports/{id}.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportUpdateResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-21T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

200 envelope of PUT /api/v1/passports/{id}. The passport document is serialized at the PUBLIC redaction tier (owner-only/restricted metadata keys masked) even for the owner. Also carries the `vcReady`/`vcReadyReason` UNTP readiness signal and a non-blocking `warnings[]`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | Always true on 200. |
| `message` | string | yes | "Draft published" when a validated save promoted a DRAFT to ACTIVE; the longer message otherwise. |
| `passport` | [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md) | yes | — |
| `resealRequired` | boolean | no | Present, and true, only when the passport was sealed before this update and the update changed its metadata. |
| `warnings` | array<[AdvisoryItem](/schemas/AdvisoryItem.md)> | yes | Non-blocking advisories on a validated save: the data-carrier declaration checks (a symbology that does not fit the declared print attributes, a category whose… |

## JSON Schema

```json
{
  "type": "object",
  "description": "200 envelope of PUT /api/v1/passports/{id}. The passport document is serialized at the PUBLIC redaction tier (owner-only/restricted metadata keys masked) even for the owner. Also carries the `vcReady`/`vcReadyReason` UNTP readiness signal and a non-blocking `warnings[]`.",
  "required": [
    "success",
    "message",
    "passport",
    "warnings"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "description": "Always true on 200."
    },
    "message": {
      "type": "string",
      "enum": [
        "Draft published",
        "Digital Product Passport successfully updated and history versioned"
      ],
      "description": "\"Draft published\" when a validated save promoted a DRAFT to ACTIVE; the longer message otherwise."
    },
    "passport": {
      "$ref": "#/components/schemas/PublicPassportJsonLd"
    },
    "resealRequired": {
      "type": "boolean",
      "const": true,
      "description": "Present, and `true`, only when the passport was sealed before this update and the update changed its metadata. The sealed version is archived in the version history with its seal intact; this new version carries no seal until it is sealed again with `POST /api/v1/passports/{id}/seal`."
    },
    "warnings": {
      "type": "array",
      "description": "Non-blocking advisories on a validated save: the data-carrier declaration checks (a symbology that does not fit the declared print attributes, a category whose carrier granularity does not match). Always `[]` when `draft: true`.",
      "items": {
        "$ref": "#/components/schemas/AdvisoryItem"
      }
    }
  }
}
```

## Used by

- [updatePassport](/operations/updatePassport.md) (`PUT /api/v1/passports/{id}`)
