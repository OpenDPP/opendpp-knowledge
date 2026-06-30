---
type: API Endpoint
title: List recent webhook delivery attempts (the outbox)
description: List recent webhook delivery attempts (the outbox)
resource: https://opendpp-node.eu/api/v1/webhooks/deliveries
tags:
  - GET
  - webhooks
timestamp: 2026-06-29T00:00:00Z
---

`GET /api/v1/webhooks/deliveries`

**Domain:** [Webhooks](/tags/webhooks.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns recent delivery records (the outbox), newest first, for debugging endpoint failures. Records are **event-level** (one per emitted event, fanned out to all matching subscriptions), not per-subscription — `status` reflects the event's overall delivery state and `errorMessage` joins per-endpoint errors. Payloads are **not** included.

Filter with `?status=PENDING|DELIVERED|FAILED` and cap with `?limit=` (1–200, default 50; a non-numeric value falls back to the default).

**Permission:** `webhook:read`.

**Rate limit:** global limiter, 100 requests/min per IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `status` | query | no | string | Filter by delivery state. |
| `limit` | query | no | integer | Max records to return. |

## Responses

- **200** — Recent delivery records, newest first. → [WebhookDeliveriesResponse](/schemas/WebhookDeliveriesResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/webhooks/deliveries'
```

## See also

Schemas: [WebhookDeliveriesResponse](/schemas/WebhookDeliveriesResponse.md).
