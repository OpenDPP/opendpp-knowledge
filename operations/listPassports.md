---
type: API Endpoint
title: List passports in your workspace (paginated JSON-LD)
description: List passports in your workspace (paginated JSON-LD)
resource: https://opendpp-node.eu/api/v1/passports
tags:
  - GET
  - passports
timestamp: 2026-06-19T00:00:00Z
---

`GET /api/v1/passports`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns the **non-archived** passports of every economic operator bound to your workspace, newest first (`createdAt DESC`). Operator-scoped API keys only see passports of their bound operator.

**Permission:** `passport:read` (read-only — no subscription/402 gate).

**Filtering:** `category` and `originCountry` are exact-match filters on the top-level `metadata` keys of the same name. Known `metadata.category` values: `textiles`, `batteries`, `electronics`, `cosmetics`, `toys`, `iron-steel`, `aluminium`, `chemicals`, `construction`; `originCountry` is ISO 3166-1 alpha-2.

**Pagination:** `page` (default 1) and `limit` (default 10) are numeric strings matching `^[0-9]+$` — any other value is rejected with the framework's default 400 validation body (see 400). Parsed values are clamped server-side to `page >= 1` and `1 <= limit <= 100`. There is **no `total` count**; page until you receive fewer than `limit` items.

**Serialization caveats:**
- The redaction tier of each item depends on the credential's **role**: only `BRAND_OPERATOR` credentials receive the unredacted owner-tier document. Every other role — including `TENANT_ADMIN` — receives the public tier: `facilityDetails` (and, for `batteries`, `detailedPerformance` / `lifecycleAndInUse` / `circularityAndDisassembly`) are masked to the literal string `"[REDACTED - Privileged Access Required]"`.
- `economicOperator.role` is **absent** from list items and `manufacturingFacility` is always `null` here — fetch a single passport (`GET /api/v1/passports/{id}`) for the facility node and operator role.
- The response passes through a declared response schema: top-level keys other than `success`, `page`, `limit`, `passports` are stripped. Passport items allow additional properties, so undeclared item keys (`status`, `archivedAt`, `retentionUntil`, `manufacturingFacility`, the flattened metadata keys) pass through intact — but two **declared** item keys are mangled by their subschemas: the `@context` term-map object (second array element) is always emptied to `{}`, and `proof` is emptied to `{}` on sealed items (`null` on unsealed) — `signatureValue`, `merkleRoot`, `redactedLeaves`, `x5c` and `rfc3161` are all stripped from list output. Fetch a single passport (`GET /api/v1/passports/{id}`) or the public resolver for the verifiable proof block.

**Rate limits:** global limiter, 100 requests/min per IP (600/min for known crawler user agents); 429 carries `x-ratelimit-*` headers.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `` |  | no | — | — |
| `` |  | no | — | — |
| `category` | query | no | string | Exact-match filter on metadata.category. |
| `originCountry` | query | no | string | Exact-match filter on metadata.originCountry (ISO 3166-1 alpha-2, e.g. |

## Responses

- **200** — Paginated list of JSON-LD passport documents. → [PassportListResponse](/schemas/PassportListResponse.md)
- **400** — Route validation failure (framework default body — note statusCode/code keys, no success field): page or limit did not match ^[0-9]+$.
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/passports'
```

## See also

Schemas: [PassportListResponse](/schemas/PassportListResponse.md).
