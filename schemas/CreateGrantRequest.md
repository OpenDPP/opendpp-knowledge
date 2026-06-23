---
type: Schema
title: CreateGrantRequest
description: Direct-issuance body.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/CreateGrantRequest
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

Direct-issuance body. Over-length strings are silently truncated to the documented maximum, not rejected; unknown fields are ignored. The grant kind is always `LEGITIMATE_INTEREST` — there is no `kind`/`type` field.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `granteeName` | string | yes | Required (whitespace-only is rejected as missing). |
| `granteeEmail` | string | no | Optional. |
| `organization` | string | no | Optional. |
| `purpose` | string | no | Optional stated legitimate interest. |
| `scopeType` | string | yes | Required. |
| `passportId` | string | no | Required when scopeType is PASSPORT; ignored otherwise. |
| `batteryUnitId` | string | no | Required when scopeType is UNIT; ignored otherwise. |
| `expiresAt` | string | yes | Required. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Direct-issuance body. Over-length strings are silently truncated to the documented maximum, not rejected; unknown fields are ignored. The grant kind is always `LEGITIMATE_INTEREST` — there is no `kind`/`type` field.",
  "required": [
    "granteeName",
    "scopeType",
    "expiresAt"
  ],
  "properties": {
    "granteeName": {
      "type": "string",
      "minLength": 1,
      "maxLength": 160,
      "description": "Required (whitespace-only is rejected as missing). Truncated to 160 characters."
    },
    "granteeEmail": {
      "type": "string",
      "format": "email",
      "maxLength": 254,
      "description": "Optional. Truncated to 254 characters, then must match a basic e-mail pattern (`x@y.z`) or the request fails with 400 `granteeEmail is invalid`. Stored as given (not lowercased)."
    },
    "organization": {
      "type": "string",
      "maxLength": 200,
      "description": "Optional. Truncated to 200 characters."
    },
    "purpose": {
      "type": "string",
      "maxLength": 2000,
      "description": "Optional stated legitimate interest. Truncated to 2000 characters."
    },
    "scopeType": {
      "type": "string",
      "enum": [
        "UNIT",
        "PASSPORT",
        "TENANT"
      ],
      "description": "Required. `UNIT` needs `batteryUnitId`; `PASSPORT` needs `passportId`; `TENANT` is workspace-wide. Any other value ⇒ 400."
    },
    "passportId": {
      "type": "string",
      "maxLength": 64,
      "description": "Required when `scopeType` is `PASSPORT`; ignored otherwise. Must be a non-DRAFT passport in this workspace — a missing, cross-tenant, or `DRAFT` id (or omitting the field entirely) returns 404."
    },
    "batteryUnitId": {
      "type": "string",
      "maxLength": 64,
      "description": "Required when `scopeType` is `UNIT`; ignored otherwise. Must be a battery unit in this workspace — a missing or cross-tenant id (or omitting the field entirely) returns 404."
    },
    "expiresAt": {
      "type": "string",
      "format": "date-time",
      "description": "Required. Date parsing is lenient (some non-ISO values may be accepted) — ISO 8601 is strongly recommended. Must be in the future and at most 366 days from now."
    }
  }
}
```

## Used by

- [createGrant](/operations/createGrant.md) (`POST /api/v1/grants`)
