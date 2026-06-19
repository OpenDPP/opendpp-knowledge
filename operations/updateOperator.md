---
type: API Endpoint
title: Update an operator's name or role (regId is immutable)
description: Update an operator's name or role (regId is immutable)
resource: https://opendpp-node.eu/api/v1/operators/{id}
tags:
  - PATCH
  - economic-operators
timestamp: 2026-06-19T00:00:00Z
---

`PATCH /api/v1/operators/{id}`

**Domain:** [Economic Operators](/tags/economic-operators.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Edits an operator bound to your workspace. Only `name` and `role` are editable; `regId` is the legal registry identifier and is **intentionally immutable** here (register the operator again under the correct id instead). Non-string or whitespace-only values are silently ignored; submitted values are trimmed. If no usable field is supplied (every field missing, non-string, or whitespace-only — including an empty object `{}` or an omitted body), the current operator row is returned unchanged with `200` and no audit event is written. The handler does not diff against current values: supplying a value identical to the current one still performs an update and writes an audit event.

**Permission:** `operator:write`. Cookie-session clients must send `X-CSRF-Token`; Bearer clients are exempt.

**Tenant-scoped:** operators are scoped to your workspace — `regId` is not globally unique. Registering a `regId` that another workspace also uses creates **your own** operator row; `name`/`role` edits never affect another workspace.

When a change is applied, an `operator.updated` audit event is recorded. Unhandled database errors are normalized by the global error handler to the standard `{success: false, error, message}` envelope with a generic message (details are logged server-side).

**Rate limit:** global limiter, 100 requests/min/IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Operator UUID (EconomicOperator.id). |

## Request body

Schema: [UpdateOperatorRequest](/schemas/UpdateOperatorRequest.md).

```json
{
  "name": "Default EU Manufacturing Operator B.V.",
  "role": "IMPORTER"
}
```

## Responses

- **200** — The (possibly unchanged) operator row. → [UpdateOperatorResponse](/schemas/UpdateOperatorResponse.md)
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
  -H 'Content-Type: application/json' \
  -X PATCH 'https://opendpp-node.eu/api/v1/operators/{id}' \
  --data '{"name":"Default EU Manufacturing Operator B.V.","role":"IMPORTER"}'
```

## See also

Schemas: [Error](/schemas/Error.md), [OperatorMinimalError](/schemas/OperatorMinimalError.md), [UpdateOperatorRequest](/schemas/UpdateOperatorRequest.md), [UpdateOperatorResponse](/schemas/UpdateOperatorResponse.md).
