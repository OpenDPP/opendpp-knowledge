---
type: Schema
title: WebhookSubscriptionUpdateRequest
description: All fields optional; include only what you want to change.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionUpdateRequest
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

All fields optional; include only what you want to change. The secret is not editable here.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | string | no | New receiver URL. |
| `events` | array<[WebhookEventFilter](/schemas/WebhookEventFilter.md)> | no | Replacement (non-empty) event-filter set. |
| `isActive` | boolean | no | Pause (false) or resume (true) deliveries. |

## JSON Schema

```json
{
  "type": "object",
  "description": "All fields optional; include only what you want to change. The secret is not editable here.",
  "properties": {
    "url": {
      "type": "string",
      "format": "uri",
      "description": "New receiver URL. Re-validated by the SSRF guard."
    },
    "events": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/components/schemas/WebhookEventFilter"
      },
      "description": "Replacement (non-empty) event-filter set."
    },
    "isActive": {
      "type": "boolean",
      "description": "Pause (`false`) or resume (`true`) deliveries."
    }
  }
}
```

## Used by

- [updateWebhookSubscription](/operations/updateWebhookSubscription.md) (`PATCH /api/v1/webhooks/subscriptions/{id}`)
