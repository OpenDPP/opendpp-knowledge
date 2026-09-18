---
type: API Endpoint
title: UpdateDPPById — partial update of a DPP with a specified DPP ID
description: EN 18222:2026 clause 4.7, Table 6; bound by clause 8.2, Table 16.
resource: https://opendpp-node.eu/v1/dpps/{dppId}
tags:
  - PATCH
  - en-18222-life-cycle-api
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`PATCH /v1/dpps/{dppId}`

**Domain:** [EN 18222 Life Cycle API](/tags/en-18222-life-cycle-api.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**EN 18222:2026 clause 4.7, Table 6; bound by clause 8.2, Table 16.** Clause 4.1 makes this a **shall** for the creator or their main provider *if authorized third parties have access rights to update parts of the DPP*.

The body is a `partialDPP` — "only contains data that need to be updated or are extended with new data". It is applied as an RFC 7396 JSON Merge Patch, which clause 8.1 names for update operations: a member set to `null` is removed, an object member merges recursively, anything else replaces. Data elements may be named directly (they are the passport's own product data) or wrapped in `metadata`.

Clause 4.7 requires that "if the update of some parts fails the complete update process will fail and there should be no changes adopted in the DPP" — the merge is computed in full and written in one transaction, so a rejected member changes nothing. It also requires that "all changes to the digital product passport shall be archived in accordance with EN 18221:2026": the write goes through this node's single passport-mutation seam, which snapshots the passport as it was and chains a content hash over the previous version.

Members this node **derives** — the EN 18223 Table 1 header attributes, the seal, the lifecycle status and the embedded operator and facility nodes — are refused with `403` rather than silently ignored.

**Permission:** `passport:update`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `dppId` | path | yes | string | The passport's digitalProductPassportId (EN 18223 clause 4.1.2.1) — either this node's resolvable instance URI {base}/passport/{id}, percent-encoded as one pat… |
| `representation` | query | no | string | EN 18222 clause 8.1 — compressed (the default, EN 18223 clause 5.2) or full (EN 18223 Annex A). |

## Request body

A JSON body is required.

```json
{
  "recycledContentPercentage": 42,
  "careInstructions": {
    "washing": "30C"
  }
}
```

## Responses

- **200** — The updated digital product passport (EN 18222 Table 6: the output payload is the updated DPP). → [AasEnvironment](/schemas/AasEnvironment.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
- **400** — Bad or malformed request (EN 18222 Table 15 ClientErrorBadRequest). → [En18222Result](/schemas/En18222Result.md)
- **401** — Wrong or missing authorization credentials (ClientNotAuthorized). → [En18222Result](/schemas/En18222Result.md)
- **403** — Authorization has been refused (ClientForbidden). → [En18222Result](/schemas/En18222Result.md)
- **404** — Resource not found (ClientErrorResourceNotFound). → [En18222Result](/schemas/En18222Result.md)
- **409** — The passport is sealed, or the update would demote a published passport to a draft (ClientResourceConflict). → [En18222Result](/schemas/En18222Result.md)
- **429** — The workspace or key exceeded its request allowance. → [En18222Result](/schemas/En18222Result.md)
- **500** — Unexpected error (ServerInternalError). → [En18222Result](/schemas/En18222Result.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X PATCH 'https://opendpp-node.eu/v1/dpps/{dppId}' \
  --data '{"recycledContentPercentage":42,"careInstructions":{"washing":"30C"}}'
```

## See also

Schemas: [AasEnvironment](/schemas/AasEnvironment.md), [En18222Result](/schemas/En18222Result.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md).
