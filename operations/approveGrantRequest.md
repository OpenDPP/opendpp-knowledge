---
type: API Endpoint
title: Approve a pending access request and mint its token
description: Approve a pending access request and mint its token
resource: https://opendpp-node.eu/api/v1/grants/{id}/approve
tags:
  - POST
  - access-grants
timestamp: 2026-07-02T00:00:00Z
---

`POST /api/v1/grants/{id}/approve`

**Domain:** [Access Grants](/tags/access-grants.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Approves a `PENDING` third-party access request (submitted via the hosted request-access page). Approval mints the legitimate-interest capability token **at this moment** — pending requests carry no token — sets `status: ACTIVE`, records `decidedAt`/`decidedBy`, and replaces the request's provisional 90-day expiry with the `expiresAt` you supply (required; future; max **366 days** out).

The raw token is returned **once** in this response. If the request has a `granteeEmail`, the grantee is additionally e-mailed an inspection link containing the token (`…/unit/{batteryUnitId}?grant=dpp_li_…` or `…/passport/{passportId}?grant=dpp_li_…`) — the only other place the raw token ever exists. The decision is audited as `grant.approved`.

**Permission:** `grant:write` (subscription gating ⇒ 402 possible; cookie sessions need `X-CSRF-Token`; on workspaces enforcing multi-factor authentication, user sessions without a second factor get 403 — API-key clients exempt). **Rate limit:** global limiter, 100 requests/min per IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | The access-request (AccessGrant) id. |

## Request body

Schema (required): [ApproveGrantRequest](/schemas/ApproveGrantRequest.md).

```json
{
  "expiresAt": "2026-09-12T09:41:00.000Z"
}
```

## Responses

- **200** — Request approved; the capability token is shown only here (and in the grantee e-mail). → [GrantIssuedResponse](/schemas/GrantIssuedResponse.md)
- **400** — Invalid expiresAt. → [GrantRouteError](/schemas/GrantRouteError.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — No grant with this id exists in this workspace. → [GrantRouteError](/schemas/GrantRouteError.md)
- **409** — The grant is not PENDING (already decided, active, or revoked). → [GrantRouteError](/schemas/GrantRouteError.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/grants/{id}/approve' \
  --data '{"expiresAt":"2026-09-12T09:41:00.000Z"}'
```

## See also

Schemas: [ApproveGrantRequest](/schemas/ApproveGrantRequest.md), [GrantIssuedResponse](/schemas/GrantIssuedResponse.md), [GrantRouteError](/schemas/GrantRouteError.md).
