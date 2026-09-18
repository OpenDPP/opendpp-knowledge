---
type: API Endpoint
title: Bulk-export print-grade QR labels for many passports as a ZIP
description: 'Renders a GS1 Digital Link QR code for each of the supplied passports and returns them as a single application/zip download (Content-Disposition: attachment; filename="labels.zip") — the export counterpart to the bulk import.'
resource: https://opendpp-node.eu/api/v1/passports/labels
tags:
  - POST
  - qr-codes
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`POST /api/v1/passports/labels`

**Domain:** [QR Codes](/tags/qr-codes.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Renders a GS1 Digital Link QR code for each of the supplied passports and returns them as a single `application/zip` download (`Content-Disposition: attachment; filename="labels.zip"`) — the export counterpart to the bulk import. One image entry per resolved passport, named `<productId>.<png|svg>` (characters outside `[A-Za-z0-9._-]` replaced by `_`, truncated to 80 chars; duplicate names get a `-2`, `-3`, … suffix), plus a `manifest.json` listing what was `included` and `skipped` and echoing back the print parameters the batch was rendered with — `format`, `size`, `errorCorrection`, `hri`, and `xDimensionMm` when one was requested. An `included` entry also carries `divergesFromDeclaration` when that passport's EN 18220 carrier declaration names a parameter these labels do not match, each as `{ parameter, declared, rendered, reason? }` — `reason` appearing only where the artwork could not have carried the declared value rather than not having been asked to. Those are the factors that decide whether a printed symbol scans, so the manifest states them rather than leaving a print shop to infer them from the images.

**Permission:** `passport:read` (read-only — no subscription/402 gate, and NOT subject to the programmatic API-write entitlement).

**Partial success:** an id that is unknown, not owned by your tenant, or outside an operator-scoped key's bound operator is **skipped and reported** in `manifest.json` (`{ id, reason }`) — it never fails the whole batch. Only the caller's own passports resolve, so this cannot enumerate another tenant's catalog.

**Limits:** at most **200** ids per call (mirrors the bulk-import cap); more returns **400** pointing at the async export. `hri: true` requires `format: "svg"` (same constraint as the single QR). `size` is clamped to 128–2048.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

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

- **200** — A ZIP archive of QR images (one per resolved passport) plus a manifest.json reporting the print parameters used and the included/skipped ids.
- **400** — Empty/oversize ids (> 200), an invalid format/size/ecl, hri: true without format: "svg", or an xDimensionMm outside 0.396–2 mm / combined with a non-SVG format… → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
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
