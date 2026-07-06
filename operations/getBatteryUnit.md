---
type: API Endpoint
title: Get one battery unit as JSON-LD with its dynamic-data history
description: Get one battery unit as JSON-LD with its dynamic-data history
resource: https://opendpp-node.eu/api/v1/units/{id}
tags:
  - GET
  - battery-units
timestamp: 2026-07-04T00:00:00Z
---

`GET /api/v1/units/{id}`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns the unit as a **JSON-LD document** (`Content-Type: application/ld+json`) in the **privileged tenant view**: `currentState` (the latest telemetry snapshot) and `dynamicData` (the **500 most recent** events, newest first by `recordedAt`) are included; the public `restrictedData` marker is absent. The embedded `ofModel` is the SKU/type passport document rendered in the **owner (unredacted) variant** — legitimate-interest-tier metadata and owner-only keys are NOT masked, unlike the anonymous public document.

**Caveat:** this authenticated endpoint does **not** load lineage relations, so `repurposedFrom` is always `null` and `successorUnits` is always `[]` here even when Art. 77(7) lineage exists; the public resolver view (`GET /unit/{id}`) does resolve them.

**Permission:** `battery:read`. Operator-scoped credentials may only read units whose passport belongs to their Economic Operator (403).

**Rate limits:** global limiter only — 100 req/min per IP.

## Responses

- **200** — The unit's JSON-LD document (privileged view, telemetry included). → [BatteryUnitJsonLd](/schemas/BatteryUnitJsonLd.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/units/{id}'
```

## See also

Schemas: [BatteryUnitJsonLd](/schemas/BatteryUnitJsonLd.md).
