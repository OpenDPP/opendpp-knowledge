---
type: API Endpoint
title: W3C JSON-LD context document for passport terms (secondary, fixed term list)
description: W3C JSON-LD context document for passport terms (secondary, fixed term list)
resource: https://opendpp-node.eu/context/v1
tags:
  - GET
  - schemas-vocabulary
timestamp: 2026-06-26T00:00:00Z
---

`GET /context/v1`

**Domain:** [Schemas & Vocabulary](/tags/schemas-vocabulary.md)  
**Authentication:** **Public** — no authentication required.

Serves a static W3C JSON-LD `@context` document (`application/ld+json`) for the core Digital Product Passport term vocabulary: maps the DPP terms to `https://opendpp-node.eu/ns/dpp#…` IRIs and `createdAt`/`updatedAt` to schema.org `dateCreated`/`dateModified`. This is a **secondary** fixed term list — the context that public passport/unit JSON-LD documents actually reference is the `@vocab`-based one at `GET /contexts/dpp/v1`; dereference that when expanding OpenDPP JSON-LD.

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
