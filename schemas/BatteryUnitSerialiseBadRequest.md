---
type: Schema
title: BatteryUnitSerialiseBadRequest
description: "The three 400 bodies of unit serialisation: the standard error triple, the all-items-failed Serialisation Failed report, and the framework's default request-rejection body."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitSerialiseBadRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

The three 400 bodies of unit serialisation: the standard error triple, the all-items-failed `Serialisation Failed` report, and the framework's default request-rejection body.

## JSON Schema

```json
{
  "description": "The three 400 bodies of unit serialisation: the standard error triple, the all-items-failed `Serialisation Failed` report, and the framework's default request-rejection body.",
  "oneOf": [
    {
      "$ref": "#/components/schemas/Error"
    },
    {
      "$ref": "#/components/schemas/BatteryUnitSerialisationFailedError"
    },
    {
      "$ref": "#/components/schemas/DefaultRequestRejectionError"
    }
  ]
}
```

## Used by

- [serializeBatteryUnits](/operations/serializeBatteryUnits.md) (`POST /api/v1/passports/{passportId}/units`)
