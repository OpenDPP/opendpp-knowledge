---
type: API Endpoint
title: ReadDPPVersionByIdAndDate — return the DPP version current at a given date
description: EN 18222:2026 clause 4.4, Table 3; bound by clause 8.2, Table 16.
resource: https://opendpp-node.eu/v1/dppsByIdAndDate/{dppId}
tags:
  - GET
  - en-18222-life-cycle-api
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /v1/dppsByIdAndDate/{dppId}`

**Domain:** [EN 18222 Life Cycle API](/tags/en-18222-life-cycle-api.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

**EN 18222:2026 clause 4.4, Table 3; bound by clause 8.2, Table 16.** Clause 4.1 lists this among the methods that **should** be made available by the main provider and by a back-up provider — expressly not by the creator. Table 3 notes the method is optional for the economic operator.

The version returned is the one that was current at the instant given: the node archives a snapshot before each change, so the first snapshot recorded after the instant holds the state that was current at it.

**Permission:** `passport:read`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `dppId` | path | yes | string | The passport's digitalProductPassportId (EN 18223 clause 4.1.2.1) — either this node's resolvable instance URI {base}/passport/{id}, percent-encoded as one pat… |
| `date` | query | yes | string | The instant the passport is requested for — a UTC-based timestamp in the ISO 8601-1 format EN 18223 uses, e.g. 2026-09-03T12:00:00Z. |
| `representation` | query | no | string | EN 18222 clause 8.1 — compressed (the default, EN 18223 clause 5.2) or full (EN 18223 Annex A). |

## Responses

- **200** — The digital product passport as it stood at the requested instant. → [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
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
  -X GET 'https://opendpp-node.eu/v1/dppsByIdAndDate/{dppId}'
```

## See also

Schemas: [En18222Result](/schemas/En18222Result.md), [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md).
