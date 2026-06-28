---
type: API Endpoint
title: Register a facility (GS1 GLN)
description: Register a facility (GS1 GLN)
resource: https://opendpp-node.eu/api/v1/facilities
tags:
  - POST
  - facilities
timestamp: 2026-06-28T00:00:00Z
---

`POST /api/v1/facilities`

**Domain:** [Facilities](/tags/facilities.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Registers a manufacturing/processing facility as tenant-scoped master data, backing the Unique Facility Identifier (UFI, EN 18219). Passports reference facilities via `facilityId`.

**Permission:** `facility:write`. Authenticate with a Bearer API key (`op_dpp_token_…`) or a session JWT; cookie-authenticated sessions must also send the `X-CSRF-Token` header (double-submit against the `opendpp_csrf` cookie) — Bearer clients are exempt. Write permissions are subscription-gated: a lapsed workspace subscription returns **402**.

**GLN validation:** `gln` is trimmed, then must be exactly 13 digits with a valid GS1 modulo-10 check digit (same weighting algorithm as GTIN). The GLN is unique **platform-wide** (database unique constraint), so a duplicate returns **409** even if the existing facility belongs to another tenant.

**Country:** `country` must match `^[A-Za-z]{2}$` after trimming and is stored uppercased.

**Operator binding:** if `operatorId` is supplied (non-empty), that Economic Operator must be bound to your tenant workspace, otherwise **403**. An empty/whitespace `operatorId` is stored as `null`. Requests authenticated with an **operator-scoped API key** may only attach facilities to their own operator: a mismatched `operatorId` returns **403**, and when omitted the key's operator id is applied automatically.

`activity`, `streetAddress`, `city` and `postalCode` are trimmed; empty/whitespace values are stored as `null`.

**Public/privileged field split:** the public **JSON-LD** passport document exposes `id`, `gln`, `name`, `activity` and `country` of a linked facility; the public **AAS** export emits only the GLN, name and country (`manufacturingFacilityGln` / `manufacturingFacilityName` / `manufacturingFacilityCountry`, plus the GLN as a `urn:gs1:gln:` global asset reference) — the facility `id` and `activity` are never emitted in AAS. `streetAddress`, `city` and `postalCode` are owner-only in both formats. This endpoint returns the full row to you as the owner.

Emits a `facility.created` audit event and an in-app notification.

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

## Request body

Schema (required): [FacilityCreateRequest](/schemas/FacilityCreateRequest.md).

```json
{
  "gln": "0950110153014",
  "name": "Munich Cell Assembly Plant",
  "activity": "Cell assembly",
  "streetAddress": "Werkstrasse 12",
  "city": "Munich",
  "postalCode": "80331",
  "country": "DE",
  "operatorId": "4f6d2c1e-8a9b-4d3e-b7c5-0a1f2e3d4c5b"
}
```

## Responses

- **201** — Facility registered. → [FacilityCreatedEnvelope](/schemas/FacilityCreatedEnvelope.md)
- **400** — Invalid request body. → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Forbidden. → [Error](/schemas/Error.md)
- **409** — A facility with this GLN is already registered. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Internal error (standard envelope). → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/facilities' \
  --data '{"gln":"0950110153014","name":"Munich Cell Assembly Plant","activity":"Cell assembly","streetAddress":"Werkstrasse 12","city":"Munich","postalCode":"80331","country":"DE","operatorId":"4f6d2c1e-8a9b-4d3e-b7c5-0a1f2e3d4c5b"}'
```

## See also

Schemas: [Error](/schemas/Error.md), [FacilityCreateRequest](/schemas/FacilityCreateRequest.md), [FacilityCreatedEnvelope](/schemas/FacilityCreatedEnvelope.md).
