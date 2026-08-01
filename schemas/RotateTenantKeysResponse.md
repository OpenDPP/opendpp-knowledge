---
type: Schema
title: RotateTenantKeysResponse
description: Confirmation that the workspace's signing key was rotated, returning the new public key.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RotateTenantKeysResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-28T00:00:00Z
---

Confirmation that the workspace's signing key was rotated, returning the new public key.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | Always "eIDAS Asymmetric Key Pair generated and rotated in secure DB custody successfully". |
| `publicKey` | string | yes | The new ECDSA prime256v1 (P-256) public key, PEM-encoded (SPKI, -----BEGIN PUBLIC KEY----- block, trailing newline). |

## JSON Schema

```json
{
  "description": "Confirmation that the workspace's signing key was rotated, returning the new public key.",
  "type": "object",
  "required": [
    "success",
    "message",
    "publicKey"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "description": "Always `\"eIDAS Asymmetric Key Pair generated and rotated in secure DB custody successfully\"`."
    },
    "publicKey": {
      "type": "string",
      "description": "The new ECDSA prime256v1 (P-256) public key, PEM-encoded (SPKI, `-----BEGIN PUBLIC KEY-----` block, trailing newline). The matching private key is held only AES-256-GCM-encrypted in the platform vault and is never returned."
    }
  }
}
```

## Used by

- [rotateTenantKeys](/operations/rotateTenantKeys.md) (`POST /api/v1/tenants/rotate-keys`)
