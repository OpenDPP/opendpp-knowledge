---
type: Schema
title: FacilityCreatedEnvelope
description: FacilityCreatedEnvelope
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityCreatedEnvelope
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-26T00:00:00Z
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
