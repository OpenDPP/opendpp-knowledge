---
type: API Endpoint
title: GS1 Digital Link resolution by GTIN-14 (AI 01)
description: GS1 Digital Link resolution by GTIN-14 (AI 01)
resource: https://opendpp-node.eu/01/{gtin14}
tags:
  - GET
  - public-resolution
timestamp: 2026-06-23T00:00:00Z
---

`GET /01/{gtin14}`

**Domain:** [Public Resolution](/tags/public-resolution.md)  
**Authentication:** **Tiered** — resolves anonymously (public view) or with a Bearer API key / capability token for a fuller view.

Unified GS1 Digital Link gateway, GTIN branch. The GTIN-14 is matched against `metadata.gtin`, `metadata.grai`, or the passport's `productId`. On tenant workspaces (`https://{tenant}.opendpp-node.eu`) the lookup is scoped to that tenant — an unknown subdomain returns 404. Without a tenant scope, a GTIN matching more than one passport is rejected with 400 (ambiguous); disambiguate via a brand subdomain (the `?subdomain=` query override is honoured in non-production environments only).

Content negotiation (JSON-LD default / `application/aas+json` / `application/vc+jwt` / `application/vc+ld+json` / `application/dc+sd-jwt` / `text/html`, `Vary: Accept` always set), access tiers (public / `dpp_li_…`·`dpp_auth_…` grant via Bearer or `?grant=` / owner = a tenant **API key** sent as Bearer or, legacy, as the literal `opendpp_session` cookie value — Console JWT login sessions do **not** unlock owner tier), DRAFT hiding, access-audit logging (anonymized IP), and grant response headers (`Cache-Control: private, no-store`, `Referrer-Policy: no-referrer`) are identical to `GET /passport/{id}` — see that operation for the full tier semantics. No permission string (public endpoint); invalid credentials silently degrade to the public tier, never 401/403.

The gateway also accepts additional GS1 AI key/value path pairs after the GTIN; the only one acted on is AI 21 (serial) — documented separately as `GET /01/{gtin14}/21/{serial}`. (The underlying route is `GET /{ai}/*`; AI prefixes other than `01` and `8003` get a 400.)

**Rate limit:** 30 requests/min/IP, per-process in-memory limiter; two-field 429 body without `success`. The limiter adds no headers of its own — `x-ratelimit-*` headers on responses come from the global platform limit (100 req/min/IP), which applies on top.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `gtin14` | path | yes | string | GTIN-14: exactly 14 digits with a valid GS1 modulo-10 check digit (the check digit is validated server-side — the pattern alone is not sufficient). |
| `grant` | query | no | string | Capability grant token (dpp_li_… / dpp_auth_…); equivalent to Authorization: Bearer. |

## Responses

- **200** — The matched passport in the negotiated representation (same envelope as GET /passport/{id}). → [AasEnvironment](/schemas/AasEnvironment.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
- **400** — Invalid GTIN-14 (must be 14 digits with a valid modulo-10 check digit) or — when no tenant scope is in play and no AI-21 serial was given — an ambiguous lookup… → [Error](/schemas/Error.md)
- **404** — No passport matches the identifier (content-negotiated: HTML page for Accept: text/html, JSON otherwise; Vary: Accept set), a DRAFT match was hidden from a non… → [Error](/schemas/Error.md)
- **406** — The requested representation cannot be produced for this resource. → [Error](/schemas/Error.md)
- **429** — Public-resolution rate limit exceeded (30 requests/min per IP; no rate-limit headers). → [Error](/schemas/Error.md)
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \  # optional for the public tier
  -X GET 'https://opendpp-node.eu/01/{gtin14}'
```

## See also

Schemas: [AasEnvironment](/schemas/AasEnvironment.md), [Error](/schemas/Error.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md).
