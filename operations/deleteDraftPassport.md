---
type: API Endpoint
title: Permanently delete a passport the law allows to go (a draft, or one whose lifetime has ended)
description: "Hard-deletes a passport only where the law allows it to go: a draft, never published, whose lifetime never began; or a passport whose lifetime has ended, its retentionUntil due (for a battery model: decommissioned with every battery under…"
resource: https://opendpp-node.eu/api/v1/passports/{id}
tags:
  - DELETE
  - passports
generated:
  by: process:emit-okf
  at: 2026-09-21T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`DELETE /api/v1/passports/{id}`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Hard-deletes a passport **only where the law allows it to go**: a **draft**, never published, whose lifetime never began; or a passport whose **lifetime has ended**, its `retentionUntil` due (for a battery model: decommissioned with every battery under it recycled, as the EU Battery Regulation provides, and past the 30-day grace window). This is the same rule, and the same executor, the retention sweep applies, re-decided under a row lock at the moment of deletion. The archived versions are deleted with it explicitly, and access logs, grants and battery units cascade. A draft's issued identifier is released; an ended passport's is retired and never re-issued. Its credential's status-list bit reads revoked from then on.

Anything the law still requires to be available is refused with **409** `PASSPORT_RETENTION_REQUIRED`: a published, recalled, decommissioned or sealed passport, or one whose lifetime end is still inside its grace window (the message says when it becomes deletable). Take it out of use with `PUT /api/v1/passports/{id}/status` instead.

**Permission:** `passport:update` (write — subscription gating applies, see 402). Cookie sessions must send `X-CSRF-Token`; Bearer/API-key clients are exempt.

**Lookup:** by passport **UUID only** (no `productId` aliasing) and only within the passport's **owning tenant** — an operator-binding alone is not sufficient, unlike PUT.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Passport UUID. |

## Responses

- **200** — Deleted — a never-published draft, or a passport whose lifetime had ended.
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (code: "subscription_inactive"; reads are unaffected — a GET… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **409** — The law still requires the passport to be available (PASSPORT_RETENTION_REQUIRED) — it is neither a never-published draft nor a passport whose lifetime has end… → [Error](/schemas/Error.md)
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
