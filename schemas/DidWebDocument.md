---
type: Schema
title: DidWebDocument
description: A tenant's did:web DID document (public-key material only).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/DidWebDocument
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

A tenant's `did:web` DID document (public-key material only). Verification methods are `JsonWebKey2020` entries with stable `#key-<index>` ids; current and retired keys are both listed so pre-rotation credentials still verify.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | array<string> | yes | JSON-LD contexts: the DID core context plus the JWS-2020 suite. |
| `id` | string | yes | The workspace DID, did:web:opendpp-node.eu:tenants:{tenantId}. |
| `name` | string | no | The issuer's authoritative legal name (present when the workspace has a company name). |
| `verificationMethod` | array<object> | yes | Public verification keys. |
| `assertionMethod` | array<string> | yes | Verification-method ids authorized to assert credentials (current + retired keys). |
| `authentication` | array<string> | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "A tenant's `did:web` DID document (public-key material only). Verification methods are `JsonWebKey2020` entries with stable `#key-<index>` ids; current and retired keys are both listed so pre-rotation credentials still verify.",
  "required": [
    "@context",
    "id",
    "verificationMethod",
    "assertionMethod",
    "authentication"
  ],
  "properties": {
    "@context": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "JSON-LD contexts: the DID core context plus the JWS-2020 suite."
    },
    "id": {
      "type": "string",
      "description": "The workspace DID, `did:web:opendpp-node.eu:tenants:{tenantId}`."
    },
    "name": {
      "type": "string",
      "description": "The issuer's authoritative legal name (present when the workspace has a company name)."
    },
    "verificationMethod": {
      "type": "array",
      "description": "Public verification keys.",
      "items": {
        "type": "object",
        "required": [
          "id",
          "type",
          "controller",
          "publicKeyJwk"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "`<did>#key-<index>` — matches the credential `kid`."
          },
          "type": {
            "type": "string",
            "enum": [
              "JsonWebKey2020"
            ]
          },
          "controller": {
            "type": "string"
          },
          "publicKeyJwk": {
            "type": "object",
            "description": "The public key as a JWK (EC P-256, `alg: ES256`, `use: sig`). Public material only."
          }
        }
      }
    },
    "assertionMethod": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Verification-method ids authorized to assert credentials (current + retired keys)."
    },
    "authentication": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

## Used by

- [getTenantDidDocument](/operations/getTenantDidDocument.md) (`GET /tenants/{tenantId}/did.json`)
