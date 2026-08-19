---
type: API Endpoint
title: Fetch a single bound economic operator
description: Fetches one economic operator by UUID, scoped to your workspace (404 if no operator with that id exists in your workspace).
resource: https://opendpp-node.eu/api/v1/operators/{id}
tags:
  - GET
  - economic-operators
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

`GET /api/v1/operators/{id}`

**Domain:** [Economic Operators](/tags/economic-operators.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Fetches one economic operator by UUID, scoped to your workspace (`404` if no operator with that id exists in your workspace).

**Permission:** `operator:read`. An **operator-scoped API key** may only fetch its own operator (`403` otherwise).

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Operator UUID (EconomicOperator.id). |

## Responses

- **200** — The operator. → [OperatorGetResponse](/schemas/OperatorGetResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/operators/{id}'
```

## See also

Schemas: [OperatorGetResponse](/schemas/OperatorGetResponse.md).
