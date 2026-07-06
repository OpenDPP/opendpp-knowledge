---
type: Schema
title: FacilityRow
description: A facility (GS1 GLN) master-data row, exactly as stored.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityRow
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

A facility (GS1 GLN) master-data row, exactly as stored. Returned in full to the owning tenant. Public exposure in passport documents differs by format: the *JSON-LD* document exposes `id`, `gln`, `name`, `activity` and `country` of a linked facility; the *AAS* export emits only the GLN, name and country (`manufacturingFacilityGln`/`Name`/`Country`). `streetAddress`, `city` and `postalCode` are emitted only to the owning/bound tenant in both formats.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | Facility id (UUID). |
| `gln` | string | yes | GS1 Global Location Number — 13 digits with a valid GS1 modulo-10 check digit. |
| `name` | string | yes | Facility display name (trimmed, non-empty). |
| `activity` | string,null | yes | Free-text activity, e.g. |
| `streetAddress` | string,null | yes | Street address. |
| `city` | string,null | yes | City. |
| `postalCode` | string,null | yes | Postal code. |
| `country` | string | yes | 2-letter ISO 3166-1 alpha-2 country code, stored uppercase. |
| `operatorId` | string,null | yes | Id of the owning Economic Operator, or null for a tenant-level facility. |
| `tenantId` | string | yes | Owning tenant workspace id. |
| `createdAt` | string | yes | — |
| `updatedAt` | string | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "A facility (GS1 GLN) master-data row, exactly as stored. Returned in full to the owning tenant. Public exposure in passport documents differs by format: the *JSON-LD* document exposes `id`, `gln`, `name`, `activity` and `country` of a linked facility; the *AAS* export emits only the GLN, name and country (`manufacturingFacilityGln`/`Name`/`Country`). `streetAddress`, `city` and `postalCode` are emitted only to the owning/bound tenant in both formats.",
  "required": [
    "id",
    "gln",
    "name",
    "activity",
    "streetAddress",
    "city",
    "postalCode",
    "country",
    "operatorId",
    "tenantId",
    "createdAt",
    "updatedAt"
  ],
  "properties": {
    "id": {
      "type": "string",
      "description": "Facility id (UUID)."
    },
    "gln": {
      "type": "string",
      "pattern": "^[0-9]{13}$",
      "description": "GS1 Global Location Number — 13 digits with a valid GS1 modulo-10 check digit. Unique platform-wide. Immutable after registration (it is the resolvable UFI)."
    },
    "name": {
      "type": "string",
      "description": "Facility display name (trimmed, non-empty)."
    },
    "activity": {
      "type": [
        "string",
        "null"
      ],
      "description": "Free-text activity, e.g. \"Cell assembly\", \"Final manufacturing\", \"Recycling\". Public in JSON-LD; not emitted in the AAS export."
    },
    "streetAddress": {
      "type": [
        "string",
        "null"
      ],
      "description": "Street address. Owner-only: redacted from public JSON-LD and never emitted in AAS."
    },
    "city": {
      "type": [
        "string",
        "null"
      ],
      "description": "City. Owner-only: redacted from public JSON-LD and never emitted in AAS."
    },
    "postalCode": {
      "type": [
        "string",
        "null"
      ],
      "description": "Postal code. Owner-only: redacted from public JSON-LD and never emitted in AAS."
    },
    "country": {
      "type": "string",
      "pattern": "^[A-Z]{2}$",
      "description": "2-letter ISO 3166-1 alpha-2 country code, stored uppercase. Public in both JSON-LD and AAS."
    },
    "operatorId": {
      "type": [
        "string",
        "null"
      ],
      "description": "Id of the owning Economic Operator, or null for a tenant-level facility. Set at creation; not updatable via PUT."
    },
    "tenantId": {
      "type": "string",
      "description": "Owning tenant workspace id."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

## Used by

- schema [FacilityCreatedEnvelope](/schemas/FacilityCreatedEnvelope.md)
- schema [FacilityListEnvelope](/schemas/FacilityListEnvelope.md)
- schema [FacilityEnvelope](/schemas/FacilityEnvelope.md)
