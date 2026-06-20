---
type: Schema
title: FacilityUpdateRequest
description: Partial update.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/FacilityUpdateRequest
tags:
  - schema
timestamp: 2026-06-20T00:00:00Z
---

Partial update. `gln` and `operatorId` are immutable — if present they are silently ignored, as is any unknown key. For `activity`/`streetAddress`/`city`/`postalCode` the *presence* of the key matters: the value is stringified and trimmed, and anything that trims to empty (null, "", or a whitespace-only string) clears the field to null — the same normalization as POST.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | no | New name. |
| `activity` | string,null | no | New activity, or null/"" to clear. |
| `streetAddress` | string,null | no | New street address, or null/"" to clear. |
| `city` | string,null | no | New city, or null/"" to clear. |
| `postalCode` | string,null | no | New postal code, or null/"" to clear. |
| `country` | string | no | New 2-letter ISO country code (400 if a string that does not match; stored uppercase; non-string values are silently ignored). |

## JSON Schema

```json
{
  "type": "object",
  "description": "Partial update. `gln` and `operatorId` are immutable — if present they are silently ignored, as is any unknown key. For `activity`/`streetAddress`/`city`/`postalCode` the *presence* of the key matters: the value is stringified and trimmed, and anything that trims to empty (null, \"\", or a whitespace-only string) clears the field to null — the same normalization as POST.",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "New name. Applied only when a non-empty string; empty/whitespace or non-string values are silently ignored (the name can never be cleared)."
    },
    "activity": {
      "type": [
        "string",
        "null"
      ],
      "description": "New activity, or null/\"\" to clear. A whitespace-only string is stored as \"\" (see schema description)."
    },
    "streetAddress": {
      "type": [
        "string",
        "null"
      ],
      "description": "New street address, or null/\"\" to clear. A whitespace-only string is stored as \"\" (see schema description)."
    },
    "city": {
      "type": [
        "string",
        "null"
      ],
      "description": "New city, or null/\"\" to clear. A whitespace-only string is stored as \"\" (see schema description)."
    },
    "postalCode": {
      "type": [
        "string",
        "null"
      ],
      "description": "New postal code, or null/\"\" to clear. A whitespace-only string is stored as \"\" (see schema description)."
    },
    "country": {
      "type": "string",
      "pattern": "^[A-Za-z]{2}$",
      "description": "New 2-letter ISO country code (400 if a string that does not match; stored uppercase; non-string values are silently ignored)."
    }
  }
}
```

## Used by

- [updateFacility](/operations/updateFacility.md) (`PUT /api/v1/facilities/{id}`)
