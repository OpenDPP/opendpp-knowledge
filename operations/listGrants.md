---
type: API Endpoint
title: List access grants and pending access requests
description: "Lists the workspace's access grants — capability-token grants for the Battery Regulation's restricted data tiers (Annex XIII(2)–(4)) — including undecided third-party access requests (status: PENDING, issuerType: REQUEST) submitted via the…"
resource: https://opendpp-node.eu/api/v1/grants
tags:
  - GET
  - access-grants
generated:
  by: process:emit-okf
  at: 2026-08-09T00:00:00Z
---

`GET /api/v1/grants`

**Domain:** [Access Grants](/tags/access-grants.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Lists the workspace's access grants — capability-token grants for the Battery Regulation's restricted data tiers (Annex XIII(2)–(4)) — including undecided third-party access **requests** (`status: PENDING`, `issuerType: REQUEST`) submitted via the hosted request-access page.

**Permission:** `grant:read`. **Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

Paginated with `?page` (default 1) and `?limit` (default 100, max 200), grouped by `status` ascending (alphabetical: `ACTIVE`, `DENIED`, `PENDING`, `REVOKED`) and newest-first within each group. `AUTHORITY` grants (platform-issued market-surveillance access) are listed for transparency but are not tenant-revocable (`revocable: false`). Raw capability tokens are never included — only issuance/approval responses contain them, once.

**Pagination:** results are paged with `?page` (default 1) and `?limit` (default 100, max 200). The response now also carries `success`, `count`, `total` and `totalPages` alongside `grants`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `page` | query | no | integer | 1-based page number (digits only; non-numeric falls back to 1). |
| `limit` | query | no | integer | Page size. |

## Responses

- **200** — The workspace's grants and requests, paginated newest-first — a { success, count, page, limit, total, totalPages, grants } envelope. → [GrantListResponse](/schemas/GrantListResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/grants'
```

## See also

Schemas: [GrantListResponse](/schemas/GrantListResponse.md).
