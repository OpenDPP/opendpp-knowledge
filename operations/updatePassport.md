---
type: API Endpoint
title: Update passport metadata (versioned to history)
description: Update passport metadata (versioned to history)
resource: https://opendpp-node.eu/api/v1/passports/{id}
tags:
  - PUT
  - passports
timestamp: 2026-06-29T00:00:00Z
---

`PUT /api/v1/passports/{id}`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Replaces the passport's `metadata` (the Merkle root and leaf hashes are recomputed) and snapshots the **previous** metadata into the passport's version history (version = count + 1, `changedBy` = user email or `api-key:<id>`, `changeReason` defaults to `"API Update"`).

**Permission:** `passport:update` (write — subscription gating applies, see 402). Cookie sessions must send `X-CSRF-Token` (double-submit); Bearer/API-key clients are exempt.

**Lookup:** by passport **UUID only** — `productId` aliasing is NOT supported on this endpoint. The passport must belong to an operator bound to your workspace.

**Draft semantics (`draft` flag):**
- `draft: true` **skips ESPR validation entirely** and forces `status: "DRAFT"` — note this also demotes an already-published (ACTIVE/RECALLED/DECOMMISSIONED) passport back to DRAFT.
- `draft` absent/false: `metadata` is validated against the ESPR category rules (400 on failure — see below). If the passport was a DRAFT it is **published**: status becomes `ACTIVE`, a `passport.ingested` webhook is enqueued transactionally (public-redacted JSON-LD payload) and an in-app notification is created best-effort afterwards. Editing an already-published (live) passport leaves its status untouched and enqueues a `passport.updated` webhook instead (same public-redacted JSON-LD payload).

**Validation divergence:** the 400 validation body here contains `errors` but — unlike `POST /api/v1/passports` — **never a `warnings` array**. `friendlyMessage` is localized via the `lang` query parameter or `Accept-Language` (28 languages, default `en`; unsupported values silently fall back).

**Sealed passports are immutable in place:** if `digitalSeal` is set the update is refused with **403** (message: "This passport is sealed and cannot be edited in place — editing would invalidate the eIDAS advanced electronic seal. Re-seal explicitly after any change.").

**Facility:** omit `facilityId` to leave it unchanged; pass `null` or `""` to detach; pass a facility UUID owned by your tenant to attach (400 if not found in your workspace).

**Enrichment:** include the `enrichment` key (even as `null`/`{}`) to overwrite the presentational marketing block; omit it to leave it unchanged. Values are sanitized server-side (truncated/sliced, http(s) URLs only), never rejected.

**Response caveat:** the returned `passport` document is serialized at the **public** redaction tier — `facilityDetails` (and battery restricted keys) appear as `"[REDACTED - Privileged Access Required]"` even though you are the owner.

**Rate limits:** global limiter, 100 req/min/IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Passport UUID. |
| `lang` | query | no | string | Locale for friendlyMessage localization in validation errors. |

## Request body

Schema (required): [PassportUpdateRequest](/schemas/PassportUpdateRequest.md).

```json
{
  "metadata": {
    "category": "textiles",
    "originCountry": "PT",
    "materialComposition": [
      {
        "material": "Organic cotton",
        "percentage": 80
      },
      {
        "material": "Recycled polyester",
        "percentage": 20
      }
    ],
    "fiberComposition": [
      {
        "fiber": "cotton",
        "percentage": 80
      },
      {
        "fiber": "polyester",
        "percentage": 20
      }
    ],
    "careInstructions": "Machine wash cold, line dry",
    "size": "M",
    "facilityDetails": [
      {
        "facilityName": "Aurora Spinning Mill",
        "location": "Porto, PT",
        "activity": "Spinning",
        "eudrPlots": [
          {
            "plotId": "PLOT-001",
            "polygonType": "point",
            "coordinates": [
              {
                "lat": 41.1579,
                "lng": -8.6291
              }
            ]
          }
        ],
        "traceabilityDocs": [
          {
            "documentName": "GOTS scope certificate",
            "documentHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
            "documentUrl": "https://docs.aurora-textiles.example/gots.pdf"
          }
        ]
      }
    ],
    "regulatoryCompliance": {
      "ceMarking": true,
      "certificates": [
        {
          "name": "GOTS",
          "referenceNumber": "GOTS-2026-0042",
          "issuer": "Control Union",
          "validUntil": "2027-05-31"
        }
      ]
    }
  },
  "changeReason": "Updated fiber composition after supplier audit",
  "facilityId": "5b21cf12-7d24-4a8e-9a3c-2f1f4f4f9d10"
}
```

## Responses

- **200** — Updated (or published) passport. → [PassportUpdateResponse](/schemas/PassportUpdateResponse.md)
- **400** — Either a plain Bad Request — body is not a JSON object; metadata missing/not an object; facilityId not found in your workspace (Facility <facilityId> not found… → [Error](/schemas/Error.md), [PassportUpdateValidationError](/schemas/PassportUpdateValidationError.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — History snapshot or transactional update failure returns the standard envelope (message may echo the internal error text or fall back to "Failed to update pass… → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X PUT 'https://opendpp-node.eu/api/v1/passports/{id}' \
  --data '{"metadata":{"category":"textiles","originCountry":"PT","materialComposition":[{"material":"Organic cotton","percentage":80},{"material":"Recycled polyester","percentage":20}],"fiberComposition":[{"fiber":"cotton","percentage":80},{"fiber":"polyester","percentage":20}],"careInstructions":"Machine wash cold, line dry","size":"M","facilityDetails":[{"facilityName":"Aurora Spinning Mill","location":"Porto, PT","activity":"Spinning","eudrPlots":[{"plotId":"PLOT-001","polygonType":"point","coordinates":[{"lat":41.1579,"lng":-8.6291}]}],"traceabilityDocs":[{"documentName":"GOTS scope certificate","d…'
```

## See also

Schemas: [Error](/schemas/Error.md), [PassportUpdateRequest](/schemas/PassportUpdateRequest.md), [PassportUpdateResponse](/schemas/PassportUpdateResponse.md), [PassportUpdateValidationError](/schemas/PassportUpdateValidationError.md).
