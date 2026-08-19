---
type: Schema
title: TraceLineageResponse
description: The upstream pedigree of a traceability event, as a recursive graph of the events it derives from.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/TraceLineageResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

The upstream pedigree of a traceability event, as a recursive graph of the events it derives from.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `lineage` | [TraceLineageNode](/schemas/TraceLineageNode.md) | yes | — |

## JSON Schema

```json
{
  "description": "The upstream pedigree of a traceability event, as a recursive graph of the events it derives from.",
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
