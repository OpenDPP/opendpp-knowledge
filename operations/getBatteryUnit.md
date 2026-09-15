---
type: API Endpoint
title: Get one battery unit with its dynamic-data history, as JSON-LD or a rendered page
description: "Returns the unit in the privileged tenant view, as a JSON-LD document (Content-Type: application/ld+json, the default) or a server-rendered page — see *Content negotiation* below: currentState (the latest telemetry snapshot) and dynamicDat…"
resource: https://opendpp-node.eu/api/v1/units/{id}
tags:
  - GET
  - battery-units
generated:
  by: process:emit-okf
  at: 2026-09-03T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /api/v1/units/{id}`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns the unit in the **privileged tenant view**, as a **JSON-LD document** (`Content-Type: application/ld+json`, the default) or a **server-rendered page** — see *Content negotiation* below: `currentState` (the latest telemetry snapshot) and `dynamicData` (the **500 most recent** events, newest first by `recordedAt`) are included; the public `restrictedData` marker is absent. The embedded `ofModel` is the SKU/type passport document rendered in the **owner (unredacted) variant** — legitimate-interest-tier metadata and owner-only keys are NOT masked, unlike the anonymous public document.

**Content negotiation:** the representation is chosen by RFC 7231 §5.3.2 `Accept` q-value negotiation — `text/html` → the server-rendered unit page, localized from `Accept-Language`; anything else, including an absent `Accept`, `*/*` or `application/json`, → JSON-LD. Both forms carry the same privileged tier. `Vary: Accept, Accept-Language` is always set on the 200. The public twin `GET /unit/{id}` additionally negotiates the UNTP credential representations; those are public-tier artifacts and are not offered here.

**Caveat:** this authenticated endpoint does **not** load lineage relations, so `repurposedFrom` is always `null` and `successorUnits` is always `[]` here even when lineage exists; the public resolver view (`GET /unit/{id}`) does resolve them.

**Permission:** `battery:read`. Operator-scoped credentials may only read units whose passport belongs to their Economic Operator (403).

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Responses

- **200** — The unit (privileged view, telemetry included), in the representation Accept selected. → [BatteryUnitJsonLd](/schemas/BatteryUnitJsonLd.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/units/{id}'
```

## See also

Schemas: [BatteryUnitJsonLd](/schemas/BatteryUnitJsonLd.md).
