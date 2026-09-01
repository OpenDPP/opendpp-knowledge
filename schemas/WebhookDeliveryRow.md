---
type: Schema
title: WebhookDeliveryRow
description: One outbox delivery record (event-level).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookDeliveryRow
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

One outbox delivery record (event-level). The payload is not included.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | Outbox record id. |
| `event` | string | yes | Event type, e.g. passport.sealed. |
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
        "FAILED",
        "NO_SUBSCRIBERS"
      ],
      "description": "Overall delivery state. DELIVERED means the event reached every matching endpoint. NO_SUBSCRIBERS means no active subscription filtered for this event, so nothing was sent. FAILED after six exhausted attempts (dead-lettered), or when the last matching subscription was removed while the event was still failing."
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
