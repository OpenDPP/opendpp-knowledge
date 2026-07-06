---
type: Schema
title: FastifyDefaultBadRequest
description: Fastify's default 400 error body, returned when a syntactically malformed JSON request body is rejected by the framework before the handler runs (so none of the handler-built {success:false, ...} shapes apply).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FastifyDefaultBadRequest
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

Fastify's default 400 error body, returned when a syntactically malformed JSON request body is rejected by the framework **before the handler runs** (so none of the handler-built `{success:false, ...}` shapes apply).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `statusCode` | integer | yes | — |
| `code` | string | no | Fastify error code, e.g. |
| `error` | string | yes | — |
| `message` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Fastify's default 400 error body, returned when a syntactically malformed JSON request body is rejected by the framework **before the handler runs** (so none of the handler-built `{success:false, ...}` shapes apply).",
  "properties": {
    "statusCode": {
      "type": "integer",
      "const": 400
    },
    "code": {
      "type": "string",
      "description": "Fastify error code, e.g. `FST_ERR_CTP_INVALID_JSON_BODY`. May be absent."
    },
    "error": {
      "type": "string",
      "const": "Bad Request"
    },
    "message": {
      "type": "string"
    }
  },
  "required": [
    "statusCode",
    "error",
    "message"
  ]
}
```

## Used by

- [serializeBatteryUnits](/operations/serializeBatteryUnits.md) (`POST /api/v1/passports/{passportId}/units`)
- [recordBatteryUnitEvent](/operations/recordBatteryUnitEvent.md) (`POST /api/v1/units/{id}/events`)
