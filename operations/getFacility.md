---
type: API Endpoint
title: Get a single facility
description: Get a single facility
resource: https://opendpp-node.eu/api/v1/facilities/{id}
tags:
  - GET
  - facilities
timestamp: 2026-06-29T00:00:00Z
---

`GET /api/v1/facilities/{id}`

**Domain:** [Facilities](/tags/facilities.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Fetches one facility by id, scoped to your tenant workspace.

**Permission:** `facility:read`.

**Operator-scoped keys:** if the facility belongs to a *different* Economic Operator than the key's scope, the response is **403**. Facilities with no operator (`operatorId: null`) **are** readable by operator-scoped keys here, even though they are excluded from the list endpoint.

Returns the full row including the privileged address fields (`streetAddress`, `city`, `postalCode`) that public passport documents never expose. (Public exposure of a linked facility: the JSON-LD document shows `id`/`gln`/`name`/`activity`/`country`; the AAS export only the GLN, name and country.)

**404 body:** standard envelope with message `Facility <id> not found under your Tenant workspace`.

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

## Responses

- **200** — Facility found. → [FacilityEnvelope](/schemas/FacilityEnvelope.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Forbidden. → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/facilities/{id}'
```

## See also

Schemas: [Error](/schemas/Error.md), [FacilityEnvelope](/schemas/FacilityEnvelope.md).
