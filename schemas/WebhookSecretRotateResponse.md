---
type: Schema
title: WebhookSecretRotateResponse
description: Confirmation that a subscription's HMAC signing secret was rotated; the new secret is returned once and cannot be retrieved again.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookSecretRotateResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Confirmation that a subscription's HMAC signing secret was rotated; the new secret is returned once and cannot be retrieved again.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |
| `subscription` | [WebhookSubscriptionWithSecret](/schemas/WebhookSubscriptionWithSecret.md) | yes | — |

## JSON Schema

```json
{
  "description": "Confirmation that a subscription's HMAC signing secret was rotated; the new secret is returned once and cannot be retrieved again.",
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
