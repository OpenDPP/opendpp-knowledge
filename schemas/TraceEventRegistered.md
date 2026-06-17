---
type: Schema
title: TraceEventRegistered
description: 201 envelope of POST /api/v1/events.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/TraceEventRegistered
tags:
  - schema
timestamp: 2026-06-17T00:00:00Z
---

201 envelope of POST /api/v1/events. Note: `status: "success"` (string), not the usual `success: true` boolean.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | string | yes | — |
| `eventId` | string | yes | Server-generated event id. |
| `untpVerified` | boolean | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "201 envelope of POST /api/v1/events. Note: `status: \"success\"` (string), not the usual `success: true` boolean.",
  "required": [
    "status",
    "eventId",
    "untpVerified"
  ],
  "properties": {
    "status": {
      "type": "string",
      "const": "success"
    },
    "eventId": {
      "type": "string",
      "description": "Server-generated event id. Use it with `GET /api/v1/events/{id}/lineage` and `POST /api/v1/events/{id}/audit`."
    },
    "untpVerified": {
      "type": "boolean",
      "const": true
    }
  }
}
```

## Used by

- [registerTraceabilityEvent](/operations/registerTraceabilityEvent.md) (`POST /api/v1/events`)
