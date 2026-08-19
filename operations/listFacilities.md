---
type: API Endpoint
title: List facilities in the tenant workspace
description: Lists all facilities registered under your tenant workspace, sorted by createdAt descending.
resource: https://opendpp-node.eu/api/v1/facilities
tags:
  - GET
  - facilities
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

`GET /api/v1/facilities`

**Domain:** [Facilities](/tags/facilities.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Lists all facilities registered under your tenant workspace, sorted by `createdAt` descending. **Paginated** with `?page` (default 1) and `?limit` (default 100, max 200); `count` is this page's size, `total`/`totalPages` describe the full set. A non-numeric `page`/`limit` falls back to its default.

**Permission:** `facility:read` (Bearer API key or session JWT/cookie).

**Operator-scoped keys:** when authenticated with an API key scoped to an Economic Operator, the list contains only facilities whose `operatorId` equals the key's operator — facilities with no operator (`operatorId: null`) are **excluded** from the list (they remain readable individually via `GET /api/v1/facilities/{id}`).

The full row is returned to the owner, including the privileged address fields (`streetAddress`, `city`, `postalCode`) that public passport documents never expose (owner-only in JSON-LD; never emitted in AAS).

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `page` | query | no | integer | 1-based page number (digits only; non-numeric falls back to 1). |
| `limit` | query | no | integer | Page size. |

## Responses

- **200** — Facility list. → [FacilityListEnvelope](/schemas/FacilityListEnvelope.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/facilities'
```

## See also

Schemas: [FacilityListEnvelope](/schemas/FacilityListEnvelope.md).
