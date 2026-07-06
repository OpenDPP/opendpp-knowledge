---
type: Schema
title: SealCertificateReport
description: "Present only for x5c-carrying proofs on a verified: true outcome whose chain is TRUSTED — chainValid AND keyMatchesProof both true (the two policy verified: false responses AND any untrusted-chain outcome omit it): the certified legal iden…"
resource: https://opendpp-node.eu/openapi.json#/components/schemas/SealCertificateReport
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

Present only for x5c-carrying proofs on a `verified: true` outcome whose chain is TRUSTED — `chainValid` AND `keyMatchesProof` both true (the two policy `verified: false` responses AND any untrusted-chain outcome omit it): the certified legal identity of the seal creator (eIDAS Art. 36(1)(b)). An untrusted chain is never surfaced, so an emitted report always has `chainValid: true`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `subject` | string | no | Leaf-certificate subject (multi-line RDN string as produced by Node's X509Certificate, e.g. |
| `issuer` | string | no | Leaf-certificate issuer RDN string. |
| `validFrom` | string | no | X.509 textual date, e.g. |
| `validTo` | string | no | X.509 textual date — NOT ISO 8601. |
| `chainValid` | boolean | yes | True only when every chain link signature-verifies, every certificate is within its validity window, AND the top of the chain is anchored to this node's seal C… |
| `keyMatchesProof` | boolean | no | True when the leaf SPKI equals the supplied publicKey (whitespace-insensitive), or when no explicit public key was supplied (the leaf key was used). |
| `error` | string | no | Present only when the chain could not be parsed. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Present only for x5c-carrying proofs on a `verified: true` outcome whose chain is TRUSTED — `chainValid` AND `keyMatchesProof` both true (the two policy `verified: false` responses AND any untrusted-chain outcome omit it): the certified legal identity of the seal creator (eIDAS Art. 36(1)(b)). An untrusted chain is never surfaced, so an emitted report always has `chainValid: true`.",
  "required": [
    "chainValid"
  ],
  "properties": {
    "subject": {
      "type": "string",
      "description": "Leaf-certificate subject (multi-line RDN string as produced by Node's X509Certificate, e.g. `CN=OpenDPP Demo Eco Industries Seal`)."
    },
    "issuer": {
      "type": "string",
      "description": "Leaf-certificate issuer RDN string."
    },
    "validFrom": {
      "type": "string",
      "description": "X.509 textual date, e.g. `Jan 10 00:00:00 2026 GMT` — NOT ISO 8601."
    },
    "validTo": {
      "type": "string",
      "description": "X.509 textual date — NOT ISO 8601."
    },
    "chainValid": {
      "type": "boolean",
      "description": "True only when every chain link signature-verifies, every certificate is within its validity window, AND the top of the chain is anchored to this node's seal CA (fingerprint match or signature under the CA key)."
    },
    "keyMatchesProof": {
      "type": "boolean",
      "description": "True when the leaf SPKI equals the supplied `publicKey` (whitespace-insensitive), or when no explicit public key was supplied (the leaf key was used)."
    },
    "error": {
      "type": "string",
      "const": "Unparseable x5c certificate chain",
      "description": "Present only when the chain could not be parsed."
    }
  }
}
```

## Used by

- schema [SealVerifyResponse](/schemas/SealVerifyResponse.md)
