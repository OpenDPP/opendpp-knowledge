---
type: Schema
title: GrantDecisionResponse
description: "Returned by deny and revoke: the updated grant, no token."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/GrantDecisionResponse
tags:
  - schema
timestamp: 2026-06-26T00:00:00Z
---

Returned by deny and revoke: the updated grant, no token.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `grant` | [GrantRow](/schemas/GrantRow.md) | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Returned by deny and revoke: the updated grant, no token.",
  "required": [
    "success",
    "grant"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "grant": {
      "$ref": "#/components/schemas/GrantRow"
    }
  }
}
```

## Used by

- [denyGrantRequest](/operations/denyGrantRequest.md) (`POST /api/v1/grants/{id}/deny`)
- [revokeGrant](/operations/revokeGrant.md) (`DELETE /api/v1/grants/{id}`)
