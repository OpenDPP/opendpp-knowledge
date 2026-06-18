---
type: Schema
title: TraceLineageNode
description: One node of the recursive upstream lineage DAG.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/TraceLineageNode
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

One node of the recursive upstream lineage DAG. All keys are always present; `location`, `readPoint` and `issuerDid` are null when unset. `location` mirrors the stored `bizLocation`. A shared ancestor reached through multiple downstream paths appears once under each path (the DAG is expanded into a tree).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `eventId` | string | yes | — |
| `eventType` | string | yes | — |
| `bizStep` | string | yes | — |
| `disposition` | string | yes | — |
| `eventTime` | string | yes | — |
| `epcs` | array<string> | yes | EPC URIs parsed from the stored EPC list (degrades to [] when unparseable). |
| `location` | string,null | yes | The event's stored bizLocation. |
| `readPoint` | string,null | yes | — |
| `isUntpCompliant` | boolean | yes | — |
| `issuerDid` | string,null | yes | — |
| `parents` | array<[TraceLineageNode](/schemas/TraceLineageNode.md)> | yes | Upstream parent events (recursive). |

## JSON Schema

```json
{
  "type": "object",
  "description": "One node of the recursive upstream lineage DAG. All keys are always present; `location`, `readPoint` and `issuerDid` are null when unset. `location` mirrors the stored `bizLocation`. A shared ancestor reached through multiple downstream paths appears once under each path (the DAG is expanded into a tree).",
  "required": [
    "eventId",
    "eventType",
    "bizStep",
    "disposition",
    "eventTime",
    "epcs",
    "location",
    "readPoint",
    "isUntpCompliant",
    "issuerDid",
    "parents"
  ],
  "properties": {
    "eventId": {
      "type": "string"
    },
    "eventType": {
      "type": "string",
      "enum": [
        "ObjectEvent",
        "AggregationEvent",
        "TransformationEvent",
        "AssociationEvent"
      ]
    },
    "bizStep": {
      "type": "string"
    },
    "disposition": {
      "type": "string"
    },
    "eventTime": {
      "type": "string",
      "format": "date-time"
    },
    "epcs": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "EPC URIs parsed from the stored EPC list (degrades to `[]` when unparseable)."
    },
    "location": {
      "type": [
        "string",
        "null"
      ],
      "description": "The event's stored `bizLocation`."
    },
    "readPoint": {
      "type": [
        "string",
        "null"
      ]
    },
    "isUntpCompliant": {
      "type": "boolean"
    },
    "issuerDid": {
      "type": [
        "string",
        "null"
      ]
    },
    "parents": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/TraceLineageNode"
      },
      "description": "Upstream parent events (recursive). Empty array at the origin of the chain."
    }
  }
}
```

## Used by

- schema [TraceLineageResponse](/schemas/TraceLineageResponse.md)
