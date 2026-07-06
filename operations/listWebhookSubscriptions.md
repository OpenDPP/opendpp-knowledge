---
type: API Endpoint
title: List webhook subscriptions (signing secrets stripped)
description: List webhook subscriptions (signing secrets stripped)
resource: https://opendpp-node.eu/api/v1/webhooks/subscriptions
tags:
  - GET
  - webhooks
timestamp: 2026-07-06T00:00:00Z
---

`GET /api/v1/webhooks/subscriptions`

**Domain:** [Webhooks](/tags/webhooks.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Lists all webhook subscriptions of the calling workspace. Unpaginated (the per-workspace cap is 25).

**Permission:** `webhook:read` (read permissions are not subscription-gated, so no `402`).

The HMAC signing `secret` is **stripped from every row** — it is returned once by the create endpoint and once by `rotate-secret`. `isActive` reflects whether the subscription receives deliveries; toggle it with `PATCH /api/v1/webhooks/subscriptions/{id}`. Global rate limit 100 requests/min/IP.

## Responses

- **200** — All subscriptions of the workspace, secrets removed. → [WebhookSubscriptionListResponse](/schemas/WebhookSubscriptionListResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/webhooks/subscriptions'
```

## See also

Schemas: [Error](/schemas/Error.md), [WebhookSubscriptionListResponse](/schemas/WebhookSubscriptionListResponse.md).
