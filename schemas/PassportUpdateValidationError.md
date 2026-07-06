---
type: Schema
title: PassportUpdateValidationError
description: 400 ESPR validation failure body of PUT /api/v1/passports/{id}.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportUpdateValidationError
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

400 ESPR validation failure body of PUT /api/v1/passports/{id}. DIVERGENCE from POST /api/v1/passports: there is never a `warnings` array on this route.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `error` | string | yes | — |
| `message` | string | yes | — |
| `errors` | array<[ValidationErrorItem](/schemas/ValidationErrorItem.md)> | yes | Blocking validation errors. |

## JSON Schema

```json
{
  "type": "object",
  "description": "400 ESPR validation failure body of PUT /api/v1/passports/{id}. DIVERGENCE from POST /api/v1/passports: there is never a `warnings` array on this route.",
  "required": [
    "success",
    "error",
    "message",
    "errors"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": false
    },
    "error": {
      "type": "string",
      "const": "Validation Failed"
    },
    "message": {
      "type": "string",
      "example": "Dynamic metadata payload failed ESPR category schema validation"
    },
    "errors": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ValidationErrorItem"
      },
      "description": "Blocking validation errors. `friendlyMessage` is localized via the `lang` query parameter / Accept-Language (default en)."
    }
  }
}
```

## Used by

- [updatePassport](/operations/updatePassport.md) (`PUT /api/v1/passports/{id}`)
