---
type: API Endpoint
title: Serialise individual battery units under a passport (bulk, up to 200)
description: Serialise individual battery units under a passport (bulk, up to 200)
resource: https://opendpp-node.eu/api/v1/passports/{passportId}/units
tags:
  - POST
  - battery-units
timestamp: 2026-06-26T00:00:00Z
---

`POST /api/v1/passports/{passportId}/units`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Creates one or many **individual physical battery units** (Battery Reg. (EU) 2023/1542 Art. 77(2)) under a SKU/type-level passport. Send either a single unit object or `{"units": [...]}` with **at most 200 items** (if `units` is present and an array it is used; otherwise the whole body is treated as one unit).

**Permission:** `battery:write`. Bearer API key (`op_dpp_token_…`) or session JWT; cookie-session clients must send `X-CSRF-Token`. Operator-scoped credentials may only serialise under passports of their own Economic Operator (403). Write operations pass subscription gating (402) and optional tenant MFA enforcement (403).

**Per-item validation (collected as plain-string errors, not a rejection of the whole batch):** `serialNumber` is trimmed then must match `^[A-Za-z0-9._-]{1,20}$` (GS1 AI-21 recommends ≤ 20 chars); `status` must be a valid unit status; `manufacturedAt` must be Date-parseable; duplicate `(passport, serialNumber)` pairs are skipped with *"A unit with this serial already exists for this passport"*. Each created unit gets a per-unit GS1 Digital Link URI `/{01|8003}/{productId}/21/{serialNumber}` carrying the **real physical serial** in AI-21.

**Predecessor linkage (Art. 77(7) repurpose/remanufacture):** `predecessorUnitId` must reference an existing unit **in your tenant** (any passport). A recycled predecessor (`ceasedAt` set) is refused — its passport has ceased to exist (Art. 77(8)). (The check keys on `ceasedAt`, which only the events-route `RECYCLED` transition stamps — a unit merely *created* with status `RECYCLED` has no `ceasedAt` and is still accepted as a predecessor.) In one transaction the new unit is created, an append-only `STATUS_CHANGE` event (`{status, successorUnitId, successorSerial}` payload) is written to the predecessor, and the predecessor's status is set to `predecessorStatus` (default `REPURPOSED`; only `REPURPOSED|REMANUFACTURED|REUSED` allowed).

**Partial success:** the response is **201 when at least one unit was created**; skipped items are listed in `errors`. If *every* item failed you get **400 `Serialisation Failed`** with the same string array. A `batteryunit.created` audit event and a tenant notification are emitted on success.

**Rate limits:** global limiter only — 100 req/min per IP (`x-ratelimit-*` headers).

## Request body

Schema (required): [SerializeBatteryUnitsRequest](/schemas/SerializeBatteryUnitsRequest.md).

```json
{
  "units": [
    {
      "serialNumber": "BATT-2026-000451",
      "manufacturedAt": "2026-05-02T08:00:00.000Z"
    },
    {
      "serialNumber": "BATT-2026-000452",
      "status": "IN_SERVICE",
      "predecessorUnitId": "5a1c9e7d-3b2f-4c8a-9e6d-7f0b1a2c3d4e",
      "predecessorStatus": "REMANUFACTURED"
    }
  ]
}
```

## Responses

- **201** — At least one unit was serialised. → [SerializeBatteryUnitsResponse](/schemas/SerializeBatteryUnitsResponse.md)
- **400** — Three shapes: (1) standard Bad Request triple when the body is not a JSON object, the units array is empty, or more than 200 units are sent; (2) Serialisation… → [BatteryUnitSerialisationFailedError](/schemas/BatteryUnitSerialisationFailedError.md), [Error](/schemas/Error.md), [FastifyDefaultBadRequest](/schemas/FastifyDefaultBadRequest.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — EITHER the workspace subscription is lapsed / its grace period expired (read operations are unaffected), OR (on passport-crea… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/passports/{passportId}/units' \
  --data '{"units":[{"serialNumber":"BATT-2026-000451","manufacturedAt":"2026-05-02T08:00:00.000Z"},{"serialNumber":"BATT-2026-000452","status":"IN_SERVICE","predecessorUnitId":"5a1c9e7d-3b2f-4c8a-9e6d-7f0b1a2c3d4e","predecessorStatus":"REMANUFACTURED"}]}'
```

## See also

Schemas: [BatteryUnitSerialisationFailedError](/schemas/BatteryUnitSerialisationFailedError.md), [Error](/schemas/Error.md), [FastifyDefaultBadRequest](/schemas/FastifyDefaultBadRequest.md), [SerializeBatteryUnitsRequest](/schemas/SerializeBatteryUnitsRequest.md), [SerializeBatteryUnitsResponse](/schemas/SerializeBatteryUnitsResponse.md).
