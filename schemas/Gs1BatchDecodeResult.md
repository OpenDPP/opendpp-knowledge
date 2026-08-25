---
type: Schema
title: Gs1BatchDecodeResult
description: "One batch-decode result, aligned to its input item: a decoded scan (ok: true) or a per-item error (ok: false + error)."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/Gs1BatchDecodeResult
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

One batch-decode result, aligned to its input item: a decoded scan (`ok: true`) or a per-item error (`ok: false` + `error`). `ok` is the discriminant.

## JSON Schema

```json
{
  "description": "One batch-decode result, aligned to its input item: a decoded scan (`ok: true`) or a per-item error (`ok: false` + `error`). `ok` is the discriminant.",
  "oneOf": [
    {
      "$ref": "#/components/schemas/Gs1BatchDecodeOk"
    },
    {
      "$ref": "#/components/schemas/Gs1BatchDecodeError"
    }
  ]
}
```

## Used by

- [decodeGs1Batch](/operations/decodeGs1Batch.md) (`POST /api/v1/gs1/decode/batch`)
