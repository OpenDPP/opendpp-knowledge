---
type: Schema
title: WebhookDeliveriesResponse
description: Recent webhook delivery attempts for a subscription, newest first, for debugging endpoint failures.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookDeliveriesResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

Recent webhook delivery attempts for a subscription, newest first, for debugging endpoint failures.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `count` | integer | yes | — |
| `deliveries` | array<[WebhookDeliveryRow](/schemas/WebhookDeliveryRow.md)> | yes | — |

## JSON Schema

```json
{
  "description": "Recent webhook delivery attempts for a subscription, newest first, for debugging endpoint failures.",
  "type": "object",
  "required": [
    "success",
    "count",
    "deliveries"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "count": {
      "type": "integer"
    },
    "deliveries": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/WebhookDeliveryRow"
      }
    }
  }
}
```

## Used by

- [listWebhookDeliveries](/operations/listWebhookDeliveries.md) (`GET /api/v1/webhooks/deliveries`)
