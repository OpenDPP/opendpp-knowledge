---
type: API Endpoint
title: Run heuristic UFLPA/EUDR compliance screening over an event's lineage
description: Run heuristic UFLPA/EUDR compliance screening over an event's lineage
resource: https://opendpp-node.eu/api/v1/events/{id}/audit
tags:
  - POST
  - traceability-audit
timestamp: 2026-06-18T00:00:00Z
---

`POST /api/v1/events/{id}/audit`

**Domain:** [Traceability & Audit](/tags/traceability-audit.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Walks the same upstream lineage DAG as `GET /api/v1/events/{id}/lineage` and screens every node's location data against two heuristic rules:

- **UFLPA** — flags any node whose `bizLocation` starts with `CN-65` (ISO 3166-2 Xinjiang), contains the keyword `XINJIANG` (case-insensitive), or whose `readPoint` contains the coordinate pair `43.8256,87.6168`.
- **EUDR** — flags any node whose `readPoint` parses as `geo:<lat>,<lng>` (or bare `<lat>,<lng>`) coordinates inside the sample deforestation polygon lat −5.0…−3.0, lng −65.0…−60.0.

These are geographic screening heuristics evaluated against the data registered on this node — not a legal compliance determination.

**Permission:** `passport:read` (a read permission despite the POST verb — no subscription gating). Cookie-session clients must send the `X-CSRF-Token` header; Bearer clients are exempt. Tenant scoping and the `SUPER_ADMIN` bypass are identical to the lineage endpoint. **No request body is read** — send an empty body (an empty or absent JSON body is accepted).

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

When zero violations are found, the response embeds a `TraceabilityComplianceCertificate` object (status `VERIFIED_COMPLIANT`, standards `EUDR-2026` / `UFLPA-2026`); otherwise `certificate` is `null` and `errors` lists each violation as a human-readable string. ANY failure — unknown event id, other-tenant id, or even a circular lineage graph — is reported as the same generic 404 body.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | EPCIS event id — the server-generated UUID returned as eventId by POST /api/v1/events. |

## Responses

- **200** — Audit completed (compliant or not — violations are reported in-band, not as HTTP errors). → [TraceComplianceAuditResponse](/schemas/TraceComplianceAuditResponse.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The audit could not be completed: unknown event id, an event belonging to another tenant, or a circular lineage graph. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X POST 'https://opendpp-node.eu/api/v1/events/{id}/audit'
```

## See also

Schemas: [Error](/schemas/Error.md), [TraceComplianceAuditResponse](/schemas/TraceComplianceAuditResponse.md).
