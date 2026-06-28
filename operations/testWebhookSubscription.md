---
type: API Endpoint
title: Send a signed test event to a subscription
description: Send a signed test event to a subscription
resource: https://opendpp-node.eu/api/v1/webhooks/subscriptions/{id}/test
tags:
  - POST
  - webhooks
timestamp: 2026-06-28T00:00:00Z
---

`POST /api/v1/webhooks/subscriptions/{id}/test`

**Domain:** [Webhooks](/tags/webhooks.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Delivers a single **signed sample** event to the subscription's URL right now and reports the outcome — use it to confirm your endpoint is reachable and that your signature verification works, without waiting for a real passport event. The payload is a representative public JSON-LD passport document marked `_test: true`; it is signed exactly like a production delivery (HMAC-SHA256 over `${timestamp}.${body}`). The event type is a concrete value from the subscription's filter (the `*` wildcard is skipped; defaults to `passport.sealed`).

**Permission:** `webhook:write`. **Rate limit:** global limiter, 100 requests/min per IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Webhook subscription UUID (as returned at creation / by the list endpoint). |

## Responses

- **200** — The test delivery was attempted (check delivered/statusCode for the receiver's response). → [WebhookTestResult](/schemas/WebhookTestResult.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X POST 'https://opendpp-node.eu/api/v1/webhooks/subscriptions/{id}/test'
```

## See also

Schemas: [WebhookTestResult](/schemas/WebhookTestResult.md).
