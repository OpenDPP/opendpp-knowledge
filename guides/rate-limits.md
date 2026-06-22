---
type: Reference
title: Rate limits
description: Per-IP request limits and the response headers that advertise them.
resource: https://opendpp-node.eu/api-reference
tags:
  - rate limits
  - throttling
  - headers
timestamp: 2026-06-22T00:00:00Z
---

| Surface | Limit | Headers |
|---------|-------|---------|
| Global (all endpoints) | **100 requests/min per IP** (higher for verified crawlers) | `x-ratelimit-limit`, `x-ratelimit-remaining`, `x-ratelimit-reset` |
| Public passport resolution | **30 requests/min per IP** | none |
| Public validator | **10 requests/min per IP** | none |

Stay under these limits with client-side queueing. On `429`, inspect the `x-ratelimit-*` headers
(where present) and back off until the indicated window resets. With `Accept: text/html`, the public
resolver returns an HTML page on `429` instead of JSON.
