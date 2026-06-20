---
type: API Endpoint
title: Fetch a single bound economic operator
description: Fetch a single bound economic operator
resource: https://opendpp-node.eu/api/v1/operators/{id}
tags:
  - GET
  - economic-operators
timestamp: 2026-06-20T00:00:00Z
---

`GET /api/v1/operators/{id}`

**Domain:** [Economic Operators](/tags/economic-operators.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Fetches one economic operator by UUID, scoped to your workspace (`404` if no operator with that id exists in your workspace).

**Permission:** `operator:read`. An **operator-scoped API key** may only fetch its own operator (`403` otherwise).

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Operator UUID (EconomicOperator.id). |

## Responses

- **200** — The operator. → [OperatorGetResponse](/schemas/OperatorGetResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/operators/{id}'
```

## See also

Schemas: [OperatorGetResponse](/schemas/OperatorGetResponse.md).
