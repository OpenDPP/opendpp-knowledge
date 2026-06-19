---
type: API Endpoint
title: Update facility master data (GLN is immutable)
description: Update facility master data (GLN is immutable)
resource: https://opendpp-node.eu/api/v1/facilities/{id}
tags:
  - PUT
  - facilities
timestamp: 2026-06-19T00:00:00Z
---

`PUT /api/v1/facilities/{id}`

**Domain:** [Facilities](/tags/facilities.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Partially updates a facility's master data. **The GLN itself is immutable** — it is the resolvable UFI identifier; a `gln` key in the body is silently ignored (as is `operatorId` — the operator binding cannot be changed here).

**Permission:** `facility:write`. Cookie sessions must send `X-CSRF-Token`; write permissions are subscription-gated (**402** when lapsed).

**Field semantics (all optional):**
- `name` — applied only when a non-empty string; an empty/whitespace or non-string value is silently ignored (`name` can never be cleared).
- `activity`, `streetAddress`, `city`, `postalCode` — applied whenever the key is *present* in the body: the value is stringified and trimmed; anything that trims to empty (`null`, `""`, or a whitespace-only string) **clears the field to null** — the same normalization as POST.
- `country` — when present as a string it must match `^[A-Za-z]{2}$` (else **400**) and is stored uppercased; a non-string value is silently ignored.

An empty body (or one with no recognized fields) is accepted: the response is **200** with the otherwise-unchanged row, though `updatedAt` is still bumped.

**Operator-scoped keys:** updating a facility that belongs to a different Economic Operator returns **403**; facilities with `operatorId: null` are updatable.

Emits a `facility.updated` audit event recording the changed fields.

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

## Request body

Schema: [FacilityUpdateRequest](/schemas/FacilityUpdateRequest.md).

```json
{
  "name": "Munich Cell Assembly Plant — Hall B",
  "activity": "Final manufacturing",
  "streetAddress": "Werkstrasse 14",
  "country": "DE"
}
```

## Responses

- **200** — Updated facility (full row). → [FacilityEnvelope](/schemas/FacilityEnvelope.md)
- **400** — country was present as a string but is not a 2-letter ISO code. → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Forbidden. → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X PUT 'https://opendpp-node.eu/api/v1/facilities/{id}' \
  --data '{"name":"Munich Cell Assembly Plant — Hall B","activity":"Final manufacturing","streetAddress":"Werkstrasse 14","country":"DE"}'
```

## See also

Schemas: [Error](/schemas/Error.md), [FacilityEnvelope](/schemas/FacilityEnvelope.md), [FacilityUpdateRequest](/schemas/FacilityUpdateRequest.md).
