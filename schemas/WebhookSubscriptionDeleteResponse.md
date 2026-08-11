---
type: Schema
title: WebhookSubscriptionDeleteResponse
description: Confirmation that a webhook subscription was deleted.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionDeleteResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-09T00:00:00Z
---

Confirmation that a webhook subscription was deleted.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
  "description": "Confirmation that a webhook subscription was deleted.",
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
