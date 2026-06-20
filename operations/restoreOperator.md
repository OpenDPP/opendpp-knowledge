---
type: API Endpoint
title: Restore an archived operator and its archived passports
description: Restore an archived operator and its archived passports
resource: https://opendpp-node.eu/api/v1/operators/{id}/restore
tags:
  - POST
  - economic-operators
timestamp: 2026-06-20T00:00:00Z
---

`POST /api/v1/operators/{id}/restore`

**Domain:** [Economic Operators](/tags/economic-operators.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Un-archives an operator that was soft-deleted by `DELETE /api/v1/operators/{id}` and brings its archived passports back into the active catalogue: clears the operator's `archivedAt`, then clears `archivedAt` and `retentionUntil` on every archived passport of the operator **except** passports that were independently `DECOMMISSIONED` (those keep their own retention clock and stay archived).

Safe to call on a non-archived operator — it simply restores any archived passports the operator may have (`restoredPassports` may be `0`). No request body.

**Permission:** `operator:write`. Cookie-session clients must send `X-CSRF-Token`; Bearer clients are exempt. `404` if the operator is not bound to your workspace.

Side effects: an `operator.restored` audit event and an in-app notification. Unhandled database errors are normalized by the global error handler to the standard `{success: false, error, message}` envelope with a generic message (details are logged server-side).

**Rate limit:** global limiter, 100 requests/min/IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Operator UUID (EconomicOperator.id). |

## Responses

- **200** — Operator un-archived. → [RestoreOperatorResponse](/schemas/RestoreOperatorResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The operator does not exist or is not bound to your workspace. → [OperatorMinimalError](/schemas/OperatorMinimalError.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Server-side failure. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X POST 'https://opendpp-node.eu/api/v1/operators/{id}/restore'
```

## See also

Schemas: [Error](/schemas/Error.md), [OperatorMinimalError](/schemas/OperatorMinimalError.md), [RestoreOperatorResponse](/schemas/RestoreOperatorResponse.md).
