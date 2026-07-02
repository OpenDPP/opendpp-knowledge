---
type: Schema
title: EpcisCaptureResponse
description: EpcisCaptureResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/EpcisCaptureResponse
tags:
  - schema
timestamp: 2026-07-02T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | string | yes | — |
| `captured` | integer | yes | How many events were persisted. |
| `results` | array<object> | yes | — |
| `errors` | array<object> | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "status",
    "captured",
    "results",
    "errors"
  ],
  "properties": {
    "status": {
      "type": "string",
      "enum": [
        "success"
      ]
    },
    "captured": {
      "type": "integer",
      "description": "How many events were persisted."
    },
    "results": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "index",
          "eventId",
          "eventType"
        ],
        "properties": {
          "index": {
            "type": "integer",
            "description": "Position of the event in the submitted eventList."
          },
          "eventId": {
            "type": "string",
            "description": "Server-generated row id (UUID) — the authoritative event identity on this node."
          },
          "eventType": {
            "type": "string"
          },
          "ignoredFields": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Recognized EPCIS fields present on the event that this node does not persist — disclosed, never silently dropped."
          }
        }
      }
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "index",
          "message"
        ],
        "properties": {
          "index": {
            "type": "integer"
          },
          "message": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

## Used by

- [captureEpcisDocument](/operations/captureEpcisDocument.md) (`POST /api/v1/events/epcis`)
