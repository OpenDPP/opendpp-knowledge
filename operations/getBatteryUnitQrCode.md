---
type: API Endpoint
title: Export a print-grade QR code for an individual battery unit
description: Export a print-grade QR code for an individual battery unit
resource: https://opendpp-node.eu/api/v1/units/{id}/qr
tags:
  - GET
  - qr-codes
timestamp: 2026-06-28T00:00:00Z
---

`GET /api/v1/units/{id}/qr`

**Domain:** [QR Codes](/tags/qr-codes.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Renders the battery unit's GS1 Digital Link URI as a print-grade QR code — the AI-21 path segment carries the unit's **real physical serial number** (e.g. `https://opendpp-node.eu/01/09501101530003/21/BAT-2026-000123`). This is the carrier each individual battery must wear (per-unit passports, Battery Regulation Art. 77(2)).

**Permission:** `battery:read` (read-only — subscription status is **not** checked on `:read` permissions, so this endpoint never returns 402). Works with a Bearer API key, a Bearer JWT, or the `opendpp_session` cookie.

**Identifier resolution:** `{id}` is the BatteryUnit **UUID only** — unlike the passport QR route there is **no** serial-number fallback. Lookup is tenant-scoped. Credentials scoped to an Economic Operator receive **403** (`Your access is restricted to Economic Operator: <operatorId>`) when the unit's parent passport belongs to a different operator.

**QR rendering:** identical pipeline to the passport QR export — 4-module quiet zone, `ecl` default `Q`, `size` clamped to 128–2048 px (clamped, not rejected; fractions truncated). The response carries `Content-Disposition: attachment; filename="qr-<serialNumber>.png"` (or `.svg`); the filename base is the unit's `serialNumber` with characters outside `[A-Za-z0-9._-]` replaced by `_`, truncated to 80 characters.

**Errors:** an invalid query option returns **400** with one of these exact messages: `format must be png or svg`, `size must be a number`, `ecl must be M, Q or H`. An unknown unit returns **404** with message `Battery unit <id> not found under your Tenant workspace`.

**Rate limit:** global limiter only — 100 requests/min/IP (standard `x-ratelimit-*` headers).

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | BatteryUnit UUID (primary key). |
| `format` | query | no | string | Output image format. |
| `size` | query | no | integer | Rendered width in pixels (PNG) / SVG width attribute. |
| `ecl` | query | no | string | QR error-correction level: M (~15% recovery), Q (~25%, GS1 product-label guidance, default) or H (~30%). |
| `hri` | query | no | boolean | When 1/true, renders the GS1 Human-Readable Interpretation (the bracketed AI string, e.g. |

## Responses

- **200** — QR code image encoding the unit's digitalLinkUri (AI-21 = real physical serial).
- **400** — Invalid query option. → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/units/{id}/qr'
```

## See also

Schemas: [Error](/schemas/Error.md).
