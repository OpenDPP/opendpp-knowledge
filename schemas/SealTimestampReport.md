---
type: Schema
title: SealTimestampReport
description: "Present only when payload.proof.rfc3161.token was supplied AND verification proceeds past the key-registration and operator-binding gates (the two policy verified: false responses omit it)."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/SealTimestampReport
tags:
  - schema
timestamp: 2026-07-04T00:00:00Z
---

Present only when `payload.proof.rfc3161.token` was supplied AND verification proceeds past the key-registration and operator-binding gates (the two policy `verified: false` responses omit it). Reports presence, the TSA-asserted genTime from the token's TSTInfo, and — when the node has a TSA CA configured (`TSA_CA_PEM`) — `timeAuthenticated`: the result of verifying the token's CMS SignedData signature over its TSTInfo and chaining the signer certificate to that anchor.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `present` | boolean | yes | — |
| `genTime` | string,null | yes | TSA-asserted generation time (ISO 8601), or null when the token's TSTInfo could not be parsed. |
| `timeAuthenticated` | boolean | no | True only when the token's RFC 3161 CMS SignedData signature verifies over its TSTInfo AND the signer passes full trust-path validation to the node's configure… |
| `note` | string | no | Present only when genTime is null. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Present only when `payload.proof.rfc3161.token` was supplied AND verification proceeds past the key-registration and operator-binding gates (the two policy `verified: false` responses omit it). Reports presence, the TSA-asserted genTime from the token's TSTInfo, and — when the node has a TSA CA configured (`TSA_CA_PEM`) — `timeAuthenticated`: the result of verifying the token's CMS SignedData signature over its TSTInfo and chaining the signer certificate to that anchor.",
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
    "timeAuthenticated": {
      "type": "boolean",
      "description": "True only when the token's RFC 3161 CMS SignedData signature verifies over its TSTInfo AND the signer passes full trust-path validation to the node's configured TSA CA anchor (`TSA_CA_PEM`): the signer is an end-entity timestamping certificate (a CRITICAL `id-kp-timeStamping` EKU, not a CA) that is VALID at the asserted `genTime` and chains through CA-constrained, genTime-valid intermediates to the anchor (itself a CA valid at `genTime`). False when the signature fails, when the path is not policy-valid, and when no TSA CA is configured (the asserted `genTime` is then unauthenticated). This is the node's own cryptographic check and does not replace a verifier's independent `openssl ts -verify`."
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
