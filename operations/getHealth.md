---
type: API Endpoint
title: Service health check
description: Service health check
resource: https://opendpp-node.eu/health
tags:
  - GET
  - service
timestamp: 2026-06-29T00:00:00Z
---

`GET /health`

**Domain:** [Service](/tags/service.md)  
**Authentication:** **Public** — no authentication required.

Liveness probe. Always returns 200 with the service identity, the current server time (ISO 8601 UTC with milliseconds), and the running build identity (`apiVersion`/`commit`/`builtAt` — the same fields as `GET /api/v1/version`). No authentication, no permission. Subject only to the global platform rate limit (100 req/min/IP, 600/min for known crawler user agents; standard `x-ratelimit-*` headers on responses). This is the one path exempt from tenant-subdomain resolution — it answers 200 on any host.

## Responses

- **200** — Service is up. → [HealthStatus](/schemas/HealthStatus.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/health'
```

## See also

Schemas: [HealthStatus](/schemas/HealthStatus.md).
