---
type: Schema
title: PassportStatusUpdateRequest
description: Body of PUT /api/v1/passports/{id}/status.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportStatusUpdateRequest
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

Body of PUT /api/v1/passports/{id}/status. Only `status` is read; any other keys are ignored (there is no `reason` field).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | string | yes | Target lifecycle state. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Body of PUT /api/v1/passports/{id}/status. Only `status` is read; any other keys are ignored (there is no `reason` field).",
  "required": [
    "status"
  ],
  "additionalProperties": true,
  "properties": {
    "status": {
      "type": "string",
      "enum": [
        "ACTIVE",
        "RECALLED",
        "DECOMMISSIONED"
      ],
      "description": "Target lifecycle state. DECOMMISSIONED starts the retention clock (retentionUntil = now + the configured retention period, default 15 years); ACTIVE reactivates (clears retentionUntil and archivedAt); RECALLED marks the product recalled. DRAFT is not a valid target — drafts are published via PUT /api/v1/passports/{id}."
    }
  }
}
```

## Used by

- [updatePassportStatus](/operations/updatePassportStatus.md) (`PUT /api/v1/passports/{id}/status`)
