---
type: API Endpoint
title: Update a webhook subscription (url / events / active)
description: Update a webhook subscription (url / events / active)
resource: https://opendpp-node.eu/api/v1/webhooks/subscriptions/{id}
tags:
  - PATCH
  - webhooks
timestamp: 2026-07-06T00:00:00Z
---

`PATCH /api/v1/webhooks/subscriptions/{id}`

**Domain:** [Webhooks](/tags/webhooks.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Partially updates a subscription: any of `url`, `events`, `isActive` (key present = set, omitted = unchanged). A new `url` is re-validated by the DNS-resolving SSRF guard (same rules as creation); `events` must be a non-empty subset of the allowed filters. The signing `secret` is **not** editable here — use `rotate-secret`. An empty body returns the current subscription unchanged. The response **strips the secret**.

**Permission:** `webhook:write`. Cookie sessions must send `X-CSRF-Token`; write permissions are subscription-gated (**402** when lapsed).

**Rate limit:** global limiter, 100 requests/min per IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Webhook subscription UUID (as returned at creation / by the list endpoint). |

## Request body

Schema: [WebhookSubscriptionUpdateRequest](/schemas/WebhookSubscriptionUpdateRequest.md).

```json
{
  "events": [
    "passport.sealed",
    "passport.recalled"
  ],
  "isActive": false
}
```

## Responses

- **200** — Updated subscription (secret stripped). → [WebhookSubscriptionUpdateResponse](/schemas/WebhookSubscriptionUpdateResponse.md)
- **400** — Invalid url (not a string / SSRF-rejected), empty/invalid events, or non-boolean isActive. → [Error](/schemas/Error.md)
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
  -H 'Content-Type: application/json' \
  -X PATCH 'https://opendpp-node.eu/api/v1/webhooks/subscriptions/{id}' \
  --data '{"events":["passport.sealed","passport.recalled"],"isActive":false}'
```

## See also

Schemas: [Error](/schemas/Error.md), [WebhookSubscriptionUpdateRequest](/schemas/WebhookSubscriptionUpdateRequest.md), [WebhookSubscriptionUpdateResponse](/schemas/WebhookSubscriptionUpdateResponse.md).
