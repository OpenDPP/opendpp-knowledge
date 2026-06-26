---
type: Reference
title: Traceability & Audit
description: UNTP/EPCIS supply-chain traceability events, lineage queries, and the public seal verifier.
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - traceability-audit
timestamp: 2026-06-26T00:00:00Z
---

UNTP/EPCIS supply-chain traceability events, lineage queries, and the public seal verifier. The verifier checks the cryptographic seal AND that the signing workspace is bound to the economic operator declared in the payload.

## Operations

- [registerTraceabilityEvent](/operations/registerTraceabilityEvent.md) — `POST /api/v1/events` — Register a UNTP/EPCIS 2.0 traceability event (VC-shaped)
- [getEventLineage](/operations/getEventLineage.md) — `GET /api/v1/events/{id}/lineage` — Retrieve the upstream pedigree of an event as a recursive lineage DAG
- [auditEventLineage](/operations/auditEventLineage.md) — `POST /api/v1/events/{id}/audit` — Run heuristic UFLPA/EUDR compliance screening over an event's lineage
- [verifyPassportSeal](/operations/verifyPassportSeal.md) — `POST /api/v1/audit/verify` — Publicly verify a passport's eIDAS seal, certificate chain and timestamp
