---
type: Schema
title: UntpEventCredentialSubject
description: The EPCIS event payload.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/UntpEventCredentialSubject
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

The EPCIS event payload. `eventType` is effectively required: it is persisted into a server-side enum, and a missing or unknown value is rejected at the persistence layer (surfacing as the 500 `Database Persistence Failed` body, not a 400).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | no | EPC identifier of the subject (e.g. |
| `eventType` | string | yes | EPCIS 2.0 event type (server-side enum). |
| `action` | string | no | EPCIS action (server-side enum). |
| `bizStep` | string | no | CBV business step URI. |
| `disposition` | string | no | CBV disposition URI. |
| `readPoint` | string | no | Where the event was observed (e.g. |
| `bizLocation` | string | no | Business location (SGLN URI, DID, or free identifier). |
| `eventTime` | string | no | When the event occurred (anything new Date() parses). |
| `epcList` | array<string> | no | EPC URIs observed by the event. |
| `parentEpc` | string | no | Parent EPC for AggregationEvent. |
| `childEpcs` | array<string> | no | Child EPCs for AggregationEvent (stored as JSON verbatim). |
| `inputEpcList` | array<string> | no | Input EPCs for TransformationEvent (stored as JSON verbatim). |
| `outputEpcList` | array<string> | no | Output EPCs for TransformationEvent (stored as JSON verbatim). |
| `originLocation` | object | no | Geographic origin; used only to derive a default readPoint (geo:<lat>,<lng>) when readPoint is absent. |
| `responsibleOperatorDid` | string | no | DID of the responsible economic operator. |

## JSON Schema

```json
{
  "type": "object",
  "description": "The EPCIS event payload. `eventType` is effectively required: it is persisted into a server-side enum, and a missing or unknown value is rejected at the persistence layer (surfacing as the 500 `Database Persistence Failed` body, not a 400).",
  "required": [
    "eventType"
  ],
  "properties": {
    "id": {
      "type": "string",
      "description": "EPC identifier of the subject (e.g. `urn:epc:id:sgtin:0950110153.0003.SN-2026-000123`). When `epcList` is not supplied as an array, the stored EPC list defaults to `[id]` (or `[]` if absent)."
    },
    "eventType": {
      "type": "string",
      "enum": [
        "ObjectEvent",
        "AggregationEvent",
        "TransformationEvent",
        "AssociationEvent"
      ],
      "description": "EPCIS 2.0 event type (server-side enum)."
    },
    "action": {
      "type": "string",
      "enum": [
        "ADD",
        "OBSERVE",
        "DELETE"
      ],
      "description": "EPCIS action (server-side enum). Optional — but MUST be absent (or null) on `TransformationEvent`, otherwise 400 `Schema Validation Error`. An unknown value is rejected at the persistence layer (500)."
    },
    "bizStep": {
      "type": "string",
      "default": "urn:epcglobal:cbv:bizstep:receiving",
      "description": "CBV business step URI. Defaults to `urn:epcglobal:cbv:bizstep:receiving`."
    },
    "disposition": {
      "type": "string",
      "default": "urn:epcglobal:cbv:disp:in_progress",
      "description": "CBV disposition URI. Defaults to `urn:epcglobal:cbv:disp:in_progress`."
    },
    "readPoint": {
      "type": "string",
      "description": "Where the event was observed (e.g. `geo:41.1496,-8.6109`). When absent and `originLocation` is present, defaults to `geo:<latitude>,<longitude>`."
    },
    "bizLocation": {
      "type": "string",
      "description": "Business location (SGLN URI, DID, or free identifier). When absent, defaults to `responsibleOperatorDid`."
    },
    "eventTime": {
      "type": "string",
      "format": "date-time",
      "description": "When the event occurred (anything `new Date()` parses). Defaults to the credential `issuanceDate`, else the server clock."
    },
    "epcList": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "EPC URIs observed by the event. A non-array value is replaced with `[credentialSubject.id]` (or `[]`)."
    },
    "parentEpc": {
      "type": "string",
      "description": "Parent EPC for AggregationEvent."
    },
    "childEpcs": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Child EPCs for AggregationEvent (stored as JSON verbatim)."
    },
    "inputEpcList": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Input EPCs for TransformationEvent (stored as JSON verbatim)."
    },
    "outputEpcList": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Output EPCs for TransformationEvent (stored as JSON verbatim)."
    },
    "originLocation": {
      "type": "object",
      "required": [
        "latitude",
        "longitude"
      ],
      "properties": {
        "latitude": {
          "type": "number"
        },
        "longitude": {
          "type": "number"
        },
        "eudrPlotId": {
          "type": "string"
        }
      },
      "description": "Geographic origin; used only to derive a default `readPoint` (`geo:<lat>,<lng>`) when `readPoint` is absent. `latitude`/`longitude` are required here for correct usage but NOT enforced server-side: an `originLocation` missing them is not rejected — the derived `readPoint` is then silently persisted as the malformed literal `geo:undefined,undefined`."
    },
    "responsibleOperatorDid": {
      "type": "string",
      "description": "DID of the responsible economic operator. Fallback for `bizLocation`, and (only when `issuer` is absent) for the operator-scope check on operator-scoped API keys."
    }
  }
}
```

## Used by

- schema [UntpEventCredential](/schemas/UntpEventCredential.md)
