---
type: API Endpoint
title: List a battery unit's telemetry history (newest first, max 500)
description: List a battery unit's telemetry history (newest first, max 500)
resource: https://opendpp-node.eu/api/v1/units/{id}/events
tags:
  - GET
  - battery-units
timestamp: 2026-06-26T00:00:00Z
---

`GET /api/v1/units/{id}/events`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns the unit's append-only dynamic-data history ordered by `recordedAt` DESC, **capped at the 500 most recent events**. There is no pagination — older events beyond the cap are not retrievable via this endpoint.

**Permission:** `battery:read`. Operator-scoped credentials may only read units whose passport belongs to their Economic Operator (403). Events are raw persisted rows (no Fastify response schema, nothing stripped).

**Rate limits:** global limiter only — 100 req/min per IP.

## Responses

- **200** — The unit's telemetry history. → [BatteryUnitEventListResponse](/schemas/BatteryUnitEventListResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/units/{id}/events'
```

## See also

Schemas: [BatteryUnitEventListResponse](/schemas/BatteryUnitEventListResponse.md).
