---
type: Schema
title: BatteryUnitLineageRef
description: Public lineage pointer between battery units.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitLineageRef
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Public lineage pointer between battery units.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `unitId` | string | yes | — |
| `serialNumber` | string | yes | — |
| `digitalLinkUri` | string | yes | — |
| `unitUrl` | string | yes | Relative public unit URL: /unit/{unitId}. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Public lineage pointer between battery units.",
  "required": [
    "unitId",
    "serialNumber",
    "digitalLinkUri",
    "unitUrl"
  ],
  "properties": {
    "unitId": {
      "type": "string"
    },
    "serialNumber": {
      "type": "string"
    },
    "digitalLinkUri": {
      "type": "string",
      "format": "uri"
    },
    "unitUrl": {
      "type": "string",
      "description": "Relative public unit URL: `/unit/{unitId}`."
    }
  }
}
```

## Used by

- schema [BatteryUnitJsonLd](/schemas/BatteryUnitJsonLd.md)
- schema [PublicBatteryUnitJsonLd](/schemas/PublicBatteryUnitJsonLd.md)
