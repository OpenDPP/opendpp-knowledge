---
type: Schema
title: MaterialVocabularyRow
description: One entry of the platform-curated material vocabulary.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/MaterialVocabularyRow
tags:
  - schema
timestamp: 2026-07-04T00:00:00Z
---

One entry of the platform-curated material vocabulary. Entries are unique per (`kind`, `name`).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | — |
| `name` | string | yes | Canonical display name, e.g. |
| `kind` | string | yes | Vocabulary kind. |
| `casNumber` | string,null | yes | Optional CAS registry number (chemicals/substances); null when not applicable. |
| `description` | string,null | yes | Optional short note shown in the picker; null when unset. |

## JSON Schema

```json
{
  "type": "object",
  "description": "One entry of the platform-curated material vocabulary. Entries are unique per (`kind`, `name`).",
  "required": [
    "id",
    "name",
    "kind",
    "casNumber",
    "description"
  ],
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string",
      "description": "Canonical display name, e.g. \"Organic Cotton\" or \"Lithium Iron Phosphate (LFP)\"."
    },
    "kind": {
      "type": "string",
      "enum": [
        "material",
        "fiber",
        "chemistry",
        "substance",
        "hazard",
        "crm"
      ],
      "description": "Vocabulary kind. `crm` = critical raw material."
    },
    "casNumber": {
      "type": [
        "string",
        "null"
      ],
      "description": "Optional CAS registry number (chemicals/substances); null when not applicable."
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "description": "Optional short note shown in the picker; null when unset."
    }
  }
}
```

## Used by

- schema [MaterialVocabularyListResponse](/schemas/MaterialVocabularyListResponse.md)
