---
type: API Endpoint
title: Resolve a passport by UUID (JSON-LD / AAS / HTML)
description: Resolve a passport by UUID (JSON-LD / AAS / HTML)
resource: https://opendpp-node.eu/passport/{id}
tags:
  - GET
  - public-resolution
timestamp: 2026-06-29T00:00:00Z
---

`GET /passport/{id}`

**Domain:** [Public Resolution](/tags/public-resolution.md)  
**Authentication:** **Tiered** — resolves anonymously (public view) or with a Bearer API key / capability token for a fuller view.

Public, content-negotiated resolution of a Digital Product Passport by its server-assigned UUID. Lookup is by primary key only — GTIN/GRAI/serial lookups go through the GS1 Digital Link gateway (`GET /01/{gtin14}`, `GET /8003/{grai}`).

**Content negotiation** (substring match on `Accept`, checked in order): `application/aas+json` (or bare `aas+json`) → role-filtered Asset Administration Shell environment; `application/vc+jwt` (or bare `vc+jwt`) → a signed UNTP DigitalProductPassport credential (public tier; `406 Not Acceptable` when the passport has no manufacturing facility with a country of production); `application/vc+ld+json` (or bare `vc+ld+json`) → the same credential with an embedded W3C Data Integrity proof (`ecdsa-jcs-2019`), same `406` condition; `application/dc+sd-jwt` (or the legacy `vc+sd-jwt`) → the same credential as an SD-JWT-VC for cryptographic selective disclosure (a holder presents a subset of `credentialSubject` claims), same `406` condition; `text/html` → server-rendered passport page; anything else (including `application/json`, `*/*`, or no header) → JSON-LD (`application/ld+json`, the default). `Vary: Accept` is always set on the 200.

**Access tiers** — no permission string (public endpoint). Credentials are *optional* and never produce 401/402/403 here; an invalid or foreign credential silently degrades to the public tier:
- **Public** (anonymous): restricted metadata keys (for category `batteries`: `detailedPerformance`, `lifecycleAndInUse`, `circularityAndDisassembly` — masked only when present) and the owner-only key `facilityDetails` (present-as-placeholder in every non-owner response, even when the underlying metadata never contained it) carry the literal placeholder `[REDACTED - Privileged Access Required]`. Each masked key that exists in the sealed metadata keeps its true Merkle leaf hash in `proof.redactedLeaves`, so the eIDAS seal stays offline-verifiable after redaction; a placeholder-valued key with no `redactedLeaves` entry was never in the sealed metadata and must be excluded when rebuilding the root.
- **Legitimate interest / authority**: a capability grant token — `dpp_li_…` (tenant-issued) or `dpp_auth_…` (platform-issued, not tenant-revocable) — sent as `Authorization: Bearer <token>` or `?grant=<token>`, with TENANT or PASSPORT scope covering this passport, unlocks the restricted tier-2 keys. `facilityDetails`, the facility street address and DRAFT passports stay hidden. Grant-unlocked responses add `Cache-Control: private, no-store` and `Referrer-Policy: no-referrer`.
- **Owner**: a tenant **API key** (`op_dpp_token_…`, shown once at creation) belonging to the owning tenant or to a tenant bound to the passport's economic operator — sent as Bearer or, legacy, as the literal value of the `opendpp_session` cookie. Only API keys are matched on the public resolvers: a Console JWT login session in that cookie does **not** unlock owner tier (it silently resolves as public). Owners see everything, including DRAFT passports, owner-only metadata keys and the facility street address (`manufacturingFacility.streetAddress`/`city`/`postalCode`). In the AAS representation the owner credential's API-key role drives element filtering; a grant maps to the `legitimate_interest` filter tier, anonymous to `public`.

DRAFT passports are hidden from everyone but the owner (404 with a body identical to a true miss). Every resolution is recorded in the passport's access audit log with an anonymized IP.

**Rate limit:** 30 requests/min/IP via a per-process in-memory limiter; its 429 body is the two-field public error shape (no `success` field). This limiter adds no headers of its own — the `x-ratelimit-*` headers still present on responses (including these 429s) belong to the global platform limit (100 req/min/IP, 600/min for known crawler user agents), which applies on top.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | The passport's server-assigned UUID (returned as id on creation and embedded as AI-21 in the SKU-level Digital Link URI). |
| `grant` | query | no | string | Capability grant token (dpp_li_… legitimate-interest, dpp_auth_… authority) — the inspection-link path for QR-scanning inspectors who cannot set headers. |

## Responses

- **200** — The passport in the negotiated representation. → [AasEnvironment](/schemas/AasEnvironment.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
- **400** — Passport identifier missing. → [Error](/schemas/Error.md)
- **404** — No passport with that UUID — or the passport is a DRAFT and the caller is not owner-tier (identical body, deliberate). → [Error](/schemas/Error.md)
- **406** — The requested representation cannot be produced for this resource. → [Error](/schemas/Error.md)
- **429** — Public-resolution rate limit exceeded (30 requests/min per IP; no rate-limit headers). → [Error](/schemas/Error.md)
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \  # optional for the public tier
  -X GET 'https://opendpp-node.eu/passport/{id}'
```

## See also

Schemas: [AasEnvironment](/schemas/AasEnvironment.md), [Error](/schemas/Error.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md).
