---
type: API Endpoint
title: List facilities in the tenant workspace
description: List facilities in the tenant workspace
resource: https://opendpp-node.eu/api/v1/facilities
tags:
  - GET
  - facilities
timestamp: 2026-06-28T00:00:00Z
---

`GET /api/v1/facilities`

**Domain:** [Facilities](/tags/facilities.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Lists all facilities registered under your tenant workspace, sorted by `createdAt` descending. **Paginated** with `?page` (default 1) and `?limit` (default 100, max 200); `count` is this page's size, `total`/`totalPages` describe the full set. A non-numeric `page`/`limit` falls back to its default.

**Permission:** `facility:read` (Bearer API key or session JWT/cookie).

**Operator-scoped keys:** when authenticated with an API key scoped to an Economic Operator, the list contains only facilities whose `operatorId` equals the key's operator — facilities with no operator (`operatorId: null`) are **excluded** from the list (they remain readable individually via `GET /api/v1/facilities/{id}`).

The full row is returned to the owner, including the privileged address fields (`streetAddress`, `city`, `postalCode`) that public passport documents never expose (owner-only in JSON-LD; never emitted in AAS).

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `page` | query | no | integer | 1-based page number (digits only; non-numeric falls back to 1). |
| `limit` | query | no | integer | Page size. |

## Responses

- **200** — Facility list. → [FacilityListEnvelope](/schemas/FacilityListEnvelope.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/facilities'
```

## See also

Schemas: [FacilityListEnvelope](/schemas/FacilityListEnvelope.md).
