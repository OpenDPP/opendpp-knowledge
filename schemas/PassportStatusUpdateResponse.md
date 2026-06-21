---
type: Schema
title: PassportStatusUpdateResponse
description: 200 envelope of PUT /api/v1/passports/{id}/status.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportStatusUpdateResponse
tags:
  - schema
timestamp: 2026-06-20T00:00:00Z
---

200 envelope of PUT /api/v1/passports/{id}/status. The passport document is serialized at the PUBLIC redaction tier.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | Always true on 200. |
| `message` | string | yes | Passport status successfully updated to <STATUS>. |
| `status` | string | yes | The passport's new lifecycle state. |
| `passport` | [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md) | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "200 envelope of PUT /api/v1/passports/{id}/status. The passport document is serialized at the PUBLIC redaction tier.",
  "required": [
    "success",
    "message",
    "status",
    "passport"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "description": "Always true on 200."
    },
    "message": {
      "type": "string",
      "description": "`Passport status successfully updated to <STATUS>`."
    },
    "status": {
      "type": "string",
      "enum": [
        "ACTIVE",
        "RECALLED",
        "DECOMMISSIONED"
      ],
      "description": "The passport's new lifecycle state."
    },
    "passport": {
      "$ref": "#/components/schemas/PublicPassportJsonLd"
    }
  }
}
```

## Used by

- [updatePassportStatus](/operations/updatePassportStatus.md) (`PUT /api/v1/passports/{id}/status`)
