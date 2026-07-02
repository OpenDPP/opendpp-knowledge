---
type: Reference
title: QR Codes
description: Export GS1-Digital-Link QR codes (PNG/SVG, 128–2048 px, GS1 quiet zone) for passports and battery units.
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - qr-codes
timestamp: 2026-07-02T00:00:00Z
---

Export GS1-Digital-Link QR codes (PNG/SVG, 128–2048 px, GS1 quiet zone) for passports and battery units.

## Operations

- [getPassportQrCode](/operations/getPassportQrCode.md) — `GET /api/v1/passports/{id}/qr` — Export a print-grade GS1 Digital Link QR code for a passport
- [bulkExportPassportLabels](/operations/bulkExportPassportLabels.md) — `POST /api/v1/passports/labels` — Bulk-export print-grade QR labels for many passports as a ZIP
- [getBatteryUnitQrCode](/operations/getBatteryUnitQrCode.md) — `GET /api/v1/units/{id}/qr` — Export a print-grade QR code for an individual battery unit
