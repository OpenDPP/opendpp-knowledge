---
type: Schema
title: En18222Result
description: EN 18222:2026 Table 12 — the result object returned when a method fails to execute (clause 7.2).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/En18222Result
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

EN 18222:2026 Table 12 — the result object returned when a method fails to execute (clause 7.2). Table 12 states the class's `semanticId` as `https://jtc24/dpp/API/DataTypes/Result`, in the class header beside `Inherits from` rather than among the attributes — so it identifies the TYPE and is not serialised into each instance; `message` is the class's only attribute.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | array<[En18222Message](/schemas/En18222Message.md)> | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "EN 18222:2026 Table 12 — the result object returned when a method fails to execute (clause 7.2). Table 12 states the class's `semanticId` as `https://jtc24/dpp/API/DataTypes/Result`, in the class header beside `Inherits from` rather than among the attributes — so it identifies the TYPE and is not serialised into each instance; `message` is the class's only attribute.",
  "required": [
    "message"
  ],
  "properties": {
    "message": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/En18222Message"
      }
    }
  }
}
```

## Used by

- [readDPPById](/operations/readDPPById.md) (`GET /v1/dpps/{dppId}`)
- [updateDPPById](/operations/updateDPPById.md) (`PATCH /v1/dpps/{dppId}`)
- [deleteDPPById](/operations/deleteDPPById.md) (`DELETE /v1/dpps/{dppId}`)
- [readDPPByProductId](/operations/readDPPByProductId.md) (`GET /v1/dppsByProductId/{productId}`)
- [readDPPVersionByIdAndDate](/operations/readDPPVersionByIdAndDate.md) (`GET /v1/dppsByIdAndDate/{dppId}`)
- [readDPPIdsByProductIds](/operations/readDPPIdsByProductIds.md) (`POST /v1/dppsByProductIds`)
- [createDPP](/operations/createDPP.md) (`POST /v1/dpps`)
- [readDataElement](/operations/readDataElement.md) (`GET /v1/dpps/{dppId}/elements/{elementIdPath}`)
- [updateDataElement](/operations/updateDataElement.md) (`PATCH /v1/dpps/{dppId}/elements/{elementIdPath}`)
