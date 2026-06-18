---
type: Schema
title: WebhookSubscriptionWithSecret
description: The full subscription row as returned ONLY by the 201 create response — includes the HMAC-SHA256 signing secret.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSubscriptionWithSecret
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

The full subscription row as returned ONLY by the 201 create response — includes the HMAC-SHA256 signing secret.

## JSON Schema

```json
{
  "description": "The full subscription row as returned ONLY by the 201 create response — includes the HMAC-SHA256 signing secret.",
  "allOf": [
    {
      "$ref": "#/components/schemas/WebhookSubscriptionRow"
    },
    {
      "type": "object",
      "required": [
        "secret"
      ],
      "properties": {
        "secret": {
          "type": "string",
          "pattern": "^whsec_[0-9a-f]{32}$",
          "description": "Server-generated HMAC-SHA256 signing key (`whsec_` + 32 lowercase hex chars). Shown ONCE — here and in the `rotate-secret` response only; the list endpoint strips it. The FULL string, including the `whsec_` prefix, is the HMAC key for delivery signatures. Rotate it with `POST /api/v1/webhooks/subscriptions/{id}/rotate-secret`."
        }
      }
    }
  ]
}
```

## Used by

- schema [WebhookSubscriptionCreateResponse](/schemas/WebhookSubscriptionCreateResponse.md)
- schema [WebhookSecretRotateResponse](/schemas/WebhookSecretRotateResponse.md)
