---
type: Schema
title: ValidationErrorItem
description: One field-level finding from ESPR category validation.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/ValidationErrorItem
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

One field-level finding from ESPR category validation. `path` uses dot/bracket notation into the metadata object (e.g. `materialComposition[0].percentage`).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `path` | string | yes | Dot/bracket path of the offending metadata field. |
| `message` | string | yes | Technical validation message. |
| `friendlyMessage` | string | no | Localized, human-friendly explanation (language from ?lang= or Accept-Language; 28 languages, default en). |

## JSON Schema

```json
{
  "type": "object",
  "description": "One field-level finding from ESPR category validation. `path` uses dot/bracket notation into the metadata object (e.g. `materialComposition[0].percentage`).",
  "required": [
    "path",
    "message"
  ],
  "properties": {
    "path": {
      "type": "string",
      "description": "Dot/bracket path of the offending metadata field."
    },
    "message": {
      "type": "string",
      "description": "Technical validation message."
    },
    "friendlyMessage": {
      "type": "string",
      "description": "Localized, human-friendly explanation (language from `?lang=` or `Accept-Language`; 28 languages, default `en`)."
    }
  }
}
```

## Used by

- [createPassport](/operations/createPassport.md) (`POST /api/v1/passports`)
- [ingestPassportFromAas](/operations/ingestPassportFromAas.md) (`POST /api/v1/passports/aas/ingest`)
- schema [PassportIngestCreated](/schemas/PassportIngestCreated.md)
- schema [PassportValidateOnlyResult](/schemas/PassportValidateOnlyResult.md)
- schema [PassportValidateOnlyError](/schemas/PassportValidateOnlyError.md)
- schema [PassportUpdateValidationError](/schemas/PassportUpdateValidationError.md)
