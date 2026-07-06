---
type: API Endpoint
title: Compute a GTIN check digit from a company prefix + item reference
description: Compute a GTIN check digit from a company prefix + item reference
resource: https://opendpp-node.eu/api/v1/gs1/gtin
tags:
  - POST
  - public-resolution
timestamp: 2026-07-04T00:00:00Z
---

`POST /api/v1/gs1/gtin`

**Domain:** [Public Resolution](/tags/public-resolution.md)  
**Authentication:** Authentication required.

The actionable counterpart to the non-GS1 ingest advisory (#255): given the **GS1 company prefix your organisation legally owns** plus an item reference, OpenDPP computes the GS1 **mod-10 check digit** and returns the resulting 14-digit GTIN + a Digital Link preview. Set the GTIN as a passport `productId` to get a scannable GS1 Digital Link.

**It ONLY completes the check digit** — it never allocates a GS1 company prefix or asserts ownership (a real GTIN requires a prefix licensed to you by GS1). `gs1CompanyPrefix` is REQUIRED; a request with none is refused (**400**). `gs1CompanyPrefix + itemRef` must be exactly **13 digits** (the check digit forms the 14th) and both must be digit strings, else **400**.

Public + stateless (pure arithmetic; no tenant data). No authentication. Rate limit: global 100 requests/min per IP.

## Request body

A JSON body is required.

```json
{
  "gs1CompanyPrefix": "0950110153",
  "itemRef": "000"
}
```

## Responses

- **200** — The computed GTIN + Digital Link preview.
- **400** — gs1CompanyPrefix missing (we never fabricate a GTIN), non-digit input, or prefix + itemRef not exactly 13 digits.

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/gs1/gtin' \
  --data '{"gs1CompanyPrefix":"0950110153","itemRef":"000"}'
```
