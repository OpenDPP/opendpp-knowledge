---
type: Schema
title: SectorJsonSchemaDocument
description: A JSON Schema draft-07 document describing the ESPR metadata payload for one product category, served as application/schema+json.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/SectorJsonSchemaDocument
tags:
  - schema
timestamp: 2026-06-20T00:00:00Z
---

A JSON Schema **draft-07** document describing the ESPR `metadata` payload for one product category, served as `application/schema+json`. Each known field is annotated server-side with a plain-English `description` from the platform's field-help registry (annotations are AJV-ignored; validation behavior is identical to the raw schema). The same schema (without annotations) validates `metadata` on `POST /api/v1/passports` and the validate-only endpoints.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `$schema` | string | yes | — |
| `title` | string | yes | — |
| `type` | string | yes | — |
| `required` | array<string> | yes | — |
| `properties` | object | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "A JSON Schema **draft-07** document describing the ESPR `metadata` payload for one product category, served as `application/schema+json`. Each known field is annotated server-side with a plain-English `description` from the platform's field-help registry (annotations are AJV-ignored; validation behavior is identical to the raw schema). The same schema (without annotations) validates `metadata` on `POST /api/v1/passports` and the validate-only endpoints.",
  "additionalProperties": true,
  "required": [
    "$schema",
    "title",
    "type",
    "required",
    "properties"
  ],
  "properties": {
    "$schema": {
      "type": "string",
      "const": "http://json-schema.org/draft-07/schema#"
    },
    "title": {
      "type": "string"
    },
    "type": {
      "type": "string",
      "const": "object"
    },
    "required": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "properties": {
      "type": "object",
      "additionalProperties": true
    }
  }
}
```

## Used by

- [getSectorSchema](/operations/getSectorSchema.md) (`GET /api/v1/schemas/{category}`)
