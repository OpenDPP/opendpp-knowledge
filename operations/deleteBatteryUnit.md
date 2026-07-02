---
type: API Endpoint
title: Permanently delete a battery unit and its telemetry
description: Permanently delete a battery unit and its telemetry
resource: https://opendpp-node.eu/api/v1/units/{id}
tags:
  - DELETE
  - battery-units
timestamp: 2026-07-02T00:00:00Z
---

`DELETE /api/v1/units/{id}`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**HARD delete** — permanently removes the unit row and **cascades all of its `BatteryUnitEvent` telemetry**. This is *not* a lifecycle/status transition: to record end-of-life semantics (decommissioned, waste, recycled — incl. the Art. 77(8) public 410 tombstone) append a telemetry event with a `status` instead (`POST /api/v1/units/{id}/events`). Deletion is intended for erroneous serialisations. A `batteryunit.deleted` audit event is written.

**Permission:** `battery:write`. Cookie-session clients must send `X-CSRF-Token`. Operator-scoped credentials may only delete units whose passport belongs to their Economic Operator (403). Write operations pass subscription gating (402) and optional tenant MFA enforcement (403).

**Rate limits:** global limiter only — 100 req/min per IP.

## Responses

- **200** — The unit and its events were permanently deleted. → [BatteryUnitDeleteResponse](/schemas/BatteryUnitDeleteResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/api/v1/units/{id}'
```

## See also

Schemas: [BatteryUnitDeleteResponse](/schemas/BatteryUnitDeleteResponse.md).
