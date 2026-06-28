---
type: API Endpoint
title: Resolve a tenant's did:web DID document
description: Resolve a tenant's did:web DID document
resource: https://opendpp-node.eu/tenants/{tenantId}/did.json
tags:
  - GET
  - verifiable-credentials
timestamp: 2026-06-28T00:00:00Z
---

`GET /tenants/{tenantId}/did.json`

**Domain:** [Verifiable Credentials](/tags/verifiable-credentials.md)  
**Authentication:** **Public** — no authentication required.

Resolves the issuing workspace's `did:web` DID document (`application/did+json`). The DID is `did:web:opendpp-node.eu:tenants:{tenantId}`, which per the did:web method dereferences here. The document exposes **only public key material** — the workspace's eIDAS public key(s) as `JsonWebKey2020` verification methods, each with a stable `#key-<index>` id matching the `kid` of the credentials it signs.

Use it to verify any OpenDPP-issued Verifiable Credential (`Accept: application/vc+jwt`, `application/vc+ld+json`, or `application/dc+sd-jwt` on the public resolution endpoints) without out-of-band key exchange. Both current and retired keys are published and listed in `assertionMethod`/`authentication`, so credentials issued before a key rotation still verify; new credentials always use the current key. The optional `name` is the issuer's authoritative legal name (the same value used in every credential's `issuer.name`).

No authentication, no permission (public endpoint). Subject only to the global platform rate limit (100 req/min/IP). A workspace that has never provisioned a signing key returns 404. Never returns private key material.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `tenantId` | path | yes | string | The issuing workspace (tenant) id — the {tenantId} of its did:web:opendpp-node.eu:tenants:{tenantId} DID. |

## Responses

- **200** — The tenant's did:web DID document (public keys only). → [DidWebDocument](/schemas/DidWebDocument.md)
- **404** — No DID document for this tenant (the workspace has not provisioned a signing key). → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/tenants/{tenantId}/did.json'
```

## See also

Schemas: [DidWebDocument](/schemas/DidWebDocument.md), [Error](/schemas/Error.md).
