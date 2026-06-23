---
type: API Endpoint
title: Decode GS1 scan data / element string / Digital Link into structured AIs + HRI
description: Decode GS1 scan data / element string / Digital Link into structured AIs + HRI
resource: https://opendpp-node.eu/api/v1/gs1/decode
tags:
  - POST
  - public-resolution
timestamp: 2026-06-23T00:00:00Z
---

`POST /api/v1/gs1/decode`

**Domain:** [Public Resolution](/tags/public-resolution.md)  
**Authentication:** Authentication required.

Decodes raw scanner output — AIM-symbology-prefixed **scan data** (e.g. `]Q1https://id.gs1.org/01/09501101532007/21/VM-1`, `]C1010950…`), a bracketed GS1 **element string** (`(01)09501101532007(21)VM-1`), or a **Digital Link** URI — into its structured Application Identifiers, the Human-Readable Interpretation (HRI), and a Digital Link that resolves on this node. Parsing is performed by GS1's authoritative Barcode Syntax Engine (vendored WASM), so check digits and the AI grammar are validated, not approximated.

**Public + stateless** — no permission and no tenant data is touched; it complements the public resolver. Supply **exactly one** of `scanData`, `elementString`, `digitalLink`; zero or more than one returns 400. After decoding, `GET` the returned `digitalLinkUri` (the canonical path rehosted on this node) to resolve the passport/unit.

**Errors:** missing/multiple/over-long input, or a value GS1's grammar rejects, returns **400** (`Provide exactly one of: scanData, elementString, digitalLink` or `Not a valid GS1 <kind>: <engine message>`); **503** if the engine is unavailable.

**Rate limit:** global limiter only — 100 req/min/IP (standard `x-ratelimit-*` headers).

## Request body

A JSON body is required.

## Responses

- **200** — Decoded GS1 data.
- **400** — Missing/multiple inputs, over-long input, or a value GS1's grammar rejects. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **503** — The GS1 Syntax Engine (WASM) could not be loaded. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X POST 'https://opendpp-node.eu/api/v1/gs1/decode'
```

## See also

Schemas: [Error](/schemas/Error.md).
