---
type: Schema
title: GlobalRateLimitError
description: Global rate-limit plugin default body (with x-ratelimit-* headers).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/GlobalRateLimitError
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Global rate-limit plugin default body (with x-ratelimit-* headers).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `statusCode` | integer | yes | — |
| `error` | string | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Global rate-limit plugin default body (with x-ratelimit-* headers).",
  "required": [
    "statusCode",
    "error",
    "message"
  ],
  "properties": {
    "statusCode": {
      "type": "integer"
    },
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
