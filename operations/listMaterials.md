---
type: API Endpoint
title: List the platform-curated material vocabulary
description: Lists active entries from the platform-global material vocabulary that powers the searchable material/fiber/chemistry pickers in the passport form.
resource: https://opendpp-node.eu/api/v1/materials
tags:
  - GET
  - schemas-vocabulary
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /api/v1/materials`

**Domain:** [Schemas & Vocabulary](/tags/schemas-vocabulary.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Lists active entries from the platform-global material vocabulary that powers the searchable material/fiber/chemistry pickers in the passport form. This is shared reference data, deliberately **not** tenant-scoped, so DPP data stays comparable across tenants.

**Auth:** any authenticated session — Bearer API key, Bearer JWT, or browser session. **No specific permission string is required** and subscription status is not checked, so this endpoint never returns 402. On a tenant-subdomain host, credentials belonging to a different tenant receive **403** with message `Cross-tenant access blocked.`.

**Filtering & ordering:** `kind` filters by vocabulary kind — an unrecognized value is **silently ignored** (the filter simply isn't applied; no 400). `search` is a trimmed, case-insensitive substring match on `name` (blank values ignored). Only active entries are returned, ordered by `kind` ascending then `name` ascending. `limit` is clamped to 1–1000 (default 1000); there is no pagination.

**Envelope caveat:** the 200 body is `{ "materials": [...] }` — there is **no `success` field** on this endpoint.

**Curation:** this vocabulary is curated by the platform operator — the API is read-only for tenant credentials. Free-text material values in passport metadata remain allowed but are never auto-added to this vocabulary.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `kind` | query | no | string | Filter by vocabulary kind. |
| `search` | query | no | string | Case-insensitive substring match on the entry name (value is trimmed; blank values ignored). |
| `limit` | query | no | integer | Maximum number of entries to return. |

## Responses

- **200** — Active vocabulary entries matching the filters, ordered by kind then name ascending. → [MaterialVocabularyListResponse](/schemas/MaterialVocabularyListResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/materials'
```

## See also

Schemas: [MaterialVocabularyListResponse](/schemas/MaterialVocabularyListResponse.md).
