---
type: Schema
title: RegisterOperatorRequest
description: RegisterOperatorRequest
resource: https://opendpp-node.eu/openapi.json#/components/schemas/RegisterOperatorRequest
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | yes | Legal/display name. |
| `regId` | string | yes | Official registration id (EORI, VAT, DUNS, or national registry id). |
| `regIdScheme` | string,null | no | Optional declaration of what kind of id regId is. |
| `role` | string | no | Supply-chain role, free text — e.g. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "name",
    "regId"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Legal/display name. Ignored if your workspace already has an operator with this `regId` (the existing record is returned instead)."
    },
    "regId": {
      "type": "string",
      "description": "Official registration id (EORI, VAT, DUNS, or national registry id). Unique within your workspace; immutable after registration. Fabricated `EORI-MOCK…` ids are rejected. When `regIdScheme` is `EORI`, must match `^[A-Z]{2}[A-Za-z0-9]{1,15}$` (e.g. `DE1234567890`)."
    },
    "regIdScheme": {
      "type": [
        "string",
        "null"
      ],
      "description": "Optional declaration of what kind of id `regId` is. Allowed values: `EORI`, `VAT`, `DUNS`, `NATIONAL`, `OTHER` — matched case-insensitively (uppercased server-side). Any other value is rejected with `400`. Omit or send `null` for an unspecified national/business id. Ignored when binding to an existing operator."
    },
    "role": {
      "type": "string",
      "default": "MANUFACTURER",
      "description": "Supply-chain role, free text — e.g. `MANUFACTURER`, `IMPORTER`, `RETAILER`. Defaults to `MANUFACTURER`. Ignored when binding to an existing operator."
    }
  }
}
```

## Used by

- [registerOperator](/operations/registerOperator.md) (`POST /api/v1/operators`)
