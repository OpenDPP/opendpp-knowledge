---
type: Schema
title: TraceComplianceCertificate
description: TraceComplianceCertificate
resource: https://opendpp-node.eu/openapi.json#/components/schemas/TraceComplianceCertificate
tags:
  - schema
timestamp: 2026-06-20T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | yes | — |
| `rootEventId` | string | yes | — |
| `status` | string | yes | — |
| `regulatoryStandards` | array<string> | yes | Always ["EUDR-2026", "UFLPA-2026"]. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "type",
    "rootEventId",
    "status",
    "regulatoryStandards"
  ],
  "properties": {
    "type": {
      "type": "string",
      "const": "TraceabilityComplianceCertificate"
    },
    "rootEventId": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "const": "VERIFIED_COMPLIANT"
    },
    "regulatoryStandards": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "EUDR-2026",
          "UFLPA-2026"
        ]
      },
      "description": "Always `[\"EUDR-2026\", \"UFLPA-2026\"]`."
    }
  }
}
```

## Used by

- schema [TraceComplianceAuditResponse](/schemas/TraceComplianceAuditResponse.md)
