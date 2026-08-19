---
type: API Endpoint
title: Identity of the authenticated key / session
description: "Returns a compact, integration-focused view of the calling credential: the workspace, the principal's role and resolved permissions, whether the session is an API key, the operator the key is scoped to (null = workspace-wide), and active-p…"
resource: https://opendpp-node.eu/api/v1/whoami
tags:
  - GET
  - account
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

`GET /api/v1/whoami`

**Domain:** [Account](/tags/account.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns a compact, integration-focused view of the calling credential: the workspace, the principal's role and resolved permissions, whether the session is an API key, the operator the key is scoped to (`null` = workspace-wide), and active-passport usage against the tier quota. Use it to verify a key works, discover the effective permission set, and surface remaining quota.

Profile, localization and billing details are deliberately not exposed here — this is the integration view of the credential.

**Permission:** none beyond a valid tenant-scoped session — any API key can call it. Platform-admin sessions are rejected with `403` (they are not tenant-scoped).

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Responses

- **200** — The authenticated identity. → [WhoamiResponse](/schemas/WhoamiResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — The session is not scoped to a tenant workspace (e.g. a platform-admin session). → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/whoami'
```

## See also

Schemas: [Error](/schemas/Error.md), [WhoamiResponse](/schemas/WhoamiResponse.md).
