---
type: API Endpoint
title: DeleteDPPById — remove the DPP with the specified DPP ID
description: EN 18222:2026 clause 4.8, Table 7; bound by clause 8.2, Table 16.
resource: https://opendpp-node.eu/v1/dpps/{dppId}
tags:
  - DELETE
  - en-18222-life-cycle-api
generated:
  by: process:emit-okf
  at: 2026-09-21T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`DELETE /v1/dpps/{dppId}`

**Domain:** [EN 18222 Life Cycle API](/tags/en-18222-life-cycle-api.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**EN 18222:2026 clause 4.8, Table 7; bound by clause 8.2, Table 16.** Clause 4.1 lists this among the methods that **should** be made available by the main DPP service provider and by a back-up provider — expressly not by the creator.

Table 7 declares no output payload, so a successful deletion answers `204` (EN 18222 Table 15 `SuccessNoContent`).

**Access rules control whether deletion is allowed** (clause 4.8), and the rule is the passport lifetime: a passport must stay available for as long as its product group's regulation requires (the ESPR and, for batteries, the Battery Regulation). A **main** provider therefore deletes a never-published draft, or a passport whose lifetime has ended — its `retentionUntil` due, after any grace window — and refuses everything else with `409`. It is the same rule the house `DELETE /api/v1/passports/{id}` and the retention sweep apply.

A **back-up** provider offers the method and **never deletes a copy on request**, answering `409`. The copy exists for the case where the origin cannot be relied on (EN 18221 clause 4.3), and the origin holds the back-up workspace's credential. A copy deleted on request would be one the origin could destroy on the strength of state it asserts itself. A copy not held answers `404`, as the reads do.

**Permission:** `passport:update`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `dppId` | path | yes | string | The passport's digitalProductPassportId (EN 18223 clause 4.1.2.1) — either this node's resolvable instance URI {base}/passport/{id}, percent-encoded as one pat… |

## Responses

- **204** — The passport was removed — a never-published draft, or one whose lifetime had ended (EN 18222 Table 15 SuccessNoContent).
- **400** — Bad or malformed request (EN 18222 Table 15 ClientErrorBadRequest). → [En18222Result](/schemas/En18222Result.md)
- **401** — Wrong or missing authorization credentials (ClientNotAuthorized). → [En18222Result](/schemas/En18222Result.md)
- **403** — Authorization has been refused (ClientForbidden). → [En18222Result](/schemas/En18222Result.md)
- **404** — Resource not found (ClientErrorResourceNotFound). → [En18222Result](/schemas/En18222Result.md)
- **409** — The law still requires the passport to be available, or this is a back-up copy, which is never deleted on request (ClientResourceConflict). → [En18222Result](/schemas/En18222Result.md)
- **429** — The workspace or key exceeded its request allowance. → [En18222Result](/schemas/En18222Result.md)
- **500** — Unexpected error (ServerInternalError). → [En18222Result](/schemas/En18222Result.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X DELETE 'https://opendpp-node.eu/v1/dpps/{dppId}'
```

## See also

Schemas: [En18222Result](/schemas/En18222Result.md).
