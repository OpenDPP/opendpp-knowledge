---
type: Schema
title: PassportEnrichmentInput
description: Optional presentational (non-regulatory) marketing enrichment, stored OUTSIDE the ESPR-validated metadata and the Merkle seal; it never appears in the JSON-LD passport document.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportEnrichmentInput
tags:
  - schema
timestamp: 2026-06-17T00:00:00Z
---

Optional presentational (non-regulatory) marketing enrichment, stored OUTSIDE the ESPR-validated metadata and the Merkle seal; it never appears in the JSON-LD passport document. Server-side it is whitelist-sanitized rather than rejected: unknown keys are dropped; `tagline` is trimmed and capped at 200 chars, `description` at 4000, image `caption` at 200, link `label` at 120; at most 24 `images` and 24 `links` are kept; URLs must be http, https, or mailto (any other scheme, e.g. `javascript:` or `data:`, is silently dropped). An enrichment that sanitizes down to nothing is stored as null.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `tagline` | string | no | Short marketing tagline (server-capped at 200 chars). |
| `description` | string | no | Marketing description (server-capped at 4000 chars). |
| `images` | array<object> | no | Up to 24 kept. |
| `links` | array<object> | no | Up to 24 kept. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Optional presentational (non-regulatory) marketing enrichment, stored OUTSIDE the ESPR-validated metadata and the Merkle seal; it never appears in the JSON-LD passport document. Server-side it is whitelist-sanitized rather than rejected: unknown keys are dropped; `tagline` is trimmed and capped at 200 chars, `description` at 4000, image `caption` at 200, link `label` at 120; at most 24 `images` and 24 `links` are kept; URLs must be http, https, or mailto (any other scheme, e.g. `javascript:` or `data:`, is silently dropped). An enrichment that sanitizes down to nothing is stored as null.",
  "properties": {
    "tagline": {
      "type": "string",
      "description": "Short marketing tagline (server-capped at 200 chars)."
    },
    "description": {
      "type": "string",
      "description": "Marketing description (server-capped at 4000 chars)."
    },
    "images": {
      "type": "array",
      "description": "Up to 24 kept. Items without a valid http/https/mailto `url` are dropped.",
      "items": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "format": "uri",
            "description": "http, https, or mailto only."
          },
          "caption": {
            "type": "string",
            "description": "Server-capped at 200 chars."
          }
        }
      }
    },
    "links": {
      "type": "array",
      "description": "Up to 24 kept. Items without a valid http/https/mailto `url` are dropped; a missing `label` defaults to the URL.",
      "items": {
        "type": "object",
        "properties": {
          "label": {
            "type": "string",
            "description": "Server-capped at 120 chars."
          },
          "url": {
            "type": "string",
            "format": "uri",
            "description": "http, https, or mailto only."
          }
        }
      }
    }
  },
  "additionalProperties": true
}
```

## Used by

- schema [PassportCreateRequest](/schemas/PassportCreateRequest.md)
- schema [PassportUpdateRequest](/schemas/PassportUpdateRequest.md)
