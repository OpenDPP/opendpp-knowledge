---
type: Schema
title: En18222DppIdList
description: EN 18222 Table 4 — the digitalProductPassportId of every passport matching the supplied product identifiers.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/En18222DppIdList
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

EN 18222 Table 4 — the `digitalProductPassportId` of every passport matching the supplied product identifiers.

## JSON Schema

```json
{
  "type": "array",
  "description": "EN 18222 Table 4 — the `digitalProductPassportId` of every passport matching the supplied product identifiers.",
  "items": {
    "type": "string",
    "format": "uri"
  }
}
```

## Used by

- [readDPPIdsByProductIds](/operations/readDPPIdsByProductIds.md) (`POST /v1/dppsByProductIds`)
