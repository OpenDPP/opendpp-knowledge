---
type: API Endpoint
title: Revoke an access grant (soft revocation)
description: Revoke an access grant (soft revocation)
resource: https://opendpp-node.eu/api/v1/grants/{id}
tags:
  - DELETE
  - access-grants
timestamp: 2026-06-26T00:00:00Z
---

`DELETE /api/v1/grants/{id}`

**Domain:** [Access Grants](/tags/access-grants.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Soft-revokes a grant: sets `status: REVOKED` and `revokedAt` (the row is retained for audit; the public resolvers reject the token from then on). Audited as `grant.revoked`.

Behavioral caveats (no status precondition — only the kind is checked):
- Works on a grant in **any** status: revoking a `PENDING` request withdraws it; revoking a `DENIED` grant flips it to `REVOKED`.
- Re-revoking an already-`REVOKED` grant returns 200 again and preserves the original `revokedAt`.
- `AUTHORITY` grants (`kind: AUTHORITY`, platform-issued market-surveillance access) are **not tenant-revocable** — 403. Battery Reg. Art. 77 market-surveillance access must not depend on manufacturer consent; platform admins manage those.

**Permission:** `grant:write` (subscription gating ⇒ 402 possible; cookie sessions need `X-CSRF-Token`; on workspaces enforcing multi-factor authentication, user sessions without a second factor get 403 — API-key clients exempt). **Rate limit:** global limiter, 100 requests/min per IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | The grant (AccessGrant) id. |

## Responses

- **200** — Grant revoked (idempotent: re-revoking keeps the original revokedAt). → [GrantDecisionResponse](/schemas/GrantDecisionResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — EITHER the workspace subscription is lapsed / its grace period expired (read operations are unaffected), OR (on passport-crea… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Two distinct bodies share this status: (1) route-level — the grant is an AUTHORITY grant and cannot be revoked by the workspace; body is {error, message} witho… → [Error](/schemas/Error.md), [GrantRouteError](/schemas/GrantRouteError.md)
- **404** — No grant with this id exists in this workspace. → [GrantRouteError](/schemas/GrantRouteError.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/api/v1/grants/{id}'
```

## See also

Schemas: [Error](/schemas/Error.md), [GrantDecisionResponse](/schemas/GrantDecisionResponse.md), [GrantRouteError](/schemas/GrantRouteError.md).
