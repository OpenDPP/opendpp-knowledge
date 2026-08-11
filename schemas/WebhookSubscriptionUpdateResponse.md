---
type: Schema
title: WebhookSubscriptionUpdateResponse
description: The webhook subscription as stored after the update.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionUpdateResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-09T00:00:00Z
---

The webhook subscription as stored after the update.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | no | Present when a change was applied ("Webhook subscription updated"); absent when the body had no recognized fields. |
| `subscription` | [WebhookSubscriptionRow](/schemas/WebhookSubscriptionRow.md) | yes | — |

## JSON Schema

```json
{
  "description": "The webhook subscription as stored after the update.",
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
