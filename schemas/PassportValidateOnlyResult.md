---
type: Schema
title: PassportValidateOnlyResult
description: 200 envelope of the validate-only endpoints (only the declared keys are emitted).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportValidateOnlyResult
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

200 envelope of the validate-only endpoints (only the declared keys are emitted).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `category` | string | yes | Echo of metadata.category (or "unknown" if absent). |
| `errors` | array<[ValidationErrorItem](/schemas/ValidationErrorItem.md)> | yes | Always an empty array on 200. |
| `warnings` | array<[ValidationErrorItem](/schemas/ValidationErrorItem.md)> | no | Non-blocking findings (e.g. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "message",
    "category",
    "errors"
  ],
  "description": "200 envelope of the validate-only endpoints (only the declared keys are emitted).",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "const": "Passport metadata payload is 100% valid and ESPR category compliant"
    },
    "category": {
      "type": "string",
      "description": "Echo of `metadata.category` (or \"unknown\" if absent)."
    },
    "errors": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ValidationErrorItem"
      },
      "maxItems": 0,
      "description": "Always an empty array on 200."
    },
    "warnings": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ValidationErrorItem"
      },
      "description": "Non-blocking findings (e.g. malformed supplementary objects like `circularityAttributes`). The key is OMITTED entirely when there are no warnings — it is never an empty array."
    }
  }
}
```

## Used by

- [validatePassport](/operations/validatePassport.md) (`POST /api/v1/passports/validate-only`)
- [validatePassportPublic](/operations/validatePassportPublic.md) (`POST /api/v1/passports/validate-only-public`)
