---
type: API Endpoint
title: Append a batch of telemetry events to a battery unit
description: Appends up to 500 append-only dynamic-data records to one unit in a single request — the batch venue for backfilling a fleet's telemetry.
resource: https://opendpp-node.eu/api/v1/units/{id}/events/bulk
tags:
  - POST
  - battery-units
generated:
  by: process:emit-okf
  at: 2026-08-09T00:00:00Z
---

`POST /api/v1/units/{id}/events/bulk`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Appends up to **500** append-only dynamic-data records to one unit in a single request — the batch venue for backfilling a fleet's telemetry. **Telemetry only:** a record carrying `status` is refused per-item; a status transition is a lifecycle decision and goes through `POST /api/v1/units/{id}/events` one event at a time.

**Permission:** `battery:write`. Cookie-session clients must send `X-CSRF-Token`. Operator-scoped credentials may only write to units whose passport belongs to their Economic Operator (403). Write operations pass subscription gating (402) and optional tenant MFA enforcement (403). A terminal (`RECYCLED`) unit refuses the whole batch (400 `Terminal Unit Status`).

**Per-record validation (collected as `[index]`-prefixed strings in `errors`, not a rejection of the whole batch):** the same field checks as the single-event endpoint — `eventType` required and valid, numeric ranges, Date-parseable `recordedAt` (defaults to server time when omitted) — plus the physics consistency checks, judged in chronological order across the batch and the unit's recorded history, so a reading that only conflicts with another batch member is caught too.

**Partial success:** the response is **201 when at least one record was accepted**; skipped items are listed in `errors`. If *every* item failed you get **400** `Bulk Event Ingest Failed` with the same string array.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `Idempotency-Key` | header | no | string | Optional client idempotency key (≤255 characters, no control characters). |

## Request body

Schema (required): [BulkBatteryUnitEventsRequest](/schemas/BulkBatteryUnitEventsRequest.md).

```json
{
  "events": [
    {
      "eventType": "SOH_MEASUREMENT",
      "stateOfHealth": 96.8,
      "cycleCount": 140,
      "recordedAt": "2026-06-12T09:41:00.000Z"
    },
    {
      "eventType": "CHARGE_CYCLE",
      "cycleCount": 141,
      "recordedAt": "2026-06-13T18:05:00.000Z"
    }
  ]
}
```

## Responses

- **201** — At least one record was accepted. → [BulkBatteryUnitEventsResponse](/schemas/BulkBatteryUnitEventsResponse.md)
- **400** — Invalid body envelope (missing/empty events, more than 500 items, malformed Idempotency-Key), a terminal unit (Terminal Unit Status), or every record failed (B… → [Error](/schemas/Error.md)
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
  -X POST 'https://opendpp-node.eu/api/v1/units/{id}/events/bulk' \
  --data '{"events":[{"eventType":"SOH_MEASUREMENT","stateOfHealth":96.8,"cycleCount":140,"recordedAt":"2026-06-12T09:41:00.000Z"},{"eventType":"CHARGE_CYCLE","cycleCount":141,"recordedAt":"2026-06-13T18:05:00.000Z"}]}'
```

## See also

Schemas: [BulkBatteryUnitEventsRequest](/schemas/BulkBatteryUnitEventsRequest.md), [BulkBatteryUnitEventsResponse](/schemas/BulkBatteryUnitEventsResponse.md), [Error](/schemas/Error.md).
