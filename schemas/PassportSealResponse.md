---
type: Schema
title: PassportSealResponse
description: 200 envelope of POST /api/v1/passports/{id}/seal.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportSealResponse
tags:
  - schema
timestamp: 2026-06-22T00:00:00Z
---

200 envelope of POST /api/v1/passports/{id}/seal. `digitalSeal` is duplicated inside `passport.digitalSeal` and `passport.proof.signatureValue`. The passport document is serialized at the PUBLIC redaction tier; masked keys keep their true leaf hashes in `proof.redactedLeaves`. Note: despite the message wording, this endpoint does not change the passport's `status`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | Always true on 200. |
| `message` | string | yes | — |
| `digitalSeal` | string | yes | Base64 ECDSA P-256 (prime256v1) SHA-256 signature over the metadata Merkle root (eIDAS ADVANCED electronic seal — not a qualified seal, not a W3C DataIntegrity… |
| `signingPublicKey` | string | yes | PEM-encoded public key of the tenant's signing key pair; verify the seal offline against proof.merkleRoot. |
| `passport` | [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md) | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "200 envelope of POST /api/v1/passports/{id}/seal. `digitalSeal` is duplicated inside `passport.digitalSeal` and `passport.proof.signatureValue`. The passport document is serialized at the PUBLIC redaction tier; masked keys keep their true leaf hashes in `proof.redactedLeaves`. Note: despite the message wording, this endpoint does not change the passport's `status`.",
  "required": [
    "success",
    "message",
    "digitalSeal",
    "signingPublicKey",
    "passport"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "description": "Always true on 200."
    },
    "message": {
      "type": "string",
      "const": "Passport sealed with the tenant's eIDAS advanced electronic seal and published."
    },
    "digitalSeal": {
      "type": "string",
      "description": "Base64 ECDSA P-256 (prime256v1) SHA-256 signature over the metadata Merkle root (eIDAS ADVANCED electronic seal — not a qualified seal, not a W3C DataIntegrityProof)."
    },
    "signingPublicKey": {
      "type": "string",
      "description": "PEM-encoded public key of the tenant's signing key pair; verify the seal offline against `proof.merkleRoot`."
    },
    "passport": {
      "$ref": "#/components/schemas/PublicPassportJsonLd"
    }
  }
}
```

## Used by

- [sealPassport](/operations/sealPassport.md) (`POST /api/v1/passports/{id}/seal`)
