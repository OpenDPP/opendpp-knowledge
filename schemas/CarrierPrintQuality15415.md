---
type: Schema
title: CarrierPrintQuality15415
description: 'An ISO/IEC 15415:2024 print-quality grade (EN 18220 §5.6.2): the grade "includes a grade level, measuring aperture and the wavelength of light used for the measurement", so all three are required.'
resource: https://opendpp-node.eu/openapi.json#/components/schemas/CarrierPrintQuality15415
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-21T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

An ISO/IEC 15415:2024 print-quality grade (EN 18220 §5.6.2): the grade "includes a grade level, measuring aperture and the wavelength of light used for the measurement", so all three are required. The clause's typical minimum is `1,5/80 %/660`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `method` | string | yes | — |
| `grade` | number | yes | Overall symbol quality grade, 0.0–4.0. |
| `aperturePercent` | number | yes | Measuring aperture as a percentage of the measured X dimension, the 2024 edition's convention. |
| `wavelengthNm` | integer | yes | Peak illumination wavelength in nanometres. |

## JSON Schema

```json
{
  "type": "object",
  "description": "An ISO/IEC 15415:2024 print-quality grade (EN 18220 §5.6.2): the grade \"includes a grade level, measuring aperture and the wavelength of light used for the measurement\", so all three are required. The clause's typical minimum is `1,5/80 %/660`.",
  "required": [
    "method",
    "grade",
    "aperturePercent",
    "wavelengthNm"
  ],
  "additionalProperties": false,
  "properties": {
    "method": {
      "type": "string",
      "enum": [
        "ISO_IEC_15415"
      ]
    },
    "grade": {
      "type": "number",
      "minimum": 0,
      "maximum": 4,
      "multipleOf": 0.1,
      "description": "Overall symbol quality grade, 0.0–4.0."
    },
    "aperturePercent": {
      "type": "number",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "description": "Measuring aperture as a percentage of the measured X dimension, the 2024 edition's convention."
    },
    "wavelengthNm": {
      "type": "integer",
      "minimum": 300,
      "maximum": 1100,
      "description": "Peak illumination wavelength in nanometres."
    }
  }
}
```

## Used by

- schema [CarrierDeclaration](/schemas/CarrierDeclaration.md)
