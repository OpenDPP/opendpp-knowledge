---
type: API Endpoint
title: Catalog-wide UNTP Verifiable-Credential readiness report
description: Catalog-wide UNTP Verifiable-Credential readiness report
resource: https://opendpp-node.eu/api/v1/passports/vc-readiness
tags:
  - GET
  - passports
timestamp: 2026-07-06T00:00:00Z
---

`GET /api/v1/passports/vc-readiness`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

A read-only, tenant-scoped report of which SKUs in your catalog can / can't emit a UNTP **Verifiable Credential**, and why — so you can fix a whole catalog before relying on VCs, instead of probing passports one at a time. It **aggregates the same per-passport `vcReady` signal** (#247) returned on every ingest response: a passport is VC-ready only when it links a manufacturing `Facility` with a country of production.

**Permission:** `passport:read` (read-only — no subscription/402 gate). Operator scoping + the non-archived filter match the passports list.

**Shape:** each `results[]` row is `{ id, productId, vcReady, blockers[] }` — `blockers[]` reuses the SAME actionable reason the single-passport signal exposes (empty when ready). The top-level `ready` / `notReady` rollup is **catalog-wide** (counts every non-archived passport), while `results` is **paginated** — `page` (default 1) + `limit` (default 100, max 200), with `total` / `totalPages`. NOTE: because the rollup is catalog-wide but `results` is one page, `ready` is generally NOT the count of `vcReady:true` rows on the current page — page through all `totalPages` to enumerate every SKU.

**Rate limits:** global limiter, 100 requests/min per IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `` |  | no | — | — |
| `` |  | no | — | — |

## Responses

- **200** — The paginated VC-readiness report with a catalog-wide ready/notReady rollup.

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/passports/vc-readiness'
```
