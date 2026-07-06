---
type: API Endpoint
title: "Pre-flight: validate battery-unit identifiers without persisting (#263)"
description: "Pre-flight: validate battery-unit identifiers without persisting (#263)"
resource: https://opendpp-node.eu/api/v1/passports/{passportId}/units/validate
tags:
  - POST
  - battery-units
timestamp: 2026-07-04T00:00:00Z
---

`POST /api/v1/passports/{passportId}/units/validate`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

NON-MUTATING pre-flight for bulk unit import. Runs the SAME engine-backed AI-21 / GS1 Digital Link conformance + field checks as `POST /api/v1/passports/{passportId}/units` and returns a per-item verdict — **persisting nothing**. Send a single unit or `{"units": [...]}` (≤200). Lets a bulk importer ask "would these serials be GS1-conformant?" before committing a batch.

**Permission:** `battery:write` (gated as the write permission, like other validate-only checks; subscription gating → 402). **Validation:** `serialNumber` charset/length (`^[A-Za-z0-9._-]{1,20}$`, a URL-safe subset of GS1 AI-21 CSET 82) PLUS authoritative GS1-engine conformance for EVERY unit — a GTIN-keyed passport's unit Digital Link must parse cleanly through the engine, and a non-GTIN passport's AI-21 serial VALUE is validated through the same engine (CSET-82 charset + length); `status` must be a valid unit status; `manufacturedAt` must be Date-parseable. Predecessor linkage is NOT checked here (a persistence-time concern). The verdict order matches the input order.

**Rate limits:** global limiter only — 100 req/min per IP.

## Request body

Schema (required): [SerializeBatteryUnitsRequest](/schemas/SerializeBatteryUnitsRequest.md).

```json
{
  "units": [
    {
      "serialNumber": "BATT-2026-000451"
    },
    {
      "serialNumber": "bad serial!"
    }
  ]
}
```

## Responses

- **200** — Per-item conformance verdicts in input order (nothing persisted).
- **400** — Invalid body envelope (not a JSON object, empty units, or more than 200 items). → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — Passport not found under your tenant workspace. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/passports/{passportId}/units/validate' \
  --data '{"units":[{"serialNumber":"BATT-2026-000451"},{"serialNumber":"bad serial!"}]}'
```

## See also

Schemas: [Error](/schemas/Error.md), [SerializeBatteryUnitsRequest](/schemas/SerializeBatteryUnitsRequest.md).
