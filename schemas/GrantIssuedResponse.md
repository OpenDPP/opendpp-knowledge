---
type: Schema
title: GrantIssuedResponse
description: Returned by direct issuance (201) and request approval (200).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/GrantIssuedResponse
tags:
  - schema
timestamp: 2026-06-17T00:00:00Z
---

Returned by direct issuance (201) and request approval (200). `token` is the raw capability token — shown ONCE here (and, on approval, in the grantee's inspection-link e-mail); only its SHA-256 hash is persisted.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `grant` | [GrantRow](/schemas/GrantRow.md) | yes | — |
| `token` | string | yes | Legitimate-interest capability token (dpp_li_ + 32 lowercase hex). |

## JSON Schema

```json
{
  "type": "object",
  "description": "Returned by direct issuance (201) and request approval (200). `token` is the raw capability token — shown ONCE here (and, on approval, in the grantee's inspection-link e-mail); only its SHA-256 hash is persisted.",
  "required": [
    "success",
    "grant",
    "token"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "grant": {
      "$ref": "#/components/schemas/GrantRow"
    },
    "token": {
      "type": "string",
      "pattern": "^dpp_li_[0-9a-f]{32}$",
      "description": "Legitimate-interest capability token (`dpp_li_` + 32 lowercase hex). Present it to public resolution endpoints as `Authorization: Bearer <token>` or `?grant=<token>`. Treat like a password — it cannot be retrieved again."
    }
  }
}
```

## Used by

- [createGrant](/operations/createGrant.md) (`POST /api/v1/grants`)
- [approveGrantRequest](/operations/approveGrantRequest.md) (`POST /api/v1/grants/{id}/approve`)
