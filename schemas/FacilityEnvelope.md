---
type: Schema
title: FacilityEnvelope
description: A single facility record.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityEnvelope
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-09T00:00:00Z
---

A single facility record.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `facility` | [FacilityRow](/schemas/FacilityRow.md) | yes | — |

## JSON Schema

```json
{
  "description": "A single facility record.",
  "type": "object",
  "required": [
    "success",
    "facility"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "facility": {
      "$ref": "#/components/schemas/FacilityRow"
    }
  }
}
```

## Used by

- [getFacility](/operations/getFacility.md) (`GET /api/v1/facilities/{id}`)
- [updateFacility](/operations/updateFacility.md) (`PUT /api/v1/facilities/{id}`)
