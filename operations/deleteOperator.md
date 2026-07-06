---
type: API Endpoint
title: Remove an operator (archives if it has passports, else hard-deletes)
description: Remove an operator (archives if it has passports, else hard-deletes)
resource: https://opendpp-node.eu/api/v1/operators/{id}
tags:
  - DELETE
  - economic-operators
timestamp: 2026-07-04T00:00:00Z
---

`DELETE /api/v1/operators/{id}`

**Domain:** [Economic Operators](/tags/economic-operators.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Removes an operator, choosing automatically between two outcomes (ESPR Art. 9(2)/77 passport-persistence compliance — an operator that still has passports must never be hard-deleted):

- **Archive (soft delete)** — if the operator has one or more passports, it is archived instead of deleted: `archivedAt` is set on the operator and every active passport of the operator is archived with a `retentionUntil` deadline set to a platform-configured retention period from now (default 15 years). Archived passports remain **publicly resolvable** (the persistence duty) but are excluded from active management lists. Response: `{success: true, archived: true, archivedPassports: <n>}`. Fully reversible via `POST /api/v1/operators/{id}/restore`.
- **Hard delete** — if the operator has no passports it is permanently deleted (tenant bindings cascade-delete; user/facility/API-key references are set to null). Response: `{success: true, archived: false}` — no `archivedPassports` field.
- **Fallback** — if the hard delete fails on a residual foreign-key reference, the operator is archived instead and the response is `{success: true, archived: true}` **without** `archivedPassports`. If even the fallback archive fails, `409` is returned.

**Permission:** `operator:write`. Cookie-session clients must send `X-CSRF-Token`; Bearer clients are exempt. The operator must be bound to your workspace (`404` otherwise).

**Tenant-scoped:** this affects only **your** workspace's operator and passports — operators are not shared across workspaces.

Side effects: an `operator.archived` or `operator.deleted` audit event plus an in-app notification — on the primary archive and hard-delete paths only; the foreign-key fallback archive writes **no** audit event or notification. Unhandled database errors are normalized by the global error handler to the standard `{success: false, error, message}` envelope with a generic message (details are logged server-side).

**Rate limit:** global limiter, 100 requests/min/IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Operator UUID (EconomicOperator.id). |

## Responses

- **200** — Operator removed. → [DeleteOperatorResponse](/schemas/DeleteOperatorResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The operator does not exist or is not bound to your workspace. → [OperatorMinimalError](/schemas/OperatorMinimalError.md)
- **409** — The operator could neither be hard-deleted nor archived (both attempts failed). → [OperatorMinimalError](/schemas/OperatorMinimalError.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Server-side failure. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/api/v1/operators/{id}'
```

## See also

Schemas: [DeleteOperatorResponse](/schemas/DeleteOperatorResponse.md), [Error](/schemas/Error.md), [OperatorMinimalError](/schemas/OperatorMinimalError.md).
