---
type: Schema
title: AAS ESPR validation failure
description: AAS ESPR validation failure
resource: https://opendpp-node.eu/openapi.json#/components/schemas/AasIngestValidationError
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `error` | string | yes | — |
| `message` | string | yes | — |
| `errors` | array<[ValidationErrorItem](/schemas/ValidationErrorItem.md)> | yes | — |
| `warnings` | array<[ValidationErrorItem](/schemas/ValidationErrorItem.md)> | no | Omitted entirely when there are no warnings. |

## JSON Schema

```json
{
  "type": "object",
  "title": "AAS ESPR validation failure",
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
      "type": "string"
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
      "description": "Omitted entirely when there are no warnings."
    }
  }
}
```

## Used by

- schema [AasIngestBadRequest](/schemas/AasIngestBadRequest.md)
