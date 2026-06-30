---
type: API Endpoint
title: List access grants and pending access requests
description: List access grants and pending access requests
resource: https://opendpp-node.eu/api/v1/grants
tags:
  - GET
  - access-grants
timestamp: 2026-06-29T00:00:00Z
---

`GET /api/v1/grants`

**Domain:** [Access Grants](/tags/access-grants.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Lists the workspace's access grants — capability-token grants for the Battery Regulation's restricted data tiers (Reg. (EU) 2023/1542 Art. 77(9), Annex XIII(2)–(4)) — including undecided third-party access **requests** (`status: PENDING`, `issuerType: REQUEST`) submitted via the hosted request-access page.

**Permission:** `grant:read`. **Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

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
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/grants'
```

## See also

Schemas: [GrantListResponse](/schemas/GrantListResponse.md).
