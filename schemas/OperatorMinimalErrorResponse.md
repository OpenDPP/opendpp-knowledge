---
type: Schema
title: OperatorMinimalErrorResponse
description: "An operator-endpoint error: either the route's minimal {error, message} body (no success field) or the standard middleware envelope."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/OperatorMinimalErrorResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

An operator-endpoint error: either the route's minimal `{error, message}` body (no `success` field) or the standard middleware envelope.

## JSON Schema

```json
{
  "description": "An operator-endpoint error: either the route's minimal `{error, message}` body (no `success` field) or the standard middleware envelope.",
  "anyOf": [
    {
      "$ref": "#/components/schemas/OperatorMinimalError"
    },
    {
      "$ref": "#/components/schemas/Error"
    }
  ]
}
```

## Used by

- [registerOperator](/operations/registerOperator.md) (`POST /api/v1/operators`)
- [rotateTenantKeys](/operations/rotateTenantKeys.md) (`POST /api/v1/tenants/rotate-keys`)
