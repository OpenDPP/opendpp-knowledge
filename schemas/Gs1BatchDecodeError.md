---
type: Schema
title: Gs1BatchDecodeError
description: A per-item decode failure — the batch itself still returns 200 (partial-success).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/Gs1BatchDecodeError
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

A per-item decode failure — the batch itself still returns 200 (partial-success).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `ok` | boolean | yes | — |
| `error` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "A per-item decode failure — the batch itself still returns 200 (partial-success).",
  "required": [
    "ok",
    "error"
  ],
  "properties": {
    "ok": {
      "type": "boolean",
      "const": false
    },
    "error": {
      "type": "string"
    }
  }
}
```

## Used by

- schema [Gs1BatchDecodeResult](/schemas/Gs1BatchDecodeResult.md)
