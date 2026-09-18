---
type: API Endpoint
title: ReadDPPByProductId — return the current active DPP for a product identifier
description: EN 18222:2026 clause 4.3, Table 2; bound by clause 8.2, Table 16.
resource: https://opendpp-node.eu/v1/dppsByProductId/{productId}
tags:
  - GET
  - en-18222-life-cycle-api
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /v1/dppsByProductId/{productId}`

**Domain:** [EN 18222 Life Cycle API](/tags/en-18222-life-cycle-api.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**EN 18222:2026 clause 4.3, Table 2; bound by clause 8.2, Table 16.** Clause 4.1 lists this among the methods that **shall** be made available.

Table 2 returns "the current active DPP (latest version)" for the unique product identifier as defined in EN 18219. This door reads the product identifier and nothing else — a `digitalProductPassportId` is not accepted, because EN 18222 gives that its own path.

**Permission:** `passport:read`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `productId` | path | yes | string | The unique product identifier as defined in EN 18219 (GTIN-14, GRAI or the operator's own SKU), percent-encoded as one path segment. |
| `representation` | query | no | string | EN 18222 clause 8.1 — compressed (the default, EN 18223 clause 5.2) or full (EN 18223 Annex A). |

## Responses

- **200** — The digital product passport. → [AasEnvironment](/schemas/AasEnvironment.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
- **400** — Bad or malformed request (EN 18222 Table 15 ClientErrorBadRequest). → [En18222Result](/schemas/En18222Result.md)
- **401** — Wrong or missing authorization credentials (ClientNotAuthorized). → [En18222Result](/schemas/En18222Result.md)
- **403** — Authorization has been refused (ClientForbidden). → [En18222Result](/schemas/En18222Result.md)
- **404** — Resource not found (ClientErrorResourceNotFound). → [En18222Result](/schemas/En18222Result.md)
- **409** — More than one passport in this workspace carries that product identifier, so no single current passport can be returned (ClientResourceConflict). → [En18222Result](/schemas/En18222Result.md)
- **429** — The workspace or key exceeded its request allowance. → [En18222Result](/schemas/En18222Result.md)
- **500** — Unexpected error (ServerInternalError). → [En18222Result](/schemas/En18222Result.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/v1/dppsByProductId/{productId}'
```

## See also

Schemas: [AasEnvironment](/schemas/AasEnvironment.md), [En18222Result](/schemas/En18222Result.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md).
