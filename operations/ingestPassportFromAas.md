---
type: API Endpoint
title: Ingest a passport from an AAS JSON Environment (seal-verified)
description: Ingest a passport from an AAS JSON Environment (seal-verified)
resource: https://opendpp-node.eu/api/v1/passports/aas/ingest
tags:
  - POST
  - passports
timestamp: 2026-06-28T00:00:00Z
---

`POST /api/v1/passports/aas/ingest`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Ingests (creates **or updates**) a Digital Product Passport from an Industry-4.0 **Asset Administration Shell (AAS) JSON Environment** — the same format produced by OpenDPP's own AAS export.

**Permission:** `passport:create` (Bearer API key or session JWT + CSRF for cookie sessions; subscription gating → **402**).

**Rate limit:** global 100 requests/min per IP. **Body limit: 262,144 bytes (256 KiB)** → **413**.

**Parsing.** The environment must contain a `submodels` array including a submodel with `idShort: "ComplianceMetadata"`, whose `submodelElements` are parsed back into the metadata object; missing it fails 400 (`Ingestion Failed`). `productId` is resolved from `metadata.gtin` || `metadata.grai` || `metadata.productId` || the first shell's `assetInformation.specificAssetIds` entry named `productId` — unresolvable → 400 `Bad Request`. The parsed metadata then passes the full ESPR category validation **plus the EPCIS traceability audit** (400 `Validation Failed` with `errors[]`).

**eIDAS seal verification.** If the environment embeds an `eidasVerificationSeal` submodel (`digitalSealHash` / `cryptographicSignature` / `pemPublicKey` elements), the seal is verified against **your tenant's server-held eIDAS public key** — never the key embedded in the request (self-signing is rejected by design). An embedded seal that fails verification → **400 `Signature Verification Failed`**; this includes the case where your workspace holds no matching key. `isSealed`/`signatureVerified` in the 201 echo the outcome (both `false` for unsealed documents).

**Upsert semantics.** If a passport already exists for the resolved `(productId, operator)` pair: a **sealed** existing passport refuses re-ingestion (**403** — re-seal explicitly after changes); an unsealed one has its metadata, Merkle tree and seal fields **replaced**, still answering **201**. Operator resolution: operator-scoped API keys use their own operator and **403** when that operator is not bound to your workspace; otherwise the workspace's first bound operator is used; none bound → 400.

**Caveats:**
- **NO webhook is emitted** — unlike `POST /api/v1/passports` and `/bulk`, AAS ingestion never enqueues `passport.ingested` (or any other event).
- The catch-all error path returns **400 `Ingestion Failed`** with the underlying parse/processing message — even for internal failures (this handler does not emit its own 500).
- Validation `friendlyMessage` localization via `?lang=` / `Accept-Language`; category-validity errors carry no `friendlyMessage`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `lang` | query | no | string | Locale for localized friendlyMessage validation texts (en, bg, hr, cs, da, nl, et, fi, fr, de, el, hu, ga, it, lv, lt, mt, pl, pt, ro, sk, sl, es, sv, no, is,… |

## Request body

Schema (required): [AasEnvironmentInput](/schemas/AasEnvironmentInput.md).

## Responses

- **201** — Passport created or (if it existed unsealed) updated from the AAS environment. → [AasIngestCreated](/schemas/AasIngestCreated.md)
- **400** — Four variants share this status: Bad Request (non-object body, unresolvable productId, no bound operator), Signature Verification Failed (embedded seal invalid… → [Error](/schemas/Error.md), [ValidationErrorItem](/schemas/ValidationErrorItem.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **413** — Body exceeds the 262,144-byte (256 KiB) route body limit.
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X POST 'https://opendpp-node.eu/api/v1/passports/aas/ingest'
```

## See also

Schemas: [AasEnvironmentInput](/schemas/AasEnvironmentInput.md), [AasIngestCreated](/schemas/AasIngestCreated.md), [Error](/schemas/Error.md), [ValidationErrorItem](/schemas/ValidationErrorItem.md).
