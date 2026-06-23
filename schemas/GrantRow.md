---
type: Schema
title: GrantRow
description: Tenant-facing projection of an access grant.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/GrantRow
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

Tenant-facing projection of an access grant. The token hash, issuer user id, revoking actor and request IP are never exposed; raw capability tokens appear only in the one-time issuance/approval responses. All fields are always present (nullable ones serialize as `null`).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | yes | — |
| `status` | string | yes | PENDING = undecided third-party request (no token exists yet); ACTIVE = usable token; DENIED = rejected request; REVOKED = soft-revoked. |
| `kind` | string | yes | LEGITIMATE_INTEREST (dpp_li_… tokens, tenant-issued or approved from a request) or AUTHORITY (dpp_auth_… tokens, platform-issued for market surveillance; not t… |
| `granteeName` | string | yes | — |
| `granteeEmail` | string,null | yes | — |
| `organization` | string,null | yes | — |
| `purpose` | string,null | yes | The stated legitimate interest. |
| `scopeType` | string | yes | What the token unlocks on the public resolvers: a single battery unit, a single passport, or the whole workspace. |
| `passportId` | string,null | yes | Set for PASSPORT scope, and also for UNIT scope (the unit's parent passport). |
| `batteryUnitId` | string,null | yes | Set only for UNIT scope. |
| `issuerType` | string | yes | TENANT = issued directly via this API; REQUEST = submitted by a third party through the hosted request-access page; PLATFORM = platform-admin-issued (AUTHORITY… |
| `issuerEmail` | string,null | yes | E-mail of the issuing user; null when issued by an API key or created from a public request. |
| `decidedAt` | string,null | yes | When a PENDING request was approved/denied; null for direct issuances. |
| `decidedBy` | string,null | yes | The deciding actor: a user e-mail, API_KEY_<keyId> when decided via an API key, or the literal unknown in degenerate authentication states. |
| `expiresAt` | string | yes | Hard expiry; the public resolvers reject the token after this instant. |
| `revokedAt` | string,null | yes | — |
| `lastUsedAt` | string,null | yes | Last successful use on a public resolver (book-kept best-effort). |
| `useCount` | integer | yes | Successful public-resolver uses (incremented best-effort). |
| `createdAt` | string | yes | — |
| `revocable` | boolean | yes | Computed: false for AUTHORITY grants (platform-managed), true otherwise. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Tenant-facing projection of an access grant. The token hash, issuer user id, revoking actor and request IP are never exposed; raw capability tokens appear only in the one-time issuance/approval responses. All fields are always present (nullable ones serialize as `null`).",
  "required": [
    "id",
    "status",
    "kind",
    "granteeName",
    "granteeEmail",
    "organization",
    "purpose",
    "scopeType",
    "passportId",
    "batteryUnitId",
    "issuerType",
    "issuerEmail",
    "decidedAt",
    "decidedBy",
    "expiresAt",
    "revokedAt",
    "lastUsedAt",
    "useCount",
    "createdAt",
    "revocable"
  ],
  "properties": {
    "id": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "PENDING",
        "ACTIVE",
        "DENIED",
        "REVOKED"
      ],
      "description": "`PENDING` = undecided third-party request (no token exists yet); `ACTIVE` = usable token; `DENIED` = rejected request; `REVOKED` = soft-revoked."
    },
    "kind": {
      "type": "string",
      "enum": [
        "LEGITIMATE_INTEREST",
        "AUTHORITY"
      ],
      "description": "`LEGITIMATE_INTEREST` (`dpp_li_…` tokens, tenant-issued or approved from a request) or `AUTHORITY` (`dpp_auth_…` tokens, platform-issued for market surveillance; not tenant-revocable)."
    },
    "granteeName": {
      "type": "string",
      "maxLength": 160
    },
    "granteeEmail": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 254
    },
    "organization": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 200
    },
    "purpose": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 2000,
      "description": "The stated legitimate interest."
    },
    "scopeType": {
      "type": "string",
      "enum": [
        "UNIT",
        "PASSPORT",
        "TENANT"
      ],
      "description": "What the token unlocks on the public resolvers: a single battery unit, a single passport, or the whole workspace."
    },
    "passportId": {
      "type": [
        "string",
        "null"
      ],
      "description": "Set for `PASSPORT` scope, and also for `UNIT` scope (the unit's parent passport). `null` for `TENANT` scope."
    },
    "batteryUnitId": {
      "type": [
        "string",
        "null"
      ],
      "description": "Set only for `UNIT` scope."
    },
    "issuerType": {
      "type": "string",
      "enum": [
        "TENANT",
        "PLATFORM",
        "REQUEST"
      ],
      "description": "`TENANT` = issued directly via this API; `REQUEST` = submitted by a third party through the hosted request-access page; `PLATFORM` = platform-admin-issued (AUTHORITY grants)."
    },
    "issuerEmail": {
      "type": [
        "string",
        "null"
      ],
      "description": "E-mail of the issuing user; `null` when issued by an API key or created from a public request."
    },
    "decidedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "When a PENDING request was approved/denied; `null` for direct issuances."
    },
    "decidedBy": {
      "type": [
        "string",
        "null"
      ],
      "description": "The deciding actor: a user e-mail, `API_KEY_<keyId>` when decided via an API key, or the literal `unknown` in degenerate authentication states."
    },
    "expiresAt": {
      "type": "string",
      "format": "date-time",
      "description": "Hard expiry; the public resolvers reject the token after this instant. PENDING requests carry a provisional 90-day expiry that is replaced on approval."
    },
    "revokedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time"
    },
    "lastUsedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "Last successful use on a public resolver (book-kept best-effort)."
    },
    "useCount": {
      "type": "integer",
      "description": "Successful public-resolver uses (incremented best-effort)."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "revocable": {
      "type": "boolean",
      "description": "Computed: `false` for `AUTHORITY` grants (platform-managed), `true` otherwise."
    }
  }
}
```

## Used by

- schema [GrantListResponse](/schemas/GrantListResponse.md)
- schema [GrantIssuedResponse](/schemas/GrantIssuedResponse.md)
- schema [GrantDecisionResponse](/schemas/GrantDecisionResponse.md)
