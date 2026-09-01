---
type: Schema
title: BulkBatteryUnitEventsResponse
description: The partial-success report of a bulk telemetry ingest.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BulkBatteryUnitEventsResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

The partial-success report of a bulk telemetry ingest.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `count` | integer | yes | How many records were accepted — equals events.length. |
| `events` | array<[BatteryUnitEventRow](/schemas/BatteryUnitEventRow.md)> | yes | The persisted rows, in the order the accepted records appeared in the request. |
| `errors` | array<string> | yes | Skipped records as [index]-prefixed reasons; empty when the whole batch was accepted. |

## JSON Schema

```json
{
  "description": "The partial-success report of a bulk telemetry ingest.",
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string"
    },
    "count": {
      "type": "integer",
      "minimum": 1,
      "maximum": 500,
      "description": "How many records were accepted — equals `events.length`."
    },
    "events": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/BatteryUnitEventRow"
      },
      "maxItems": 500,
      "description": "The persisted rows, in the order the accepted records appeared in the request."
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Skipped records as `[index]`-prefixed reasons; empty when the whole batch was accepted."
    }
  },
  "required": [
    "success",
    "message",
    "count",
    "events",
    "errors"
  ]
}
```

## Used by

- [bulkRecordBatteryUnitEvents](/operations/bulkRecordBatteryUnitEvents.md) (`POST /api/v1/units/{id}/events/bulk`)
