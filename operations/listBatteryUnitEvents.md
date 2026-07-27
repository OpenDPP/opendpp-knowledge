---
type: API Endpoint
title: List a battery unit's telemetry history (newest first, max 500)
description: Returns the unit's append-only dynamic-data history ordered by recordedAt DESC, capped at the 500 most recent events.
resource: https://opendpp-node.eu/api/v1/units/{id}/events
tags:
  - GET
  - battery-units
generated:
  by: process:emit-okf
  at: 2026-07-27T00:00:00Z
---

`GET /api/v1/units/{id}/events`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns the unit's append-only dynamic-data history ordered by `recordedAt` DESC, **capped at the 500 most recent events**. There is no pagination — older events beyond the cap are not retrievable via this endpoint.

**Permission:** `battery:read`. Operator-scoped credentials may only read units whose passport belongs to their Economic Operator (403). Events are raw persisted rows (no Fastify response schema, nothing stripped).

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is raised for `Authorization`-bearing requests, so it is not the binding limit here. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Responses

- **200** — The unit's telemetry history. → [BatteryUnitEventListResponse](/schemas/BatteryUnitEventListResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/units/{id}/events'
```

## See also

Schemas: [BatteryUnitEventListResponse](/schemas/BatteryUnitEventListResponse.md).
