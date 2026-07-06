---
type: Schema
title: WebhookEnvelope
description: The signed body of every webhook delivery.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookEnvelope
tags:
  - schema
timestamp: 2026-07-04T00:00:00Z
---

The signed body of every webhook delivery. `data` is the public (redacted) JSON-LD passport document; `type` is the concrete event name (also in the `X-OpenDPP-Event` header); `id` is the stable delivery id (also in the `X-OpenDPP-Delivery` header) and is CONSTANT across all retries of the same event, so deduplicate on it for exactly-once processing; `created` is the event time (stable across retries, distinct from the per-attempt `X-OpenDPP-Timestamp`).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | Stable delivery id; mirrors the X-OpenDPP-Delivery header; constant across retries. |
| `type` | string | yes | Concrete event type (also in the X-OpenDPP-Event header). |
| `created` | string | yes | Event creation/enqueue time (stable across retries). |
| `data` | [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md) | yes | The public (redacted) JSON-LD passport document — the same shape resolvers return. |

## JSON Schema

```json
{
  "type": "object",
  "description": "The signed body of every webhook delivery. `data` is the public (redacted) JSON-LD passport document; `type` is the concrete event name (also in the `X-OpenDPP-Event` header); `id` is the stable delivery id (also in the `X-OpenDPP-Delivery` header) and is CONSTANT across all retries of the same event, so deduplicate on it for exactly-once processing; `created` is the event time (stable across retries, distinct from the per-attempt `X-OpenDPP-Timestamp`).",
  "required": [
    "id",
    "type",
    "created",
    "data"
  ],
  "properties": {
    "id": {
      "type": "string",
      "description": "Stable delivery id; mirrors the `X-OpenDPP-Delivery` header; constant across retries."
    },
    "type": {
      "type": "string",
      "enum": [
        "passport.ingested",
        "passport.updated",
        "passport.sealed",
        "passport.recalled",
        "passport.status_updated"
      ],
      "description": "Concrete event type (also in the `X-OpenDPP-Event` header). Never the `*` filter value."
    },
    "created": {
      "type": "string",
      "format": "date-time",
      "description": "Event creation/enqueue time (stable across retries)."
    },
    "data": {
      "$ref": "#/components/schemas/PublicPassportJsonLd",
      "description": "The public (redacted) JSON-LD passport document — the same shape resolvers return."
    }
  }
}
```
