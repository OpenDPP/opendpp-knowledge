---
type: API Endpoint
title: Register a webhook subscription (signing secret returned once)
description: Register a webhook subscription (signing secret returned once)
resource: https://opendpp-node.eu/api/v1/webhooks/subscriptions
tags:
  - POST
  - webhooks
timestamp: 2026-06-26T00:00:00Z
---

`POST /api/v1/webhooks/subscriptions`

**Domain:** [Webhooks](/tags/webhooks.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Registers an endpoint to receive passport lifecycle webhooks for the calling workspace.

**Permission:** `webhook:write`. Cookie-session callers must send the `X-CSRF-Token` header (double-submit); Bearer API-key/JWT clients are exempt. Write permissions are additionally gated on an active workspace subscription (`402`).

**URL validation (SSRF guard):** `url` must be an absolute `http(s)` URL. At registration the hostname is DNS-resolved and the request is rejected with `400` if any resolved A/AAAA record is loopback, RFC 1918/CGNAT private, link-local / cloud-metadata (`169.254.0.0/16`), multicast, or an equivalent IPv6 range. At delivery time the socket is pinned to the validated IP and redirects are never followed.

**Event filters:** `events` must be a non-empty array drawn from `passport.ingested`, `passport.updated`, `passport.sealed`, `passport.recalled`, `passport.status_updated`, `*`. The `*` wildcard matches every emitted event.

**Signing secret — shown once:** the `201` response contains the full subscription row **including** the HMAC-SHA256 signing secret (`whsec_` + 32 lowercase hex chars, server-generated, never client-supplied). This is the only time the secret is ever returned: the list endpoint strips it and there is no rotation or update endpoint — delete and re-create to rotate.

**Limits:** maximum **25 subscriptions per workspace** (`409 Conflict`). Global rate limit 100 requests/min/IP (`429` with `x-ratelimit-*` headers). Unknown request-body fields are ignored.

## Request body

Schema (required): [WebhookSubscriptionCreateRequest](/schemas/WebhookSubscriptionCreateRequest.md).

```json
{
  "url": "https://erp.example.com/hooks/opendpp",
  "events": [
    "passport.ingested",
    "passport.sealed"
  ]
}
```

## Responses

- **201** — Subscription registered. → [WebhookSubscriptionCreateResponse](/schemas/WebhookSubscriptionCreateResponse.md)
- **400** — Validation failure. → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — EITHER the workspace subscription is lapsed / its grace period expired (read operations are unaffected), OR (on passport-crea… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **409** — The workspace already has 25 webhook subscriptions (the per-tenant cap). → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Persistence failed (details logged server-side) — message "Failed to register webhook subscription.". → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/webhooks/subscriptions' \
  --data '{"url":"https://erp.example.com/hooks/opendpp","events":["passport.ingested","passport.sealed"]}'
```

## See also

Schemas: [Error](/schemas/Error.md), [WebhookSubscriptionCreateRequest](/schemas/WebhookSubscriptionCreateRequest.md), [WebhookSubscriptionCreateResponse](/schemas/WebhookSubscriptionCreateResponse.md).
