---
type: API Endpoint
title: Batch-decode many GS1 scans / element strings / Digital Links in one request
description: Batch-decode many GS1 scans / element strings / Digital Links in one request
resource: https://opendpp-node.eu/api/v1/gs1/decode/batch
tags:
  - POST
  - public-resolution
timestamp: 2026-06-26T00:00:00Z
---

`POST /api/v1/gs1/decode/batch`

**Domain:** [Public Resolution](/tags/public-resolution.md)  
**Authentication:** Authentication required.

Batch form of `POST /api/v1/gs1/decode` for line-side / warehouse stations capturing many scans per second. Send `{ "items": [ … ] }` (≤200), each item exactly one of `scanData`/`elementString`/`digitalLink`, and receive a `results` array aligned to input order — each entry either a decoded scan (`ok: true`, the same fields as the single-scan 200 minus `success`) or an error (`ok: false` + `error`). **Partial-success:** one bad item never fails the batch — the request returns **200** and per-item failures are reported in place. Parsing uses GS1's authoritative Barcode Syntax Engine (vendored WASM). **Public + stateless** (no permission, no tenant data).

**Errors:** a missing/empty/non-array `items`, or more than 200 items, returns **400**; a body over the 256 KiB route cap returns **413**; **503** if the engine is unavailable.

**Rate limit:** global limiter only — 100 req/min/IP (standard `x-ratelimit-*` headers).

## Request body

A JSON body is required.

```json
{
  "items": [
    {
      "scanData": "]Q1https://id.gs1.org/01/09501101532007/21/VM-LFP100-26-1"
    },
    {
      "elementString": "(01)09501101532007"
    },
    {
      "digitalLink": "not-a-valid-link"
    }
  ]
}
```

## Responses

- **200** — Per-item decode results aligned to input order (partial-success — one bad item never fails the batch).
- **400** — Missing/empty/non-array items, or more than 200 items. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **503** — The GS1 Syntax Engine (WASM) could not be loaded. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/gs1/decode/batch' \
  --data '{"items":[{"scanData":"]Q1https://id.gs1.org/01/09501101532007/21/VM-LFP100-26-1"},{"elementString":"(01)09501101532007"},{"digitalLink":"not-a-valid-link"}]}'
```

## See also

Schemas: [Error](/schemas/Error.md).
