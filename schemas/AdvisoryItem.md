---
type: Schema
title: AdvisoryItem
description: One non-blocking advisory on a response's warnings[] (a heads-up — the request still succeeded) or notices[] (informational — something helpful the API did).
resource: https://opendpp-node.eu/openapi.json#/components/schemas/AdvisoryItem
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-03T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

One non-blocking advisory on a response's `warnings[]` (a heads-up — the request still succeeded) or `notices[]` (informational — something helpful the API did). The `code` is a MACHINE-STABLE handle an interface can switch on, map to its own localized string, or link to docs; the human `message` (developer-facing) and `friendlyMessage` (end-user, localizable) wording may change, but the code will not.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `code` | string | yes | Stable advisory code. |
| `path` | string | no | The field the advisory is about (e.g. productId, draft, regId), when applicable. |
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
      "description": "Stable advisory code. WARNINGS: `NON_GS1_PRODUCT_ID` (the productId is not a GS1 GTIN/GRAI → issued as an Identification Link, not a GS1 Digital Link), `PII_SHAPE_DETECTED` (metadata looks like personal data), `UNIT_NO_SCANNABLE_LINK` (units under a non-GTIN passport carry an Identification Link, not a GS1 unit Digital Link), `EORI_NOT_FOUND` (a declared EORI was not in the EU EOS register), `CARRIER_SYMBOLOGY_NOT_RENDERED` (the declared EN 18220 Clause 6 carrier is a symbology this node does not encode, so the symbol served is a QR Code), `CATEGORY_GRANULARITY_UNEXPECTED` (the passport's identification granularity differs from the level the product group's own instrument requires; EN 18220 §4.2 leaves that level to sector legislation). NOTICES: `OPERATOR_AUTO_ATTRIBUTED` (operatorId omitted → the workspace's first bound operator was used), `GTIN_AUTO_COPIED` (a valid GTIN-14/GRAI productId was copied into metadata.gtin/metadata.grai).",
      "enum": [
        "NON_GS1_PRODUCT_ID",
        "PII_SHAPE_DETECTED",
        "UNIT_NO_SCANNABLE_LINK",
        "EORI_NOT_FOUND",
        "CARRIER_SYMBOLOGY_NOT_RENDERED",
        "CATEGORY_GRANULARITY_UNEXPECTED",
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
