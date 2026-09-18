---
type: API Endpoint
title: ReadDPPById — return the DPP with the specified DPP ID
description: EN 18222:2026 clause 4.2, Table 1; bound by clause 8.2, Table 16.
resource: https://opendpp-node.eu/v1/dpps/{dppId}
tags:
  - GET
  - en-18222-life-cycle-api
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /v1/dpps/{dppId}`

**Domain:** [EN 18222 Life Cycle API](/tags/en-18222-life-cycle-api.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**EN 18222:2026 clause 4.2, Table 1; bound by clause 8.2, Table 16.** Clause 4.1 lists this among the methods that **shall** be made available by the creator of the digital product passport or their main DPP service provider, as well as by a back-up DPP service provider. OpenDPP is declared the **main** provider.

The response is the passport itself: Table 16 reports the result "except status code", so the status code is the HTTP status (EN 18222 Table 15) and the body is the payload alone, with no envelope.

**Permission:** `passport:read`. Access rules decide which data elements the response carries — an owner key sees the owner tier, other credentials the public-redacted one.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `dppId` | path | yes | string | The passport's digitalProductPassportId (EN 18223 clause 4.1.2.1) — either this node's resolvable instance URI {base}/passport/{id}, percent-encoded as one pat… |
| `representation` | query | no | string | EN 18222 clause 8.1 — compressed (the default, EN 18223 clause 5.2) or full (EN 18223 Annex A). |

## Responses

- **200** — The digital product passport. → [AasEnvironment](/schemas/AasEnvironment.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
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
  -X GET 'https://opendpp-node.eu/v1/dpps/{dppId}'
```

## See also

Schemas: [AasEnvironment](/schemas/AasEnvironment.md), [En18222Result](/schemas/En18222Result.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md).
