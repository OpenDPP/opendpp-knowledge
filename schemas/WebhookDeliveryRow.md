---
type: Schema
title: WebhookDeliveryRow
description: One outbox delivery record (event-level).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookDeliveryRow
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

One outbox delivery record (event-level). The payload is not included.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | Outbox record id. |
| `event` | string | yes | Event type, e.g. |
| `status` | string | yes | Overall delivery state. |
| `retryCount` | integer | yes | Failed attempts so far (0–5). |
| `lastAttempt` | string,null | yes | Timestamp of the most recent attempt, or null if never attempted. |
| `nextRetryAt` | string,null | yes | When the next retry is eligible (null if delivered or dead-lettered). |
| `errorMessage` | string,null | yes | Joined per-endpoint error text from the last failed attempt, or null. |
| `createdAt` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "One outbox delivery record (event-level). The payload is not included.",
  "required": [
    "id",
    "event",
    "status",
    "retryCount",
    "lastAttempt",
    "nextRetryAt",
    "errorMessage",
    "createdAt"
  ],
  "properties": {
    "id": {
      "type": "string",
      "description": "Outbox record id."
    },
    "event": {
      "type": "string",
      "description": "Event type, e.g. `passport.sealed`."
    },
    "status": {
      "type": "string",
      "enum": [
        "PENDING",
        "DELIVERED",
        "FAILED"
      ],
      "description": "Overall delivery state. FAILED after 5 exhausted attempts (dead-lettered)."
    },
    "retryCount": {
      "type": "integer",
      "description": "Failed attempts so far (0–5)."
    },
    "lastAttempt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "Timestamp of the most recent attempt, or null if never attempted."
    },
    "nextRetryAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "When the next retry is eligible (null if delivered or dead-lettered)."
    },
    "errorMessage": {
      "type": [
        "string",
        "null"
      ],
      "description": "Joined per-endpoint error text from the last failed attempt, or null."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

## Used by

- schema [WebhookDeliveriesResponse](/schemas/WebhookDeliveriesResponse.md)
