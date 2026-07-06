---
type: API Endpoint
title: Capture a native GS1 EPCIS 2.0 document (JSON/JSON-LD)
description: Capture a native GS1 EPCIS 2.0 document (JSON/JSON-LD)
resource: https://opendpp-node.eu/api/v1/events/epcis
tags:
  - POST
  - traceability-audit
timestamp: 2026-07-04T00:00:00Z
---

`POST /api/v1/events/epcis`

**Domain:** [Traceability & Audit](/tags/traceability-audit.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Captures a native **GS1 EPCIS 2.0 document** — the standard's own JSON/JSON-LD interchange format — and persists each supported event as an EPCIS event row scoped to your tenant, alongside the VC-shaped `POST /api/v1/events` path. Send the document exactly as your EPCIS infrastructure produces it.

**Permission:** `passport:update` (write operation — subscription gating applies, see 402). When the node operator enforces MFA, writes from user-backed sessions (cookie or Bearer JWT) whose MFA policy requires a second factor (user policy `REQUIRED`, or `DEFAULT` with the workspace's MFA-by-default setting, which is on by default) receive 403 without one; API-key clients are exempt. Cookie-session clients must send the `X-CSRF-Token` header (double-submit with the `opendpp_csrf` cookie); Bearer JWT / API-key clients are exempt.

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

**Validation:** the WHOLE document is validated against the official GS1 EPCIS **2.0.1** JSON Schema (vendored and pinned on the node) before any event is stored — a non-conformant document is rejected 400 with the first few schema violations under `errors[]`. Notable rules the OFFICIAL schema enforces: `@context` and `creationDate` are required; `bizStep`/`disposition` must use the CBV **short names** (e.g. `commissioning`, `in_transit`) or a custom (non-CBV) URI — the legacy `urn:epcglobal:cbv:*` URN form is REJECTED by the standard's schema; `action` is forbidden on `TransformationEvent`; `readPoint`/`bizLocation` carry `{id: <uri>}`. Only `type: "EPCISDocument"` is accepted (no `EPCISQueryDocument`, no bare events), and `epcisBody.eventList` must be non-empty.

**Per-event capture (partial success):** events are processed independently and the 201 response reports `results[]` (captured) and `errors[]` (rejected) by `index`. An event is rejected — never silently dropped — when its type is outside this node's traceability model (`ObjectEvent`, `AggregationEvent`, `TransformationEvent`, `AssociationEvent` are supported; `TransactionEvent` is not) or when it identifies stock ONLY by quantity lists (no `epcList`/`parentID`/`childEPCs`/`inputEPCList`/`outputEPCList` — nothing EPC-identified would remain to trace). If EVERY event is rejected the response is 400 `No Events Captured` with the same `errors[]`.

**Fidelity disclosure:** recognized EPCIS fields the node does not persist (`eventID`, quantity lists, `sensorElementList`, `bizTransactionList`, `sourceList`/`destinationList`, `persistentDisposition`, `errorDeclaration`, `ilmd`, custom extension fields, …) are listed per event under `results[].ignoredFields` instead of being silently discarded.

**Persistence:** row ids are ALWAYS server-generated (UUID) — a client-supplied `eventID` is never adopted as the primary key (it is disclosed under `ignoredFields`); CBV short names are normalized to the node's stored URN form (`urn:epcglobal:cbv:bizstep:*` / `urn:epcglobal:cbv:disp:*`, the same form the VC-shaped path stores and the lineage projection reads); defaults when absent: `bizStep` → `receiving`, `disposition` → `in_progress`. Rows captured on this path carry **no per-event credential** and are stored with `isUntpCompliant: false` (API-key provenance only) — they are never presented as UNTP-verified. This endpoint does not create lineage edges between events.

## Request body

Schema (required): [EpcisDocument](/schemas/EpcisDocument.md).

```json
{
  "@context": [
    "https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld"
  ],
  "type": "EPCISDocument",
  "schemaVersion": "2.0",
  "creationDate": "2026-07-02T10:00:00.000Z",
  "epcisBody": {
    "eventList": [
      {
        "type": "ObjectEvent",
        "action": "ADD",
        "bizStep": "commissioning",
        "disposition": "active",
        "eventTime": "2026-01-15T08:00:00.000Z",
        "eventTimeZoneOffset": "+00:00",
        "epcList": [
          "urn:epc:id:sgtin:0950110.154904.1"
        ],
        "readPoint": {
          "id": "geo:41.1579,-8.6291"
        },
        "bizLocation": {
          "id": "urn:opendpp:location:PT-SAMPLE-SITE-3"
        }
      },
      {
        "type": "TransformationEvent",
        "bizStep": "commissioning",
        "disposition": "in_progress",
        "eventTime": "2026-01-16T08:00:00.000Z",
        "eventTimeZoneOffset": "+00:00",
        "inputEPCList": [
          "urn:epc:id:sgtin:0950110.154904.1"
        ],
        "outputEPCList": [
          "urn:epc:id:sgtin:0950110.154100.1"
        ],
        "readPoint": {
          "id": "geo:41.1579,-8.6291"
        }
      }
    ]
  }
}
```

## Responses

- **201** — At least one event captured. → [EpcisCaptureResponse](/schemas/EpcisCaptureResponse.md)
- **400** — Always {success: false, error, message} (plus errors[] detail where noted) with one of: EPCIS Schema Validation Failed (the document does not conform to the of… → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/events/epcis' \
  --data '{"@context":["https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld"],"type":"EPCISDocument","schemaVersion":"2.0","creationDate":"2026-07-02T10:00:00.000Z","epcisBody":{"eventList":[{"type":"ObjectEvent","action":"ADD","bizStep":"commissioning","disposition":"active","eventTime":"2026-01-15T08:00:00.000Z","eventTimeZoneOffset":"+00:00","epcList":["urn:epc:id:sgtin:0950110.154904.1"],"readPoint":{"id":"geo:41.1579,-8.6291"},"bizLocation":{"id":"urn:opendpp:location:PT-SAMPLE-SITE-3"}},{"type":"TransformationEvent","bizStep":"commissioning","disposition":"in_progress","eventTime":"2026…'
```

## See also

Schemas: [EpcisCaptureResponse](/schemas/EpcisCaptureResponse.md), [EpcisDocument](/schemas/EpcisDocument.md), [Error](/schemas/Error.md).
