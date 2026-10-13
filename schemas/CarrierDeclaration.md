---
type: Schema
title: CarrierDeclaration
description: "EN 18220 data-carrier declaration — what the economic operator states about the PHYSICAL carrier that links the product to this passport: the symbology (Clause 6), where it is placed (§5.4.2–5.4.6), the X dimension it is printed at and the…"
resource: https://opendpp-node.eu/openapi.json#/components/schemas/CarrierDeclaration
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-21T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

EN 18220 data-carrier declaration — what the economic operator states about the PHYSICAL carrier that links the product to this passport: the symbology (Clause 6), where it is placed (§5.4.2–5.4.6), the X dimension it is printed at and the print method and media (§5.5.2), the print-quality grade and method (§5.6.2), for a label or a reused product the durability assessment (§5.4.4, §4.3.1) and, for a radio-frequency carrier, the mark that signals it is there (§5.7.1). Optional: absent means undeclared. Stored on the passport and versioned with it; NOT regulated metadata and outside the Merkle seal. Cross-field rules: a radio-frequency carrier carries no X dimension, error-correction level or quality grade; `presenceMark` applies to a radio-frequency carrier only, because a printed symbol is visible; `errorCorrection` applies to `QR_CODE` only, because ECC 200 is fixed by the other 2D symbology; `printQuality` and `printQualityGrade` are not both given; and a `printQuality` method follows the placement — `ISO_IEC_29158` for `PRODUCT`, a mark on the item's own surface, `ISO_IEC_15415` for every other placement (§5.6.2). The recommendations of the same clauses are advised, never refused: a printed symbol on a physical placement with no grade (`CARRIER_QUALITY_UNGRADED`), an ISO/IEC 15415 grade below the typical 1.5 (`CARRIER_GRADE_BELOW_TYPICAL`), a grade in the free-text field (`CARRIER_GRADE_UNSTRUCTURED`), and a label with no durability assessment (`CARRIER_LABEL_UNASSESSED`).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `symbology` | string | yes | EN 18220 Clause 6 carrier technology. |
| `placement` | string | yes | EN 18220 §5.4.2–5.4.6 marking or embedding method: on the product, on its packaging, as a label, in the accompanying document, or embedded in the product. |
| `xDimensionMm` | number | no | Module width in millimetres the symbol is printed at (§5.5.2; printed 2D symbols only). |
| `errorCorrection` | string | no | ISO/IEC 18004 error-correction level; QR Code only. |
| `targetEnvironment` | string | no | The scanning environment the carrier was sized and graded for (§5.5.2, §5.6.1). |
| `printQualityGrade` | string | no | Print-quality grade and the method it was assessed by (§5.6.2), as free text. |
| `printQuality` | — | no | Print-quality grade structured by its assessment method (§5.6.2): ISO/IEC 15415:2024 for a printed 2D symbol, ISO/IEC 29158 for a direct part mark (placement P… |
| `printMethod` | string | no | The print method and media the symbol is produced with, e.g. Thermal transfer on polyester label stock (§5.5.2). |
| `durabilityAssessment` | string | no | The operator's durability assessment for a label or a reused product (§5.4.4, §4.3.1). |
| `presenceMark` | string | no | How a person can tell a radio-frequency carrier is there, e.g. NFC N-Mark on the care label (§5.7.1, a recommendation). |

## JSON Schema

```json
{
  "type": "object",
  "description": "EN 18220 data-carrier declaration — what the economic operator states about the PHYSICAL carrier that links the product to this passport: the symbology (Clause 6), where it is placed (§5.4.2–5.4.6), the X dimension it is printed at and the print method and media (§5.5.2), the print-quality grade and method (§5.6.2), for a label or a reused product the durability assessment (§5.4.4, §4.3.1) and, for a radio-frequency carrier, the mark that signals it is there (§5.7.1). Optional: absent means undeclared. Stored on the passport and versioned with it; NOT regulated metadata and outside the Merkle seal. Cross-field rules: a radio-frequency carrier carries no X dimension, error-correction level or quality grade; `presenceMark` applies to a radio-frequency carrier only, because a printed symbol is visible; `errorCorrection` applies to `QR_CODE` only, because ECC 200 is fixed by the other 2D symbology; `printQuality` and `printQualityGrade` are not both given; and a `printQuality` method follows the placement — `ISO_IEC_29158` for `PRODUCT`, a mark on the item's own surface, `ISO_IEC_15415` for every other placement (§5.6.2). The recommendations of the same clauses are advised, never refused: a printed symbol on a physical placement with no grade (`CARRIER_QUALITY_UNGRADED`), an ISO/IEC 15415 grade below the typical 1.5 (`CARRIER_GRADE_BELOW_TYPICAL`), a grade in the free-text field (`CARRIER_GRADE_UNSTRUCTURED`), and a label with no durability assessment (`CARRIER_LABEL_UNASSESSED`).",
  "required": [
    "symbology",
    "placement"
  ],
  "additionalProperties": false,
  "properties": {
    "symbology": {
      "type": "string",
      "enum": [
        "QR_CODE",
        "DATA_MATRIX",
        "NFC",
        "HF_RFID",
        "RAIN_RFID"
      ],
      "description": "EN 18220 Clause 6 carrier technology."
    },
    "placement": {
      "type": "string",
      "enum": [
        "PRODUCT",
        "PACKAGING",
        "LABEL",
        "DOCUMENT",
        "EMBEDDED"
      ],
      "description": "EN 18220 §5.4.2–5.4.6 marking or embedding method: on the product, on its packaging, as a label, in the accompanying document, or embedded in the product."
    },
    "xDimensionMm": {
      "type": "number",
      "minimum": 0.396,
      "maximum": 2,
      "description": "Module width in millimetres the symbol is printed at (§5.5.2; printed 2D symbols only). The same bounds `GET /api/v1/passports/{id}/qr?xDimensionMm=` accepts."
    },
    "errorCorrection": {
      "type": "string",
      "enum": [
        "L",
        "M",
        "Q",
        "H"
      ],
      "description": "ISO/IEC 18004 error-correction level; QR Code only. All four levels are accepted because this records what the operator printed, not what this node draws: the QR endpoint's `ecl` parameter offers M, Q and H, so an `L` declaration describes a carrier the node would not have rendered."
    },
    "targetEnvironment": {
      "type": "string",
      "maxLength": 160,
      "description": "The scanning environment the carrier was sized and graded for (§5.5.2, §5.6.1)."
    },
    "printQualityGrade": {
      "type": "string",
      "maxLength": 60,
      "deprecated": true,
      "description": "Print-quality grade and the method it was assessed by (§5.6.2), as free text. **Deprecated in favour of `printQuality`**, which states the same grade structured by its method and is validated; still accepted, with a `CARRIER_GRADE_UNSTRUCTURED` warning. Not given together with `printQuality`."
    },
    "printQuality": {
      "description": "Print-quality grade structured by its assessment method (§5.6.2): ISO/IEC 15415:2024 for a printed 2D symbol, ISO/IEC 29158 for a direct part mark (placement `PRODUCT`). Printed 2D symbols only.",
      "oneOf": [
        {
          "$ref": "#/components/schemas/CarrierPrintQuality15415"
        },
        {
          "$ref": "#/components/schemas/CarrierPrintQuality29158"
        }
      ],
      "discriminator": {
        "propertyName": "method",
        "mapping": {
          "ISO_IEC_15415": "#/components/schemas/CarrierPrintQuality15415",
          "ISO_IEC_29158": "#/components/schemas/CarrierPrintQuality29158"
        }
      }
    },
    "printMethod": {
      "type": "string",
      "maxLength": 160,
      "description": "The print method and media the symbol is produced with, e.g. `Thermal transfer on polyester label stock` (§5.5.2)."
    },
    "durabilityAssessment": {
      "type": "string",
      "maxLength": 500,
      "description": "The operator's durability assessment for a label or a reused product (§5.4.4, §4.3.1)."
    },
    "presenceMark": {
      "type": "string",
      "maxLength": 160,
      "description": "How a person can tell a radio-frequency carrier is there, e.g. `NFC N-Mark on the care label` (§5.7.1, a recommendation). NFC and RFID carriers only. The mark is the operator's to apply; declaring a radio carrier without one is accepted with a `CARRIER_PRESENCE_UNMARKED` warning."
    }
  },
  "example": {
    "symbology": "QR_CODE",
    "placement": "LABEL",
    "xDimensionMm": 0.495,
    "errorCorrection": "H",
    "targetEnvironment": "Handheld imagers at 10–30 cm",
    "printQuality": {
      "method": "ISO_IEC_15415",
      "grade": 1.5,
      "aperturePercent": 80,
      "wavelengthNm": 660
    },
    "printMethod": "Thermal transfer on polyester label stock",
    "durabilityAssessment": "Laminated against abrasion; assessed for the product lifetime"
  }
}
```

## Used by

- schema [PassportCreateRequest](/schemas/PassportCreateRequest.md)
- schema [PassportValidateOnlyRequest](/schemas/PassportValidateOnlyRequest.md)
- schema [PassportBulkRow](/schemas/PassportBulkRow.md)
- schema [PassportUpdateRequest](/schemas/PassportUpdateRequest.md)
