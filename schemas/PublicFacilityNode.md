---
type: Schema
title: PublicFacilityNode
description: Embedded manufacturing-facility JSON-LD node — the GS1 GLN-backed Unique Facility Identifier (UFI, EN 18219).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PublicFacilityNode
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

Embedded manufacturing-facility JSON-LD node — the GS1 GLN-backed Unique Facility Identifier (UFI, EN 18219). The five listed fields are public; `streetAddress`/`city`/`postalCode` appear ONLY in owner-tier responses (never via legitimate-interest grants).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@type` | string | yes | — |
| `id` | string | yes | — |
| `gln` | string | yes | GS1 GLN-13 with a valid modulo-10 check digit. |
| `name` | string | yes | — |
| `activity` | string,null | yes | What the facility does in the chain, e.g. |
| `country` | string | yes | ISO 3166-1 alpha-2 country code. |
| `streetAddress` | string,null | no | Owner tier only — omitted from public and grant-tier responses. |
| `city` | string,null | no | Owner tier only. |
| `postalCode` | string,null | no | Owner tier only. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Embedded manufacturing-facility JSON-LD node — the GS1 GLN-backed Unique Facility Identifier (UFI, EN 18219). The five listed fields are public; `streetAddress`/`city`/`postalCode` appear ONLY in owner-tier responses (never via legitimate-interest grants).",
  "required": [
    "@type",
    "id",
    "gln",
    "name",
    "activity",
    "country"
  ],
  "properties": {
    "@type": {
      "type": "string",
      "const": "Facility"
    },
    "id": {
      "type": "string"
    },
    "gln": {
      "type": "string",
      "pattern": "^[0-9]{13}$",
      "description": "GS1 GLN-13 with a valid modulo-10 check digit."
    },
    "name": {
      "type": "string"
    },
    "activity": {
      "type": [
        "string",
        "null"
      ],
      "description": "What the facility does in the chain, e.g. `cell assembly`."
    },
    "country": {
      "type": "string",
      "description": "ISO 3166-1 alpha-2 country code."
    },
    "streetAddress": {
      "type": [
        "string",
        "null"
      ],
      "description": "Owner tier only — omitted from public and grant-tier responses."
    },
    "city": {
      "type": [
        "string",
        "null"
      ],
      "description": "Owner tier only."
    },
    "postalCode": {
      "type": [
        "string",
        "null"
      ],
      "description": "Owner tier only."
    }
  }
}
```

## Used by

- schema [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
