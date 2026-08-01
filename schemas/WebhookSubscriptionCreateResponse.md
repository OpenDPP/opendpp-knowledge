---
type: Schema
title: WebhookSubscriptionCreateResponse
description: Confirmation that a webhook subscription was created, carrying the stored subscription.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionCreateResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

Confirmation that a webhook subscription was created, carrying the stored subscription.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `subscription` | [WebhookSubscriptionWithSecret](/schemas/WebhookSubscriptionWithSecret.md) | yes | — |

## JSON Schema

```json
{
  "description": "Confirmation that a webhook subscription was created, carrying the stored subscription.",
  "type": "object",
  "required": [
    "success",
    "message",
    "subscription"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "const": "Webhook subscription registered successfully"
    },
    "subscription": {
      "$ref": "#/components/schemas/WebhookSubscriptionWithSecret"
    }
  }
}
```

## Used by

- [createWebhookSubscription](/operations/createWebhookSubscription.md) (`POST /api/v1/webhooks/subscriptions`)
