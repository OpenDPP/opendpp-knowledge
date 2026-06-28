---
type: Schema
title: TraceComplianceAuditResponse
description: TraceComplianceAuditResponse
resource: https://opendpp-node.eu/openapi.json#/components/schemas/TraceComplianceAuditResponse
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `eventId` | string | yes | Echo of the audited root event id. |
| `compliant` | boolean | yes | — |
| `errors` | array<string> | yes | Human-readable violation strings, e.g. |
| `auditedAt` | string | yes | — |
| `certificate` | — | yes | Present only when compliant is true; null otherwise. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "eventId",
    "compliant",
    "errors",
    "auditedAt",
    "certificate"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "eventId": {
      "type": "string",
      "description": "Echo of the audited root event id."
    },
    "compliant": {
      "type": "boolean"
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Human-readable violation strings, e.g. `UFLPA Compliance Failure: Event [<uuid>] contains raw materials originating from prohibited Xinjiang region (<location>).` or `EUDR Compliance Failure: Farm coordinates [<lat>, <lng>] intersect with deforested area plots.` Empty when compliant."
    },
    "auditedAt": {
      "type": "string",
      "format": "date-time"
    },
    "certificate": {
      "oneOf": [
        {
          "$ref": "#/components/schemas/TraceComplianceCertificate"
        },
        {
          "type": "null"
        }
      ],
      "description": "Present only when `compliant` is true; `null` otherwise."
    }
  }
}
```

## Used by

- [auditEventLineage](/operations/auditEventLineage.md) (`POST /api/v1/events/{id}/audit`)
