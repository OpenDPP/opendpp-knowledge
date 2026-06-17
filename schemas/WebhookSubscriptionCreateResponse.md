---
type: Schema
title: WebhookSubscriptionCreateResponse
description: WebhookSubscriptionCreateResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionCreateResponse
tags:
  - schema
timestamp: 2026-06-17T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `subscription` | [WebhookSubscriptionWithSecret](/schemas/WebhookSubscriptionWithSecret.md) | yes | — |

## JSON Schema

```json
{
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
