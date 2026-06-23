---
type: Schema
title: BatteryUnitRestrictedDataNotice
description: Marker replacing per-unit telemetry in anonymous (public-tier) responses, with a pointer for requesting legitimate-interest access (Reg.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitRestrictedDataNotice
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

Marker replacing per-unit telemetry in anonymous (public-tier) responses, with a pointer for requesting legitimate-interest access (Reg. (EU) 2023/1542, Annex XIII(2)-(4)).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `reason` | string | yes | — |
| `reference` | string | yes | — |
| `description` | string | yes | — |
| `howToRequest` | string | yes | Relative URL /request-access?unit={unitId} where a legitimate-interest grant can be requested. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Marker replacing per-unit telemetry in anonymous (public-tier) responses, with a pointer for requesting legitimate-interest access (Reg. (EU) 2023/1542, Annex XIII(2)-(4)).",
  "required": [
    "reason",
    "reference",
    "description",
    "howToRequest"
  ],
  "properties": {
    "reason": {
      "type": "string",
      "const": "LEGITIMATE_INTEREST_REQUIRED"
    },
    "reference": {
      "type": "string",
      "const": "Regulation (EU) 2023/1542, Annex XIII(2)-(4)"
    },
    "description": {
      "type": "string",
      "const": "Per-unit dynamic data (state of health, cycle counts, negative events, temperature) is accessible only to persons with a legitimate interest and to authorities."
    },
    "howToRequest": {
      "type": "string",
      "description": "Relative URL `/request-access?unit={unitId}` where a legitimate-interest grant can be requested."
    }
  }
}
```

## Used by

- schema [PublicBatteryUnitJsonLd](/schemas/PublicBatteryUnitJsonLd.md)
