---
type: Schema
title: TraceLineageResponse
description: TraceLineageResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/TraceLineageResponse
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `lineage` | [TraceLineageNode](/schemas/TraceLineageNode.md) | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "lineage"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "lineage": {
      "$ref": "#/components/schemas/TraceLineageNode"
    }
  }
}
```

## Used by

- [getEventLineage](/operations/getEventLineage.md) (`GET /api/v1/events/{id}/lineage`)
