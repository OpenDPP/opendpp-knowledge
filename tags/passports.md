---
type: Reference
title: Passports
description: Create, validate, read, update, seal and manage the lifecycle of Digital Product Passports.
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - passports
timestamp: 2026-06-22T00:00:00Z
---

Create, validate, read, update, seal and manage the lifecycle of Digital Product Passports. Passport metadata is category-specific: machine-readable JSON Schemas are served live at `GET /api/v1/schemas/{category}` for textiles, batteries, electronics, chemicals and construction; the remaining categories (cosmetics, toys, iron-steel, aluminium) are validated by built-in rules — use the dry-run validators to check payloads for any category.

## Operations

- [listPassports](/operations/listPassports.md) — `GET /api/v1/passports` — List passports in your workspace (paginated JSON-LD)
- [createPassport](/operations/createPassport.md) — `POST /api/v1/passports` — Create (ingest) a Digital Product Passport
- [validatePassport](/operations/validatePassport.md) — `POST /api/v1/passports/validate-only` — Dry-run ESPR validation of passport metadata (nothing is stored)
- [validatePassportPublic](/operations/validatePassportPublic.md) — `POST /api/v1/passports/validate-only-public` — Public dry-run ESPR metadata validation (strictly rate-limited)
- [bulkIngestPassports](/operations/bulkIngestPassports.md) — `POST /api/v1/passports/bulk` — Bulk-ingest up to 200 passports with per-row error reporting
- [ingestPassportFromAas](/operations/ingestPassportFromAas.md) — `POST /api/v1/passports/aas/ingest` — Ingest a passport from an AAS JSON Environment (seal-verified)
- [getPassport](/operations/getPassport.md) — `GET /api/v1/passports/{id}` — Fetch a single passport (content-negotiated JSON-LD / AAS / HTML)
- [updatePassport](/operations/updatePassport.md) — `PUT /api/v1/passports/{id}` — Update passport metadata (versioned to history)
- [deleteDraftPassport](/operations/deleteDraftPassport.md) — `DELETE /api/v1/passports/{id}` — Permanently delete a DRAFT passport
- [sealPassport](/operations/sealPassport.md) — `POST /api/v1/passports/{id}/seal` — Apply the tenant's eIDAS advanced electronic seal
- [updatePassportStatus](/operations/updatePassportStatus.md) — `PUT /api/v1/passports/{id}/status` — Transition passport lifecycle status (recall / decommission / reactivate)
