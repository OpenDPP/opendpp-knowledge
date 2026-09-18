---
type: API Endpoint
title: Read one archived version
description: One archived version with the metadata it held, its validity window (validFrom … validUntil), who recorded the change that replaced it and why.
resource: https://opendpp-node.eu/api/v1/passports/{id}/history/{version}
tags:
  - GET
  - passports
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /api/v1/passports/{id}/history/{version}`

**Domain:** [Passports](/tags/passports.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

One archived version with the metadata it held, its validity window (`validFrom` … `validUntil`), who recorded the change that replaced it and why. The live passport is not an archived version: `version` equal to `currentVersion` answers 404 and points at `GET /api/v1/passports/{id}`. The version is returned **as a document** in `passport`, with its `contentHash` so it can be verified.

**Who may read this.** Two authorised actors, and the anonymous tier is refused — EN 18221:2026 §4.2 makes an archived version retrievable by authenticated and authorised actors ONLY. (1) The **owning or operator-bound tenant**, via an `op_dpp_token_…` API key: the version is unmasked, exactly as that tenant's live read is. (2) The holder of a **legitimate-interest or authority grant** covering this passport (`dpp_li_…` / `dpp_auth_…` as a Bearer token or `?grant=`): the version is masked to the grant tier — the Battery Reg. Annex XIII(2)-(4) restricted keys are readable, the owner-only keys are not — so a version discloses exactly what the live read discloses to the same caller, and no more. A grant-unlocked response carries `Cache-Control: private, no-store` and `Referrer-Policy: no-referrer`. Attribution (`changedBy`, `changeReason`) is owner-only and reads `null` for a grant holder: it names the staff who edited a row, not regulated product data. A DRAFT is never revealed to a grant. Every read is recorded in the passport's access audit log.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Passport UUID, caller-supplied productId (GTIN-14 / GRAI / SKU) or the passport's own GS1 Digital Link URL (its digitalProductPassportId, percent-encoded as on… |
| `version` | path | yes | integer | The archived version number (1 = the state the first change replaced). |

## Responses

- **200** — The archived version. → [PassportHistoryVersion](/schemas/PassportHistoryVersion.md)
- **400** — version is not a positive integer. → [PassportHistoryError](/schemas/PassportHistoryError.md)
- **401** — No credential was presented at all. → [PassportHistoryError](/schemas/PassportHistoryError.md)
- **403** — The API key is scoped to another economic operator than the passport's. → [PassportHistoryError](/schemas/PassportHistoryError.md)
- **404** — No such passport in the caller's workspace, or no archived version with this number. → [PassportHistoryError](/schemas/PassportHistoryError.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/passports/{id}/history/{version}'
```

## See also

Schemas: [PassportHistoryError](/schemas/PassportHistoryError.md), [PassportHistoryVersion](/schemas/PassportHistoryVersion.md).
