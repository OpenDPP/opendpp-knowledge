---
type: API Endpoint
title: Transition passport lifecycle status (recall / decommission / reactivate)
description: Transition passport lifecycle status (recall / decommission / reactivate)
resource: https://opendpp-node.eu/api/v1/passports/{id}/status
tags:
  - PUT
  - passports
timestamp: 2026-06-22T00:00:00Z
---

`PUT /api/v1/passports/{id}/status`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Transitions a **published** passport between live lifecycle states. The request body carries only `status` (any other keys are ignored — there is no `reason` field; the history entry's change reason is auto-generated as `Status changed: <from> → <to>`).

**Permission:** `passport:update` (write — subscription gating applies, see 402). Cookie sessions must send `X-CSRF-Token`; Bearer/API-key clients are exempt.

**Lookup:** passport **UUID or `productId`** (UUID tried first), scoped to operators bound to your workspace.

**Effects:**
- `DECOMMISSIONED` — sets `retentionUntil = now + the configured retention period` (default 15 years), starting the minimum-availability retention clock. The passport stays publicly resolvable.
- `ACTIVE` (reactivation) — clears `retentionUntil` **and** `archivedAt`.
- `RECALLED` — marks the product recalled.
- The status change, the version-history entry (who/when/what) and the webhook enqueue are **transactional**; an in-app notification is created **best-effort after the transaction commits** (a notification failure never affects the response).

**Webhooks:** `RECALLED` enqueues `passport.recalled`; any other transition (`DECOMMISSIONED`, reactivate-to-`ACTIVE`) enqueues `passport.status_updated` — note that `passport.status_updated` is **not** an explicitly subscribable event filter, so only wildcard (`"*"`) webhook subscriptions receive it. Payloads are the public-redacted JSON-LD document.

**Caveats:** DRAFT passports are refused with 409 (publish first via a validated `PUT /api/v1/passports/{id}`). Sealed passports CAN change status — `status` is stored alongside the document, not inside the sealed metadata Merkle tree. The returned `passport` document is serialized at the **public** redaction tier.

**Rate limits:** global limiter, 100 req/min/IP.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Passport UUID or caller-supplied productId (GTIN-14 / GRAI / SKU). |

## Request body

Schema (required): [PassportStatusUpdateRequest](/schemas/PassportStatusUpdateRequest.md).

```json
{
  "status": "DECOMMISSIONED"
}
```

## Responses

- **200** — Status updated. → [PassportStatusUpdateResponse](/schemas/PassportStatusUpdateResponse.md)
- **400** — status missing or not one of the allowed values. → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **409** — The passport is a DRAFT — drafts cannot transition to a live status here. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error.

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X PUT 'https://opendpp-node.eu/api/v1/passports/{id}/status' \
  --data '{"status":"DECOMMISSIONED"}'
```

## See also

Schemas: [Error](/schemas/Error.md), [PassportStatusUpdateRequest](/schemas/PassportStatusUpdateRequest.md), [PassportStatusUpdateResponse](/schemas/PassportStatusUpdateResponse.md).
