---
type: API Endpoint
title: Canonical resolvable JSON-LD context for passport & unit documents
description: Canonical resolvable JSON-LD context for passport & unit documents
resource: https://opendpp-node.eu/contexts/dpp/v1
tags:
  - GET
  - schemas-vocabulary
timestamp: 2026-06-20T00:00:00Z
---

`GET /contexts/dpp/v1`

**Domain:** [Schemas & Vocabulary](/tags/schemas-vocabulary.md)  
**Authentication:** **Public** — no authentication required.

Serves the stable, resolvable W3C JSON-LD `@context` (`application/ld+json`) that **every** public passport and battery-unit JSON-LD document references in its `@context` array — this is the context to dereference when expanding OpenDPP JSON-LD. It declares `@vocab: https://opendpp-node.eu/ns/dpp#` (so even dynamic metadata keys expand under the OpenDPP namespace and are never silently dropped by a strict JSON-LD processor) plus explicit term mappings for the core DPP/unit vocabulary (`DigitalProductPassport`, `BatteryUnit`, `economicOperator`, `manufacturingFacility`, `metadata`, `digitalSeal`, `signingPublicKey`, `proof`, `status`, `MerkleTreeAttestationProof`). Cacheable (`Cache-Control: public, max-age=86400`).

(The separate `/context/v1` serves an older, fixed term-only list and is **not** the context emitted documents point to.)

No authentication, no permission (public endpoint). No custom rate limiter — only the global platform limit applies (100 req/min/IP, standard `x-ratelimit-*` headers).

## Responses

- **200** — The canonical @vocab-based JSON-LD context document (fixed content). → [DppVocabContextDocument](/schemas/DppVocabContextDocument.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/contexts/dpp/v1'
```

## See also

Schemas: [DppVocabContextDocument](/schemas/DppVocabContextDocument.md).
