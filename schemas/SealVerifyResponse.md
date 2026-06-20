---
type: Schema
title: SealVerifyResponse
description: Always HTTP 200 once the request is well-formed.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/SealVerifyResponse
tags:
  - schema
timestamp: 2026-06-20T00:00:00Z
---

Always HTTP 200 once the request is well-formed. `verified: false` covers both cryptographic failure and the two registration/binding policy failures — the policy failures add a `message` and OMIT `certificate`/`timestamp` even when an x5c chain or RFC 3161 token was supplied.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `verified` | boolean | yes | — |
| `message` | string | no | Present only on the two policy failures: unregistered public key, or a declared operator not bound to the signing tenant. |
| `certificate` | [SealCertificateReport](/schemas/SealCertificateReport.md) | no | — |
| `timestamp` | [SealTimestampReport](/schemas/SealTimestampReport.md) | no | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "Always HTTP 200 once the request is well-formed. `verified: false` covers both cryptographic failure and the two registration/binding policy failures — the policy failures add a `message` and OMIT `certificate`/`timestamp` even when an x5c chain or RFC 3161 token was supplied.",
  "required": [
    "success",
    "verified"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "verified": {
      "type": "boolean"
    },
    "message": {
      "type": "string",
      "description": "Present only on the two policy failures: unregistered public key, or a declared operator not bound to the signing tenant.",
      "enum": [
        "Cryptographic verification failed: The public key used to seal this passport is not registered to any authorized economic operator tenant on this node.",
        "Cryptographic verification failed: The economic operator declared in this passport is not a registered operator bound to the signing tenant."
      ]
    },
    "certificate": {
      "$ref": "#/components/schemas/SealCertificateReport"
    },
    "timestamp": {
      "$ref": "#/components/schemas/SealTimestampReport"
    }
  }
}
```

## Used by

- [verifyPassportSeal](/operations/verifyPassportSeal.md) (`POST /api/v1/audit/verify`)
