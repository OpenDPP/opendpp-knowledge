---
type: Schema
title: WebhookSubscriptionListResponse
description: The calling workspace's webhook subscriptions.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionListResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

The calling workspace's webhook subscriptions.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `subscriptions` | array<[WebhookSubscriptionRow](/schemas/WebhookSubscriptionRow.md)> | yes | — |

## JSON Schema

```json
{
  "description": "The calling workspace's webhook subscriptions.",
  "type": "object",
  "required": [
    "success",
    "subscriptions"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "subscriptions": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/WebhookSubscriptionRow"
      }
    }
  }
}
```

## Used by

- [listWebhookSubscriptions](/operations/listWebhookSubscriptions.md) (`GET /api/v1/webhooks/subscriptions`)
