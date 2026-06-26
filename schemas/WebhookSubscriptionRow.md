---
type: Schema
title: WebhookSubscriptionRow
description: A webhook subscription row with the HMAC signing secret stripped (it is shown exactly once, in the 201 create response).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionRow
tags:
  - schema
timestamp: 2026-06-26T00:00:00Z
---

A webhook subscription row with the HMAC signing `secret` stripped (it is shown exactly once, in the 201 create response).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | Subscription id. |
| `tenantId` | string | yes | Owning workspace (tenant) id. |
| `url` | string | yes | Receiver endpoint URL. |
| `events` | array<[WebhookEventFilter](/schemas/WebhookEventFilter.md)> | yes | Event filters this subscription matches (validated at creation). |
| `isActive` | boolean | yes | true while the subscription receives deliveries; only active subscriptions are delivered to. |
| `createdAt` | string | yes | — |
| `updatedAt` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "A webhook subscription row with the HMAC signing `secret` stripped (it is shown exactly once, in the 201 create response).",
  "required": [
    "id",
    "tenantId",
    "url",
    "events",
    "isActive",
    "createdAt",
    "updatedAt"
  ],
  "properties": {
    "id": {
      "type": "string",
      "description": "Subscription id."
    },
    "tenantId": {
      "type": "string",
      "description": "Owning workspace (tenant) id."
    },
    "url": {
      "type": "string",
      "format": "uri",
      "description": "Receiver endpoint URL."
    },
    "events": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/WebhookEventFilter"
      },
      "description": "Event filters this subscription matches (validated at creation)."
    },
    "isActive": {
      "type": "boolean",
      "description": "`true` while the subscription receives deliveries; only active subscriptions are delivered to. Toggle with `PATCH /api/v1/webhooks/subscriptions/{id}` (`isActive`) to pause/resume without deleting."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

## Used by

- schema [WebhookSubscriptionWithSecret](/schemas/WebhookSubscriptionWithSecret.md)
- schema [WebhookSubscriptionListResponse](/schemas/WebhookSubscriptionListResponse.md)
- schema [WebhookSubscriptionUpdateResponse](/schemas/WebhookSubscriptionUpdateResponse.md)
