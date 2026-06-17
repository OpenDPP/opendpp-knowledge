---
type: API Endpoint
title: Dry-run ESPR validation of passport metadata (nothing is stored)
description: Dry-run ESPR validation of passport metadata (nothing is stored)
resource: https://opendpp-node.eu/api/v1/passports/validate-only
tags:
  - POST
  - passports
timestamp: 2026-06-17T00:00:00Z
---

`POST /api/v1/passports/validate-only`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Runs the full ESPR category compliance validation on a metadata payload **without persisting anything** — intended for pre-flight checks in integration pipelines.

**Permission:** `passport:create` (Bearer API key or session JWT + CSRF for cookie sessions). Despite being read-only in effect, it is gated as a write permission, so subscription gating (**402**) applies.

**Rate limit:** global 100 requests/min per IP. **Body limit: 262,144 bytes (256 KiB)** → **413** beyond that.

**Behavioral caveats:**
- The EPCIS **traceability lineage audit is NOT run** here (it only runs at real ingestion), so a payload can pass this dry-run and still fail `POST /api/v1/passports` on traceability errors.
- `operatorId` is accepted by the body schema but **ignored** by the handler.
- The 200 body always carries `errors: []`; `warnings` is **omitted entirely** when there are none (it is not an empty array). The same omission applies to `warnings` on the 400 Validation Failed body.
- `friendlyMessage` localization via `?lang=` / `Accept-Language` (28 languages, default `en`); category-validity errors (`metadata.category` missing or unknown) carry no `friendlyMessage`.
- Structural rejections of the request body (e.g. missing `productId`, non-object `metadata`) and malformed JSON return just `{"error": "Bad Request", "message": …}`; the only structurally bad input that reaches the handler is a whitespace-only `productId`, answered with the fuller `Bad Request` body shown below.

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
- **400** — Validation failed, or the request body was structurally invalid. → [PassportValidateOnlyError](/schemas/PassportValidateOnlyError.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **413** — Body exceeds the 262,144-byte (256 KiB) route body limit.
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/passports/validate-only' \
  --data '{"productId":"09501101530003","metadata":{"category":"iron-steel","originCountry":"DE","materialComposition":[{"material":"Recycled steel","percentage":62.5},{"material":"Virgin steel","percentage":37.5}],"facilityDetails":[{"facilityName":"Musterstahl Works Duisburg","location":"Duisburg, DE","activity":"Hot rolling"}],"regulatoryCompliance":{"ceMarking":true,"certificates":[{"name":"EN 10025-2 Mill Certificate","referenceNumber":"MC-2026-00417","issuer":"TUV Rheinland"}]},"scrapMetalContentRatio":62.5,"tensileStrengthClass":"S355","carbonEmissionIntensityPerTon":1.42}}'
```

## See also

Schemas: [PassportValidateOnlyError](/schemas/PassportValidateOnlyError.md), [PassportValidateOnlyRequest](/schemas/PassportValidateOnlyRequest.md), [PassportValidateOnlyResult](/schemas/PassportValidateOnlyResult.md).
