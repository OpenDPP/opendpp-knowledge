---
type: API Endpoint
title: Delete a webhook subscription
description: Deletes a webhook subscription, stopping future deliveries to its endpoint.
resource: https://opendpp-node.eu/api/v1/webhooks/subscriptions/{id}
tags:
  - DELETE
  - webhooks
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`DELETE /api/v1/webhooks/subscriptions/{id}`

**Domain:** [Webhooks](/tags/webhooks.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Deletes a webhook subscription, stopping future deliveries to its endpoint.

**Permission:** `webhook:write` (cookie sessions must send `X-CSRF-Token`; write permissions are subscription-gated, `402`).

The lookup is tenant-scoped: an `id` that exists but belongs to another workspace returns the same `404` with message `"Webhook subscription not found under your tenant"`. Deleting is not how a signing secret is rotated — `POST /api/v1/webhooks/subscriptions/{id}/rotate-secret` does that in place, and `PATCH /api/v1/webhooks/subscriptions/{id}` changes the address without minting a new secret. Global rate limit 100 requests/min/IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Webhook subscription UUID (as returned at creation / by the list endpoint). |

## Responses

- **200** — Subscription deleted. → [WebhookSubscriptionDeleteResponse](/schemas/WebhookSubscriptionDeleteResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/api/v1/webhooks/subscriptions/{id}'
```

## See also

Schemas: [Error](/schemas/Error.md), [WebhookSubscriptionDeleteResponse](/schemas/WebhookSubscriptionDeleteResponse.md).
