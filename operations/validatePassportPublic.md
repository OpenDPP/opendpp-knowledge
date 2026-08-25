---
type: API Endpoint
title: Permission-free dry-run ESPR metadata validation (strictly rate-limited)
description: Identical validation semantics to POST /api/v1/passports/validate-only, but requires no specific permission — any valid API key or Console session is accepted, so every plan including the free tier can call it.
resource: https://opendpp-node.eu/api/v1/passports/validate-only-public
tags:
  - POST
  - passports
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`POST /api/v1/passports/validate-only-public`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Identical validation semantics to `POST /api/v1/passports/validate-only`, but requires **no specific permission** — any valid API key or Console session is accepted, so every plan including the free tier can call it. Nothing is persisted.

**Authentication is required.** Until contract 1.12.0 this endpoint was reachable anonymously; it is not any more, because it runs the full validation engine and was usable as free unauthenticated compute. An anonymous call now returns **401**. The path keeps its `-public` segment for continuity — "public" here means *no permission and no tenant scope*, not *unauthenticated*.

**Rate limit: 10 requests/min per IP** — a strict per-route limit that **replaces** the global ceiling for this endpoint (emits `x-ratelimit-limit` / `x-ratelimit-remaining` / `x-ratelimit-reset` headers and `retry-after` on 429). **Body limit: 65,536 bytes (64 KiB)** → **413** beyond that. Both caps remain as defence in depth against authenticated abuse. The credential is checked **before the body is parsed**, so an anonymous oversized body is rejected as **401**, not 413.

**Behavioral caveats:**
- No tenant context: `operatorId` is accepted but ignored.
- The 200 body always carries `errors: []`; `warnings` is omitted entirely when there are none (same omission on the 400 Validation Failed body).
- Error/warning `friendlyMessage` localization via `?lang=` / `Accept-Language` (28 languages, default `en`); category-validity errors carry no `friendlyMessage`.
- Structural rejections of the request body (e.g. missing `productId`) and malformed JSON return just `{"error": "Bad Request", "message": …}`; a whitespace-only `productId` or a malformed GTIN-14 `productId` (14 digits failing the GS1 mod-10 check) gets the fuller `Bad Request` body shown below.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `lang` | query | no | string | Locale for localized friendlyMessage validation texts (en, bg, hr, cs, da, nl, et, fi, fr, de, el, hu, ga, it, lv, lt, mt, pl, pt, ro, sk, sl, es, sv, no, is,… |

## Request body

Schema (required): [PassportValidateOnlyRequest](/schemas/PassportValidateOnlyRequest.md).

```json
{
  "productId": "09501101530003",
  "metadata": {
    "category": "iron-steel",
    "originCountry": "DE",
    "materialComposition": [
      {
        "material": "Recycled steel",
        "percentage": 62.5
      },
      {
        "material": "Virgin steel",
        "percentage": 37.5
      }
    ],
    "facilityDetails": [
      {
        "facilityName": "Musterstahl Works Duisburg",
        "location": "Duisburg, DE",
        "activity": "Hot rolling"
      }
    ],
    "regulatoryCompliance": {
      "ceMarking": true,
      "certificates": [
        {
          "name": "EN 10025-2 Mill Certificate",
          "referenceNumber": "MC-2026-00417",
          "issuer": "TUV Rheinland"
        }
      ]
    },
    "scrapMetalContentRatio": 62.5,
    "tensileStrengthClass": "S355",
    "carbonEmissionIntensityPerTon": 1.42
  }
}
```

## Responses

- **200** — Metadata is valid for its ESPR category. → [PassportValidateOnlyResult](/schemas/PassportValidateOnlyResult.md)
- **400** — Validation failed or the body was structurally invalid — same three variants as the authenticated validate-only endpoint. → [PassportValidateOnlyError](/schemas/PassportValidateOnlyError.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **413** — Body exceeds the 65,536-byte (64 KiB) route body limit.
- **429** — Rate limit exceeded.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/passports/validate-only-public' \
  --data '{"productId":"09501101530003","metadata":{"category":"iron-steel","originCountry":"DE","materialComposition":[{"material":"Recycled steel","percentage":62.5},{"material":"Virgin steel","percentage":37.5}],"facilityDetails":[{"facilityName":"Musterstahl Works Duisburg","location":"Duisburg, DE","activity":"Hot rolling"}],"regulatoryCompliance":{"ceMarking":true,"certificates":[{"name":"EN 10025-2 Mill Certificate","referenceNumber":"MC-2026-00417","issuer":"TUV Rheinland"}]},"scrapMetalContentRatio":62.5,"tensileStrengthClass":"S355","carbonEmissionIntensityPerTon":1.42}}'
```

## See also

Schemas: [PassportValidateOnlyError](/schemas/PassportValidateOnlyError.md), [PassportValidateOnlyRequest](/schemas/PassportValidateOnlyRequest.md), [PassportValidateOnlyResult](/schemas/PassportValidateOnlyResult.md).
