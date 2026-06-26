---
type: Schema
title: DppVocabContextDocument
description: The canonical resolvable JSON-LD context served by GET /contexts/dpp/v1 — the context every public passport and battery-unit document references in its @context.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/DppVocabContextDocument
tags:
  - schema
timestamp: 2026-06-26T00:00:00Z
---

The canonical resolvable JSON-LD context served by `GET /contexts/dpp/v1` — the context every public passport and battery-unit document references in its `@context`. Declares `@vocab` (so unknown terms expand under the OpenDPP namespace) plus core term mappings; `@version` is the numeric JSON-LD 1.1 marker, so `@context` values are a mix of strings and that number.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | object | yes | Term map: @vocab + @version (1.1) + the core DPP/unit term → dpp: CURIE mappings. |

## JSON Schema

```json
{
  "type": "object",
  "description": "The canonical resolvable JSON-LD context served by `GET /contexts/dpp/v1` — the context every public passport and battery-unit document references in its `@context`. Declares `@vocab` (so unknown terms expand under the OpenDPP namespace) plus core term mappings; `@version` is the numeric JSON-LD 1.1 marker, so `@context` values are a mix of strings and that number.",
  "additionalProperties": false,
  "required": [
    "@context"
  ],
  "properties": {
    "@context": {
      "type": "object",
      "description": "Term map: `@vocab` + `@version` (1.1) + the core DPP/unit term → `dpp:` CURIE mappings."
    }
  }
}
```

## Used by

- [getDppJsonLdContext](/operations/getDppJsonLdContext.md) (`GET /contexts/dpp/v1`)
