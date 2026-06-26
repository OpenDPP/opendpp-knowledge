---
type: API Endpoint
title: Delete a facility (passports are unlinked, never deleted)
description: Delete a facility (passports are unlinked, never deleted)
resource: https://opendpp-node.eu/api/v1/facilities/{id}
tags:
  - DELETE
  - facilities
timestamp: 2026-06-26T00:00:00Z
---

`DELETE /api/v1/facilities/{id}`

**Domain:** [Facilities](/tags/facilities.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Removes the facility master-data row. **Passports are never deleted by this operation**: `Passport.facilityId` is a `SET NULL` foreign key, so any passports referencing the facility simply lose their UFI link (`facilityId` becomes `null`) and remain fully intact and publicly resolvable.

**Permission:** `facility:write`. Cookie sessions must send `X-CSRF-Token`; write permissions are subscription-gated (**402** when lapsed).

**Operator-scoped keys:** deleting a facility that belongs to a different Economic Operator returns **403**; facilities with `operatorId: null` are deletable.

Emits a `facility.deleted` audit event and an in-app notification. **404 body:** standard envelope with message `Facility <id> not found under your Tenant workspace`.

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

## Responses

- **200** — Facility deleted. → [FacilityDeletedEnvelope](/schemas/FacilityDeletedEnvelope.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — EITHER the workspace subscription is lapsed / its grace period expired (read operations are unaffected), OR (on passport-crea… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Forbidden. → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/api/v1/facilities/{id}'
```

## See also

Schemas: [Error](/schemas/Error.md), [FacilityDeletedEnvelope](/schemas/FacilityDeletedEnvelope.md).
