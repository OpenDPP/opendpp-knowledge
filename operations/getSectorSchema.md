---
type: API Endpoint
title: Get the ESPR metadata schema for a product category
description: Get the ESPR metadata schema for a product category
resource: https://opendpp-node.eu/api/v1/schemas/{category}
tags:
  - GET
  - schemas-vocabulary
timestamp: 2026-06-19T00:00:00Z
---

`GET /api/v1/schemas/{category}`

**Domain:** [Schemas & Vocabulary](/tags/schemas-vocabulary.md)  
**Authentication:** **Public** — no authentication required.

Returns the machine-readable ESPR `metadata` schema for a product category.

**Default representation** (any `Accept` NOT containing `application/ld+json`): the category's JSON Schema **draft-07** document, served as `application/schema+json`, with each known field annotated server-side with a plain-English `description` (the annotations are AJV-ignored — validation behavior is unchanged). **With `Accept: application/ld+json`:** a small JSON-LD `@context` for the category vocabulary instead. Note: the route does not set `Vary: Accept`.

The category path segment is lower-cased before lookup. Machine-readable schemas exist for **5** of the 9 ESPR categories: `textiles`, `batteries`, `electronics`, `chemicals`, `construction`. The remaining 4 categories accepted by passport metadata validation (`cosmetics`, `toys`, `iron-steel`, `aluminium`) are validated by built-in server rules and currently return `404` from this endpoint.

No authentication, no permission (public endpoint). No custom rate limiter — only the global platform limit applies (100 req/min/IP, standard `x-ratelimit-*` headers). Like every documented path except `/health`, a request on an unknown tenant workspace host receives a platform-level JSON 404 (`No tenant company found for subdomain: …`, no `success` field) before this handler runs.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `category` | path | yes | string | ESPR product category (case-insensitive). |

## Responses

- **200** — The category schema (default) or its JSON-LD vocabulary context (Accept: application/ld+json). → [SectorJsonSchemaDocument](/schemas/SectorJsonSchemaDocument.md), [SectorVocabularyContext](/schemas/SectorVocabularyContext.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/api/v1/schemas/{category}'
```

## See also

Schemas: [SectorJsonSchemaDocument](/schemas/SectorJsonSchemaDocument.md), [SectorVocabularyContext](/schemas/SectorVocabularyContext.md).
