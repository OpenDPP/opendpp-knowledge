---
type: API Endpoint
title: Apply the tenant's eIDAS advanced electronic seal
description: Apply the tenant's eIDAS advanced electronic seal
resource: https://opendpp-node.eu/api/v1/passports/{id}/seal
tags:
  - POST
  - passports
timestamp: 2026-06-29T00:00:00Z
---

`POST /api/v1/passports/{id}/seal`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Signs the passport's Merkle root (SHA-256 tree over the key-sorted top-level `metadata` entries) with the tenant's vault-held **ECDSA P-256 (prime256v1)** private key, producing an eIDAS **advanced** electronic seal (this is a local cryptographic seal — NOT a Commission/EU-registry registration, and NOT a qualified seal). The base64 signature is stored as `digitalSeal` together with the signing public key (PEM), the X.509 chain binding the key to the tenant's legal identity (surfaced as `proof.x5c`, leaf first, base64 DER), and — **best-effort, opt-in** — an RFC 3161 trusted timestamp over SHA-256(merkleRoot) (`proof.rfc3161`; a TSA outage or missing configuration never blocks sealing, the field is simply absent).

A `passport.sealed` webhook is enqueued transactionally with the update (payload: the public-redacted JSON-LD document including the full `proof` block).

**Permission:** `passport:seal` (write — subscription gating applies, see 402). Cookie sessions must send `X-CSRF-Token`; Bearer/API-key clients are exempt.

**Lookup:** passport **UUID or `productId`** (UUID tried first), restricted to the passport's **owning tenant**.

**Behavioral caveats:**
- The route does **not** modify the passport's `status` — despite the success message's "and published" wording, a DRAFT stays a DRAFT after sealing. Publish via `PUT /api/v1/passports/{id}` (validated save) instead.
- Re-sealing an already-sealed passport is allowed and **overwrites** the previous seal/timestamp.
- Once sealed, in-place metadata edits are refused (403 on `PUT /api/v1/passports/{id}`).
- Requires the tenant's eIDAS key pair to exist — otherwise 400.
- The returned `passport` document is serialized at the **public** redaction tier (masked keys keep their true leaf hashes in `proof.redactedLeaves`, so the seal stays offline-verifiable after redaction).

**Rate limits:** global limiter, 100 req/min/IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Passport UUID or caller-supplied productId (GTIN-14 / GRAI / SKU). |

## Responses

- **200** — Passport sealed. → [PassportSealResponse](/schemas/PassportSealResponse.md)
- **400** — Missing identifier, or the tenant has no eIDAS key pair configured. → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X POST 'https://opendpp-node.eu/api/v1/passports/{id}/seal'
```

## See also

Schemas: [Error](/schemas/Error.md), [PassportSealResponse](/schemas/PassportSealResponse.md).
