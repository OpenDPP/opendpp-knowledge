---
type: Schema
title: RotateTenantKeysResponse
description: Confirmation that the workspace's signing key was rotated, returning the new public key.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RotateTenantKeysResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Confirmation that the workspace's signing key was rotated, returning the new public key.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | Outcome message. |
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
      "description": "Outcome message. On a first provisioning: `\"eIDAS Asymmetric Key Pair generated in secure DB custody successfully.\"` On a rotation, a message noting that the previous key is retired but retained in your DID document so existing credentials keep verifying."
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
