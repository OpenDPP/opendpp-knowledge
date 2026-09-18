---
type: Schema
title: En18223DataElement
description: "One data element of the EN 18223:2026 Annex A expanded form: its relative identifier, its clause 4 subclass, the identifier of its definition in the dictionary served at GET /ns/dpp, and — for a single-valued element — the Table 7 valueDat…"
resource: https://opendpp-node.eu/openapi.json#/components/schemas/En18223DataElement
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

One data element of the EN 18223:2026 Annex A expanded form: its relative identifier, its clause 4 subclass, the identifier of its definition in the dictionary served at `GET /ns/dpp`, and — for a single-valued element — the Table 7 `valueDataType` and the `value`; a collection carries its members under `elements`, an ordered list its items under `value`, each item named by its position.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `elementId` | string | yes | The relative identifier of the element within its location (Table 2) — the key the compressed form uses. |
| `objectType` | string | yes | The concrete DataElement subclass (4.1.2.3). |
| `dictionaryReference` | string | yes | The unique identifier of the element's definition — https://opendpp-node.eu/ns/dpp#<path>, resolvable at GET /ns/dpp (4.3). |
| `valueDataType` | string | no | The XSD data type of the value (Table 7, e.g. xsd:decimal); present on single-valued elements and on lists whose items share one native type. |
| `value` | — | no | A single-valued element's value, or an ordered list's items — each an En18223DataElement named by its position. |
| `elements` | array<[En18223DataElement](/schemas/En18223DataElement.md)> | no | A collection's members. |

## JSON Schema

```json
{
  "type": "object",
  "description": "One data element of the EN 18223:2026 Annex A expanded form: its relative identifier, its clause 4 subclass, the identifier of its definition in the dictionary served at `GET /ns/dpp`, and — for a single-valued element — the Table 7 `valueDataType` and the `value`; a collection carries its members under `elements`, an ordered list its items under `value`, each item named by its position.",
  "required": [
    "elementId",
    "objectType",
    "dictionaryReference"
  ],
  "properties": {
    "elementId": {
      "type": "string",
      "description": "The relative identifier of the element within its location (Table 2) — the key the compressed form uses."
    },
    "objectType": {
      "type": "string",
      "enum": [
        "DataElementCollection",
        "SingleValuedDataElement",
        "MultiValuedDataElement",
        "RelatedResource",
        "MultiLanguageDataElement"
      ],
      "description": "The concrete DataElement subclass (4.1.2.3)."
    },
    "dictionaryReference": {
      "type": "string",
      "format": "uri",
      "description": "The unique identifier of the element's definition — `https://opendpp-node.eu/ns/dpp#<path>`, resolvable at `GET /ns/dpp` (4.3)."
    },
    "valueDataType": {
      "type": "string",
      "description": "The XSD data type of the value (Table 7, e.g. `xsd:decimal`); present on single-valued elements and on lists whose items share one native type."
    },
    "value": {
      "description": "A single-valued element's value, or an ordered list's items — each an `En18223DataElement` named by its position."
    },
    "elements": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/En18223DataElement"
      },
      "description": "A collection's members."
    }
  }
}
```

## Used by

- schema [PublicPassportJsonLdExpanded](/schemas/PublicPassportJsonLdExpanded.md)
