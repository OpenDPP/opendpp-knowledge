---
type: Schema
title: FacilityListEnvelope
description: FacilityListEnvelope
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityListEnvelope
tags:
  - schema
timestamp: 2026-06-19T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `count` | integer | yes | Number of items returned in THIS page (≤ limit). |
| `facilities` | array<[FacilityRow](/schemas/FacilityRow.md)> | yes | All facilities in the workspace, sorted by createdAt descending. |
| `page` | integer | yes | 1-based page number returned. |
| `limit` | integer | yes | Effective page size (default 100, max 200). |
| `total` | integer | yes | Total items matching across all pages. |
| `totalPages` | integer | yes | Total number of pages (≥ 1). |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "count",
    "facilities",
    "page",
    "limit",
    "total",
    "totalPages"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "count": {
      "type": "integer",
      "description": "Number of items returned in THIS page (≤ `limit`)."
    },
    "facilities": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/FacilityRow"
      },
      "description": "All facilities in the workspace, sorted by createdAt descending. Operator-scoped keys see only their operator's facilities."
    },
    "page": {
      "type": "integer",
      "description": "1-based page number returned."
    },
    "limit": {
      "type": "integer",
      "description": "Effective page size (default 100, max 200)."
    },
    "total": {
      "type": "integer",
      "description": "Total items matching across all pages."
    },
    "totalPages": {
      "type": "integer",
      "description": "Total number of pages (≥ 1)."
    }
  }
}
```

## Used by

- [listFacilities](/operations/listFacilities.md) (`GET /api/v1/facilities`)
