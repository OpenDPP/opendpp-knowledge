---
type: Schema
title: PassportQuotaError
description: 402 body for a write blocked by billing.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportQuotaError
tags:
  - schema
timestamp: 2026-06-26T00:00:00Z
---

402 body for a write blocked by billing. Always carries `error` + `message`; a block caused by the subscription tier's published-passport CAP additionally sets `code: "passport_quota_exceeded"` plus `quota` and `upgradeUrl`, so clients distinguish it from a lapsed-subscription 402 and can prompt an upgrade.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | no | Always false when present. |
| `error` | string | yes | Short error title. |
| `message` | string | yes | Human-readable explanation. |
| `code` | string | no | Machine-readable discriminator. |
| `quota` | object | no | Present only on a passport_quota_exceeded block: current usage vs the tier cap. |
| `upgradeUrl` | string | no | Where the workspace owner can upgrade the plan. |

## JSON Schema

```json
{
  "type": "object",
  "description": "402 body for a write blocked by billing. Always carries `error` + `message`; a block caused by the subscription tier's published-passport CAP additionally sets `code: \"passport_quota_exceeded\"` plus `quota` and `upgradeUrl`, so clients distinguish it from a lapsed-subscription 402 and can prompt an upgrade.",
  "required": [
    "error",
    "message"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "description": "Always `false` when present."
    },
    "error": {
      "type": "string",
      "description": "Short error title.",
      "examples": [
        "Payment Required"
      ]
    },
    "message": {
      "type": "string",
      "description": "Human-readable explanation."
    },
    "code": {
      "type": "string",
      "description": "Machine-readable discriminator. `passport_quota_exceeded` = the tier's passport cap is reached; omitted for a lapsed-subscription 402.",
      "examples": [
        "passport_quota_exceeded"
      ]
    },
    "quota": {
      "type": "object",
      "description": "Present only on a `passport_quota_exceeded` block: current usage vs the tier cap.",
      "properties": {
        "tier": {
          "type": "string",
          "description": "The workspace subscription tier."
        },
        "activePassports": {
          "type": "integer",
          "description": "Active (non-draft, non-archived) passports, counted tenant-wide."
        },
        "passportLimit": {
          "type": "integer",
          "description": "The tier's passport cap."
        }
      }
    },
    "upgradeUrl": {
      "type": "string",
      "description": "Where the workspace owner can upgrade the plan."
    }
  }
}
```

## Used by

- the shared error responses
