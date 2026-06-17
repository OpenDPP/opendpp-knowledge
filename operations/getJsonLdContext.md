---
type: API Endpoint
title: W3C JSON-LD context document for passport terms
description: W3C JSON-LD context document for passport terms
resource: https://opendpp-node.eu/context/v1
tags:
  - GET
  - schemas-vocabulary
timestamp: 2026-06-17T00:00:00Z
---

`GET /context/v1`

**Domain:** [Schemas & Vocabulary](/tags/schemas-vocabulary.md)  
**Authentication:** **Public** — no authentication required.

Serves the resolvable W3C JSON-LD `@context` document for the core Digital Product Passport terms referenced from every passport JSON-LD representation. Static, fixed content (`application/ld+json`): maps the DPP terms to `https://opendpp-node.eu/ns/dpp#…` IRIs and `createdAt`/`updatedAt` to schema.org `dateCreated`/`dateModified`.

No authentication, no permission (public endpoint). No custom rate limiter — only the global platform limit applies (100 req/min/IP, standard `x-ratelimit-*` headers). Like every documented path except `/health`, a request on an unknown tenant workspace host receives a platform-level JSON 404 before this handler runs.

## Responses

- **200** — The JSON-LD context document (fixed content). → [DppJsonLdContextDocument](/schemas/DppJsonLdContextDocument.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/context/v1'
```

## See also

Schemas: [DppJsonLdContextDocument](/schemas/DppJsonLdContextDocument.md).
