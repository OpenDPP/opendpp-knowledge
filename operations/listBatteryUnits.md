---
type: API Endpoint
title: List serialised battery units under a passport
description: List serialised battery units under a passport
resource: https://opendpp-node.eu/api/v1/passports/{passportId}/units
tags:
  - GET
  - battery-units
timestamp: 2026-06-19T00:00:00Z
---

`GET /api/v1/passports/{passportId}/units`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Lists **all** serialised units of the passport, newest first (`createdAt` DESC). **Paginated** with `?page` (default 1) and `?limit` (default 100, max 200) — a SKU may carry many physical units; `count` is this page's size, `total`/`totalPages` describe the full set.

**Permission:** `battery:read`. Operator-scoped credentials may only read passports of their own Economic Operator (403). Units are raw persisted rows (no Fastify response schema, nothing stripped).

**Rate limits:** global limiter only — 100 req/min per IP.

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
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/passports/{passportId}/units'
```

## See also

Schemas: [BatteryUnitListResponse](/schemas/BatteryUnitListResponse.md).
