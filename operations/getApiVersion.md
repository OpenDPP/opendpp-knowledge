---
type: API Endpoint
title: Running API contract version & build identity
description: Running API contract version & build identity
resource: https://opendpp-node.eu/api/v1/version
tags:
  - GET
  - service
timestamp: 2026-06-20T00:00:00Z
---

`GET /api/v1/version`

**Domain:** [Service](/tags/service.md)  
**Authentication:** **Public** — no authentication required.

Returns the SemVer of the public API contract currently served (`apiVersion`), plus the source build identity (`commit`, `builtAt`). The contract's MAJOR equals the `/api/v1` URL major; a breaking change ships as a new `/api/v1`-style major (`/api/v2`), never as an edit to this contract — so a stable `apiVersion` major is a safe thing for an integration or a generated SDK to pin to. `commit`/`builtAt` read `"unknown"` when a build did not inject them. No authentication, no permission; subject only to the global platform rate limit (100 req/min/IP).

## Responses

- **200** — The running API contract version and build identity. → [ServiceVersion](/schemas/ServiceVersion.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/api/v1/version'
```

## See also

Schemas: [ServiceVersion](/schemas/ServiceVersion.md).
