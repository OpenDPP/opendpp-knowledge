---
type: Reference
title: Webhooks
description: Subscribe HTTPS endpoints to passport lifecycle events.
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - webhooks
timestamp: 2026-06-18T00:00:00Z
---

Subscribe HTTPS endpoints to passport lifecycle events. Deliveries are HMAC-SHA256-signed POSTs with retry/backoff — see the webhooks section of this document for the signature scheme and payloads.

## Operations

- [listWebhookSubscriptions](/operations/listWebhookSubscriptions.md) — `GET /api/v1/webhooks/subscriptions` — List webhook subscriptions (signing secrets stripped)
- [createWebhookSubscription](/operations/createWebhookSubscription.md) — `POST /api/v1/webhooks/subscriptions` — Register a webhook subscription (signing secret returned once)
- [updateWebhookSubscription](/operations/updateWebhookSubscription.md) — `PATCH /api/v1/webhooks/subscriptions/{id}` — Update a webhook subscription (url / events / active)
- [deleteWebhookSubscription](/operations/deleteWebhookSubscription.md) — `DELETE /api/v1/webhooks/subscriptions/{id}` — Delete a webhook subscription
- [rotateWebhookSecret](/operations/rotateWebhookSecret.md) — `POST /api/v1/webhooks/subscriptions/{id}/rotate-secret` — Rotate a webhook subscription's signing secret
- [listWebhookDeliveries](/operations/listWebhookDeliveries.md) — `GET /api/v1/webhooks/deliveries` — List recent webhook delivery attempts (the outbox)
- [testWebhookSubscription](/operations/testWebhookSubscription.md) — `POST /api/v1/webhooks/subscriptions/{id}/test` — Send a signed test event to a subscription
