---
type: Schema
title: WebhookSubscriptionListResponse
description: WebhookSubscriptionListResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionListResponse
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `subscriptions` | array<[WebhookSubscriptionRow](/schemas/WebhookSubscriptionRow.md)> | yes | — |

## JSON Schema

```json
{
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
