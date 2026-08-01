---
type: API Endpoint
title: List economic operators bound to your workspace
description: Returns the economic operators bound to your workspace, ordered by name.
resource: https://opendpp-node.eu/api/v1/operators
tags:
  - GET
  - economic-operators
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

`GET /api/v1/operators`

**Domain:** [Economic Operators](/tags/economic-operators.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns the economic operators bound to your workspace, ordered by name. Active operators only unless `?archived=true` is passed (archived operators are off-boarded but their passports are retained and still publicly resolvable).

Each entry is the same `OperatorRow` shape returned by `POST`/`PATCH /api/v1/operators` — use the `id` to attribute a passport (`operatorId` on `POST /api/v1/passports`) or to address `PATCH`/`DELETE`.

**Permission:** `operator:read`. Requests authenticated with an **operator-scoped API key** see only their own operator.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is raised for `Authorization`-bearing requests, so it is not the binding limit here. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `archived` | query | no | string | Set true to include archived (off-boarded) operators. |

## Responses

- **200** — The bound operators. → [OperatorListResponse](/schemas/OperatorListResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/operators'
```

## See also

Schemas: [OperatorListResponse](/schemas/OperatorListResponse.md).
