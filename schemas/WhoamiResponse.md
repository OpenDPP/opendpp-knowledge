---
type: Schema
title: WhoamiResponse
description: "The calling credential's identity: its workspace, the resolved auth principal and permissions, and active-passport usage against the plan quota."
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WhoamiResponse
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---

The calling credential's identity: its workspace, the resolved auth principal and permissions, and active-passport usage against the plan quota.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `tenant` | object | yes | — |
| `auth` | object | yes | — |
| `usage` | object | yes | — |

## JSON Schema

```json
{
  "description": "The calling credential's identity: its workspace, the resolved auth principal and permissions, and active-passport usage against the plan quota.",
  "type": "object",
  "required": [
    "success",
    "tenant",
    "auth",
    "usage"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "tenant": {
      "type": "object",
      "required": [
        "id",
        "name",
        "subdomain",
        "tier",
        "subscriptionStatus"
      ],
      "properties": {
        "id": {
          "type": "string",
          "description": "Workspace (tenant) id."
        },
        "name": {
          "type": "string",
          "description": "Workspace company name."
        },
        "subdomain": {
          "type": [
            "string",
            "null"
          ],
          "description": "Workspace subdomain (`<subdomain>.opendpp-node.eu`), or null if none is assigned."
        },
        "tier": {
          "type": "string",
          "description": "Subscription tier (e.g. `pilot`, `micro`, `starter`, `growth`, `scale`, `enterprise`)."
        },
        "subscriptionStatus": {
          "type": [
            "string",
            "null"
          ],
          "description": "Billing status string (e.g. `active`, `past_due`). When not `active`, write operations may return `402`. No amounts or processor identifiers are exposed."
        }
      }
    },
    "auth": {
      "type": "object",
      "required": [
        "role",
        "permissions",
        "isApiKeySession",
        "operatorId"
      ],
      "properties": {
        "role": {
          "type": "string",
          "description": "The principal's role."
        },
        "permissions": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Effective permission strings, re-derived server-side from the role (never trusted from the token). May include wildcards like `operator:*`."
        },
        "isApiKeySession": {
          "type": "boolean",
          "description": "`true` when authenticated with an API key, `false` for a session JWT."
        },
        "operatorId": {
          "type": [
            "string",
            "null"
          ],
          "description": "The economic operator this credential is scoped to, or `null` for a workspace-wide key. A scoped key's writes and reads are restricted to this operator."
        }
      }
    },
    "usage": {
      "type": "object",
      "required": [
        "activePassports",
        "passportLimit"
      ],
      "properties": {
        "activePassports": {
          "type": "integer",
          "description": "Active (non-draft, non-archived) passports counted against the quota — operator-scoped for a scoped key."
        },
        "passportLimit": {
          "type": [
            "integer",
            "null"
          ],
          "description": "Tier passport quota, or `null` for an unlimited tier."
        }
      }
    }
  }
}
```

## Used by

- [whoami](/operations/whoami.md) (`GET /api/v1/whoami`)
