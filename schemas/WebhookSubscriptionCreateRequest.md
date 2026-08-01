---
type: Schema
title: WebhookSubscriptionCreateRequest
description: An endpoint to receive webhook deliveries, and the event types it subscribes to.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionCreateRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

An endpoint to receive webhook deliveries, and the event types it subscribes to.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | string | yes | Absolute http(s) endpoint URL of your receiver (e.g. a PLM/ERP integration endpoint). |
| `events` | array<[WebhookEventFilter](/schemas/WebhookEventFilter.md)> | yes | Non-empty list of event filters. |

## JSON Schema

```json
{
  "description": "An endpoint to receive webhook deliveries, and the event types it subscribes to.",
  "type": "object",
  "required": [
    "url",
    "events"
  ],
  "properties": {
    "url": {
      "type": "string",
      "format": "uri",
      "description": "Absolute http(s) endpoint URL of your receiver (e.g. a PLM/ERP integration endpoint). DNS-resolved and SSRF-guarded at registration: malformed URLs, loopback, private (RFC 1918/CGNAT), link-local/cloud-metadata, multicast, and equivalent IPv6 ranges are rejected with 400. Redirects are never followed at delivery time."
    },
    "events": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/components/schemas/WebhookEventFilter"
      },
      "description": "Non-empty list of event filters. Any value outside the allowed set is rejected with 400."
    }
  }
}
```

## Used by

- [createWebhookSubscription](/operations/createWebhookSubscription.md) (`POST /api/v1/webhooks/subscriptions`)
