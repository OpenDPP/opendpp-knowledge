---
type: API Endpoint
title: "Not deletable: a serialised unit is a marketed physical item (always 409)"
description: Always refused with 409.
resource: https://opendpp-node.eu/api/v1/units/{id}
tags:
  - DELETE
  - battery-units
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

`DELETE /api/v1/units/{id}`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**Always refused with 409.** A serialised unit is an item-level battery passport for a physical battery placed on the market, so the record — including its append-only telemetry — is retained (EU Battery Regulation persistence, mirroring the passport-level archive model). End a unit's life through the lifecycle instead: append a `STATUS_CHANGE` event via `POST /api/v1/units/{id}/events` — `RECYCLED` ceases it (public 410 tombstone), `DECOMMISSIONED` retires it. Hard removal is reserved for the node's retention-gated purge, never an ad-hoc API delete.

**Permission:** `battery:write`. Cookie-session clients must send `X-CSRF-Token`. Operator-scoped credentials may only address units whose passport belongs to their Economic Operator (403). Write operations pass subscription gating (402) and optional tenant MFA enforcement (403).

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Responses

- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **409** — Always, for an existing unit under your workspace — the unit represents a marketed physical item and cannot be deleted; its record and telemetry are retained. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/api/v1/units/{id}'
```

## See also

Schemas: [Error](/schemas/Error.md).
