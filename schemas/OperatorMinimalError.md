---
type: Schema
title: OperatorMinimalError
description: Minimal error envelope used by the operator/key self-service handlers — note the standard error key is ABSENT (unlike the shared Error schema).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/OperatorMinimalError
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Minimal error envelope used by the operator/key self-service handlers — note the standard `error` key is ABSENT (unlike the shared Error schema).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Minimal error envelope used by the operator/key self-service handlers — note the standard `error` key is ABSENT (unlike the shared Error schema).",
  "required": [
    "success",
    "message"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": false
    },
    "message": {
      "type": "string"
    }
  }
}
```

## Used by

- [deleteOperator](/operations/deleteOperator.md) (`DELETE /api/v1/operators/{id}`)
- schema [OperatorMinimalErrorResponse](/schemas/OperatorMinimalErrorResponse.md)
- the shared error responses
