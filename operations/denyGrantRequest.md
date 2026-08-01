---
type: API Endpoint
title: Deny a pending access request
description: "Denies a PENDING third-party access request: sets status: DENIED and records decidedAt/decidedBy."
resource: https://opendpp-node.eu/api/v1/grants/{id}/deny
tags:
  - POST
  - access-grants
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

`POST /api/v1/grants/{id}/deny`

**Domain:** [Access Grants](/tags/access-grants.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Denies a `PENDING` third-party access request: sets `status: DENIED` and records `decidedAt`/`decidedBy`. No token is ever minted for a denied request, and no e-mail is sent to the requester. The decision is audited as `grant.denied`. The request body, if any, is ignored.

**Permission:** `grant:write` (subscription gating ⇒ 402 possible; cookie sessions need `X-CSRF-Token`; on workspaces enforcing multi-factor authentication, user sessions without a second factor get 403 — API-key clients exempt). **Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is raised for `Authorization`-bearing requests, so it is not the binding limit here. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | The access-request (AccessGrant) id. |

## Responses

- **200** — Request denied. → [GrantDecisionResponse](/schemas/GrantDecisionResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — No grant with this id exists in this workspace. → [GrantRouteError](/schemas/GrantRouteError.md)
- **409** — The grant is not PENDING (already decided, active, or revoked). → [GrantRouteError](/schemas/GrantRouteError.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X POST 'https://opendpp-node.eu/api/v1/grants/{id}/deny'
```

## See also

Schemas: [GrantDecisionResponse](/schemas/GrantDecisionResponse.md), [GrantRouteError](/schemas/GrantRouteError.md).
