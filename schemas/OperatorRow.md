---
type: Schema
title: OperatorRow
description: An economic-operator record (EconomicOperator).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/OperatorRow
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

An economic-operator record (`EconomicOperator`). Operators are scoped to your workspace (each workspace keeps its own row for a given `regId`). Returned verbatim from the database (no field stripping); nullable fields are serialized as `null`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | Operator UUID. |
| `name` | string | yes | Legal/display name of the operator. |
| `regId` | string | yes | Official registration id (EORI number, VAT id, DUNS, or national business-registry id). |
| `regIdScheme` | string,null | yes | Which kind of registration id regId is. |
| `role` | string | yes | Supply-chain role, free text — e.g. |
| `archivedAt` | string,null | yes | Soft-delete / cessation-of-trading marker. |
| `createdAt` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "An economic-operator record (`EconomicOperator`). Operators are scoped to your workspace (each workspace keeps its own row for a given `regId`). Returned verbatim from the database (no field stripping); nullable fields are serialized as `null`.",
  "required": [
    "id",
    "name",
    "regId",
    "regIdScheme",
    "role",
    "archivedAt",
    "createdAt"
  ],
  "properties": {
    "id": {
      "type": "string",
      "description": "Operator UUID."
    },
    "name": {
      "type": "string",
      "description": "Legal/display name of the operator."
    },
    "regId": {
      "type": "string",
      "description": "Official registration id (EORI number, VAT id, DUNS, or national business-registry id). Unique within your workspace and immutable after registration."
    },
    "regIdScheme": {
      "type": [
        "string",
        "null"
      ],
      "enum": [
        "EORI",
        "VAT",
        "DUNS",
        "NATIONAL",
        "OTHER",
        null
      ],
      "description": "Which kind of registration id `regId` is. `null` = unspecified national/business id. When `EORI`, `regId` is guaranteed to satisfy the EORI syntax `^[A-Z]{2}[A-Za-z0-9]{1,15}$`."
    },
    "role": {
      "type": "string",
      "description": "Supply-chain role, free text — e.g. `\"MANUFACTURER\"`, `\"IMPORTER\"`, `\"RETAILER\"`. Defaults to `\"MANUFACTURER\"` at registration."
    },
    "archivedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "Soft-delete / cessation-of-trading marker. Non-null = the operator is archived (its passports are retained and still publicly resolvable)."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

## Used by

- schema [RegisterOperatorResponse](/schemas/RegisterOperatorResponse.md)
- schema [UpdateOperatorResponse](/schemas/UpdateOperatorResponse.md)
- schema [OperatorListResponse](/schemas/OperatorListResponse.md)
- schema [OperatorGetResponse](/schemas/OperatorGetResponse.md)
