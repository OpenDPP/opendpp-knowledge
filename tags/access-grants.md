---
type: Reference
title: Access Grants
description: Capability tokens implementing tiered access (Battery Regulation Art.
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - access-grants
timestamp: 2026-06-29T00:00:00Z
---

Capability tokens implementing tiered access (Battery Regulation Art. 77(9) legitimate-interest access): issue, approve, deny and revoke `dpp_li_…` / `dpp_auth_…` tokens. Third parties request access via the hosted request page; granted tokens unlock restricted fields on the public resolution endpoints (Bearer or `?grant=`).

## Operations

- [listGrants](/operations/listGrants.md) — `GET /api/v1/grants` — List access grants and pending access requests
- [createGrant](/operations/createGrant.md) — `POST /api/v1/grants` — Issue a legitimate-interest access grant directly
- [approveGrantRequest](/operations/approveGrantRequest.md) — `POST /api/v1/grants/{id}/approve` — Approve a pending access request and mint its token
- [denyGrantRequest](/operations/denyGrantRequest.md) — `POST /api/v1/grants/{id}/deny` — Deny a pending access request
- [revokeGrant](/operations/revokeGrant.md) — `DELETE /api/v1/grants/{id}` — Revoke an access grant (soft revocation)
