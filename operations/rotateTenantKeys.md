---
type: API Endpoint
title: Rotate the tenant's eIDAS ECDSA signing key pair
description: Rotate the tenant's eIDAS ECDSA signing key pair
resource: https://opendpp-node.eu/api/v1/tenants/rotate-keys
tags:
  - POST
  - eidas-keys
timestamp: 2026-06-18T00:00:00Z
---

`POST /api/v1/tenants/rotate-keys`

**Domain:** [eIDAS Keys](/tags/eidas-keys.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Generates a brand-new ECDSA **prime256v1 (P-256)** key pair for your workspace's eIDAS advanced-seal signing and rotates it into the encrypted database vault, replacing the previous key. No request body is required; a valid JSON body, if sent, is ignored.

What happens:
- The new private key (PKCS#8) is encrypted with AES-256-GCM (per-entry HKDF-derived key; the tenant id is bound as GCM additional authenticated data) and upserted into the vault — the **previous private key is overwritten and unrecoverable**.
- The tenant's published `eidasPublicKey` is updated to the new public key (SPKI PEM), which is also returned in the response.
- A best-effort X.509 identity certificate is minted from the platform seal CA, binding the new key to the tenant's legal name (eIDAS Art. 36(1)(b) creator identification); a certificate-minting failure does **not** fail the rotation (the certificate fields simply stay null until backfilled).

**Operational impact:** rotation does not invalidate existing seals. Each sealed passport embeds the signing public key and certificate chain at sealing time, so previously sealed passports keep verifying with their embedded key material. Passports sealed after rotation use the new key.

**Permission:** `key:write`. Cookie-session clients must send `X-CSRF-Token`; Bearer clients are exempt.

**Rate limit:** global limiter, 100 requests/min/IP.

## Responses

- **200** — Key pair rotated. → [RotateTenantKeysResponse](/schemas/RotateTenantKeysResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Key generation, vault encryption, or database failure. → [Error](/schemas/Error.md), [OperatorMinimalError](/schemas/OperatorMinimalError.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X POST 'https://opendpp-node.eu/api/v1/tenants/rotate-keys'
```

## See also

Schemas: [Error](/schemas/Error.md), [OperatorMinimalError](/schemas/OperatorMinimalError.md), [RotateTenantKeysResponse](/schemas/RotateTenantKeysResponse.md).
