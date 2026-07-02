---
type: API Endpoint
title: Rotate a webhook subscription's signing secret
description: Rotate a webhook subscription's signing secret
resource: https://opendpp-node.eu/api/v1/webhooks/subscriptions/{id}/rotate-secret
tags:
  - POST
  - webhooks
timestamp: 2026-07-02T00:00:00Z
---

`POST /api/v1/webhooks/subscriptions/{id}/rotate-secret`

**Domain:** [Webhooks](/tags/webhooks.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Mints a fresh HMAC-SHA256 signing secret for the subscription and returns it **once** (the old secret stops validating immediately). Use this after a suspected secret leak, or on a rotation schedule. There is no request body.

Update your receiver to verify signatures with the new secret as soon as you rotate — deliveries in flight use whichever secret was current when signed.

**Permission:** `webhook:write`. Cookie sessions must send `X-CSRF-Token`; write permissions are subscription-gated (**402** when lapsed).

**Rate limit:** global limiter, 100 requests/min per IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Webhook subscription UUID (as returned at creation / by the list endpoint). |

## Responses

- **200** — Rotated. → [WebhookSecretRotateResponse](/schemas/WebhookSecretRotateResponse.md)
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
  -X POST 'https://opendpp-node.eu/api/v1/webhooks/subscriptions/{id}/rotate-secret'
```

## See also

Schemas: [WebhookSecretRotateResponse](/schemas/WebhookSecretRotateResponse.md).
