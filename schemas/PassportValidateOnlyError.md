---
type: Schema
title: PassportValidateOnlyError
description: 400 envelope of the validate-only endpoints.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportValidateOnlyError
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

400 envelope of the validate-only endpoints. Three variants: ESPR validation failure (`error: "Validation Failed"`, with `success`, `category`, `errors[]`, optional `warnings[]` — omitted when none; category-validity error items carry no `friendlyMessage`); whitespace-only `productId` (`error: "Bad Request"`, `category: "unknown"`, `errors: []`, no `warnings`); and structural request rejections (body-schema violations, malformed JSON), which return only `error` + `message`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | no | — |
| `error` | string | yes | — |
| `message` | string | yes | — |
| `category` | string | no | metadata.category echo, or "unknown" for structural failures. |
| `errors` | array<[ValidationErrorItem](/schemas/ValidationErrorItem.md)> | no | — |
| `warnings` | array<[ValidationErrorItem](/schemas/ValidationErrorItem.md)> | no | Omitted when there are no warnings. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "error",
    "message"
  ],
  "description": "400 envelope of the validate-only endpoints. Three variants: ESPR validation failure (`error: \"Validation Failed\"`, with `success`, `category`, `errors[]`, optional `warnings[]` — omitted when none; category-validity error items carry no `friendlyMessage`); whitespace-only `productId` (`error: \"Bad Request\"`, `category: \"unknown\"`, `errors: []`, no `warnings`); and structural request rejections (body-schema violations, malformed JSON), which return only `error` + `message`.",
  "properties": {
    "success": {
      "type": "boolean",
      "const": false
    },
    "error": {
      "type": "string",
      "enum": [
        "Bad Request",
        "Validation Failed"
      ]
    },
    "message": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "description": "`metadata.category` echo, or \"unknown\" for structural failures."
    },
    "errors": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ValidationErrorItem"
      }
    },
    "warnings": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ValidationErrorItem"
      },
      "description": "Omitted when there are no warnings."
    }
  }
}
```

## Used by

- [validatePassport](/operations/validatePassport.md) (`POST /api/v1/passports/validate-only`)
- [validatePassportPublic](/operations/validatePassportPublic.md) (`POST /api/v1/passports/validate-only-public`)
