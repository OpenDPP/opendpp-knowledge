---
type: API Endpoint
title: List serialised battery units under a passport
description: Lists all serialised units of the passport, newest first (createdAt DESC).
resource: https://opendpp-node.eu/api/v1/passports/{passportId}/units
tags:
  - GET
  - battery-units
generated:
  by: process:emit-okf
  at: 2026-08-09T00:00:00Z
---

`GET /api/v1/passports/{passportId}/units`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Lists **all** serialised units of the passport, newest first (`createdAt` DESC). **Paginated** with `?page` (default 1) and `?limit` (default 100, max 200) — a SKU may carry many physical units; `count` is this page's size, `total`/`totalPages` describe the full set.

**Permission:** `battery:read`. Operator-scoped credentials may only read passports of their own Economic Operator (403). Units are returned as stored.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `page` | query | no | integer | 1-based page number (digits only; non-numeric falls back to 1). |
| `limit` | query | no | integer | Page size. |

## Responses

- **200** — The passport's units. → [BatteryUnitListResponse](/schemas/BatteryUnitListResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/passports/{passportId}/units'
```

## See also

Schemas: [BatteryUnitListResponse](/schemas/BatteryUnitListResponse.md).
