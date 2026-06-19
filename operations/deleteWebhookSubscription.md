---
type: API Endpoint
title: Delete a webhook subscription
description: Delete a webhook subscription
resource: https://opendpp-node.eu/api/v1/webhooks/subscriptions/{id}
tags:
  - DELETE
  - webhooks
timestamp: 2026-06-19T00:00:00Z
---

`DELETE /api/v1/webhooks/subscriptions/{id}`

**Domain:** [Webhooks](/tags/webhooks.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Deletes a webhook subscription, stopping future deliveries to its endpoint.

**Permission:** `webhook:write` (cookie sessions must send `X-CSRF-Token`; write permissions are subscription-gated, `402`).

The lookup is tenant-scoped: an `id` that exists but belongs to another workspace returns the same `404` with message `"Webhook subscription not found under your tenant"`. Deleting and re-creating is the only way to rotate a signing secret. Global rate limit 100 requests/min/IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Webhook subscription UUID (as returned at creation / by the list endpoint). |

## Responses

- **200** — Subscription deleted. → [WebhookSubscriptionDeleteResponse](/schemas/WebhookSubscriptionDeleteResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/api/v1/webhooks/subscriptions/{id}'
```

## See also

Schemas: [Error](/schemas/Error.md), [WebhookSubscriptionDeleteResponse](/schemas/WebhookSubscriptionDeleteResponse.md).
