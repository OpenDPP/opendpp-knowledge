---
type: API Endpoint
title: List recent webhook delivery attempts (the outbox)
description: Returns recent delivery records (the outbox), newest first, for debugging endpoint failures.
resource: https://opendpp-node.eu/api/v1/webhooks/deliveries
tags:
  - GET
  - webhooks
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

`GET /api/v1/webhooks/deliveries`

**Domain:** [Webhooks](/tags/webhooks.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns recent delivery records (the outbox), newest first, for debugging endpoint failures. Records are **event-level** (one per emitted event, fanned out to all matching subscriptions), not per-subscription — `status` reflects the event's overall delivery state and `errorMessage` joins per-endpoint errors. Payloads are **not** included.

Filter with `?status=PENDING|DELIVERED|FAILED` and cap with `?limit=` (1–200, default 50; a non-numeric value falls back to the default).

**Permission:** `webhook:read`.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is raised for `Authorization`-bearing requests, so it is not the binding limit here. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `status` | query | no | string | Filter by delivery state. |
| `limit` | query | no | integer | Max records to return. |

## Responses

- **200** — Recent delivery records, newest first. → [WebhookDeliveriesResponse](/schemas/WebhookDeliveriesResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/webhooks/deliveries'
```

## See also

Schemas: [WebhookDeliveriesResponse](/schemas/WebhookDeliveriesResponse.md).
