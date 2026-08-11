---
type: Schema
title: BatteryUnitListResponse
description: A page of the serialised battery units recorded under one passport, with the paging envelope.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/BatteryUnitListResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-09T00:00:00Z
---

A page of the serialised battery units recorded under one passport, with the paging envelope.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `count` | integer | yes | Number of items returned in THIS page (≤ limit). |
| `productId` | string | yes | The passport's caller-supplied product identifier (GTIN-14 / GRAI / SKU). |
| `units` | array<[BatteryUnitRow](/schemas/BatteryUnitRow.md)> | yes | All units of the passport, createdAt DESC. |
| `page` | integer | yes | 1-based page number returned. |
| `limit` | integer | yes | Effective page size (default 100, max 200). |
| `total` | integer | yes | Total items matching across all pages. |
| `totalPages` | integer | yes | Total number of pages (≥ 1). |

## JSON Schema

```json
{
  "description": "A page of the serialised battery units recorded under one passport, with the paging envelope.",
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "count": {
      "type": "integer",
      "description": "Number of items returned in THIS page (≤ `limit`)."
    },
    "productId": {
      "type": "string",
      "description": "The passport's caller-supplied product identifier (GTIN-14 / GRAI / SKU)."
    },
    "units": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/BatteryUnitRow"
      },
      "description": "All units of the passport, `createdAt` DESC."
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
  },
  "required": [
    "success",
    "count",
    "productId",
    "units",
    "page",
    "limit",
    "total",
    "totalPages"
  ]
}
```

## Used by

- [listBatteryUnits](/operations/listBatteryUnits.md) (`GET /api/v1/passports/{passportId}/units`)
