---
type: Schema
title: PassportMetadataInput
description: The ESPR product metadata payload.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportMetadataInput
tags:
  - schema
timestamp: 2026-06-26T00:00:00Z
---

The ESPR product metadata payload. For non-draft ingestion and for the validate-only endpoints, `category` is mandatory and must be one of the 9 ESPR categories; each category then mandates its own field set (e.g. textiles require `fiberComposition`, `careInstructions`, `size`; batteries require `batteryCategory`, `chemistry`, `electrochemicalCapacity`, `durability`, `recycledContentShare`, `carbonFootprint`). For five categories — textiles, batteries, electronics, chemicals, construction — the authoritative per-category JSON Schema (required fields, value constraints, field help) is served live at `GET /api/v1/schemas/{category}`; the other four (cosmetics, toys, iron-steel, aluminium) are validated by built-in server-side rules and `GET /api/v1/schemas/{category}` returns 404 for them. Cross-field rules are enforced on top: `materialComposition` (and textile `fiberComposition`) percentages must sum to 100 ±0.1, `originCountry` must be a real ISO 3166-1 alpha-2 code, textile hazardous-substance concentrations are checked against REACH ppm limits. A documented set of supplementary objects (e.g. `technicalProperties`, `environmentalFootprint`, `circularityAttributes`, `esgDueDiligence`, `detailedPerformance`) produce non-blocking `warnings` instead of `errors` when malformed. With `draft: true` (single ingestion only) validation is skipped entirely and any object is accepted.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `category` | string | no | ESPR product category; selects the validation rules. |
| `originCountry` | string | no | ISO 3166-1 alpha-2 country code (validated against the full 249-code set). |

## JSON Schema

```json
{
  "type": "object",
  "description": "The ESPR product metadata payload. For non-draft ingestion and for the validate-only endpoints, `category` is mandatory and must be one of the 9 ESPR categories; each category then mandates its own field set (e.g. textiles require `fiberComposition`, `careInstructions`, `size`; batteries require `batteryCategory`, `chemistry`, `electrochemicalCapacity`, `durability`, `recycledContentShare`, `carbonFootprint`). For five categories — textiles, batteries, electronics, chemicals, construction — the authoritative per-category JSON Schema (required fields, value constraints, field help) is served live at `GET /api/v1/schemas/{category}`; the other four (cosmetics, toys, iron-steel, aluminium) are validated by built-in server-side rules and `GET /api/v1/schemas/{category}` returns 404 for them. Cross-field rules are enforced on top: `materialComposition` (and textile `fiberComposition`) percentages must sum to 100 ±0.1, `originCountry` must be a real ISO 3166-1 alpha-2 code, textile hazardous-substance concentrations are checked against REACH ppm limits. A documented set of supplementary objects (e.g. `technicalProperties`, `environmentalFootprint`, `circularityAttributes`, `esgDueDiligence`, `detailedPerformance`) produce non-blocking `warnings` instead of `errors` when malformed. With `draft: true` (single ingestion only) validation is skipped entirely and any object is accepted.",
  "properties": {
    "category": {
      "type": "string",
      "enum": [
        "textiles",
        "batteries",
        "electronics",
        "cosmetics",
        "toys",
        "iron-steel",
        "aluminium",
        "chemicals",
        "construction"
      ],
      "description": "ESPR product category; selects the validation rules. Required whenever validation runs (i.e. always, except `draft: true` single ingestion)."
    },
    "originCountry": {
      "type": "string",
      "pattern": "^[A-Z]{2}$",
      "description": "ISO 3166-1 alpha-2 country code (validated against the full 249-code set)."
    }
  },
  "additionalProperties": true
}
```

## Used by

- schema [PassportCreateRequest](/schemas/PassportCreateRequest.md)
- schema [PassportValidateOnlyRequest](/schemas/PassportValidateOnlyRequest.md)
- schema [PassportBulkRow](/schemas/PassportBulkRow.md)
