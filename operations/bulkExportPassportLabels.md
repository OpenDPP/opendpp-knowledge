---
type: API Endpoint
title: Bulk-export print-grade QR labels for many passports as a ZIP
description: Bulk-export print-grade QR labels for many passports as a ZIP
resource: https://opendpp-node.eu/api/v1/passports/labels
tags:
  - POST
  - qr-codes
timestamp: 2026-07-04T00:00:00Z
---

`POST /api/v1/passports/labels`

**Domain:** [QR Codes](/tags/qr-codes.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Renders a GS1 Digital Link QR code for each of the supplied passports and returns them as a single `application/zip` download (`Content-Disposition: attachment; filename="labels.zip"`) — the export counterpart to the bulk import. One image entry per resolved passport, named `<productId>.<png|svg>` (characters outside `[A-Za-z0-9._-]` replaced by `_`, truncated to 80 chars; duplicate names get a `-2`, `-3`, … suffix), plus a `manifest.json` listing what was `included` and `skipped`.

**Permission:** `passport:read` (read-only — no subscription/402 gate, and NOT subject to the programmatic API-write entitlement).

**Partial success:** an id that is unknown, not owned by your tenant, or outside an operator-scoped key's bound operator is **skipped and reported** in `manifest.json` (`{ id, reason }`) — it never fails the whole batch. Only the caller's own passports resolve, so this cannot enumerate another tenant's catalog.

**Limits:** at most **200** ids per call (`MAX_BULK_LABELS`, mirrors the bulk-import cap); more returns **400** pointing at the async export. `hri: true` requires `format: "svg"` (same constraint as the single QR). `size` is clamped to 128–2048.

**Rate limit:** global limiter, 100 requests/min/IP.

## Request body

A JSON body is required.

```json
{
  "ids": [
    "09501101530003",
    "9b2fa884-3c1d-4e0a-9f6b-2d7c5a1e8b40"
  ],
  "format": "svg",
  "hri": true
}
```

## Responses

- **200** — A ZIP archive of QR images (one per resolved passport) plus a manifest.json reporting included/skipped ids.
- **400** — Empty/oversize ids (> 200), an invalid format/size/ecl, or hri: true without format: "svg". → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/passports/labels' \
  --data '{"ids":["09501101530003","9b2fa884-3c1d-4e0a-9f6b-2d7c5a1e8b40"],"format":"svg","hri":true}'
```

## See also

Schemas: [Error](/schemas/Error.md).
