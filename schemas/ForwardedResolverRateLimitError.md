---
type: Schema
title: ForwardedResolverRateLimitError
description: Forwarded public-resolver limiter body (no success field, no headers).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/ForwardedResolverRateLimitError
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Forwarded public-resolver limiter body (no `success` field, no headers).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `error` | string | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Forwarded public-resolver limiter body (no `success` field, no headers).",
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

- schema [PassportGetTooManyRequests](/schemas/PassportGetTooManyRequests.md)
