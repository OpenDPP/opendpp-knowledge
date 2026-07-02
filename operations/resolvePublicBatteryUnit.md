---
type: API Endpoint
title: Resolve an individual serialised battery unit
description: Resolve an individual serialised battery unit
resource: https://opendpp-node.eu/unit/{id}
tags:
  - GET
  - public-resolution
timestamp: 2026-07-02T00:00:00Z
---

`GET /unit/{id}`

**Domain:** [Public Resolution](/tags/public-resolution.md)  
**Authentication:** **Tiered** — resolves anonymously (public view) or with a Bearer API key / capability token for a fuller view.

Public, content-negotiated view of one individual serialised unit (battery; Reg. (EU) 2023/1542 Art. 77(2)) by its unit UUID, including the embedded SKU/type passport (`ofModel`, masked by the same tier rules as `GET /passport/{id}`).

**Content negotiation:** `Accept` containing `application/vc+jwt` (or bare `vc+jwt`) → a signed PER-UNIT (item-granularity) UNTP DigitalProductPassport credential (public tier; `406 Not Acceptable` when the unit's type passport has no manufacturing facility with a country of production); `application/vc+ld+json` (or bare `vc+ld+json`) → the same per-unit credential with an embedded `ecdsa-jcs-2019` Data Integrity proof, same `406`; `text/html` → server-rendered unit page; everything else → JSON-LD (`application/ld+json`). No AAS representation on this route. `Vary: Accept` always set on the 200. The `410` tombstone check (below) precedes content negotiation, so a recycled/ceased unit never yields a `vc+jwt` or `vc+ld+json`.

**Per-unit telemetry is never public** (Annex XIII(2)-(4)): anonymous responses omit `currentState`/`dynamicData` and instead carry a `restrictedData` notice with a `/request-access` pointer. An owner credential — a tenant **API key** (`op_dpp_token_…`) of the owning or operator-bound tenant, sent as Bearer or, legacy, as the literal `opendpp_session` cookie value (a Console JWT login session does **not** unlock owner tier) — or a valid grant token (`dpp_li_…`/`dpp_auth_…` as Bearer or `?grant=`; TENANT, PASSPORT or UNIT scope) unlocks `currentState` and `dynamicData` — up to the 500 most recent events, newest first. Invalid credentials silently degrade to the public tier (never 401/402/403). Grant-unlocked responses add `Cache-Control: private, no-store` + `Referrer-Policy: no-referrer`. No permission string (public endpoint).

**Art. 77(8) tombstone:** once the unit's status is `RECYCLED` (or `ceasedAt` is set) this URL answers `410 Gone` with a minimal tombstone for everyone — grants and owner credentials do NOT override it (the owning tenant retains internal access via `GET /api/v1/units/{id}`).

Every resolution is access-audit-logged with an anonymized IP. **Rate limit:** 30 requests/min/IP (in-memory public limiter; two-field 429 body without `success`). The limiter adds no headers of its own — `x-ratelimit-*` headers come from the global platform limit, which applies on top.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | The battery unit's server-assigned UUID (AI-21 serial resolution via GET /01/{gtin14}/21/{serial} redirects here). |
| `grant` | query | no | string | Capability grant token (dpp_li_… / dpp_auth_…); equivalent to Authorization: Bearer. |

## Responses

- **200** — The unit document in the negotiated representation. → [PublicBatteryUnitJsonLd](/schemas/PublicBatteryUnitJsonLd.md)
- **404** — No unit with that id (a malformed UUID also resolves to this 404). → [Error](/schemas/Error.md)
- **406** — The requested representation cannot be produced for this resource. → [Error](/schemas/Error.md)
- **410** — Gone — the unit was RECYCLED (or ceasedAt is set): the battery passport has ceased to exist (Art. → [BatteryUnitTombstoneJsonLd](/schemas/BatteryUnitTombstoneJsonLd.md)
- **429** — Public-resolution rate limit exceeded (30 requests/min per IP; no rate-limit headers). → [Error](/schemas/Error.md)
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \  # optional for the public tier
  -X GET 'https://opendpp-node.eu/unit/{id}'
```

## See also

Schemas: [BatteryUnitTombstoneJsonLd](/schemas/BatteryUnitTombstoneJsonLd.md), [Error](/schemas/Error.md), [PublicBatteryUnitJsonLd](/schemas/PublicBatteryUnitJsonLd.md).
