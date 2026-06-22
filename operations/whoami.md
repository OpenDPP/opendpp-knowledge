---
type: API Endpoint
title: Identity of the authenticated key / session
description: Identity of the authenticated key / session
resource: https://opendpp-node.eu/api/v1/whoami
tags:
  - GET
  - account
timestamp: 2026-06-22T00:00:00Z
---

`GET /api/v1/whoami`

**Domain:** [Account](/tags/account.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns a compact, integration-focused view of the calling credential: the workspace, the principal's role and resolved permissions, whether the session is an API key, the operator the key is scoped to (`null` = workspace-wide), and active-passport usage against the tier quota. Use it to verify a key works, discover the effective permission set, and surface remaining quota.

This is the public counterpart to the console's `GET /api/v1/me`; profile, localization and billing details are intentionally not exposed here.

**Permission:** none beyond a valid tenant-scoped session — any API key can call it. Platform-admin sessions are rejected with `403` (they are not tenant-scoped).

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

## Responses

- **200** — The authenticated identity. → [WhoamiResponse](/schemas/WhoamiResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — The session is not scoped to a tenant workspace (e.g. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/whoami'
```

## See also

Schemas: [Error](/schemas/Error.md), [WhoamiResponse](/schemas/WhoamiResponse.md).
