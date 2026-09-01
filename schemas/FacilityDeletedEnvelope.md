---
type: Schema
title: FacilityDeletedEnvelope
description: Confirmation that a facility was deleted.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityDeletedEnvelope
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Confirmation that a facility was deleted.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |

## JSON Schema

```json
{
  "description": "Confirmation that a facility was deleted.",
  "type": "object",
  "required": [
    "success"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    }
  }
}
```

## Used by

- [deleteFacility](/operations/deleteFacility.md) (`DELETE /api/v1/facilities/{id}`)
