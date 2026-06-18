---
type: Schema
title: MaterialVocabularyListResponse
description: Envelope of GET /api/v1/materials.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/MaterialVocabularyListResponse
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

Envelope of `GET /api/v1/materials`. Caveat: unlike most authenticated endpoints there is NO `success` field.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `materials` | array<[MaterialVocabularyRow](/schemas/MaterialVocabularyRow.md)> | yes | Active vocabulary entries, ordered by kind ascending then name ascending, capped at limit (max 1000). |

## JSON Schema

```json
{
  "type": "object",
  "description": "Envelope of `GET /api/v1/materials`. Caveat: unlike most authenticated endpoints there is NO `success` field.",
  "required": [
    "materials"
  ],
  "properties": {
    "materials": {
      "type": "array",
      "description": "Active vocabulary entries, ordered by `kind` ascending then `name` ascending, capped at `limit` (max 1000).",
      "items": {
        "$ref": "#/components/schemas/MaterialVocabularyRow"
      }
    }
  }
}
```

## Used by

- [listMaterials](/operations/listMaterials.md) (`GET /api/v1/materials`)
