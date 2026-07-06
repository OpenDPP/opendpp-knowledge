---
type: Schema
title: BatteryUnitLineageRef
description: Public lineage pointer between battery units (Art.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitLineageRef
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

Public lineage pointer between battery units (Art. 77(7)).

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
  "description": "Public lineage pointer between battery units (Art. 77(7)).",
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
