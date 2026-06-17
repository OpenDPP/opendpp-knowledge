---
type: Schema
title: WebhookSecretRotateResponse
description: WebhookSecretRotateResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSecretRotateResponse
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
      "type": "string"
    },
    "subscription": {
      "$ref": "#/components/schemas/WebhookSubscriptionWithSecret"
    }
  }
}
```

## Used by

- [rotateWebhookSecret](/operations/rotateWebhookSecret.md) (`POST /api/v1/webhooks/subscriptions/{id}/rotate-secret`)
