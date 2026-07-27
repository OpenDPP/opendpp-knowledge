---
type: API Endpoint
title: Delete a facility (passports are unlinked, never deleted)
description: Removes the facility master-data row.
resource: https://opendpp-node.eu/api/v1/facilities/{id}
tags:
  - DELETE
  - facilities
generated:
  by: process:emit-okf
  at: 2026-07-27T00:00:00Z
---

`DELETE /api/v1/facilities/{id}`

**Domain:** [Facilities](/tags/facilities.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Removes the facility master-data row. **Passports are never deleted by this operation**: `Passport.facilityId` is a `SET NULL` foreign key, so any passports referencing the facility simply lose their UFI link (`facilityId` becomes `null`) and remain fully intact and publicly resolvable.

**Permission:** `facility:write`. Cookie sessions must send `X-CSRF-Token`; write permissions are subscription-gated (**402** when lapsed).

**Operator-scoped keys:** deleting a facility that belongs to a different Economic Operator returns **403**; facilities with `operatorId: null` are deletable.

Emits a `facility.deleted` audit event and an in-app notification. **404 body:** standard envelope with message `Facility <id> not found under your Tenant workspace`.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is raised for `Authorization`-bearing requests, so it is not the binding limit here. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Responses

- **200** — Facility deleted. → [FacilityDeletedEnvelope](/schemas/FacilityDeletedEnvelope.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Forbidden. → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/api/v1/facilities/{id}'
```

## See also

Schemas: [Error](/schemas/Error.md), [FacilityDeletedEnvelope](/schemas/FacilityDeletedEnvelope.md).
