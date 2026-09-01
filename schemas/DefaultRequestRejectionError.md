---
type: Schema
title: Default request-rejection error body
description: The default 400 body of a request rejected before the handler runs — a syntactically malformed JSON body, or an envelope (schema) violation — so none of the handler-built {success:false, ...} shapes apply.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/DefaultRequestRejectionError
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

The default 400 body of a request rejected **before the handler runs** — a syntactically malformed JSON body, or an envelope (schema) violation — so none of the handler-built `{success:false, ...}` shapes apply.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `statusCode` | integer | yes | — |
| `code` | string | no | Machine-readable error code, e.g. FST_ERR_VALIDATION (an envelope/schema violation) or FST_ERR_CTP_INVALID_JSON_BODY (a syntactically malformed JSON body); may… |
| `error` | string | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "title": "Default request-rejection error body",
  "description": "The default 400 body of a request rejected **before the handler runs** — a syntactically malformed JSON body, or an envelope (schema) violation — so none of the handler-built `{success:false, ...}` shapes apply.",
  "required": [
    "statusCode",
    "error",
    "message"
  ],
  "properties": {
    "statusCode": {
      "type": "integer",
      "const": 400
    },
    "code": {
      "type": "string",
      "description": "Machine-readable error code, e.g. `FST_ERR_VALIDATION` (an envelope/schema violation) or `FST_ERR_CTP_INVALID_JSON_BODY` (a syntactically malformed JSON body); may be absent.",
      "examples": [
        "FST_ERR_VALIDATION"
      ]
    },
    "error": {
      "type": "string",
      "const": "Bad Request"
    },
    "message": {
      "type": "string"
    }
  }
}
```

## Used by

- schema [BatteryUnitSerialiseBadRequest](/schemas/BatteryUnitSerialiseBadRequest.md)
- schema [BatteryUnitEventBadRequest](/schemas/BatteryUnitEventBadRequest.md)
- schema [PassportBulkBadRequest](/schemas/PassportBulkBadRequest.md)
