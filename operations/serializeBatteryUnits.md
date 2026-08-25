---
type: API Endpoint
title: Serialise individual battery units under a passport (bulk, up to 200)
description: Creates one or many individual physical battery units (EU Battery Regulation) under a SKU/type-level passport.
resource: https://opendpp-node.eu/api/v1/passports/{passportId}/units
tags:
  - POST
  - battery-units
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`POST /api/v1/passports/{passportId}/units`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Creates one or many **individual physical battery units** (EU Battery Regulation) under a SKU/type-level passport. Send either a single unit object or `{"units": [...]}` with **at most 200 items** (if `units` is present and an array it is used; otherwise the whole body is treated as one unit).

**Permission:** `battery:write`. Bearer API key (`op_dpp_token_…`) or session JWT; cookie-session clients must send `X-CSRF-Token`. Operator-scoped credentials may only serialise under passports of their own Economic Operator (403). Write operations pass subscription gating (402) and optional tenant MFA enforcement (403).

**Per-item validation (collected as plain-string errors, not a rejection of the whole batch):** `serialNumber` is trimmed then must match `^[A-Za-z0-9._-]{1,20}$` (a URL-safe subset of GS1 AI-21 CSET 82, ≤ 20 chars) AND is validated to full AI-21 conformance by GS1's authoritative engine — a GTIN-keyed unit through its full Digital Link, a non-GTIN unit through its AI-21 serial value; `status` must be a valid unit status; `manufacturedAt` must be Date-parseable; duplicate `(passport, serialNumber)` pairs are skipped with *"A unit with this serial already exists for this passport"*. Each created unit gets a per-unit GS1 Digital Link URI `/{01|8003}/{productId}/21/{serialNumber}` carrying the **real physical serial** in AI-21.

**Predecessor linkage (repurpose/remanufacture):** `predecessorUnitId` must reference an existing unit **in your tenant** (any passport). A recycled predecessor (`ceasedAt` set) is refused — its passport has ceased to exist. (A unit *created* with status `RECYCLED` is ceased from birth — `ceasedAt` is stamped at creation — and is refused as a predecessor exactly like one recycled via the events route.) In one transaction the new unit is created, an append-only `STATUS_CHANGE` event (`{status, successorUnitId, successorSerial}` payload) is written to the predecessor, and the predecessor's status is set to `predecessorStatus` (default `REPURPOSED`; only `REPURPOSED|REMANUFACTURED|REUSED` allowed).

**Partial success:** the response is **201 when at least one unit was created**; skipped items are listed in `errors`. If *every* item failed you get **400 `Serialisation Failed`** with the same string array. A `batteryunit.created` audit event and a tenant notification are emitted on success.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

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
- **400** — Three shapes: (1) standard Bad Request triple when the body is not a JSON object, the units array is empty, or more than 200 units are sent; (2) Serialisation… → [BatteryUnitSerialiseBadRequest](/schemas/BatteryUnitSerialiseBadRequest.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
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

Schemas: [BatteryUnitSerialiseBadRequest](/schemas/BatteryUnitSerialiseBadRequest.md), [SerializeBatteryUnitsRequest](/schemas/SerializeBatteryUnitsRequest.md), [SerializeBatteryUnitsResponse](/schemas/SerializeBatteryUnitsResponse.md).
