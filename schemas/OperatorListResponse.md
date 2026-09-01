---
type: Schema
title: OperatorListResponse
description: The economic operators bound to the calling workspace.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/OperatorListResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

The economic operators bound to the calling workspace.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `count` | integer | yes | Number of operators returned (the list is not paginated). |
| `operators` | array<[OperatorRow](/schemas/OperatorRow.md)> | yes | — |

## JSON Schema

```json
{
  "description": "The economic operators bound to the calling workspace.",
  "type": "object",
  "required": [
    "success",
    "count",
    "operators"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "count": {
      "type": "integer",
      "description": "Number of operators returned (the list is not paginated)."
    },
    "operators": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/OperatorRow"
      }
    }
  }
}
```

## Used by

- [listOperators](/operations/listOperators.md) (`GET /api/v1/operators`)
