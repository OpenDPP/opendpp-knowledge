---
type: API Endpoint
title: Public dry-run ESPR metadata validation (strictly rate-limited)
description: Public dry-run ESPR metadata validation (strictly rate-limited)
resource: https://opendpp-node.eu/api/v1/passports/validate-only-public
tags:
  - POST
  - passports
timestamp: 2026-06-20T00:00:00Z
---

`POST /api/v1/passports/validate-only-public`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **Public** — no authentication required.

Identical validation semantics to `POST /api/v1/passports/validate-only`, but **fully public — no authentication of any kind**, intended for try-before-you-buy schema checks. Nothing is persisted.

**Rate limit: 10 requests/min per IP** — a strict per-route limit that **replaces** the global 100/min for this endpoint (emits `x-ratelimit-limit` / `x-ratelimit-remaining` / `x-ratelimit-reset` headers and `retry-after` on 429). **Body limit: 65,536 bytes (64 KiB)** → **413** beyond that. These caps exist because the endpoint runs the full validation engine unauthenticated (DoS mitigation).

**Behavioral caveats:**
- No tenant context: the EPCIS traceability lineage audit is **not** run, and `operatorId` is accepted but ignored.
- The 200 body always carries `errors: []`; `warnings` is omitted entirely when there are none (same omission on the 400 Validation Failed body).
- Error/warning `friendlyMessage` localization via `?lang=` / `Accept-Language` (28 languages, default `en`); category-validity errors carry no `friendlyMessage`.
- Structural rejections of the request body (e.g. missing `productId`) and malformed JSON return just `{"error": "Bad Request", "message": …}`; a whitespace-only `productId` gets the fuller `Bad Request` body shown below.

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
- **413** — Body exceeds the 65,536-byte (64 KiB) route body limit.
- **429** — Rate limit exceeded.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/passports/validate-only-public' \
  --data '{"productId":"09501101530003","metadata":{"category":"iron-steel","originCountry":"DE","materialComposition":[{"material":"Recycled steel","percentage":62.5},{"material":"Virgin steel","percentage":37.5}],"facilityDetails":[{"facilityName":"Musterstahl Works Duisburg","location":"Duisburg, DE","activity":"Hot rolling"}],"regulatoryCompliance":{"ceMarking":true,"certificates":[{"name":"EN 10025-2 Mill Certificate","referenceNumber":"MC-2026-00417","issuer":"TUV Rheinland"}]},"scrapMetalContentRatio":62.5,"tensileStrengthClass":"S355","carbonEmissionIntensityPerTon":1.42}}'
```

## See also

Schemas: [PassportValidateOnlyError](/schemas/PassportValidateOnlyError.md), [PassportValidateOnlyRequest](/schemas/PassportValidateOnlyRequest.md), [PassportValidateOnlyResult](/schemas/PassportValidateOnlyResult.md).
