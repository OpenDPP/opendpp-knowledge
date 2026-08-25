---
type: Reference
title: Rate limits
description: The per-key plan ladder, the per-IP ceiling, and which of the two bites first.
resource: https://opendpp-node.eu/api-reference
tags:
  - rate limits
  - throttling
  - headers
  - tiers
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Two limits apply, and which one binds depends on how you call.

## Per API key (authenticated calls)

| Plan | Per-key budget |
|------|----------------|
| Growth | **120 requests/min** |
| Scale | **600 requests/min** |
| Enterprise | **unlimited** |

A second ceiling of **3x that rate** applies across all of a workspace's
keys together, so issuing more keys divides throughput fairly between your own systems rather than
multiplying it. Plans below Growth do not include API access. Exceeding either budget returns `429` with a `Retry-After` header.

## Per IP (all traffic)

| Surface | Limit | Headers |
|---------|-------|---------|
| Anonymous, all endpoints | **100 requests/min per IP** (authenticated calls sit on a higher ceiling) | `x-ratelimit-limit`, `x-ratelimit-remaining`, `x-ratelimit-reset` |
| Public passport resolution | **30 requests/min per IP** | none |
| Public validator | **10 requests/min per IP** | none |
| GS1 decode / check-digit helpers, anonymous | **2 requests/min per IP** | `x-ratelimit-*` |

Every plan that can reach the API sits at or above the anonymous figure, so an authenticated caller
never meets a stricter limit than the per-IP number.

Stay under these limits with client-side queueing. On `429`, back off until `Retry-After` (or the
`x-ratelimit-*` window, where present) has elapsed. With `Accept: text/html`, the public resolver
returns an HTML page on `429` instead of JSON.

A `429` never indicates a credential problem — an invalid or revoked key returns `401`, so do not
rotate a key in response to rate limiting.
