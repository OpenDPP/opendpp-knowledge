---
type: API Endpoint
title: CreateDPP — create a new DPP and return its identifier
description: EN 18222:2026 clause 4.6, Table 5; bound by clause 8.2, Table 16.
resource: https://opendpp-node.eu/v1/dpps
tags:
  - POST
  - en-18222-life-cycle-api
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`POST /v1/dpps`

**Domain:** [EN 18222 Life Cycle API](/tags/en-18222-life-cycle-api.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**EN 18222:2026 clause 4.6, Table 5; bound by clause 8.2, Table 16.** Clause 4.1 lists this among the methods that **should** be made available by the main DPP service provider and by a back-up provider — expressly not by the creator. OpenDPP is declared the main provider and never the creator: the economic operator is always the creator, and this method is how a creator's passport comes to be hosted here.

Table 5's output is the **DPP ID**, not the passport, so a successful creation answers `201` (EN 18222 Table 15 `SuccessCreated`) with the new `digitalProductPassportId` as the body and a `Location` header pointing at its `ReadDPPById` path.

**Permission:** `passport:create`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `representation` | query | no | string | EN 18222 clause 8.1 names this flag on GET, POST and PATCH, so it is accepted here — but on this method it selects nothing. |

## Request body

A JSON body is required.

```json
{
  "productId": "09501101530003",
  "category": "textiles",
  "metadata": {
    "fibreComposition": "100% cotton"
  }
}
```

## Responses

- **201** — The passport was created.
- **400** — Bad or malformed request (EN 18222 Table 15 ClientErrorBadRequest). → [En18222Result](/schemas/En18222Result.md)
- **401** — Wrong or missing authorization credentials (ClientNotAuthorized). → [En18222Result](/schemas/En18222Result.md)
- **403** — Authorization has been refused (ClientForbidden). → [En18222Result](/schemas/En18222Result.md)
- **404** — Resource not found (ClientErrorResourceNotFound). → [En18222Result](/schemas/En18222Result.md)
- **409** — A passport already exists for that product identifier in this workspace (ClientResourceConflict). → [En18222Result](/schemas/En18222Result.md)
- **429** — The workspace or key exceeded its request allowance. → [En18222Result](/schemas/En18222Result.md)
- **500** — Unexpected error (ServerInternalError). → [En18222Result](/schemas/En18222Result.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/v1/dpps' \
  --data '{"productId":"09501101530003","category":"textiles","metadata":{"fibreComposition":"100% cotton"}}'
```

## See also

Schemas: [En18222Result](/schemas/En18222Result.md).
