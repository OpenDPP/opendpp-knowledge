---
type: Schema
title: OperatorMinimalError
description: Minimal error envelope used by the operator/key self-service handlers — note the standard error key is ABSENT (unlike the shared Error schema).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/OperatorMinimalError
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

Minimal error envelope used by the operator/key self-service handlers — note the standard `error` key is ABSENT (unlike the shared Error schema).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Minimal error envelope used by the operator/key self-service handlers — note the standard `error` key is ABSENT (unlike the shared Error schema).",
  "required": [
    "success",
    "message"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": false
    },
    "message": {
      "type": "string"
    }
  }
}
```

## Used by

- [registerOperator](/operations/registerOperator.md) (`POST /api/v1/operators`)
- [updateOperator](/operations/updateOperator.md) (`PATCH /api/v1/operators/{id}`)
- [deleteOperator](/operations/deleteOperator.md) (`DELETE /api/v1/operators/{id}`)
- [restoreOperator](/operations/restoreOperator.md) (`POST /api/v1/operators/{id}/restore`)
- [rotateTenantKeys](/operations/rotateTenantKeys.md) (`POST /api/v1/tenants/rotate-keys`)
