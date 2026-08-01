---
type: API Endpoint
title: Export a print-grade GS1 Digital Link QR code for a passport
description: Renders the passport's GS1 Digital Link URI (its digitalLinkUri, e.g. https://opendpp-node.eu/01/09501101530003) as a print-grade QR code and returns it as a binary file download.
resource: https://opendpp-node.eu/api/v1/passports/{id}/qr
tags:
  - GET
  - qr-codes
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

`GET /api/v1/passports/{id}/qr`

**Domain:** [QR Codes](/tags/qr-codes.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Renders the passport's GS1 Digital Link URI (its `digitalLinkUri`, e.g. `https://opendpp-node.eu/01/09501101530003`) as a print-grade QR code and returns it as a binary file download. The printed carrier resolves through the public GS1 gateway.

**Permission:** `passport:read` (read-only — subscription status is **not** checked on `:read` permissions, so this endpoint never returns 402). Works with a Bearer API key, a Bearer JWT, or the `opendpp_session` cookie — plain same-origin `<a href>` downloads are supported for browser sessions.

**Identifier resolution:** `{id}` is matched first against the passport UUID, then against the caller-supplied `productId` (GTIN-14/GRAI/SKU), always scoped to your tenant. Credentials scoped to an Economic Operator receive **403** (`Your access is restricted to Economic Operator: <operatorId>`) when the passport belongs to a different operator.

**QR rendering:** 4-module quiet zone (GS1 guidance); error-correction level per `ecl` (default `Q`, the GS1 recommendation for product labels); `size` is **clamped** to 128–2048 px — out-of-range values are clamped to the nearest bound, not rejected, and fractional values are truncated. The response carries `Content-Disposition: attachment; filename="qr-<productId>.png"` (or `.svg`); the filename base is the passport's `productId` with characters outside `[A-Za-z0-9._-]` replaced by `_`, truncated to 80 characters.

**Errors:** an invalid query option returns **400** with one of these exact messages: `format must be png or svg`, `size must be a number`, `ecl must be M, Q or H`. An unknown passport returns **404** with message `Passport <id> not found under your Tenant workspace`.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is raised for `Authorization`-bearing requests, so it is not the binding limit here. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | Passport UUID, or the caller-supplied productId (GTIN-14/GRAI/SKU) as a fallback. |
| `format` | query | no | string | Output image format. |
| `size` | query | no | integer | Rendered width in pixels (PNG) / SVG width attribute. |
| `ecl` | query | no | string | QR error-correction level: M (~15% recovery), Q (~25%, GS1 product-label guidance, default) or H (~30%). |
| `hri` | query | no | boolean | When 1/true, renders the GS1 Human-Readable Interpretation (the bracketed AI string, e.g. (01) 09501101530003 (21) BAT-2026-000123) as vector text beneath the… |

## Responses

- **200** — QR code image encoding the passport's digitalLinkUri.
- **400** — Invalid query option. → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/passports/{id}/qr'
```

## See also

Schemas: [Error](/schemas/Error.md).
