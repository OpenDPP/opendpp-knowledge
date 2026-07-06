---
type: Schema
title: SealVerifyRequest
description: Verification request.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/SealVerifyRequest
tags:
  - schema
timestamp: 2026-07-04T00:00:00Z
---

Verification request. Only `payload` is strictly required: `signature` and `publicKey` are extracted from `payload.proof` (proofValue/signatureValue, publicKeyPem, or the x5c leaf SPKI) when omitted, and the request fails 400 only if either is still missing after extraction.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `payload` | object | yes | The sealed passport document to verify — typically the JSON-LD passport document exactly as resolved from the public endpoints, or any {passportId, productId,… |
| `signature` | string | no | Base64 ECDSA (P-256 / SHA-256) seal signature. |
| `publicKey` | string | no | PEM (SPKI) public key of the sealing tenant. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Verification request. Only `payload` is strictly required: `signature` and `publicKey` are extracted from `payload.proof` (proofValue/signatureValue, publicKeyPem, or the x5c leaf SPKI) when omitted, and the request fails 400 only if either is still missing after extraction.",
  "required": [
    "payload"
  ],
  "properties": {
    "payload": {
      "type": "object",
      "description": "The sealed passport document to verify — typically the JSON-LD passport document exactly as resolved from the public endpoints, or any `{passportId, productId, metadata, operator}` payload. Only the fields below are interpreted; all other properties are preserved and participate in the whole-payload signature fallback.",
      "properties": {
        "metadata": {
          "type": "object",
          "description": "The sealed metadata object — the SHA-256 Merkle tree is rebuilt over its top-level properties (every leaf recomputed from the actual values; caller-supplied redacted-leaf hashes are not accepted). When the `metadata` key is entirely ABSENT, the whole `payload` object is treated as the metadata for the Merkle phase; a present-but-non-object value skips the Merkle phase (only the whole-payload fallback runs)."
        },
        "operator": {
          "type": "object",
          "description": "Declared economic operator. A present `regId` triggers the fail-closed operator-binding gate.",
          "properties": {
            "name": {
              "type": "string"
            },
            "regId": {
              "type": "string",
              "description": "Operator registration id (e.g. EORI-style `EU-DEFAULT-001`). Must resolve to a registered Economic Operator bound to the signing tenant, or verification fails (`verified: false`)."
            }
          }
        },
        "economicOperator": {
          "type": "object",
          "description": "Alternative location for the declared operator id — `economicOperator.regId` is checked when `operator.regId` is absent.",
          "properties": {
            "regId": {
              "type": "string"
            }
          }
        },
        "proof": {
          "type": "object",
          "description": "Embedded W3C-style proof block. Sources for the signature, public key, certificate chain and RFC 3161 token when the top-level fields are omitted.",
          "properties": {
            "type": {
              "type": "string"
            },
            "proofValue": {
              "type": "string",
              "description": "Base64 ECDSA seal — used as `signature` when the top-level field is absent."
            },
            "signatureValue": {
              "type": "string",
              "description": "Legacy alias for `proofValue` (checked second)."
            },
            "publicKeyPem": {
              "type": "string",
              "description": "PEM (SPKI) public key — used as `publicKey` when the top-level field is absent."
            },
            "x5c": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "X.509 certificate chain, base64 DER, LEAF FIRST. Enables the `certificate` report; the leaf's SPKI also serves as the public key when none is otherwise supplied."
            },
            "rfc3161": {
              "type": "object",
              "properties": {
                "token": {
                  "type": "string",
                  "description": "RFC 3161 TimeStampToken (base64 DER CMS ContentInfo) — enables the `timestamp` report."
                }
              }
            }
          }
        }
      },
      "additionalProperties": true
    },
    "signature": {
      "type": "string",
      "description": "Base64 ECDSA (P-256 / SHA-256) seal signature. Optional when `payload.proof.proofValue` (or `signatureValue`) is present."
    },
    "publicKey": {
      "type": "string",
      "description": "PEM (SPKI) public key of the sealing tenant. Optional when `payload.proof.publicKeyPem` or an `x5c` chain is present. CRLF line endings are normalized before matching."
    }
  }
}
```

## Used by

- [verifyPassportSeal](/operations/verifyPassportSeal.md) (`POST /api/v1/audit/verify`)
