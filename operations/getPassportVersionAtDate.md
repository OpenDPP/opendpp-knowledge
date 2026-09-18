---
type: API Endpoint
title: Read the version that was current at an instant
description: "The metadata that was current at date: the first version archived after that instant (an archived version is the state a change replaced), or the live passport when nothing changed since — then current is true, version is the live version…"
resource: https://opendpp-node.eu/api/v1/passports/{id}/history/at
tags:
  - GET
  - passports
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /api/v1/passports/{id}/history/at`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

The metadata that was current at `date`: the first version archived **after** that instant (an archived version is the state a change replaced), or the live passport when nothing changed since — then `current` is `true`, `version` is the live version number and `validUntil` is `null`. A `date` before the passport existed is a 404.

This is the point-in-time read EN 18221:2026 §4.2 describes; the EN 18222 life-cycle method of the same shape is `ReadDPPVersionByIdAndDate`. The version is returned **as a document** in `passport`, with its `contentHash` so it can be verified.

**Who may read this.** Two authorised actors, and the anonymous tier is refused — EN 18221:2026 §4.2 makes an archived version retrievable by authenticated and authorised actors ONLY. (1) The **owning or operator-bound tenant**, via an `op_dpp_token_…` API key: the version is unmasked, exactly as that tenant's live read is. (2) The holder of a **legitimate-interest or authority grant** covering this passport (`dpp_li_…` / `dpp_auth_…` as a Bearer token or `?grant=`): the version is masked to the grant tier — the Battery Reg. Annex XIII(2)-(4) restricted keys are readable, the owner-only keys are not — so a version discloses exactly what the live read discloses to the same caller, and no more. A grant-unlocked response carries `Cache-Control: private, no-store` and `Referrer-Policy: no-referrer`. Attribution (`changedBy`, `changeReason`) is owner-only and reads `null` for a grant holder: it names the staff who edited a row, not regulated product data. A DRAFT is never revealed to a grant. Every read is recorded in the passport's access audit log.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Passport UUID, caller-supplied productId (GTIN-14 / GRAI / SKU) or the passport's own GS1 Digital Link URL (its digitalProductPassportId, percent-encoded as on… |
| `date` | query | yes | string | The instant to read, as an ISO 8601-1 timestamp with a zone designator — Z or ±hh:mm (e.g. 2026-07-15T00:00:00Z, 2026-07-15T02:00:00+02:00). |

## Responses

- **200** — The version current at date, as a document. → [PassportHistoryVersion](/schemas/PassportHistoryVersion.md)
- **400** — date is missing or is not an ISO 8601 timestamp. → [PassportHistoryError](/schemas/PassportHistoryError.md)
- **401** — No credential was presented at all. → [PassportHistoryError](/schemas/PassportHistoryError.md)
- **403** — The API key is scoped to another economic operator than the passport's. → [PassportHistoryError](/schemas/PassportHistoryError.md)
- **404** — No such passport in the caller's workspace, or the passport did not exist yet at date. → [PassportHistoryError](/schemas/PassportHistoryError.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/passports/{id}/history/at'
```

## See also

Schemas: [PassportHistoryError](/schemas/PassportHistoryError.md), [PassportHistoryVersion](/schemas/PassportHistoryVersion.md).
