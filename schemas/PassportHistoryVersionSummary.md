---
type: Schema
title: PassportHistoryVersionSummary
description: PassportHistoryVersionSummary
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportHistoryVersionSummary
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-03T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `version` | integer | yes | Archived version number; 1 is the state the first change replaced. |
| `validUntil` | string | yes | The instant this version stopped being current — when the change that replaced it was recorded. |
| `recordedAt` | string | yes | When the snapshot was archived (the same instant as validUntil). |
| `changedBy` | string | yes | Who recorded the change that replaced this version — an API-key or user label. |
| `changeReason` | string,null | yes | The caller's changeReason on the write, or the lifecycle transition (Status changed: ACTIVE → RECALLED). |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "version",
    "validUntil",
    "recordedAt",
    "changedBy",
    "changeReason"
  ],
  "properties": {
    "version": {
      "type": "integer",
      "minimum": 1,
      "description": "Archived version number; 1 is the state the first change replaced."
    },
    "validUntil": {
      "type": "string",
      "format": "date-time",
      "description": "The instant this version stopped being current — when the change that replaced it was recorded."
    },
    "recordedAt": {
      "type": "string",
      "format": "date-time",
      "description": "When the snapshot was archived (the same instant as `validUntil`)."
    },
    "changedBy": {
      "type": "string",
      "description": "Who recorded the change that replaced this version — an API-key or user label."
    },
    "changeReason": {
      "type": [
        "string",
        "null"
      ],
      "description": "The caller's `changeReason` on the write, or the lifecycle transition (`Status changed: ACTIVE → RECALLED`)."
    }
  }
}
```

## Used by

- schema [PassportHistoryList](/schemas/PassportHistoryList.md)
