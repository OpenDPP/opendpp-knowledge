---
type: Schema
title: UntpVerificationMethod
description: Embedded verification-method object.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/UntpVerificationMethod
tags:
  - schema
timestamp: 2026-06-26T00:00:00Z
---

Embedded verification-method object. The `x5c` chain (base64 DER, leaf first) is honoured ONLY when the node has eIDAS trust anchors configured, every certificate is currently valid, each link verifies against the next, the top is anchored, and the leaf attests the credential issuer — otherwise it is ignored and the registered tenant key is used instead.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | no | — |
| `type` | string | no | — |
| `controller` | string | no | — |
| `x5c` | array<string> | no | X.509 certificate chain, base64 DER, leaf first. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Embedded verification-method object. The `x5c` chain (base64 DER, leaf first) is honoured ONLY when the node has eIDAS trust anchors configured, every certificate is currently valid, each link verifies against the next, the top is anchored, and the leaf attests the credential issuer — otherwise it is ignored and the registered tenant key is used instead.",
  "properties": {
    "id": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "controller": {
      "type": "string"
    },
    "x5c": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "X.509 certificate chain, base64 DER, leaf first."
    }
  }
}
```

## Used by

- schema [UntpEventProof](/schemas/UntpEventProof.md)
