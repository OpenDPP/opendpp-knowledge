---
type: Playbook
title: Authentication & tenancy
description: Authenticate with a tenant API key as a Bearer token; tenant identity is token-bound.
resource: https://opendpp-node.eu/api-reference
tags:
  - authentication
  - api keys
  - tenancy
  - security
timestamp: 2026-06-18T00:00:00Z
---

Authenticate with a tenant **API key** sent as a Bearer token:

```
Authorization: Bearer op_dpp_token_…
```

Keys are created in the Client Console (Developers → API keys), are shown **once** at creation, carry
a role plus optional narrowed permissions and optional expiry, and can be revoked at any time.
API-key clients are exempt from CSRF requirements. Public endpoints (the
[Public Resolution](/tags/public-resolution.md) tag, the public validators, and the audit verifier)
need no credentials — see [public access tiers](/guides/public-access-tiers.md).

# Tenancy

Tenant identity is **token-bound** — it is derived from your API key, never from the request host.
The same paths work on the apex host (`https://opendpp-node.eu`) and on tenant workspace hosts
(`https://<workspace>.opendpp-node.eu`); when a workspace host is used it must match the key's
tenant, or the request is rejected with `403`.

# Check your identity

Call [whoami](/operations/whoami.md) to see the workspace, role, permissions, operator scope, and
passport usage against your tier quota for the presented key.

# Write-operation gates

Write operations are subject to subscription gating (**402** when a workspace subscription has
lapsed) and, where the workspace enforces it, MFA (**403**). Cookie-authenticated browser sessions
must additionally send the `X-CSRF-Token` double-submit header; Bearer API-key clients do not.
