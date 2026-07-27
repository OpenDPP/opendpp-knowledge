---
type: Schema
title: TraceComplianceCertificate
description: A compliance certificate for an audited traceability lineage, naming the root event and the regulatory standards checked.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/TraceComplianceCertificate
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-07-27T00:00:00Z
---

A compliance certificate for an audited traceability lineage, naming the root event and the regulatory standards checked.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | yes | — |
| `rootEventId` | string | yes | — |
| `status` | string | yes | Screening outcome — informational (e.g. SCREENED_NO_MATCHES when no geographic screen matched); NOT a legal compliance verdict. |
| `regulatoryStandards` | array<string> | yes | Vendor screening-heuristic identifiers applied (e.g. OpenDPP-EUDR-heuristic, OpenDPP-UFLPA-screen) — informational, NOT EU regulatory standards. |

## JSON Schema

```json
{
  "description": "A compliance certificate for an audited traceability lineage, naming the root event and the regulatory standards checked.",
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
      "example": "SCREENED_NO_MATCHES",
      "description": "Screening outcome — informational (e.g. `SCREENED_NO_MATCHES` when no geographic screen matched); NOT a legal compliance verdict."
    },
    "regulatoryStandards": {
      "type": "array",
      "items": {
        "type": "string",
        "example": "OpenDPP-EUDR-heuristic"
      },
      "description": "Vendor screening-heuristic identifiers applied (e.g. `OpenDPP-EUDR-heuristic`, `OpenDPP-UFLPA-screen`) — informational, NOT EU regulatory standards."
    }
  }
}
```

## Used by

- schema [TraceComplianceAuditResponse](/schemas/TraceComplianceAuditResponse.md)
