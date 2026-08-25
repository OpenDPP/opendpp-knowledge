---
type: Schema
title: PassportGetTooManyRequests
description: "The two 429 bodies of an authenticated passport read: the global limiter's default body (with x-ratelimit-* headers), or the body forwarded from the inner public resolver's limiter (no headers)."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportGetTooManyRequests
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

The two 429 bodies of an authenticated passport read: the global limiter's default body (with `x-ratelimit-*` headers), or the body forwarded from the inner public resolver's limiter (no headers).

## JSON Schema

```json
{
  "description": "The two 429 bodies of an authenticated passport read: the global limiter's default body (with `x-ratelimit-*` headers), or the body forwarded from the inner public resolver's limiter (no headers).",
  "anyOf": [
    {
      "$ref": "#/components/schemas/GlobalRateLimitError"
    },
    {
      "$ref": "#/components/schemas/ForwardedResolverRateLimitError"
    }
  ]
}
```

## Used by

- [getPassport](/operations/getPassport.md) (`GET /api/v1/passports/{id}`)
