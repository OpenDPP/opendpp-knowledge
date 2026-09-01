---
type: Schema
title: PassportUpdateBadRequest
description: "The two 400 bodies of a passport update: the standard error triple, or an ESPR validation failure (which, unlike creation, carries NO warnings array)."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportUpdateBadRequest
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

The two 400 bodies of a passport update: the standard error triple, or an ESPR validation failure (which, unlike creation, carries NO `warnings` array).

## JSON Schema

```json
{
  "description": "The two 400 bodies of a passport update: the standard error triple, or an ESPR validation failure (which, unlike creation, carries NO `warnings` array).",
  "anyOf": [
    {
      "$ref": "#/components/schemas/Error"
    },
    {
      "$ref": "#/components/schemas/PassportUpdateValidationError"
    }
  ]
}
```

## Used by

- [updatePassport](/operations/updatePassport.md) (`PUT /api/v1/passports/{id}`)
