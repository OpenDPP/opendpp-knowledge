---
type: API Endpoint
title: ReadDPPIdsByProductIds — return the DPP identifiers matching a set of product identifiers
description: EN 18222:2026 clause 4.5, Table 4; bound by clause 8.2, Table 16.
resource: https://opendpp-node.eu/v1/dppsByProductIds
tags:
  - POST
  - en-18222-life-cycle-api
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`POST /v1/dppsByProductIds`

**Domain:** [EN 18222 Life Cycle API](/tags/en-18222-life-cycle-api.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**EN 18222:2026 clause 4.5, Table 4; bound by clause 8.2, Table 16.** Clause 4.1 lists this among the methods that **shall** be made available, and it is the method EN 18222's own Annex ZA leans on hardest — five of Table ZA.1's six rows cite clause 4.5.

The result is the set of `digitalProductPassportId` values, not the passports; fetch each with `ReadDPPById`.

**Pagination.** Clause 4.5 lets the client set `limit` and `cursor`, and requires that "the value of the cursor shall not be empty" — a `cursor` present but empty is refused rather than treated as a restart, which would repeat rows the client already holds. Table 16 reports the result "except status code **and pagination**", so the continuation is carried out of band as an RFC 8288 `Link` header with `rel="next"`; its absence means the last page.

**Permission:** `passport:read`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `limit` | query | no | integer | Maximum identifiers per page, 1–500 (default 100). |
| `cursor` | query | no | string | The continuation from a previous page's Link: rel="next" header. |

## Request body

Schema (required): [En18222ProductIdQuery](/schemas/En18222ProductIdQuery.md).

```json
{
  "productId": [
    "09501101530003",
    "09501101530010"
  ]
}
```

## Responses

- **200** — The DPP identifiers matching the supplied product identifiers. → [En18222DppIdList](/schemas/En18222DppIdList.md)
- **400** — Bad or malformed request (EN 18222 Table 15 ClientErrorBadRequest). → [En18222Result](/schemas/En18222Result.md)
- **401** — Wrong or missing authorization credentials (ClientNotAuthorized). → [En18222Result](/schemas/En18222Result.md)
- **403** — Authorization has been refused (ClientForbidden). → [En18222Result](/schemas/En18222Result.md)
- **404** — Resource not found (ClientErrorResourceNotFound). → [En18222Result](/schemas/En18222Result.md)
- **429** — The workspace or key exceeded its request allowance. → [En18222Result](/schemas/En18222Result.md)
- **500** — Unexpected error (ServerInternalError). → [En18222Result](/schemas/En18222Result.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/v1/dppsByProductIds' \
  --data '{"productId":["09501101530003","09501101530010"]}'
```

## See also

Schemas: [En18222DppIdList](/schemas/En18222DppIdList.md), [En18222ProductIdQuery](/schemas/En18222ProductIdQuery.md), [En18222Result](/schemas/En18222Result.md).
