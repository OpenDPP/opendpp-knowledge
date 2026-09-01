---
type: Schema
title: PassportGetNotFound
description: "The two 404 bodies of an authenticated passport read: the standard workspace-scoped envelope, or the body forwarded from the public resolver (no success field)."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportGetNotFound
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

The two 404 bodies of an authenticated passport read: the standard workspace-scoped envelope, or the body forwarded from the public resolver (no `success` field).

## JSON Schema

```json
{
  "description": "The two 404 bodies of an authenticated passport read: the standard workspace-scoped envelope, or the body forwarded from the public resolver (no `success` field).",
  "anyOf": [
    {
      "$ref": "#/components/schemas/Error"
    },
    {
      "$ref": "#/components/schemas/ForwardedResolverError"
    }
  ]
}
```

## Used by

- [getPassport](/operations/getPassport.md) (`GET /api/v1/passports/{id}`)
