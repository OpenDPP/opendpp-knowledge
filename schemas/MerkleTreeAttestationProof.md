---
type: Schema
title: MerkleTreeAttestationProof
description: "OpenDPP's own proof type — an eIDAS ADVANCED electronic seal: an ECDSA prime256v1 signature over a SHA-256 Merkle root of the key-sorted metadata (one leaf per top-level metadata key)."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/MerkleTreeAttestationProof
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

OpenDPP's own proof type — an eIDAS ADVANCED electronic seal: an ECDSA prime256v1 signature over a SHA-256 Merkle root of the key-sorted metadata (one leaf per top-level metadata key). Deliberately NOT a W3C DataIntegrityProof / `ecdsa-jcs-2019` Verifiable Credential (no RFC 8785 JCS canonicalization). Verifiable offline: rebuild the Merkle root from `metadata` — substituting each `redactedLeaves` hash for its placeholder-masked key, and EXCLUDING any placeholder-masked key that has no `redactedLeaves` entry (such a key was never present in the sealed metadata; the serializer injects the owner-only placeholder unconditionally) — then verify `signatureValue` with `publicKeyPem`; the `x5c` chain validates against the platform seal CA (`GET /.well-known/opendpp-seal-ca.pem`) and the `rfc3161` token via `openssl ts -verify`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@type` | array<string> | yes | Always ["MerkleTreeAttestationProof"]. |
| `type` | string | yes | — |
| `signatureAlgorithm` | string | yes | — |
| `created` | string | yes | Mirrors the passport's updatedAt. |
| `proofPurpose` | string | yes | — |
| `verificationMethod` | string | yes | https://opendpp-node.eu/passport/{passportId}#key-1. |
| `signatureValue` | string | yes | Base64 ECDSA P-256/SHA-256 signature over the hex Merkle root string (same value as the document's digitalSeal). |
| `publicKeyPem` | string | yes | PEM public key for verification (same value as the document's signingPublicKey). |
| `x5c` | array<string> | no | OPTIONAL (omitted when no chain was recorded at seal time). |
| `rfc3161` | object | no | OPTIONAL (omitted when timestamping was off/unavailable at seal time). |
| `merkleRoot` | string | yes | Hex SHA-256 Merkle root over the key-sorted metadata leaves. |
| `redactedLeaves` | object | no | OPTIONAL — present only when at least one masked key actually exists in the underlying sealed metadata. |

## JSON Schema

```json
{
  "type": "object",
  "description": "OpenDPP's own proof type — an eIDAS ADVANCED electronic seal: an ECDSA prime256v1 signature over a SHA-256 Merkle root of the key-sorted metadata (one leaf per top-level metadata key). Deliberately NOT a W3C DataIntegrityProof / `ecdsa-jcs-2019` Verifiable Credential (no RFC 8785 JCS canonicalization). Verifiable offline: rebuild the Merkle root from `metadata` — substituting each `redactedLeaves` hash for its placeholder-masked key, and EXCLUDING any placeholder-masked key that has no `redactedLeaves` entry (such a key was never present in the sealed metadata; the serializer injects the owner-only placeholder unconditionally) — then verify `signatureValue` with `publicKeyPem`; the `x5c` chain validates against the platform seal CA (`GET /.well-known/opendpp-seal-ca.pem`) and the `rfc3161` token via `openssl ts -verify`.",
  "required": [
    "@type",
    "type",
    "signatureAlgorithm",
    "created",
    "proofPurpose",
    "verificationMethod",
    "signatureValue",
    "publicKeyPem",
    "merkleRoot"
  ],
  "properties": {
    "@type": {
      "type": "array",
      "items": {
        "type": "string",
        "const": "MerkleTreeAttestationProof"
      },
      "description": "Always `[\"MerkleTreeAttestationProof\"]`."
    },
    "type": {
      "type": "string",
      "const": "MerkleTreeAttestationProof"
    },
    "signatureAlgorithm": {
      "type": "string",
      "const": "ECDSA-P256-SHA256-over-MerkleRoot"
    },
    "created": {
      "type": "string",
      "format": "date-time",
      "description": "Mirrors the passport's `updatedAt`."
    },
    "proofPurpose": {
      "type": "string",
      "const": "assertionMethod"
    },
    "verificationMethod": {
      "type": "string",
      "format": "uri",
      "description": "`https://opendpp-node.eu/passport/{passportId}#key-1`."
    },
    "signatureValue": {
      "type": "string",
      "description": "Base64 ECDSA P-256/SHA-256 signature over the hex Merkle root string (same value as the document's `digitalSeal`)."
    },
    "publicKeyPem": {
      "type": "string",
      "description": "PEM public key for verification (same value as the document's `signingPublicKey`)."
    },
    "x5c": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "OPTIONAL (omitted when no chain was recorded at seal time). X.509 chain as base64 DER (no PEM armor), leaf first, binding the signing key to the tenant's legal identity; issued by the platform seal CA. Denormalised at seal time, so later key/cert rotations never retroactively change a proof."
    },
    "rfc3161": {
      "type": "object",
      "description": "OPTIONAL (omitted when timestamping was off/unavailable at seal time). RFC 3161 trusted timestamp over SHA-256(merkleRoot) — an independent existed-at anchor from the configured TSA.",
      "required": [
        "genTime",
        "token"
      ],
      "properties": {
        "genTime": {
          "type": [
            "string",
            "null"
          ],
          "format": "date-time",
          "description": "TSA generation time."
        },
        "token": {
          "type": "string",
          "description": "Base64 DER RFC 3161 TimeStampToken; verifies offline via `openssl ts -verify`."
        }
      }
    },
    "merkleRoot": {
      "type": "string",
      "pattern": "^[0-9a-f]{64}$",
      "description": "Hex SHA-256 Merkle root over the key-sorted metadata leaves."
    },
    "redactedLeaves": {
      "type": "object",
      "additionalProperties": {
        "type": "string",
        "pattern": "^[0-9a-f]{64}$"
      },
      "description": "OPTIONAL — present only when at least one masked key actually exists in the underlying sealed metadata. Maps each such metadata key to its TRUE hex leaf hash, so the Merkle root can be reconstructed from the redacted document. A masked key that was never present in the metadata (the owner-only key is placeholder-injected unconditionally for non-owner tiers) yields NO entry here — verifiers must exclude placeholder-valued keys without an entry when rebuilding the tree."
    }
  }
}
```

## Used by

- schema [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md)
