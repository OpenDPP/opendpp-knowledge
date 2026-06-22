---
type: API Endpoint
title: Bulk-ingest up to 200 passports with per-row error reporting
description: Bulk-ingest up to 200 passports with per-row error reporting
resource: https://opendpp-node.eu/api/v1/passports/bulk
tags:
  - POST
  - passports
timestamp: 2026-06-22T00:00:00Z
---

`POST /api/v1/passports/bulk`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Ingests up to **200** passports in one request with **partial-success semantics**: each row is validated and inserted independently; failed rows are skipped and reported as human-readable strings in `errors[]`. Returns **201** as long as at least one row was inserted (even with row errors); returns **400 Bulk Ingestion Failed** only when **every** row failed.

**Permission:** `passport:create` (Bearer API key or session JWT + CSRF for cookie sessions; subscription gating → **402**).

**Rate limit:** global 100 requests/min per IP. **Body limit: 1 MiB (1,048,576 bytes)** → **413** beyond that; in practice the `maxItems: 200` envelope cap is the effective bound for typical rows. Envelope violations — empty array, more than 200 items, missing `passports` — are rejected before any row is processed, with the full default validation error body (`{statusCode, code, error, message}`).

**Per-row behavior (differences from `POST /api/v1/passports`):**
- Rows are validated with the ESPR category engine only — the **EPCIS traceability audit is NOT run** for bulk rows.
- No `draft` support: every inserted row is created with `status: "ACTIVE"`. No `enrichment` support.
- A valid GTIN-14/GRAI `productId` is **not** auto-copied into `metadata.gtin`/`metadata.grai` (unlike single ingestion).
- Operator resolution per row: explicit `operatorId` must be bound to your workspace; otherwise the workspace's first bound operator is used; operator-scoped API keys force their operator. Lookups are cached within the request.
- Duplicate `(productId, operatorId)` rows, unknown facilities, and per-row DB failures become `errors[]` strings (prefixed `[SKU: <productId>]`), never a request-level failure.
- Each successfully inserted row **transactionally enqueues a `passport.ingested` webhook event** (public redacted JSON-LD payload).
- Row validation messages use the localized `friendlyMessage` where the engine provides one (`?lang=` / `Accept-Language`); category-validity errors fall back to the technical `path: message` form.

Note the 400 `Bulk Ingestion Failed` body has **no `message` field**, and `errors` is an array of **strings** (not objects).

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `lang` | query | no | string | Locale for the localized validation text inside per-row errors[] strings (en, bg, hr, cs, da, nl, et, fi, fr, de, el, hu, ga, it, lv, lt, mt, pl, pt, ro, sk, s… |

## Request body

Schema (required): [PassportBulkRequest](/schemas/PassportBulkRequest.md).

```json
{
  "passports": [
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
    },
    {
      "productId": "09501101530010",
      "metadata": {
        "category": "iron-steel",
        "originCountry": "DE",
        "materialComposition": [
          {
            "material": "Recycled steel",
            "percentage": 100
          }
        ],
        "facilityDetails": [
          {
            "facilityName": "Musterstahl Works Duisburg",
            "location": "Duisburg, DE",
            "activity": "Cold rolling"
          }
        ],
        "regulatoryCompliance": {
          "ceMarking": true,
          "certificates": [
            {
              "name": "EN 10025-2 Mill Certificate",
              "referenceNumber": "MC-2026-00418",
              "issuer": "TUV Rheinland"
            }
          ]
        },
        "scrapMetalContentRatio": 100,
        "tensileStrengthClass": "S275",
        "carbonEmissionIntensityPerTon": 0.61
      }
    }
  ]
}
```

## Responses

- **201** — Bulk run finished with at least one inserted row. → [PassportBulkResult](/schemas/PassportBulkResult.md)
- **400** — Either every row failed (Bulk Ingestion Failed, with string errors[] and no message field), or the request never reached row processing: envelope violations of… → [PassportBulkFailure](/schemas/PassportBulkFailure.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **413** — Body exceeds the 1 MiB (1,048,576-byte) body limit.
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/passports/bulk' \
  --data '{"passports":[{"productId":"09501101530003","metadata":{"category":"iron-steel","originCountry":"DE","materialComposition":[{"material":"Recycled steel","percentage":62.5},{"material":"Virgin steel","percentage":37.5}],"facilityDetails":[{"facilityName":"Musterstahl Works Duisburg","location":"Duisburg, DE","activity":"Hot rolling"}],"regulatoryCompliance":{"ceMarking":true,"certificates":[{"name":"EN 10025-2 Mill Certificate","referenceNumber":"MC-2026-00417","issuer":"TUV Rheinland"}]},"scrapMetalContentRatio":62.5,"tensileStrengthClass":"S355","carbonEmissionIntensityPerTon":1.42}},{"produc…'
```

## See also

Schemas: [PassportBulkFailure](/schemas/PassportBulkFailure.md), [PassportBulkRequest](/schemas/PassportBulkRequest.md), [PassportBulkResult](/schemas/PassportBulkResult.md).
