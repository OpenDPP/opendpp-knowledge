---
type: Schema
title: FacilityEnvelope
description: FacilityEnvelope
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityEnvelope
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `facility` | [FacilityRow](/schemas/FacilityRow.md) | yes | — |

## JSON Schema

```json
{
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
