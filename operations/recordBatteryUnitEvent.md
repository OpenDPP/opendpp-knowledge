---
type: API Endpoint
title: Append an immutable telemetry event to a battery unit
description: Append an immutable telemetry event to a battery unit
resource: https://opendpp-node.eu/api/v1/units/{id}/events
tags:
  - POST
  - battery-units
timestamp: 2026-06-19T00:00:00Z
---

`POST /api/v1/units/{id}/events`

**Domain:** [Battery Units](/tags/battery-units.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Appends one **append-only** per-unit dynamic-data record (Annex XIII / Art. 77: SoH, cycle count, remaining capacity, temperature, negative events). History is immutable — there is **no update or delete path** for events.

**Permission:** `battery:write`. Cookie-session clients must send `X-CSRF-Token`. Operator-scoped credentials may only write to units whose passport belongs to their Economic Operator (403). Write operations pass subscription gating (402) and optional tenant MFA enforcement (403).

**Validation (400 with the standard error triple):** `eventType` is required and must be one of `SOH_MEASUREMENT|CHARGE_CYCLE|STATUS_CHANGE|NEGATIVE_EVENT|OTHER`; `stateOfHealth` 0–100; `cycleCount` and `remainingCapacityAh` 0–9007199254740991; `temperatureC` −273.15–10000 (each may also be `null`/omitted); `status`, if present, must be a valid unit status; `recordedAt` must be Date-parseable (defaults to server time when omitted). `cycleCount` is truncated to an integer before persisting; a `payload` that is not an object or array is silently dropped (stored as `null`) — JSON **arrays** pass the server's `typeof` check and are persisted verbatim.

**Status transition:** when `status` is present and differs from the unit's current status, the unit is updated **in the same transaction** as the event — this works with *any* `eventType`, though `STATUS_CHANGE` is the conventional carrier. Transitioning to **`RECYCLED`** (Art. 77(8)) additionally stamps `ceasedAt` (if not already set; never cleared), after which the public unit view becomes a 410 tombstone and the unit can no longer gain successor units. `status` itself is not locked afterwards — a later event may still set a different value — but `ceasedAt` persists, so the public 410 and the predecessor refusal are permanent.

**Rate limits:** global limiter only — 100 req/min per IP.

## Request body

Schema (required): [RecordBatteryUnitEventRequest](/schemas/RecordBatteryUnitEventRequest.md).

```json
{
  "eventType": "SOH_MEASUREMENT",
  "stateOfHealth": 96.8,
  "cycleCount": 140,
  "remainingCapacityAh": 48.2,
  "temperatureC": 24.5,
  "payload": {
    "measuredBy": "BMS firmware 4.2.1"
  },
  "recordedAt": "2026-06-12T09:41:00.000Z"
}
```

## Responses

- **201** — Event appended (and, when status was supplied and differed, the unit's status transitioned in the same transaction). → [RecordBatteryUnitEventResponse](/schemas/RecordBatteryUnitEventResponse.md)
- **400** — Two shapes: (1) the standard error triple from handler validation — messages: Request body must be a valid JSON object; eventType must be one of: SOH_MEASUREME… → [Error](/schemas/Error.md), [FastifyDefaultBadRequest](/schemas/FastifyDefaultBadRequest.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — The transaction failed. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/units/{id}/events' \
  --data '{"eventType":"SOH_MEASUREMENT","stateOfHealth":96.8,"cycleCount":140,"remainingCapacityAh":48.2,"temperatureC":24.5,"payload":{"measuredBy":"BMS firmware 4.2.1"},"recordedAt":"2026-06-12T09:41:00.000Z"}'
```

## See also

Schemas: [Error](/schemas/Error.md), [FastifyDefaultBadRequest](/schemas/FastifyDefaultBadRequest.md), [RecordBatteryUnitEventRequest](/schemas/RecordBatteryUnitEventRequest.md), [RecordBatteryUnitEventResponse](/schemas/RecordBatteryUnitEventResponse.md).
