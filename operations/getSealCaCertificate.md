---
type: API Endpoint
title: Download the platform seal-CA certificate (PEM)
description: Download the platform seal-CA certificate (PEM)
resource: https://opendpp-node.eu/.well-known/opendpp-seal-ca.pem
tags:
  - GET
  - eidas-keys
timestamp: 2026-06-19T00:00:00Z
---

`GET /.well-known/opendpp-seal-ca.pem`

**Domain:** [eIDAS Keys](/tags/eidas-keys.md)  
**Authentication:** **Public** — no authentication required.

Downloads the platform seal-CA certificate as PEM. Third parties pin this CA to validate the `x5c` certificate chains embedded in sealed-passport `proof` blocks — the chain's leaf certificate binds a tenant's signing key to its legal identity (eIDAS Art. 36(1)(b) creator identification; the seal is an eIDAS *advanced*, not qualified, electronic seal). The certificate is provisioned server-side on first use.

No authentication, no permission (public endpoint). Successful responses carry `Cache-Control: public, max-age=3600`. Like every documented path except `/health`, a request on an unknown tenant workspace host receives a platform-level JSON 404 before this handler runs.

**Rate limit:** 30 requests/min/IP via the in-memory public limiter — note that this route's 429 body carries ONLY `{"error": "Too Many Requests"}` (no `message`, no `success`), unlike the other public resolvers. The global platform limit (100 req/min/IP) applies on top: a global-limit 429 carries the platform's default `{statusCode, error, message}` body instead, and the global limiter's `x-ratelimit-*` headers appear on every response from this route. Returns `503` if the seal CA cannot be provisioned or loaded.

## Responses

- **200** — The CA certificate, PEM-encoded.
- **429** — Rate limited (30/min/IP in-memory public limiter).
- **503** — Seal CA not available (provisioning/load failure). → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/.well-known/opendpp-seal-ca.pem'
```

## See also

Schemas: [Error](/schemas/Error.md).
