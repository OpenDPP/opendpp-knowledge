---
type: Schema
title: FacilityDeletedEnvelope
description: FacilityDeletedEnvelope
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityDeletedEnvelope
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |

## JSON Schema

```json
{
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
