---
type: Schema
title: FacilityCreatedEnvelope
description: FacilityCreatedEnvelope
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityCreatedEnvelope
tags:
  - schema
timestamp: 2026-06-19T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `facility` | [FacilityRow](/schemas/FacilityRow.md) | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "message",
    "facility"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "const": "Facility registered successfully"
    },
    "facility": {
      "$ref": "#/components/schemas/FacilityRow"
    }
  }
}
```

## Used by

- [createFacility](/operations/createFacility.md) (`POST /api/v1/facilities`)
