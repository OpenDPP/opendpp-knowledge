---
type: API Endpoint
title: GS1 Digital Link resolution by GRAI (AI 8003)
description: GS1 Digital Link resolution by GRAI (AI 8003)
resource: https://opendpp-node.eu/8003/{grai}
tags:
  - GET
  - public-resolution
timestamp: 2026-06-19T00:00:00Z
---

`GET /8003/{grai}`

**Domain:** [Public Resolution](/tags/public-resolution.md)  
**Authentication:** **Tiered** — resolves anonymously (public view) or with a Bearer API key / capability token for a fuller view.

Unified GS1 Digital Link gateway, GRAI branch (Global Returnable Asset Identifier). The GRAI is matched against `metadata.gtin`, `metadata.grai`, or the passport's `productId`. Everything else — content negotiation (JSON-LD default / `application/aas+json` / `application/vc+jwt` / `application/vc+ld+json` / `application/dc+sd-jwt` / `text/html`, `Vary: Accept`), access tiers (public / grant `dpp_li_…`·`dpp_auth_…` via Bearer or `?grant=` / owner = tenant API key as Bearer or legacy `opendpp_session` cookie value, never a Console JWT session), DRAFT hiding, tenant-subdomain scoping, the no-tenant-scope ambiguity 400, access-audit logging, grant response headers, and the 30 req/min/IP in-memory rate limit (two-field 429 body without `success`; the limiter adds no headers of its own — `x-ratelimit-*` headers come from the global 100 req/min/IP limit, which applies on top) — is identical to `GET /01/{gtin14}`; see that operation and `GET /passport/{id}` for full semantics.

An additional `/21/{serial}` AI pair after the GRAI behaves exactly like `GET /01/{gtin14}/21/{serial}` (302 redirect to `/unit/{id}` or `/passport/{id}`). No permission string (public endpoint).

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `grai` | path | yes | string | GRAI: a 14-digit numeric asset identifier with a valid GS1 modulo-10 check digit (validated server-side), followed by an optional alphanumeric serial component… |
| `grant` | query | no | string | Capability grant token (dpp_li_… / dpp_auth_…); equivalent to Authorization: Bearer. |

## Responses

- **200** — The matched passport in the negotiated representation (same envelope as GET /passport/{id}). → [AasEnvironment](/schemas/AasEnvironment.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
- **400** — Invalid GRAI (format / check digit) or — without tenant scope and AI-21 serial — an ambiguous lookup. → [Error](/schemas/Error.md)
- **404** — No passport matches (content-negotiated HTML/JSON, Vary: Accept), DRAFT hidden from non-owner, or unknown tenant subdomain (JSON only). → [Error](/schemas/Error.md)
- **429** — Public-resolution rate limit exceeded (30 requests/min per IP; no rate-limit headers). → [Error](/schemas/Error.md)
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \  # optional for the public tier
  -X GET 'https://opendpp-node.eu/8003/{grai}'
```

## See also

Schemas: [AasEnvironment](/schemas/AasEnvironment.md), [Error](/schemas/Error.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md).
