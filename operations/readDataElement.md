---
type: API Endpoint
title: ReadDataElement — return one data element by its absolute path
description: EN 18222:2026 clause 6.2, Table 9; bound by clause 8.4, Table 18.
resource: https://opendpp-node.eu/v1/dpps/{dppId}/elements/{elementIdPath}
tags:
  - GET
  - en-18222-life-cycle-api
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /v1/dpps/{dppId}/elements/{elementIdPath}`

**Domain:** [EN 18222 Life Cycle API](/tags/en-18222-life-cycle-api.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**EN 18222:2026 clause 6.2, Table 9; bound by clause 8.4, Table 18.** Clause 4.1 lists this among the methods that **should** be made available by the creator or their main provider, as well as by a back-up provider. Clause 6.1 itself is permissive ("may be made available"), so the obligation is the one clause 4.1 states.

The element is addressed within the passport document in the requested representation, so the access tier that governs `ReadDPPById` governs which elements are addressable here too.

**Permission:** `passport:read`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `dppId` | path | yes | string | The passport's digitalProductPassportId (EN 18223 clause 4.1.2.1) — either this node's resolvable instance URI {base}/passport/{id}, percent-encoded as one pat… |
| `elementIdPath` | path | yes | string | The absolute path to the data element, as an RFC 9535 JSONPath (EN 18222 clause 8.1), percent-encoded as one path segment. |
| `representation` | query | no | string | EN 18222 clause 8.1 — compressed (the default, EN 18223 clause 5.2) or full (EN 18223 Annex A). |

## Responses

- **200** — The addressed data element.
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
  -X GET 'https://opendpp-node.eu/v1/dpps/{dppId}/elements/{elementIdPath}'
```

## See also

Schemas: [En18222Result](/schemas/En18222Result.md).
