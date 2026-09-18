---
type: API Endpoint
title: UpdateDataElement — update, amend or remove one data element
description: EN 18222:2026 clause 6.3, Table 10; bound by clause 8.4, Table 18.
resource: https://opendpp-node.eu/v1/dpps/{dppId}/elements/{elementIdPath}
tags:
  - PATCH
  - en-18222-life-cycle-api
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`PATCH /v1/dpps/{dppId}/elements/{elementIdPath}`

**Domain:** [EN 18222 Life Cycle API](/tags/en-18222-life-cycle-api.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**EN 18222:2026 clause 6.3, Table 10; bound by clause 8.4, Table 18.** Clause 4.1 lists this among the methods that **should** be made available if authorized third parties have access rights to update parts of the DPP.

Clause 6.3: the method "also allows to amend or remove data element information". So a path whose parent exists but whose member does not is **created**, and an explicit `null` body **removes** the element — the RFC 7396 convention clause 8.1 points at. A removal has nothing to return and answers `204` (EN 18222 Table 15 `SuccessNoContent`); any other update answers `200` with the changed element (Table 10).

Elements this node **derives** — the EN 18223 Table 1 header attributes, the seal, the lifecycle status, the embedded operator and facility nodes — are refused with `403`: they are published in the document but are computed from the record and its seal, not written by the operator.

The write goes through the same passport-mutation seam as every other, so the EN 18221 archiving duty is discharged identically.

**Permission:** `passport:update`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `dppId` | path | yes | string | The passport's digitalProductPassportId (EN 18223 clause 4.1.2.1) — either this node's resolvable instance URI {base}/passport/{id}, percent-encoded as one pat… |
| `elementIdPath` | path | yes | string | The absolute path to the data element, as an RFC 9535 JSONPath (EN 18222 clause 8.1), percent-encoded as one path segment. |
| `representation` | query | no | string | EN 18222 clause 8.1 names this flag on GET, POST and PATCH, so it is accepted here — but on this method it selects nothing. |

## Request body

A JSON body is required.

```json
42
```

## Responses

- **200** — The changed data element (EN 18222 Table 10).
- **204** — The data element was removed (EN 18222 Table 15 SuccessNoContent).
- **400** — Bad or malformed request (EN 18222 Table 15 ClientErrorBadRequest). → [En18222Result](/schemas/En18222Result.md)
- **401** — Wrong or missing authorization credentials (ClientNotAuthorized). → [En18222Result](/schemas/En18222Result.md)
- **403** — Authorization has been refused (ClientForbidden). → [En18222Result](/schemas/En18222Result.md)
- **404** — Resource not found (ClientErrorResourceNotFound). → [En18222Result](/schemas/En18222Result.md)
- **409** — The passport is sealed, so its data elements cannot be changed (ClientResourceConflict). → [En18222Result](/schemas/En18222Result.md)
- **429** — The workspace or key exceeded its request allowance. → [En18222Result](/schemas/En18222Result.md)
- **500** — Unexpected error (ServerInternalError). → [En18222Result](/schemas/En18222Result.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X PATCH 'https://opendpp-node.eu/v1/dpps/{dppId}/elements/{elementIdPath}' \
  --data '42'
```

## See also

Schemas: [En18222Result](/schemas/En18222Result.md).
