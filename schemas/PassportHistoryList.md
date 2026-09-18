---
type: Schema
title: PassportHistoryList
description: PassportHistoryList
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportHistoryList
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
| `passportId` | string | yes | The passport UUID. |
| `productId` | string | yes | The caller-supplied product identifier. |
| `currentVersion` | integer | yes | The live passport's version number: one more than the number of archived versions. |
| `page` | integer | yes | — |
| `limit` | integer | yes | — |
| `total` | integer | yes | Number of archived versions. |
| `totalPages` | integer | yes | — |
| `versions` | array<[PassportHistoryVersionSummary](/schemas/PassportHistoryVersionSummary.md)> | yes | Archived versions, newest first. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "passportId",
    "productId",
    "currentVersion",
    "page",
    "limit",
    "total",
    "totalPages",
    "versions"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "passportId": {
      "type": "string",
      "description": "The passport UUID."
    },
    "productId": {
      "type": "string",
      "description": "The caller-supplied product identifier."
    },
    "currentVersion": {
      "type": "integer",
      "minimum": 1,
      "description": "The live passport's version number: one more than the number of archived versions."
    },
    "page": {
      "type": "integer"
    },
    "limit": {
      "type": "integer"
    },
    "total": {
      "type": "integer",
      "description": "Number of archived versions."
    },
    "totalPages": {
      "type": "integer"
    },
    "versions": {
      "type": "array",
      "description": "Archived versions, newest first.",
      "items": {
        "$ref": "#/components/schemas/PassportHistoryVersionSummary"
      }
    }
  }
}
```

## Used by

- [listPassportHistory](/operations/listPassportHistory.md) (`GET /api/v1/passports/{id}/history`)
