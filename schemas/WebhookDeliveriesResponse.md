---
type: Schema
title: WebhookDeliveriesResponse
description: WebhookDeliveriesResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookDeliveriesResponse
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `count` | integer | yes | — |
| `deliveries` | array<[WebhookDeliveryRow](/schemas/WebhookDeliveryRow.md)> | yes | — |

## JSON Schema

```json
{
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
