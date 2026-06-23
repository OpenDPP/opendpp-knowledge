---
type: Reference
title: Public access tiers
description: How one resolution URL serves tiered views via capability tokens (Battery Reg. Art. 77(9)).
resource: https://opendpp-node.eu/api-reference
tags:
  - access
  - tiers
  - capability tokens
  - legitimate interest
timestamp: 2026-06-23T00:00:00Z
---

Public resolution endpoints serve **tiered** views of the same URL:

- **Public tier** — anonymous callers see the public, redacted view.
- **Legitimate-interest tier** — holders of a `dpp_li_…` capability token see the restricted fields
  unlocked under Battery Regulation Art. 77(9) (e.g. for batteries, Annex XIII parts 2–4:
  `detailedPerformance`, `lifecycleAndInUse`, `circularityAndDisassembly`).
- **Authority tier** — holders of a `dpp_auth_…` token see the authority view.
- **Owner tier** — the issuing tenant's own credentials see everything.

Capability tokens are presented as a Bearer token or a `?grant=` query parameter. Third parties
request access via the hosted request page; issuers manage grants through the
[Access Grants](/tags/access-grants.md) tag ([createGrant](/operations/createGrant.md),
[approveGrantRequest](/operations/approveGrantRequest.md), [revokeGrant](/operations/revokeGrant.md)).
Privileged fields such as facility street addresses are never published at the public tier.
