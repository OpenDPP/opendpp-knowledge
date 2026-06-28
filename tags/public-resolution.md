---
type: Reference
title: Public Resolution
description: "Unauthenticated, content-negotiated passport resolution: GS1 Digital Link paths, passport and unit pages."
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - public-resolution
timestamp: 2026-06-28T00:00:00Z
---

Unauthenticated, content-negotiated passport resolution: GS1 Digital Link paths, passport and unit pages. One URL serves JSON-LD (default), an AAS environment (`Accept: application/aas+json`), a signed UNTP Verifiable Credential (`Accept: application/vc+jwt` enveloping, `application/vc+ld+json` embedded `ecdsa-jcs-2019` Data Integrity, or `application/dc+sd-jwt` SD-JWT-VC selective disclosure; the first two also item-level on `/unit/:id`), or HTML (`Accept: text/html`). Tiered by optional credentials or grant tokens. Rate limit: 30 requests/min per IP.

## Operations

- [resolvePublicPassport](/operations/resolvePublicPassport.md) — `GET /passport/{id}` — Resolve a passport by UUID (JSON-LD / AAS / HTML)
- [resolveGs1Gtin](/operations/resolveGs1Gtin.md) — `GET /01/{gtin14}` — GS1 Digital Link resolution by GTIN-14 (AI 01)
- [resolveGs1GtinSerial](/operations/resolveGs1GtinSerial.md) — `GET /01/{gtin14}/21/{serial}` — GS1 Digital Link serialised-item redirect (AI 01 + AI 21)
- [resolveGs1Grai](/operations/resolveGs1Grai.md) — `GET /8003/{grai}` — GS1 Digital Link resolution by GRAI (AI 8003)
- [resolvePublicBatteryUnit](/operations/resolvePublicBatteryUnit.md) — `GET /unit/{id}` — Resolve an individual serialised battery unit
- [decodeGs1](/operations/decodeGs1.md) — `POST /api/v1/gs1/decode` — Decode GS1 scan data / element string / Digital Link into structured AIs + HRI
- [decodeGs1Batch](/operations/decodeGs1Batch.md) — `POST /api/v1/gs1/decode/batch` — Batch-decode many GS1 scans / element strings / Digital Links in one request
