---
type: Schema
title: UntpEventProof
description: Credential proof.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/UntpEventProof
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

Credential proof. MUST be a conformant W3C `DataIntegrityProof` with `cryptosuite: "ecdsa-jcs-2019"` and a multibase base58btc (`z…`) `proofValue`. Verified (ECDSA P-256, IEEE-P1363 raw r‖s) over `sha256(JCS(proof options)) ‖ sha256(JCS(credential without proof))` — RFC 8785 JCS canonicalization, a conformant W3C Data Integrity suite.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | yes | MUST be DataIntegrityProof. |
| `cryptosuite` | string | yes | MUST be ecdsa-jcs-2019 (RFC 8785 JCS). |
| `created` | string | no | — |
| `proofPurpose` | string | no | e.g. |
| `verificationMethod` | — | no | Either a key-identifier string or an embedded object carrying an x5c certificate chain. |
| `proofValue` | string | yes | Multibase base58btc (z…) ecdsa-jcs-2019 signature. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Credential proof. MUST be a conformant W3C `DataIntegrityProof` with `cryptosuite: \"ecdsa-jcs-2019\"` and a multibase base58btc (`z…`) `proofValue`. Verified (ECDSA P-256, IEEE-P1363 raw r‖s) over `sha256(JCS(proof options)) ‖ sha256(JCS(credential without proof))` — RFC 8785 JCS canonicalization, a conformant W3C Data Integrity suite.",
  "required": [
    "type",
    "cryptosuite",
    "proofValue"
  ],
  "properties": {
    "type": {
      "type": "string",
      "const": "DataIntegrityProof",
      "description": "MUST be `DataIntegrityProof`."
    },
    "cryptosuite": {
      "type": "string",
      "const": "ecdsa-jcs-2019",
      "description": "MUST be `ecdsa-jcs-2019` (RFC 8785 JCS)."
    },
    "created": {
      "type": "string",
      "format": "date-time"
    },
    "proofPurpose": {
      "type": "string",
      "description": "e.g. `assertionMethod`."
    },
    "verificationMethod": {
      "oneOf": [
        {
          "type": "string",
          "description": "Public-key identifier / DID URL."
        },
        {
          "$ref": "#/components/schemas/UntpVerificationMethod"
        }
      ],
      "description": "Either a key-identifier string or an embedded object carrying an `x5c` certificate chain."
    },
    "proofValue": {
      "type": "string",
      "description": "Multibase base58btc (`z…`) ecdsa-jcs-2019 signature. Stored verbatim with the event."
    }
  }
}
```

## Used by

- schema [UntpEventCredential](/schemas/UntpEventCredential.md)
