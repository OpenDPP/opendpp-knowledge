---
type: Reference
title: Schemas & Vocabulary
description: "Machine-readable contracts: per-category ESPR JSON Schemas, the W3C JSON-LD context, and the curated materials vocabulary."
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - schemas-vocabulary
timestamp: 2026-06-19T00:00:00Z
---

Machine-readable contracts: per-category ESPR JSON Schemas, the W3C JSON-LD context, and the curated materials vocabulary.

## Operations

- [getSectorSchema](/operations/getSectorSchema.md) — `GET /api/v1/schemas/{category}` — Get the ESPR metadata schema for a product category
- [getJsonLdContext](/operations/getJsonLdContext.md) — `GET /context/v1` — W3C JSON-LD context document for passport terms
- [listMaterials](/operations/listMaterials.md) — `GET /api/v1/materials` — List the platform-curated material vocabulary
