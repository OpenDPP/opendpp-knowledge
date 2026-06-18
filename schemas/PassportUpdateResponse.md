---
type: Schema
title: PassportUpdateResponse
description: 200 envelope of PUT /api/v1/passports/{id}.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportUpdateResponse
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

200 envelope of PUT /api/v1/passports/{id}. The passport document is serialized at the PUBLIC redaction tier (owner-only/restricted metadata keys masked) even for the owner.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | Always true on 200. |
| `message` | string | yes | "Draft published" when a validated save promoted a DRAFT to ACTIVE; the longer message otherwise. |
| `passport` | [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md) | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "200 envelope of PUT /api/v1/passports/{id}. The passport document is serialized at the PUBLIC redaction tier (owner-only/restricted metadata keys masked) even for the owner.",
  "required": [
    "success",
    "message",
    "passport"
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
    }
  }
}
```

## Used by

- [updatePassport](/operations/updatePassport.md) (`PUT /api/v1/passports/{id}`)
