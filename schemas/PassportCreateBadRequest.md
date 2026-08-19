---
type: Schema
title: PassportCreateBadRequest
description: "The 400 bodies of passport creation: an ESPR validation failure with per-field errors[], or the standard error triple / pre-handler rejection."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportCreateBadRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

The 400 bodies of passport creation: an ESPR validation failure with per-field `errors[]`, or the standard error triple / pre-handler rejection.

## JSON Schema

```json
{
  "description": "The 400 bodies of passport creation: an ESPR validation failure with per-field `errors[]`, or the standard error triple / pre-handler rejection.",
  "anyOf": [
    {
      "$ref": "#/components/schemas/PassportCreateValidationError"
    },
    {
      "$ref": "#/components/schemas/Error"
    }
  ]
}
```

## Used by

- [createPassport](/operations/createPassport.md) (`POST /api/v1/passports`)
