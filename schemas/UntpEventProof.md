---
type: Schema
title: UntpEventProof
description: Credential proof.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/UntpEventProof
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

Credential proof. Verified with ECDSA P-256 / SHA-256 over OpenDPP's deterministic key-sorted JSON canonicalization of the credential with `proofValue` blanked (NOT RFC 8785 JCS — not a conformant W3C Data Integrity suite).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | no | e.g. |
| `created` | string | no | — |
| `proofPurpose` | string | no | e.g. |
| `verificationMethod` | — | no | Either a key-identifier string or an embedded object carrying an x5c certificate chain. |
| `proofValue` | string | yes | Base64 ECDSA signature. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Credential proof. Verified with ECDSA P-256 / SHA-256 over OpenDPP's deterministic key-sorted JSON canonicalization of the credential with `proofValue` blanked (NOT RFC 8785 JCS — not a conformant W3C Data Integrity suite).",
  "required": [
    "proofValue"
  ],
  "properties": {
    "type": {
      "type": "string",
      "description": "e.g. `DataIntegrityProof`."
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
      "description": "Base64 ECDSA signature. Stored verbatim with the event."
    }
  }
}
```

## Used by

- schema [UntpEventCredential](/schemas/UntpEventCredential.md)
