---
type: API Endpoint
title: Service health check
description: Liveness probe.
resource: https://opendpp-node.eu/health
tags:
  - GET
  - service
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

`GET /health`

**Domain:** [Service](/tags/service.md)  
**Authentication:** **Public** — no authentication required.

Liveness probe. Always returns 200 with the service identity, the current server time (ISO 8601 UTC with milliseconds), and the running build identity (`apiVersion`/`commit`/`builtAt` — the same fields as `GET /api/v1/version`). No authentication, no permission. **Exempt from the platform rate limit** so a monitor or uptime check can poll it freely — it carries no `x-ratelimit-*` headers. This is the one path exempt from tenant-subdomain resolution — it answers 200 on any host.

## Responses

- **200** — Service is up. → [HealthStatus](/schemas/HealthStatus.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/health'
```

## See also

Schemas: [HealthStatus](/schemas/HealthStatus.md).
