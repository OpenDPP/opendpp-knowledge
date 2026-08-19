---
type: API Endpoint
title: Permanently delete a DRAFT passport
description: Hard-deletes a passport only while it is a DRAFT (never published, not publicly resolvable, no retention duty).
resource: https://opendpp-node.eu/api/v1/passports/{id}
tags:
  - DELETE
  - passports
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

`DELETE /api/v1/passports/{id}`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Hard-deletes a passport **only while it is a DRAFT** (never published, not publicly resolvable, no retention duty). Children (history, access logs, battery units) cascade on delete.

Published passports (ACTIVE/RECALLED/DECOMMISSIONED) are refused with **409** — they must be decommissioned/archived through the status lifecycle (`PUT /api/v1/passports/{id}/status`) to satisfy the ESPR persistence duty.

**Permission:** `passport:update` (write — subscription gating applies, see 402). Cookie sessions must send `X-CSRF-Token`; Bearer/API-key clients are exempt.

**Lookup:** by passport **UUID only** (no `productId` aliasing) and only within the passport's **owning tenant** — an operator-binding alone is not sufficient, unlike PUT.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Passport UUID. |

## Responses

- **200** — Draft deleted.
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **409** — The passport is not a DRAFT — published passports cannot be hard-deleted. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected failure. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/api/v1/passports/{id}'
```

## See also

Schemas: [Error](/schemas/Error.md).
