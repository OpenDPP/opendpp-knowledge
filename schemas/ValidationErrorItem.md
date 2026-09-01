---
type: Schema
title: ValidationErrorItem
description: One field-level finding from ESPR category validation.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/ValidationErrorItem
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

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

- schema [PassportCreateValidationError](/schemas/PassportCreateValidationError.md)
- schema [AasIngestValidationError](/schemas/AasIngestValidationError.md)
- schema [PassportIngestCreated](/schemas/PassportIngestCreated.md)
- schema [PassportValidateOnlyResult](/schemas/PassportValidateOnlyResult.md)
- schema [PassportValidateOnlyError](/schemas/PassportValidateOnlyError.md)
- schema [AasIngestCreated](/schemas/AasIngestCreated.md)
- schema [PassportUpdateValidationError](/schemas/PassportUpdateValidationError.md)
