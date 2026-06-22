---
type: Schema
title: WebhookSubscriptionUpdateResponse
description: WebhookSubscriptionUpdateResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionUpdateResponse
tags:
  - schema
timestamp: 2026-06-22T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | no | Present when a change was applied ("Webhook subscription updated"); absent when the body had no recognized fields. |
| `subscription` | [WebhookSubscriptionRow](/schemas/WebhookSubscriptionRow.md) | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "subscription"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "description": "Present when a change was applied (`\"Webhook subscription updated\"`); absent when the body had no recognized fields."
    },
    "subscription": {
      "$ref": "#/components/schemas/WebhookSubscriptionRow"
    }
  }
}
```

## Used by

- [updateWebhookSubscription](/operations/updateWebhookSubscription.md) (`PATCH /api/v1/webhooks/subscriptions/{id}`)
