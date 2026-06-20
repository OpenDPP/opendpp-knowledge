---
type: Reference
title: Facilities
description: Manufacturing facility master data, identified by GS1 GLN-13 (the Unique Facility Identifier).
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - facilities
timestamp: 2026-06-20T00:00:00Z
---

Manufacturing facility master data, identified by GS1 GLN-13 (the Unique Facility Identifier). GLN, name, activity and country are public in passport documents; street addresses are never published.

## Operations

- [listFacilities](/operations/listFacilities.md) — `GET /api/v1/facilities` — List facilities in the tenant workspace
- [createFacility](/operations/createFacility.md) — `POST /api/v1/facilities` — Register a facility (GS1 GLN)
- [getFacility](/operations/getFacility.md) — `GET /api/v1/facilities/{id}` — Get a single facility
- [updateFacility](/operations/updateFacility.md) — `PUT /api/v1/facilities/{id}` — Update facility master data (GLN is immutable)
- [deleteFacility](/operations/deleteFacility.md) — `DELETE /api/v1/facilities/{id}` — Delete a facility (passports are unlinked, never deleted)
