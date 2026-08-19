---
type: API Endpoint
title: List a battery unit's telemetry history (newest first, cursor-paginated)
description: Returns one page of the unit's append-only dynamic-data history ordered by recordedAt DESC, ties broken by id DESC — so paging is deterministic.
resource: https://opendpp-node.eu/api/v1/units/{id}/events
tags:
  - GET
  - battery-units
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

`GET /api/v1/units/{id}/events`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns one page of the unit's append-only dynamic-data history ordered by `recordedAt` DESC, ties broken by `id` DESC — so paging is deterministic. A page holds at most 500 events (`limit`, default 500); while older history remains the response carries a non-null `nextCursor` — pass it back as `cursor` to fetch the next (older) page, so the **full history is retrievable** however long it grows. The cursor is opaque; a malformed value returns **400**.

**Permission:** `battery:read`. Operator-scoped credentials may only read units whose passport belongs to their Economic Operator (403). Events are returned as stored.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `limit` | query | no | integer | Page size (1–500). |
| `cursor` | query | no | string | Opaque page cursor — the nextCursor value from the previous page. |

## Responses

- **200** — One page of the unit's telemetry history. → [BatteryUnitEventListResponse](/schemas/BatteryUnitEventListResponse.md)
- **400** — Malformed cursor, or limit outside 1–500. → [Error](/schemas/Error.md)
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

Schemas: [BatteryUnitEventListResponse](/schemas/BatteryUnitEventListResponse.md), [Error](/schemas/Error.md).
