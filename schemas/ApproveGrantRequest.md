---
type: Schema
title: ApproveGrantRequest
description: Approval body — only the final expiry is supplied; everything else comes from the original request.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/ApproveGrantRequest
tags:
  - schema
timestamp: 2026-06-20T00:00:00Z
---

Approval body — only the final expiry is supplied; everything else comes from the original request.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `expiresAt` | string | yes | Required. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Approval body — only the final expiry is supplied; everything else comes from the original request.",
  "required": [
    "expiresAt"
  ],
  "properties": {
    "expiresAt": {
      "type": "string",
      "format": "date-time",
      "description": "Required. Date parsing is lenient (some non-ISO values may be accepted) — ISO 8601 is strongly recommended. Must be in the future and at most 366 days from now. Replaces the request's provisional 90-day expiry."
    }
  }
}
```

## Used by

- [approveGrantRequest](/operations/approveGrantRequest.md) (`POST /api/v1/grants/{id}/approve`)
