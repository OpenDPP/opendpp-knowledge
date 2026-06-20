---
type: API Endpoint
title: Retrieve the upstream pedigree of an event as a recursive lineage DAG
description: Retrieve the upstream pedigree of an event as a recursive lineage DAG
resource: https://opendpp-node.eu/api/v1/events/{id}/lineage
tags:
  - GET
  - traceability-audit
timestamp: 2026-06-20T00:00:00Z
---

`GET /api/v1/events/{id}/lineage`

**Domain:** [Traceability & Audit](/tags/traceability-audit.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Returns the full upstream pedigree of a traceability event as a recursive Directed Acyclic Graph: the root event plus, in `parents`, every event linked upstream through lineage relations registered on the node, walked transitively (parents of parents). A shared ancestor reached through multiple downstream paths is repeated under EACH path — the DAG is expanded into a tree in the response, not deduplicated; only a true cycle aborts the walk (400).

**Permission:** `passport:read`. Every node in the walk — the root AND each upstream parent — is scoped to the caller's tenant; an event belonging to another tenant is invisible and the request fails with 404 (no cross-tenant pedigree reads). Sessions with the `SUPER_ADMIN` role are exempt from tenant scoping.

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

**Caveats:** if the lineage graph contains a circular reference the walk aborts with 400. Any other failure (unknown id, other-tenant id, missing parent) is reported as the same deliberately generic 404 body. `eventTime` is serialized as ISO 8601 UTC; `epcs` is parsed from the stored EPC list (a non-array value degrades to `[]`); `location` mirrors the stored `bizLocation`.

## Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| `id` | path | yes | string | EPCIS event id — the server-generated UUID returned as eventId by POST /api/v1/events. |

## Responses

- **200** — The lineage DAG rooted at the requested event. → [TraceLineageResponse](/schemas/TraceLineageResponse.md)
- **400** — Circular reference detected while walking the lineage graph. → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **404** — The event does not exist, belongs to another tenant, or an upstream node could not be retrieved. → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/events/{id}/lineage'
```

## See also

Schemas: [Error](/schemas/Error.md), [TraceLineageResponse](/schemas/TraceLineageResponse.md).
