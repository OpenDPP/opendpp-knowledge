---
type: API Endpoint
title: GS1 Digital Link serialised-item redirect (AI 01 + AI 21)
description: GS1 Digital Link serialised-item redirect (AI 01 + AI 21)
resource: https://opendpp-node.eu/01/{gtin14}/21/{serial}
tags:
  - GET
  - public-resolution
timestamp: 2026-06-23T00:00:00Z
---

`GET /01/{gtin14}/21/{serial}`

**Domain:** [Public Resolution](/tags/public-resolution.md)  
**Authentication:** **Public** — no authentication required.

GS1 Digital Link resolution of an *individual serialised item*. This path never returns a document directly — on success it issues a `302` redirect (the query string, including `?grant=`, is preserved on the `Location` URL):

1. If the GTIN resolves to a SKU/type passport that has a serialised battery unit whose `serialNumber` equals the AI-21 value → `302` to `/unit/{unitId}` (Battery Reg. Art. 77(2) per-unit view).
2. Otherwise (legacy fallback) the AI-21 value is matched against the passport UUID, `metadata.serialNumber`, or `metadata["21"]`; if a passport matches → `302` to `/passport/{passportId}`.
3. Otherwise → `404` (content-negotiated).

The ambiguity check of the bare-GTIN branch is skipped when an AI-21 serial is present. The redirect handler itself never evaluates credentials — access tiers (owner / grant / public) apply at the redirect target; carry the grant in `?grant=` (preserved across the redirect) or re-send the `Authorization` header to the target. On tenant subdomains the lookup is scoped to that tenant (unknown subdomain → 404, JSON only).

No permission string (public endpoint). **Rate limit:** 30 requests/min/IP (in-memory public limiter; two-field 429 body without `success`). The limiter adds no headers of its own — `x-ratelimit-*` headers come from the global platform limit, which applies on top — and the redirect target counts as a second request against both.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `gtin14` | path | yes | string | GTIN-14: exactly 14 digits with a valid GS1 modulo-10 check digit (validated server-side). |
| `serial` | path | yes | string | GS1 AI-21 serial. |
| `grant` | query | no | string | Capability grant token. |

## Responses

- **302** — Redirect to the resolved resource.
- **400** — Invalid GTIN-14 (format / modulo-10 check digit). → [Error](/schemas/Error.md)
- **404** — Neither a serialised unit nor a fallback passport matches (content-negotiated HTML/JSON, Vary: Accept), or unknown tenant subdomain (JSON only). → [Error](/schemas/Error.md)
- **429** — Public-resolution rate limit exceeded (30 requests/min per IP; no rate-limit headers). → [Error](/schemas/Error.md)
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/01/{gtin14}/21/{serial}'
```

## See also

Schemas: [Error](/schemas/Error.md).
