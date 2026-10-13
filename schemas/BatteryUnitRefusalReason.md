---
type: Schema
title: BatteryUnitRefusalReason
description: Why one unit was refused, as a stable code and the values it concerns.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitRefusalReason
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-21T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Why one unit was refused, as a stable `code` and the values it concerns. Branch on or translate the `code`; the matching `errors` string is for people and may be reworded. `params` carries strings and numbers only — typically `serialNumber`, plus `value` (the refused input), `length`/`maxLength` (a serial over the limit), `minYear`/`maxYear` (a manufacture year outside the window), `passportId`, `predecessorUnitId` or `predecessorSerial`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `code` | string | yes | — |
| `params` | object | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Why one unit was refused, as a stable `code` and the values it concerns. Branch on or translate the `code`; the matching `errors` string is for people and may be reworded. `params` carries strings and numbers only — typically `serialNumber`, plus `value` (the refused input), `length`/`maxLength` (a serial over the limit), `minYear`/`maxYear` (a manufacture year outside the window), `passportId`, `predecessorUnitId` or `predecessorSerial`.",
  "required": [
    "code",
    "params"
  ],
  "properties": {
    "code": {
      "type": "string",
      "enum": [
        "SERIAL_MISSING",
        "SERIAL_TOO_LONG",
        "SERIAL_INVALID_CHARACTERS",
        "SERIAL_NOT_GS1_CONFORMANT",
        "STATUS_INVALID",
        "MANUFACTURED_AT_INVALID",
        "MANUFACTURED_AT_AMBIGUOUS",
        "MANUFACTURED_AT_OUT_OF_RANGE",
        "IDENTIFIER_ALREADY_ISSUED",
        "SERIAL_ALREADY_REGISTERED",
        "PREDECESSOR_NOT_FOUND",
        "PREDECESSOR_RECYCLED",
        "PREDECESSOR_STATUS_INVALID",
        "PASSPORT_LIFETIME_ENDED",
        "UNIT_NOT_STORED"
      ]
    },
    "params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number"
        ]
      }
    }
  }
}
```

## Used by

- [validateBatteryUnits](/operations/validateBatteryUnits.md) (`POST /api/v1/passports/{passportId}/units/validate`)
- schema [SerializeBatteryUnitsResponse](/schemas/SerializeBatteryUnitsResponse.md)
- schema [BatteryUnitSerialisationFailedError](/schemas/BatteryUnitSerialisationFailedError.md)
