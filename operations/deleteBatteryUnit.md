---
type: API Endpoint
title: Permanently delete a battery unit and its telemetry
description: HARD delete — permanently removes the unit row and cascades all of its BatteryUnitEvent telemetry.
resource: https://opendpp-node.eu/api/v1/units/{id}
tags:
  - DELETE
  - battery-units
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

`DELETE /api/v1/units/{id}`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**HARD delete** — permanently removes the unit row and **cascades all of its `BatteryUnitEvent` telemetry**. This is *not* a lifecycle/status transition: to record end-of-life semantics (decommissioned, waste, recycled — incl. the Art. 77(8) public 410 tombstone) append a telemetry event with a `status` instead (`POST /api/v1/units/{id}/events`). Deletion is intended for erroneous serialisations. A `batteryunit.deleted` audit event is written.

**Permission:** `battery:write`. Cookie-session clients must send `X-CSRF-Token`. Operator-scoped credentials may only delete units whose passport belongs to their Economic Operator (403). Write operations pass subscription gating (402) and optional tenant MFA enforcement (403).

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is raised for `Authorization`-bearing requests, so it is not the binding limit here. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Responses

- **200** — The unit and its events were permanently deleted. → [BatteryUnitDeleteResponse](/schemas/BatteryUnitDeleteResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/api/v1/units/{id}'
```

## See also

Schemas: [BatteryUnitDeleteResponse](/schemas/BatteryUnitDeleteResponse.md).
