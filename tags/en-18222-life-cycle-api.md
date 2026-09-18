---
type: Reference
title: EN 18222 Life Cycle API
description: The CEN EN 18222:2026 Life Cycle API, served at the paths clause 8 specifies.
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - en-18222-life-cycle-api
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

The CEN EN 18222:2026 Life Cycle API, served at the paths clause 8 specifies. These are the same passports as the `Passports` endpoints above, reached through the standard's own binding and under its own method names — a client written against EN 18222 works here unchanged. The `v1` prefix is the standard's version segment (clause 8.1), not this document's contract major. Failures answer with the clause 7.2 Result object rather than this document's usual error shape.

## Operations

- [readDPPById](/operations/readDPPById.md) — `GET /v1/dpps/{dppId}` — ReadDPPById — return the DPP with the specified DPP ID
- [updateDPPById](/operations/updateDPPById.md) — `PATCH /v1/dpps/{dppId}` — UpdateDPPById — partial update of a DPP with a specified DPP ID
- [deleteDPPById](/operations/deleteDPPById.md) — `DELETE /v1/dpps/{dppId}` — DeleteDPPById — remove the DPP with the specified DPP ID
- [readDPPByProductId](/operations/readDPPByProductId.md) — `GET /v1/dppsByProductId/{productId}` — ReadDPPByProductId — return the current active DPP for a product identifier
- [readDPPVersionByIdAndDate](/operations/readDPPVersionByIdAndDate.md) — `GET /v1/dppsByIdAndDate/{dppId}` — ReadDPPVersionByIdAndDate — return the DPP version current at a given date
- [readDPPIdsByProductIds](/operations/readDPPIdsByProductIds.md) — `POST /v1/dppsByProductIds` — ReadDPPIdsByProductIds — return the DPP identifiers matching a set of product identifiers
- [createDPP](/operations/createDPP.md) — `POST /v1/dpps` — CreateDPP — create a new DPP and return its identifier
- [readDataElement](/operations/readDataElement.md) — `GET /v1/dpps/{dppId}/elements/{elementIdPath}` — ReadDataElement — return one data element by its absolute path
- [updateDataElement](/operations/updateDataElement.md) — `PATCH /v1/dpps/{dppId}/elements/{elementIdPath}` — UpdateDataElement — update, amend or remove one data element
