---
type: Schema
title: SealVerifyResponse
description: Always HTTP 200 once the request is well-formed.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/SealVerifyResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Always HTTP 200 once the request is well-formed. `verified: false` covers both cryptographic failure and the two registration/binding policy failures — the policy failures add a `message` and OMIT `certificate`/`timestamp` even when an x5c chain or RFC 3161 token was supplied.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `verified` | boolean | yes | — |
| `message` | string | no | Present only on the two policy declines, each prefixed Verification declined: — an unregistered public key, or a declared operator not bound to the signing ten… |
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
      "description": "Present only on the two policy declines, each prefixed `Verification declined:` — an unregistered public key, or a declared operator not bound to the signing tenant. In both cases the seal was NOT cryptographically evaluated (this node verifies only seals issued by its own tenants). The wording is human-readable prose, not a stable contract value — match on `verified`, never on this string (deliberately no `enum` since 1.15.0)."
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
