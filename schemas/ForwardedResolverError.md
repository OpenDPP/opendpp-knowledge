---
type: Schema
title: ForwardedResolverError
description: Forwarded public-resolver body (no success field).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/ForwardedResolverError
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Forwarded public-resolver body (no `success` field).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `error` | string | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Forwarded public-resolver body (no `success` field).",
  "required": [
    "error",
    "message"
  ],
  "properties": {
    "error": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  }
}
```

## Used by

- schema [PassportGetNotFound](/schemas/PassportGetNotFound.md)
