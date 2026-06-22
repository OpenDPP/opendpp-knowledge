---
type: Schema
title: DppJsonLdContextDocument
description: "The fixed W3C JSON-LD context document served by GET /context/v1: maps DigitalProductPassport, economicOperator, metadata, digitalSeal, signingPublicKey and proof to https://opendpp-node.eu/ns/dpp#… IRIs, and createdAt/updatedAt to schema.…"
resource: https://opendpp-node.eu/openapi.json#/components/schemas/DppJsonLdContextDocument
tags:
  - schema
timestamp: 2026-06-22T00:00:00Z
---

The fixed W3C JSON-LD context document served by `GET /context/v1`: maps `DigitalProductPassport`, `economicOperator`, `metadata`, `digitalSeal`, `signingPublicKey` and `proof` to `https://opendpp-node.eu/ns/dpp#…` IRIs, and `createdAt`/`updatedAt` to schema.org `dateCreated`/`dateModified`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | object | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "The fixed W3C JSON-LD context document served by `GET /context/v1`: maps `DigitalProductPassport`, `economicOperator`, `metadata`, `digitalSeal`, `signingPublicKey` and `proof` to `https://opendpp-node.eu/ns/dpp#…` IRIs, and `createdAt`/`updatedAt` to schema.org `dateCreated`/`dateModified`.",
  "additionalProperties": false,
  "required": [
    "@context"
  ],
  "properties": {
    "@context": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    }
  }
}
```

## Used by

- [getJsonLdContext](/operations/getJsonLdContext.md) (`GET /context/v1`)
