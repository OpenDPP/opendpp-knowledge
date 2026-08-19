---
type: Schema
title: GrantRevokeForbidden
description: "The two 403 bodies of grant revocation: the route-level {error, message} body (an AUTHORITY grant cannot be revoked by the workspace; no success field) and the standard middleware envelope."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/GrantRevokeForbidden
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

The two 403 bodies of grant revocation: the route-level `{error, message}` body (an `AUTHORITY` grant cannot be revoked by the workspace; no `success` field) and the standard middleware envelope.

## JSON Schema

```json
{
  "description": "The two 403 bodies of grant revocation: the route-level `{error, message}` body (an `AUTHORITY` grant cannot be revoked by the workspace; no `success` field) and the standard middleware envelope.",
  "anyOf": [
    {
      "$ref": "#/components/schemas/GrantRouteError"
    },
    {
      "$ref": "#/components/schemas/Error"
    }
  ]
}
```

## Used by

- [revokeGrant](/operations/revokeGrant.md) (`DELETE /api/v1/grants/{id}`)
