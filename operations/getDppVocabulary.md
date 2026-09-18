---
type: API Endpoint
title: The OpenDPP vocabulary every passport term IRI resolves to
description: Serves the RDFS/OWL-shaped vocabulary document (application/ld+json) that defines the terms a passport or unit document uses.
resource: https://opendpp-node.eu/ns/dpp
tags:
  - GET
  - schemas-vocabulary
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /ns/dpp`

**Domain:** [Schemas & Vocabulary](/tags/schemas-vocabulary.md)  
**Authentication:** **Public** — no authentication required.

Serves the RDFS/OWL-shaped vocabulary document (`application/ld+json`) that defines the terms a passport or unit document uses. Every term in an emitted `@context` — the EN 18223:2026 Table 1 header attributes and the server-owned terms alike — expands to an IRI under `https://opendpp-node.eu/ns/dpp#`, and this is what that namespace resolves to, so a consumer following a term arrives at its definition rather than at nothing.

It is also the data dictionary behind the body (EN 18223:2026 4.3): one entry per data element a content specification can put in a passport, identified by its path (`carbonFootprint.co2eKg`), with its clause 4 kind (`elementKind`), the Table 7 `valueDataType` where the schema fixes one, the content specifications that declare it (`contentSpecifications`) and, where the node's concept registry knows the element, its external `concept` and `unit`. The compressed document omits `dictionaryReference` and `valueDataType` per 5.2.2; this is where a consumer — and the Annex A expanded form — find them. A term under this namespace that the vocabulary does **not** define is an operator extension key: it is validated by the category schema the instance names in `contentSpecificationIds` (`GET /api/v1/schemas/{category}`) and has no definition here. Cacheable for a day; public and unauthenticated, because a client resolving a term to learn what it means cannot hold a credential.

## Responses

- **200** — The vocabulary document: an owl:Ontology node whose defines array carries one rdf:Property per term — the header attributes, the server-owned terms and every d…
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.

## Example

```bash
curl -s \
  -X GET 'https://opendpp-node.eu/ns/dpp'
```
