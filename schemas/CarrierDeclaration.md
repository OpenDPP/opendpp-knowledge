---
type: Schema
title: CarrierDeclaration
description: "EN 18220 data-carrier declaration — what the economic operator states about the PHYSICAL carrier that links the product to this passport: the symbology (Clause 6), where it is placed (§5.4.2–5.4.6), the X dimension it is printed at (§5.5.2…"
resource: https://opendpp-node.eu/openapi.json#/components/schemas/CarrierDeclaration
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-03T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

EN 18220 data-carrier declaration — what the economic operator states about the PHYSICAL carrier that links the product to this passport: the symbology (Clause 6), where it is placed (§5.4.2–5.4.6), the X dimension it is printed at (§5.5.2), the print-quality grade and method (§5.6.2) and, for a label or a reused product, the durability assessment (§5.4.4, §4.3.1). Optional: absent means undeclared. Stored on the passport and versioned with it; NOT regulated metadata and outside the Merkle seal. Two cross-field rules: a radio-frequency carrier carries no X dimension, error-correction level or quality grade; `errorCorrection` applies to `QR_CODE` only, because ECC 200 is fixed by the other 2D symbology.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `symbology` | string | yes | EN 18220 Clause 6 carrier technology. |
| `placement` | string | yes | EN 18220 §5.4.2–5.4.6 marking or embedding method: on the product, on its packaging, as a label, in the accompanying document, or embedded in the product. |
| `xDimensionMm` | number | no | Module width in millimetres the symbol is printed at (§5.5.2; printed 2D symbols only). |
| `errorCorrection` | string | no | ISO/IEC 18004 error-correction level; QR Code only. |
| `targetEnvironment` | string | no | The scanning environment the carrier was sized and graded for (§5.5.2, §5.6.1). |
| `printQualityGrade` | string | no | Print-quality grade and the method it was assessed by (§5.6.2). |
| `durabilityAssessment` | string | no | The operator's durability assessment for a label or a reused product (§5.4.4, §4.3.1). |

## JSON Schema

```json
{
  "type": "object",
  "description": "EN 18220 data-carrier declaration — what the economic operator states about the PHYSICAL carrier that links the product to this passport: the symbology (Clause 6), where it is placed (§5.4.2–5.4.6), the X dimension it is printed at (§5.5.2), the print-quality grade and method (§5.6.2) and, for a label or a reused product, the durability assessment (§5.4.4, §4.3.1). Optional: absent means undeclared. Stored on the passport and versioned with it; NOT regulated metadata and outside the Merkle seal. Two cross-field rules: a radio-frequency carrier carries no X dimension, error-correction level or quality grade; `errorCorrection` applies to `QR_CODE` only, because ECC 200 is fixed by the other 2D symbology.",
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
      "description": "Print-quality grade and the method it was assessed by (§5.6.2). Free text, because the clause admits two methods whose grades take incompatible forms: a printed 2D symbol is graded under ISO/IEC 15415:2024 as overall grade / measuring aperture as a percentage of the X dimension / peak illumination wavelength in nm (e.g. `1.5/08/660`), while a direct part mark is graded under ISO/IEC 29158 as a letter (e.g. `DPM grade B`). State the method alongside the grade."
    },
    "durabilityAssessment": {
      "type": "string",
      "maxLength": 500,
      "description": "The operator's durability assessment for a label or a reused product (§5.4.4, §4.3.1)."
    }
  },
  "example": {
    "symbology": "QR_CODE",
    "placement": "LABEL",
    "xDimensionMm": 0.495,
    "errorCorrection": "H",
    "targetEnvironment": "Handheld imagers at 10–30 cm",
    "printQualityGrade": "1.5/08/660 (ISO/IEC 15415)"
  }
}
```

## Used by

- schema [PassportCreateRequest](/schemas/PassportCreateRequest.md)
- schema [PassportValidateOnlyRequest](/schemas/PassportValidateOnlyRequest.md)
- schema [PassportBulkRow](/schemas/PassportBulkRow.md)
- schema [PassportUpdateRequest](/schemas/PassportUpdateRequest.md)
