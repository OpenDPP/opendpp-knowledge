---
type: Schema
title: EpcisDocument
description: A GS1 EPCIS 2.0 document (JSON/JSON-LD).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/EpcisDocument
tags:
  - schema
timestamp: 2026-07-06T00:00:00Z
---

A GS1 EPCIS 2.0 document (JSON/JSON-LD). This shape is indicative — the OFFICIAL GS1 EPCIS 2.0.1 JSON Schema (vendored on the node, $id https://ref.gs1.org/standards/epcis/2.0.1/epcis-json-schema.json) is authoritative and is what capture validates against.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | — | yes | JSON-LD context — include https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld. |
| `type` | string | yes | — |
| `schemaVersion` | string | yes | — |
| `creationDate` | string | yes | — |
| `epcisBody` | object | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "A GS1 EPCIS 2.0 document (JSON/JSON-LD). This shape is indicative — the OFFICIAL GS1 EPCIS 2.0.1 JSON Schema (vendored on the node, $id https://ref.gs1.org/standards/epcis/2.0.1/epcis-json-schema.json) is authoritative and is what capture validates against.",
  "required": [
    "@context",
    "type",
    "schemaVersion",
    "creationDate",
    "epcisBody"
  ],
  "properties": {
    "@context": {
      "description": "JSON-LD context — include https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld.",
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "array",
          "items": {}
        }
      ]
    },
    "type": {
      "type": "string",
      "enum": [
        "EPCISDocument"
      ]
    },
    "schemaVersion": {
      "type": "string",
      "example": "2.0"
    },
    "creationDate": {
      "type": "string",
      "format": "date-time"
    },
    "epcisBody": {
      "type": "object",
      "required": [
        "eventList"
      ],
      "properties": {
        "eventList": {
          "type": "array",
          "items": {
            "type": "object",
            "description": "One EPCIS 2.0 event (ObjectEvent, AggregationEvent, TransformationEvent, AssociationEvent — per the official schema).",
            "additionalProperties": true
          }
        }
      }
    }
  },
  "additionalProperties": true
}
```

## Used by

- [captureEpcisDocument](/operations/captureEpcisDocument.md) (`POST /api/v1/events/epcis`)
- [getEventLineage](/operations/getEventLineage.md) (`GET /api/v1/events/{id}/lineage`)
