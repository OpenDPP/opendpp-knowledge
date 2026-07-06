---
type: Schema
title: AdvisoryItem
description: One non-blocking advisory on a response's warnings[] (a heads-up — the request still succeeded) or notices[] (informational — something helpful the API did).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/AdvisoryItem
tags:
  - schema
timestamp: 2026-07-04T00:00:00Z
---

One non-blocking advisory on a response's `warnings[]` (a heads-up — the request still succeeded) or `notices[]` (informational — something helpful the API did). The `code` is a MACHINE-STABLE handle an interface can switch on, map to its own localized string, or link to docs; the human `message` (developer-facing) and `friendlyMessage` (end-user, localizable) wording may change, but the code will not.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `code` | string | yes | Stable advisory code. |
| `path` | string | no | The field the advisory is about (e.g. |
| `message` | string | yes | Developer-facing detail (English). |
| `friendlyMessage` | string | yes | End-user-facing, localizable summary. |

## JSON Schema

```json
{
  "type": "object",
  "description": "One non-blocking advisory on a response's `warnings[]` (a heads-up — the request still succeeded) or `notices[]` (informational — something helpful the API did). The `code` is a MACHINE-STABLE handle an interface can switch on, map to its own localized string, or link to docs; the human `message` (developer-facing) and `friendlyMessage` (end-user, localizable) wording may change, but the code will not.",
  "required": [
    "code",
    "message",
    "friendlyMessage"
  ],
  "properties": {
    "code": {
      "type": "string",
      "description": "Stable advisory code. WARNINGS: `NON_GS1_PRODUCT_ID` (the productId is not a GS1 GTIN/GRAI → no scannable GS1 link), `PII_SHAPE_DETECTED` (metadata looks like personal data), `UNIT_NO_SCANNABLE_LINK` (units under a non-GTIN passport have no scannable unit link), `DRAFT_DEMOTED` (draft:true took an already-published passport offline), `EORI_NOT_FOUND` (a declared EORI was not in the EU EOS register). NOTICES: `OPERATOR_AUTO_ATTRIBUTED` (operatorId omitted → the workspace's first bound operator was used), `GTIN_AUTO_COPIED` (a valid GTIN-14/GRAI productId was copied into metadata.gtin/metadata.grai).",
      "enum": [
        "NON_GS1_PRODUCT_ID",
        "PII_SHAPE_DETECTED",
        "UNIT_NO_SCANNABLE_LINK",
        "DRAFT_DEMOTED",
        "EORI_NOT_FOUND",
        "OPERATOR_AUTO_ATTRIBUTED",
        "GTIN_AUTO_COPIED"
      ]
    },
    "path": {
      "type": "string",
      "description": "The field the advisory is about (e.g. `productId`, `draft`, `regId`), when applicable."
    },
    "message": {
      "type": "string",
      "description": "Developer-facing detail (English)."
    },
    "friendlyMessage": {
      "type": "string",
      "description": "End-user-facing, localizable summary."
    }
  }
}
```

## Used by

- schema [SerializeBatteryUnitsResponse](/schemas/SerializeBatteryUnitsResponse.md)
- schema [RegisterOperatorResponse](/schemas/RegisterOperatorResponse.md)
- schema [PassportIngestCreated](/schemas/PassportIngestCreated.md)
- schema [PassportBulkResult](/schemas/PassportBulkResult.md)
- schema [PassportUpdateResponse](/schemas/PassportUpdateResponse.md)
- schema [PassportSealResponse](/schemas/PassportSealResponse.md)
