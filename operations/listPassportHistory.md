---
type: API Endpoint
title: List a passport's archived versions
description: The archived versions of a passport, newest first.
resource: https://opendpp-node.eu/api/v1/passports/{id}/history
tags:
  - GET
  - passports
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /api/v1/passports/{id}/history`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

The archived versions of a passport, newest first. Every metadata write (`PUT /api/v1/passports/{id}`, a bulk upsert, an AAS re-ingest) and every lifecycle change (`PUT …/status`) archives the state it replaced, so version *N* is the metadata that was current **until** `validUntil` (the instant the change was recorded) and from the previous version's `validUntil` — or the passport's creation — before that; the live passport is version `currentVersion` and is read with `GET /api/v1/passports/{id}`. Archiving starts with the first change, so a never-changed passport lists no versions.

This is the retrieval EN 18221:2026 §4.2 describes for archived versions, at the owner tier: the caller's workspace only, under the same visibility as the passport itself. **A version is a DOCUMENT**: the single-version reads below return it as one, with the EN 18223 header, its body at the root and its own proof. This list carries summaries only — read a version to get its document.

**Who may read this.** Two authorised actors, and the anonymous tier is refused — EN 18221:2026 §4.2 makes an archived version retrievable by authenticated and authorised actors ONLY. (1) The **owning or operator-bound tenant**, via an `op_dpp_token_…` API key: the version is unmasked, exactly as that tenant's live read is. (2) The holder of a **legitimate-interest or authority grant** covering this passport (`dpp_li_…` / `dpp_auth_…` as a Bearer token or `?grant=`): the version is masked to the grant tier — the Battery Reg. Annex XIII(2)-(4) restricted keys are readable, the owner-only keys are not — so a version discloses exactly what the live read discloses to the same caller, and no more. A grant-unlocked response carries `Cache-Control: private, no-store` and `Referrer-Policy: no-referrer`. Attribution (`changedBy`, `changeReason`) is owner-only and reads `null` for a grant holder: it names the staff who edited a row, not regulated product data. A DRAFT is never revealed to a grant. Every read is recorded in the passport's access audit log.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Passport UUID, caller-supplied productId (GTIN-14 / GRAI / SKU) or the passport's own GS1 Digital Link URL (its digitalProductPassportId, percent-encoded as on… |
| `page` | query | no | integer | 1-based page number (digits only; non-numeric falls back to 1). |
| `limit` | query | no | integer | Page size. |

## Responses

- **200** — The archived versions, newest first, with the standard pagination envelope. → [PassportHistoryList](/schemas/PassportHistoryList.md)
- **401** — No credential was presented at all. → [PassportHistoryError](/schemas/PassportHistoryError.md)
- **403** — The API key is scoped to another economic operator than the passport's. → [PassportHistoryError](/schemas/PassportHistoryError.md)
- **404** — No passport readable with the presented credential has this id, productId or Digital Link URL. → [PassportHistoryError](/schemas/PassportHistoryError.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/passports/{id}/history'
```

## See also

Schemas: [PassportHistoryError](/schemas/PassportHistoryError.md), [PassportHistoryList](/schemas/PassportHistoryList.md).
