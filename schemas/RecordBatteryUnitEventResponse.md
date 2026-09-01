---
type: Schema
title: RecordBatteryUnitEventResponse
description: Confirmation that a dynamic-data record was appended to a battery unit, echoing the stored event.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RecordBatteryUnitEventResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Confirmation that a dynamic-data record was appended to a battery unit, echoing the stored event.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `event` | [BatteryUnitEventRow](/schemas/BatteryUnitEventRow.md) | yes | — |

## JSON Schema

```json
{
  "description": "Confirmation that a dynamic-data record was appended to a battery unit, echoing the stored event.",
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "const": "Dynamic data recorded"
    },
    "event": {
      "$ref": "#/components/schemas/BatteryUnitEventRow"
    }
  },
  "required": [
    "success",
    "message",
    "event"
  ]
}
```

## Used by

- [recordBatteryUnitEvent](/operations/recordBatteryUnitEvent.md) (`POST /api/v1/units/{id}/events`)
