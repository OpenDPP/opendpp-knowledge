---
type: API Endpoint
title: Deny a pending access request
description: Deny a pending access request
resource: https://opendpp-node.eu/api/v1/grants/{id}/deny
tags:
  - POST
  - access-grants
timestamp: 2026-06-20T00:00:00Z
---

`POST /api/v1/grants/{id}/deny`

**Domain:** [Access Grants](/tags/access-grants.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Denies a `PENDING` third-party access request: sets `status: DENIED` and records `decidedAt`/`decidedBy`. No token is ever minted for a denied request, and no e-mail is sent to the requester. The decision is audited as `grant.denied`. The request body, if any, is ignored.

**Permission:** `grant:write` (subscription gating ⇒ 402 possible; cookie sessions need `X-CSRF-Token`; on workspaces enforcing multi-factor authentication, user sessions without a second factor get 403 — API-key clients exempt). **Rate limit:** global limiter, 100 requests/min per IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | The access-request (AccessGrant) id. |

## Responses

- **200** — Request denied. → [GrantDecisionResponse](/schemas/GrantDecisionResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — No grant with this id exists in this workspace. → [GrantRouteError](/schemas/GrantRouteError.md)
- **409** — The grant is not PENDING (already decided, active, or revoked). → [GrantRouteError](/schemas/GrantRouteError.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X POST 'https://opendpp-node.eu/api/v1/grants/{id}/deny'
```

## See also

Schemas: [GrantDecisionResponse](/schemas/GrantDecisionResponse.md), [GrantRouteError](/schemas/GrantRouteError.md).
