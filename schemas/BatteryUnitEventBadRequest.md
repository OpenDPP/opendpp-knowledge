---
type: Schema
title: BatteryUnitEventBadRequest
description: "The two 400 bodies of event recording: the standard error triple from handler validation, and the framework's default request-rejection body for malformed JSON."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitEventBadRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

The two 400 bodies of event recording: the standard error triple from handler validation, and the framework's default request-rejection body for malformed JSON.

## JSON Schema

```json
{
  "description": "The two 400 bodies of event recording: the standard error triple from handler validation, and the framework's default request-rejection body for malformed JSON.",
  "oneOf": [
    {
      "$ref": "#/components/schemas/Error"
    },
    {
      "$ref": "#/components/schemas/DefaultRequestRejectionError"
    }
  ]
}
```

## Used by

- [recordBatteryUnitEvent](/operations/recordBatteryUnitEvent.md) (`POST /api/v1/units/{id}/events`)
