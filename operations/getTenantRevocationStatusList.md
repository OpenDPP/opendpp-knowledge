---
type: API Endpoint
title: Tenant revocation status list (W3C Bitstring Status List)
description: Tenant revocation status list (W3C Bitstring Status List)
resource: https://opendpp-node.eu/tenants/{tenantId}/status/revocation
tags:
  - GET
  - verifiable-credentials
timestamp: 2026-06-29T00:00:00Z
---

`GET /tenants/{tenantId}/status/revocation`

**Domain:** [Verifiable Credentials](/tags/verifiable-credentials.md)  
**Authentication:** **Public** — no authentication required.

Serves the workspace's W3C **Bitstring Status List** as a signed enveloping `vc+jwt` (`application/vc+jwt`) — a `BitstringStatusListCredential` whose GZIP+base64 encoded bitstring sets the bit of every passport whose status is RECALLED or DECOMMISSIONED. An OpenDPP-issued DPP credential's `credentialStatus.statusListCredential` points here; a verifier fetches this list and checks the bit at the credential's `statusListIndex` to determine whether it has been revoked. Signed by the workspace's current key (stable `kid`), verifiable via the DID document at `/tenants/{tenantId}/did.json`.

No authentication, no permission (public endpoint). Subject only to the global platform rate limit (100 req/min/IP). A workspace with no signing key returns 404.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `tenantId` | path | yes | string | The issuing workspace (tenant) id. |

## Responses

- **200** — The signed BitstringStatusListCredential as a compact vc+jwt (JWS string).
- **404** — No status list for this tenant (unknown workspace or no signing key). → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/tenants/{tenantId}/status/revocation'
```

## See also

Schemas: [Error](/schemas/Error.md).
