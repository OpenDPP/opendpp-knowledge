---
type: Schema
title: Gs1BatchDecodeOk
description: A successfully decoded item — the same fields as the single-scan 200 minus success.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/Gs1BatchDecodeOk
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

A successfully decoded item — the same fields as the single-scan 200 minus `success`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `ok` | boolean | yes | — |
| `input` | string | yes | — |
| `elementString` | string,null | yes | — |
| `hri` | array<string> | yes | — |
| `canonicalUpi` | string,null | yes | — |
| `digitalLinkUri` | string,null | yes | — |
| `ai` | object | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "A successfully decoded item — the same fields as the single-scan 200 minus `success`.",
  "required": [
    "ok",
    "input",
    "elementString",
    "hri",
    "canonicalUpi",
    "digitalLinkUri",
    "ai"
  ],
  "properties": {
    "ok": {
      "type": "boolean",
      "const": true
    },
    "input": {
      "type": "string"
    },
    "elementString": {
      "type": [
        "string",
        "null"
      ]
    },
    "hri": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "canonicalUpi": {
      "type": [
        "string",
        "null"
      ]
    },
    "digitalLinkUri": {
      "type": [
        "string",
        "null"
      ]
    },
    "ai": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    }
  }
}
```

## Used by

- schema [Gs1BatchDecodeResult](/schemas/Gs1BatchDecodeResult.md)
