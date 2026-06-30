---
type: API Endpoint
title: Issue a legitimate-interest access grant directly
description: Issue a legitimate-interest access grant directly
resource: https://opendpp-node.eu/api/v1/grants
tags:
  - POST
  - access-grants
timestamp: 2026-06-29T00:00:00Z
---

`POST /api/v1/grants`

**Domain:** [Access Grants](/tags/access-grants.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Directly issues an `ACTIVE` legitimate-interest access grant (no pending request involved) and mints its capability token. The raw token (`dpp_li_` + 32 hex characters) is returned **once** in this response; only its SHA-256 hash is stored. The grantee presents it to the public resolution endpoints as `Authorization: Bearer dpp_li_…` or `?grant=dpp_li_…` to unlock the restricted (tier-2 / per-unit) data of the granted scope.

**Permission:** `grant:write` (write operations are subject to subscription gating, so 402 is possible). Cookie-session clients must send the `X-CSRF-Token` header; Bearer clients are exempt. On workspaces that enforce multi-factor authentication, user sessions that did not authenticate with a second factor receive 403 on writes (API-key clients are exempt). **Rate limit:** global limiter, 100 requests/min per IP.

Scope semantics:
- `UNIT` — `batteryUnitId` is required; the unit must belong to this workspace. The unit's parent `passportId` is recorded on the grant.
- `PASSPORT` — `passportId` is required; the passport must belong to this workspace and must not be a `DRAFT` (drafts return 404).
- `TENANT` — workspace-wide; no target id needed.

`expiresAt` is required, must be in the future, and at most **366 days** out. This endpoint always mints `kind: LEGITIMATE_INTEREST` — `AUTHORITY` (`dpp_auth_…`) grants are platform-issued only and cannot be created here. The issuance is audited as `grant.issued`.

String fields longer than their documented maximum are **silently truncated**, not rejected; unknown fields are ignored.

## Request body

Schema (required): [CreateGrantRequest](/schemas/CreateGrantRequest.md).

```json
{
  "granteeName": "Dr. Elena Varga",
  "granteeEmail": "e.varga@inspection-example.eu",
  "organization": "EU Battery Inspection Services",
  "purpose": "State-of-health verification for second-life suitability assessment under Art. 77(9).",
  "scopeType": "UNIT",
  "batteryUnitId": "7c3a91d5-2e4f-4b6a-8c0d-1e2f3a4b5c6d",
  "expiresAt": "2026-09-12T09:41:00.000Z"
}
```

## Responses

- **201** — Grant issued. → [GrantIssuedResponse](/schemas/GrantIssuedResponse.md)
- **400** — Validation failure. → [GrantRouteError](/schemas/GrantRouteError.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — For scopeType UNIT/PASSPORT: the target id does not exist in this workspace (cross-tenant targets and DRAFT passports are indistinguishable from missing ones). → [GrantRouteError](/schemas/GrantRouteError.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/grants' \
  --data '{"granteeName":"Dr. Elena Varga","granteeEmail":"e.varga@inspection-example.eu","organization":"EU Battery Inspection Services","purpose":"State-of-health verification for second-life suitability assessment under Art. 77(9).","scopeType":"UNIT","batteryUnitId":"7c3a91d5-2e4f-4b6a-8c0d-1e2f3a4b5c6d","expiresAt":"2026-09-12T09:41:00.000Z"}'
```

## See also

Schemas: [CreateGrantRequest](/schemas/CreateGrantRequest.md), [GrantIssuedResponse](/schemas/GrantIssuedResponse.md), [GrantRouteError](/schemas/GrantRouteError.md).
