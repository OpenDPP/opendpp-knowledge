---
type: Schema
title: FacilityCreatedEnvelope
description: Confirmation that a facility was registered, carrying the stored record.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityCreatedEnvelope
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-27T00:00:00Z
---

Confirmation that a facility was registered, carrying the stored record.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `facility` | [FacilityRow](/schemas/FacilityRow.md) | yes | — |

## JSON Schema

```json
{
  "description": "Confirmation that a facility was registered, carrying the stored record.",
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
