---
type: Schema
title: GrantRouteError
description: Error body used by the grants endpoints' route-level errors (400/403/404/409).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/GrantRouteError
tags:
  - schema
timestamp: 2026-06-26T00:00:00Z
---

Error body used by the grants endpoints' route-level errors (400/403/404/409). Unlike the standard error envelope, it has NO `success` field.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `error` | string | yes | HTTP reason phrase, e.g. |
| `message` | string | yes | Human-readable explanation. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Error body used by the grants endpoints' route-level errors (400/403/404/409). Unlike the standard error envelope, it has NO `success` field.",
  "required": [
    "error",
    "message"
  ],
  "not": {
    "required": [
      "success"
    ]
  },
  "properties": {
    "error": {
      "type": "string",
      "description": "HTTP reason phrase, e.g. `Bad Request`, `Not Found`, `Conflict`, `Forbidden`."
    },
    "message": {
      "type": "string",
      "description": "Human-readable explanation."
    }
  }
}
```

## Used by

- [createGrant](/operations/createGrant.md) (`POST /api/v1/grants`)
- [approveGrantRequest](/operations/approveGrantRequest.md) (`POST /api/v1/grants/{id}/approve`)
- [denyGrantRequest](/operations/denyGrantRequest.md) (`POST /api/v1/grants/{id}/deny`)
- [revokeGrant](/operations/revokeGrant.md) (`DELETE /api/v1/grants/{id}`)
