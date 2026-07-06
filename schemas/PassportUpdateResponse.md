---
type: Schema
title: PassportUpdateResponse
description: 200 envelope of PUT /api/v1/passports/{id}.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportUpdateResponse
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

200 envelope of PUT /api/v1/passports/{id}. The passport document is serialized at the PUBLIC redaction tier (owner-only/restricted metadata keys masked) even for the owner. Also carries the `vcReady`/`vcReadyReason` UNTP readiness signal (#247) and a non-blocking `warnings[]`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | Always true on 200. |
| `message` | string | yes | "Draft published" when a validated save promoted a DRAFT to ACTIVE; the longer message otherwise. |
| `passport` | [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md) | yes | — |
| `warnings` | array<[AdvisoryItem](/schemas/AdvisoryItem.md)> | yes | Non-blocking advisories. |

## JSON Schema

```json
{
  "type": "object",
  "description": "200 envelope of PUT /api/v1/passports/{id}. The passport document is serialized at the PUBLIC redaction tier (owner-only/restricted metadata keys masked) even for the owner. Also carries the `vcReady`/`vcReadyReason` UNTP readiness signal (#247) and a non-blocking `warnings[]`.",
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
    "warnings": {
      "type": "array",
      "description": "Non-blocking advisories. Carries a single note when saving with `\"draft\": true` DEMOTED an already-published (ACTIVE/RECALLED/DECOMMISSIONED) passport to DRAFT — it is then no longer publicly resolvable. Empty `[]` otherwise.",
      "items": {
        "$ref": "#/components/schemas/AdvisoryItem"
      }
    }
  }
}
```

## Used by

- [updatePassport](/operations/updatePassport.md) (`PUT /api/v1/passports/{id}`)
