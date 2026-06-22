---
type: API Endpoint
title: Create (ingest) a Digital Product Passport
description: Create (ingest) a Digital Product Passport
resource: https://opendpp-node.eu/api/v1/passports
tags:
  - POST
  - passports
timestamp: 2026-06-22T00:00:00Z
---

`POST /api/v1/passports`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Creates a SKU/type-level Digital Product Passport.

**Permission:** `passport:create` (Bearer `op_dpp_token_…` API key or session JWT; cookie sessions must also send the `X-CSRF-Token` double-submit header). Write operations are subject to subscription gating (**402**) and, where the workspace enforces it, MFA (**403**).

**Rate limit:** global 100 requests/min per IP (`x-ratelimit-*` headers). **Body limit: 1 MiB (1,048,576 bytes)** → **413** beyond that.

**Validation.** Unless `draft: true`, `metadata` is validated against the ESPR category rules for `metadata.category` plus cross-field rules (e.g. `materialComposition` percentages must sum to 100 ±0.1, `originCountry` must be a real ISO 3166-1 alpha-2 code), and the product's EPCIS traceability lineage is audited. For five categories (textiles, batteries, electronics, chemicals, construction) the authoritative per-category JSON Schema is served live at `GET /api/v1/schemas/{category}`; the other four (cosmetics, toys, iron-steel, aluminium) are validated by built-in server-side rules and `GET /api/v1/schemas/{category}` returns **404** for them. Failure returns the **400 Validation Failed** body with per-field `errors[]` (plus `warnings[]` when any exist — the key is omitted entirely when there are none). A passing payload may still produce non-blocking `warnings[]`, echoed in the 201. `friendlyMessage` texts are localized via `?lang=` or `Accept-Language` (default `en`); category-validity errors (`metadata.category` missing or unknown) carry no `friendlyMessage`.

**Drafts.** `draft: true` skips ALL validation, stores the passport with `status: "DRAFT"` (not publicly resolvable), returns `message: "Draft passport saved"` with `warnings: []`, and does **not** emit a webhook.

**Identifier handling.** `productId` may be a GTIN-14 (14 digits, GS1 mod-10 check digit), a GRAI (14-digit numeric asset id + up to 16 alphanumeric serial chars), or a free-form SKU. A valid GTIN-14 is auto-copied into `metadata.gtin` (a GRAI into `metadata.grai`) before storage. The server mints a UUID passport id and a GS1 Digital Link URI `https://opendpp-node.eu/{01|8003}/{productId}/21/{passportId}`.

**Operator binding.** With `operatorId` omitted, the passport is attributed to the first economic operator bound to your workspace; if no operator is bound at all the request fails **400** (the API never fabricates an operator identity — register one via `POST /api/v1/operators`). An `operatorId` not bound to your workspace → **403**. Operator-scoped API keys force their own operator and **403** on mismatch. The `(productId, operatorId)` pair is unique → **409** on duplicates. An optional `facilityId` must reference a Facility in your workspace (**400** otherwise).

**Webhook:** non-draft creation transactionally enqueues a `passport.ingested` event whose payload is the public redacted JSON-LD passport document (same masking as the 201 `passport` field). Drafts emit nothing.

**Response caveats:** the 201 `passport` field is the **public, redacted** JSON-LD representation — even for the creator. The owner-only metadata key `facilityDetails` is replaced with the literal placeholder `"[REDACTED - Privileged Access Required]"` (it appears as the placeholder even when you did not supply it), and for `category: "batteries"` the restricted legitimate-interest keys `detailedPerformance`, `lifecycleAndInUse` and `circularityAndDisassembly` (Battery Reg. Annex XIII parts 2-4) are masked the same way when present. `enrichment` is stored outside the validated metadata and Merkle seal and never appears in the JSON-LD document. Only `success`, `message`, `passport`, and `warnings` are emitted at the top level of the 201 body.

**Other 400 bodies:** non-validation failures (whitespace-only `productId`, no bound operator, unknown `facilityId`) reuse status 400 with the plain `{"success": false, "error": "Bad Request", "message": …}` triple and **no** `errors`/`warnings` arrays. Requests rejected before the handler runs — request-body schema violations (e.g. missing `productId`) and malformed JSON — come back as just `{"error": "Bad Request", "message": …}`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `lang` | query | no | string | Locale for localized friendlyMessage validation texts. |

## Request body

Schema (required): [PassportCreateRequest](/schemas/PassportCreateRequest.md).

```json
{
  "productId": "09501101530003",
  "operatorId": "5c1e0f3a-7b2d-4c8e-a91f-2d3e4f5a6b7c",
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
  },
  "enrichment": {
    "tagline": "Low-carbon structural steel",
    "images": [
      {
        "url": "https://cdn.example.com/steel-beam.jpg",
        "caption": "S355 beam"
      }
    ]
  }
}
```

## Responses

- **201** — Passport created (or draft saved). → [PassportIngestCreated](/schemas/PassportIngestCreated.md)
- **400** — Three variants share this status: (1) Validation Failed — the metadata failed ESPR category / cross-field / traceability validation; carries per-field errors[]… → [Error](/schemas/Error.md), [ValidationErrorItem](/schemas/ValidationErrorItem.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **409** — A passport already exists for this (productId, operatorId) pair. → [Error](/schemas/Error.md)
- **413** — Body exceeds the 1 MiB (1,048,576-byte) body limit.
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/passports' \
  --data '{"productId":"09501101530003","operatorId":"5c1e0f3a-7b2d-4c8e-a91f-2d3e4f5a6b7c","metadata":{"category":"iron-steel","originCountry":"DE","materialComposition":[{"material":"Recycled steel","percentage":62.5},{"material":"Virgin steel","percentage":37.5}],"facilityDetails":[{"facilityName":"Musterstahl Works Duisburg","location":"Duisburg, DE","activity":"Hot rolling"}],"regulatoryCompliance":{"ceMarking":true,"certificates":[{"name":"EN 10025-2 Mill Certificate","referenceNumber":"MC-2026-00417","issuer":"TUV Rheinland"}]},"scrapMetalContentRatio":62.5,"tensileStrengthClass":"S355","carbonEm…'
```

## See also

Schemas: [Error](/schemas/Error.md), [PassportCreateRequest](/schemas/PassportCreateRequest.md), [PassportIngestCreated](/schemas/PassportIngestCreated.md), [ValidationErrorItem](/schemas/ValidationErrorItem.md).
