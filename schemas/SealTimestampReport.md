---
type: Schema
title: SealTimestampReport
description: "Present only when payload.proof.rfc3161.token was supplied AND verification proceeds past the key-registration and operator-binding gates (the two policy verified: false responses omit it)."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/SealTimestampReport
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
---

Present only when `payload.proof.rfc3161.token` was supplied AND verification proceeds past the key-registration and operator-binding gates (the two policy `verified: false` responses omit it). Reports presence and the TSA-asserted genTime from the token's TSTInfo — full cryptographic TSR validation is the verifier's own step.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `present` | boolean | yes | — |
| `genTime` | string,null | yes | TSA-asserted generation time (ISO 8601), or null when the token's TSTInfo could not be parsed. |
| `note` | string | no | Present only when genTime is null. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Present only when `payload.proof.rfc3161.token` was supplied AND verification proceeds past the key-registration and operator-binding gates (the two policy `verified: false` responses omit it). Reports presence and the TSA-asserted genTime from the token's TSTInfo — full cryptographic TSR validation is the verifier's own step.",
  "required": [
    "present",
    "genTime"
  ],
  "properties": {
    "present": {
      "type": "boolean",
      "const": true
    },
    "genTime": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "TSA-asserted generation time (ISO 8601), or null when the token's TSTInfo could not be parsed."
    },
    "note": {
      "type": "string",
      "const": "token present but TSTInfo could not be parsed",
      "description": "Present only when `genTime` is null."
    }
  }
}
```

## Used by

- schema [SealVerifyResponse](/schemas/SealVerifyResponse.md)
