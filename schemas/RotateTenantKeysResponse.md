---
type: Schema
title: RotateTenantKeysResponse
description: RotateTenantKeysResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RotateTenantKeysResponse
tags:
  - schema
timestamp: 2026-06-22T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | Always "eIDAS Asymmetric Key Pair generated and rotated in secure DB custody successfully". |
| `publicKey` | string | yes | The new ECDSA prime256v1 (P-256) public key, PEM-encoded (SPKI, -----BEGIN PUBLIC KEY----- block, trailing newline). |

## JSON Schema

```json
{
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
