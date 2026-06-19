---
type: Schema
title: SectorVocabularyContext
description: Per-category JSON-LD vocabulary context, returned by GET /api/v1/schemas/{category} when Accept contains application/ld+json.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/SectorVocabularyContext
tags:
  - schema
timestamp: 2026-06-19T00:00:00Z
---

Per-category JSON-LD vocabulary context, returned by `GET /api/v1/schemas/{category}` when `Accept` contains `application/ld+json`. Fixed shape: `@vocab` is `https://w3id.org/opendpp/schemas/{category}#` plus mappings for `id`, `type`, `category`, `materialComposition`, `originCountry`, `facilityDetails` and `regulatoryCompliance`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | object | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Per-category JSON-LD vocabulary context, returned by `GET /api/v1/schemas/{category}` when `Accept` contains `application/ld+json`. Fixed shape: `@vocab` is `https://w3id.org/opendpp/schemas/{category}#` plus mappings for `id`, `type`, `category`, `materialComposition`, `originCountry`, `facilityDetails` and `regulatoryCompliance`.",
  "additionalProperties": false,
  "required": [
    "@context"
  ],
  "properties": {
    "@context": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    }
  }
}
```

## Used by

- [getSectorSchema](/operations/getSectorSchema.md) (`GET /api/v1/schemas/{category}`)
