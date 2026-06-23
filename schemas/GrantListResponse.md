---
type: Schema
title: GrantListResponse
description: List envelope for GET /api/v1/grants (paginated).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/GrantListResponse
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

List envelope for `GET /api/v1/grants` (paginated).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `count` | integer | yes | Number of items returned in THIS page (≤ limit). |
| `page` | integer | yes | 1-based page number returned. |
| `limit` | integer | yes | Effective page size (default 100, max 200). |
| `total` | integer | yes | Total items matching across all pages. |
| `totalPages` | integer | yes | Total number of pages (≥ 1). |
| `grants` | array<[GrantRow](/schemas/GrantRow.md)> | yes | Grants for this page (≤ limit), ordered by status ascending then createdAt descending. |

## JSON Schema

```json
{
  "type": "object",
  "description": "List envelope for `GET /api/v1/grants` (paginated).",
  "required": [
    "success",
    "grants",
    "count",
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
    },
    "grants": {
      "type": "array",
      "maxItems": 200,
      "items": {
        "$ref": "#/components/schemas/GrantRow"
      },
      "description": "Grants for this page (≤ `limit`), ordered by `status` ascending then `createdAt` descending."
    }
  }
}
```

## Used by

- [listGrants](/operations/listGrants.md) (`GET /api/v1/grants`)
