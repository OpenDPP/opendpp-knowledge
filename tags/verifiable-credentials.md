---
type: Reference
title: Verifiable Credentials
description: "Issuer trust endpoints that back the UNTP Verifiable Credential representations: the workspace's did:web DID document (public keys only) and its W3C Bitstring Status List for revocation."
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - verifiable-credentials
timestamp: 2026-06-28T00:00:00Z
---

Issuer trust endpoints that back the UNTP Verifiable Credential representations: the workspace's `did:web` DID document (public keys only) and its W3C Bitstring Status List for revocation. Unauthenticated; resolve these to verify and revocation-check any OpenDPP-issued credential.

## Operations

- [getTenantDidDocument](/operations/getTenantDidDocument.md) — `GET /tenants/{tenantId}/did.json` — Resolve a tenant's did:web DID document
- [getTenantRevocationStatusList](/operations/getTenantRevocationStatusList.md) — `GET /tenants/{tenantId}/status/revocation` — Tenant revocation status list (W3C Bitstring Status List)
