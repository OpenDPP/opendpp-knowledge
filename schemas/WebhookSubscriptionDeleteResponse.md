---
type: Schema
title: WebhookSubscriptionDeleteResponse
description: WebhookSubscriptionDeleteResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionDeleteResponse
tags:
  - schema
timestamp: 2026-07-02T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "message"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "const": "Webhook subscription successfully deleted"
    }
  }
}
```

## Used by

- [deleteWebhookSubscription](/operations/deleteWebhookSubscription.md) (`DELETE /api/v1/webhooks/subscriptions/{id}`)
