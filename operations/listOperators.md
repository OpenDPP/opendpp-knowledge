---
type: API Endpoint
title: List economic operators bound to your workspace
description: List economic operators bound to your workspace
resource: https://opendpp-node.eu/api/v1/operators
tags:
  - GET
  - economic-operators
timestamp: 2026-06-17T00:00:00Z
---

`GET /api/v1/operators`

**Domain:** [Economic Operators](/tags/economic-operators.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns the economic operators bound to your workspace, ordered by name. Active operators only unless `?archived=true` is passed (archived operators are off-boarded but their passports are retained and still publicly resolvable).

Each entry is the same `OperatorRow` shape returned by `POST`/`PATCH /api/v1/operators` — use the `id` to attribute a passport (`operatorId` on `POST /api/v1/passports`) or to address `PATCH`/`DELETE`.

**Permission:** `operator:read`. Requests authenticated with an **operator-scoped API key** see only their own operator.

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `archived` | query | no | string | Set true to include archived (off-boarded) operators. |

## Responses

- **200** — The bound operators. → [OperatorListResponse](/schemas/OperatorListResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/operators'
```

## See also

Schemas: [OperatorListResponse](/schemas/OperatorListResponse.md).
