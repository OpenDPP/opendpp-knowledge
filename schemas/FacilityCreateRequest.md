---
type: Schema
title: FacilityCreateRequest
description: FacilityCreateRequest
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityCreateRequest
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `gln` | string | yes | GS1 GLN-13. |
| `name` | string | yes | Facility name. |
| `country` | string | yes | 2-letter ISO country code (case-insensitive on input; stored uppercase). |
| `activity` | string | no | Optional activity, e.g. |
| `streetAddress` | string | no | Optional street address (owner-only in public views). |
| `city` | string | no | Optional city (owner-only in public views). |
| `postalCode` | string | no | Optional postal code (owner-only in public views). |
| `operatorId` | string | no | Optional owning Economic Operator id. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "gln",
    "name",
    "country"
  ],
  "properties": {
    "gln": {
      "type": "string",
      "pattern": "^[0-9]{13}$",
      "description": "GS1 GLN-13. Trimmed, then validated: exactly 13 digits with a valid GS1 modulo-10 check digit. Unique platform-wide (409 on duplicate). Immutable after registration."
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "Facility name. Must be a non-empty string; stored trimmed."
    },
    "country": {
      "type": "string",
      "pattern": "^[A-Za-z]{2}$",
      "description": "2-letter ISO country code (case-insensitive on input; stored uppercase)."
    },
    "activity": {
      "type": "string",
      "description": "Optional activity, e.g. \"Cell assembly\". Trimmed; empty/whitespace is stored as null."
    },
    "streetAddress": {
      "type": "string",
      "description": "Optional street address (owner-only in public views). Trimmed; empty is stored as null."
    },
    "city": {
      "type": "string",
      "description": "Optional city (owner-only in public views). Trimmed; empty is stored as null."
    },
    "postalCode": {
      "type": "string",
      "description": "Optional postal code (owner-only in public views). Trimmed; empty is stored as null."
    },
    "operatorId": {
      "type": "string",
      "description": "Optional owning Economic Operator id. Must be bound to your tenant workspace (403 otherwise). Empty/whitespace is treated as absent. Operator-scoped API keys may only use their own operator id (it is applied automatically when omitted)."
    }
  }
}
```

## Used by

- [createFacility](/operations/createFacility.md) (`POST /api/v1/facilities`)
