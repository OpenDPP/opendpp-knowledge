---
type: Schema
title: PassportHistoryError
description: PassportHistoryError
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportHistoryError
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `error` | string | yes | Short error category. |
| `message` | string | yes | Human-readable detail. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "error",
    "message"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": false
    },
    "error": {
      "type": "string",
      "description": "Short error category."
    },
    "message": {
      "type": "string",
      "description": "Human-readable detail."
    }
  }
}
```

## Used by

- [listPassportHistory](/operations/listPassportHistory.md) (`GET /api/v1/passports/{id}/history`)
- [getPassportVersionAtDate](/operations/getPassportVersionAtDate.md) (`GET /api/v1/passports/{id}/history/at`)
- [getPassportVersion](/operations/getPassportVersion.md) (`GET /api/v1/passports/{id}/history/{version}`)
