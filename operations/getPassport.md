---
type: API Endpoint
title: Fetch a single passport (content-negotiated JSON-LD / AAS / HTML)
description: Fetch a single passport (content-negotiated JSON-LD / AAS / HTML)
resource: https://opendpp-node.eu/api/v1/passports/{id}
tags:
  - GET
  - passports
timestamp: 2026-07-02T00:00:00Z
---

`GET /api/v1/passports/{id}`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Owner-side alias of the public resolver. Accepts either the passport **UUID** or its caller-supplied **`productId`** (GTIN-14 / GRAI / SKU), scoped to operators bound to your workspace. After the scoped lookup the request is **re-dispatched internally to `GET /passport/{uuid}`**, forwarding all request headers, and the inner response (status, content type, body) is returned as-is.

**Permission:** `passport:read` (read-only — no subscription/402 gate).

**Content negotiation** (substring match on `Accept`): `application/aas+json` → role-filtered AAS environment; `application/vc+jwt` → enveloping UNTP Verifiable Credential; `application/vc+ld+json` → the same credential with an embedded `ecdsa-jcs-2019` W3C Data Integrity proof; `application/dc+sd-jwt` (legacy `vc+sd-jwt` accepted) → SD-JWT-VC selective disclosure (these three return `406 Not Acceptable` when the passport has no manufacturing facility with a country of production); `text/html` → SSR passport page; anything else (including `application/json`, `*/*`, or no header) → JSON-LD with `Content-Type: application/ld+json` (the default). The VC and SD-JWT representations are forwarded verbatim from `GET /passport/{id}` — see that operation for the full credential semantics.

**Access-tier caveat (privilege is resolved from the *forwarded* headers, not the already-authenticated context):** only **database API keys** (`Authorization: Bearer op_dpp_token_…`) of the owning or operator-bound tenant are recognized as owner by the inner resolver. Those callers get the **owner-tier** document: `facilityDetails` and battery restricted keys unmasked, `manufacturingFacility` includes `streetAddress`/`city`/`postalCode`, and DRAFT passports are visible. Callers authenticated with a **JWT session** (login cookie or bearer JWT) receive the **public-redacted** tier instead, and DRAFT passports answer 404 with the forwarded public body (no `success` field).

Every successful resolution records an anonymized-IP access audit entry.

**Rate limits:** global limiter 100 req/min/IP with `x-ratelimit-*` headers, **plus** the forwarded public resolver's own limiter (30 req/min/IP, no headers) — both 429 shapes are possible (see 429).

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Passport UUID or caller-supplied productId (GTIN-14 / GRAI / SKU). |

## Responses

- **200** — The resolved passport. → [PassportAasEnvironment](/schemas/PassportAasEnvironment.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — Two distinct bodies. → [Error](/schemas/Error.md)
- **406** — The requested representation cannot be produced for this resource. → [Error](/schemas/Error.md)
- **429** — Two possible sources.
- **500** — Unexpected failure. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/passports/{id}'
```

## See also

Schemas: [Error](/schemas/Error.md), [PassportAasEnvironment](/schemas/PassportAasEnvironment.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md).
