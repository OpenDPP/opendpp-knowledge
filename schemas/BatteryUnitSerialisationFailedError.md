---
type: Schema
title: BatteryUnitSerialisationFailedError
description: 400 body when every item in the serialisation batch failed.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitSerialisationFailedError
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-21T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

400 body when **every** item in the serialisation batch failed. `errors` is an array of plain strings, one per refused item; `message` summarises the batch.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `error` | string | yes | — |
| `message` | string | no | — |
| `errors` | array<string> | yes | — |
| `reasons` | array<[BatteryUnitRefusalReason](/schemas/BatteryUnitRefusalReason.md)> | no | One per errors entry, in the same order: each refusal as a stable code. |

## JSON Schema

```json
{
  "type": "object",
  "description": "400 body when **every** item in the serialisation batch failed. `errors` is an array of plain strings, one per refused item; `message` summarises the batch.",
  "properties": {
    "success": {
      "type": "boolean",
      "const": false
    },
    "error": {
      "type": "string",
      "const": "Serialisation Failed"
    },
    "message": {
      "type": "string"
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1
    },
    "reasons": {
      "type": "array",
      "description": "One per `errors` entry, in the same order: each refusal as a stable code.",
      "items": {
        "$ref": "#/components/schemas/BatteryUnitRefusalReason"
      }
    }
  },
  "required": [
    "success",
    "error",
    "errors"
  ]
}
```

## Used by

- schema [BatteryUnitSerialiseBadRequest](/schemas/BatteryUnitSerialiseBadRequest.md)
