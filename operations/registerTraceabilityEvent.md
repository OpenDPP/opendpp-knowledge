---
type: API Endpoint
title: Register a UNTP/EPCIS 2.0 traceability event (VC-shaped)
description: Register a UNTP/EPCIS 2.0 traceability event (VC-shaped)
resource: https://opendpp-node.eu/api/v1/events
tags:
  - POST
  - traceability-audit
timestamp: 2026-06-18T00:00:00Z
---

`POST /api/v1/events`

**Domain:** [Traceability & Audit](/tags/traceability-audit.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Registers a supply-chain traceability event carried as a VC-shaped UNTP credential and persists it as an EPCIS 2.0 event row scoped to your tenant.

**Permission:** `passport:update` (write operation — subscription gating applies, see 402). When the node operator enforces MFA, writes from user-backed sessions (cookie or Bearer JWT) whose MFA policy requires a second factor (user policy `REQUIRED`, or `DEFAULT` with the workspace's MFA-by-default setting, which is on by default) receive 403 without one; API-key clients are exempt. Cookie-session clients must send the `X-CSRF-Token` header (double-submit with the `opendpp_csrf` cookie); Bearer JWT / API-key clients are exempt.

**Rate limit:** global limiter, 100 requests/min per IP (standard `x-ratelimit-*` headers).

**Validation pipeline (in order):**
1. *Structural* — the body must be an object containing `credentialSubject`, otherwise 400 `Bad Request`.
2. *EPCIS rule* — `action` is strictly forbidden on `TransformationEvent` (any non-null value → 400 `Schema Validation Error`).
3. *Cryptographic* — the ECDSA (P-256 / SHA-256) signature in `proof.proofValue` (base64) is verified over the deterministically canonicalized credential (key-sorted JSON with `proof.proofValue` blanked — OpenDPP's own canonicalization scheme, NOT RFC 8785 JCS, so this is not a conformant W3C Data Integrity suite). The verification key is resolved in trust order: (a) an embedded `proof.verificationMethod.x5c` chain, accepted ONLY when the node has eIDAS trust anchors configured, the chain validates against them, every certificate is currently valid, and the leaf attests the issuer; (b) the registered eIDAS public key of the tenant whose subdomain or company name EXACTLY equals the trailing `:`-segment of the issuer DID. If no key resolves or the signature does not verify → 400 `Cryptographic Verification Failed`.
4. *Operator scoping* — if your API key is scoped to an Economic Operator, the credential's declared operator DID — the `issuer` DID, or `credentialSubject.responsibleOperatorDid` only when `issuer` is absent — must contain the bound operator's registration id (e.g. `EU-DEFAULT-001`), otherwise 403 with `message: "Your access is restricted to Economic Operator: <operatorId> (<regId>)"`.

**Persistence:** the stored event id is ALWAYS server-generated (UUID) — the credential's own `id` is never used as the primary key (prevents cross-tenant id squatting); the issuer DID is retained as `issuerDid`. Defaults applied on write: `bizStep` → `urn:epcglobal:cbv:bizstep:receiving`; `disposition` → `urn:epcglobal:cbv:disp:in_progress`; `readPoint` → `geo:<latitude>,<longitude>` derived from `credentialSubject.originLocation` when present; `bizLocation` → `responsibleOperatorDid`; `eventTime` → `issuanceDate`, else the server clock; `epcList` → `[credentialSubject.id]` when not supplied as an array (or `[]`). The row is stored with `isUntpCompliant: true` and the `proof.proofValue` retained.

**Caveats:** `credentialSubject.eventType` must be one of the documented event-type values and `action` (when present) one of `ADD`/`OBSERVE`/`DELETE` — both map to server-side enums, and a missing or unknown value is only rejected at the persistence layer and surfaces as the 500 `Database Persistence Failed` body, not as a 400. Note the 201 envelope is `{status: "success", ...}`, NOT the usual `{success: true, ...}` shape. This endpoint does not create lineage edges between events; the lineage DAG read by `GET /api/v1/events/{id}/lineage` is built from lineage relations maintained separately on the node.

## Request body

Schema (required): [UntpEventCredential](/schemas/UntpEventCredential.md).

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://vocabulary.uncefact.org/untp/dpp/"
  ],
  "id": "urn:uuid:0e7a2c1c-6f4e-4a08-9d2e-3b1f5a7c9d10",
  "type": [
    "VerifiableCredential",
    "DigitalTraceabilityEvent"
  ],
  "issuer": "did:web:opendpp-node.eu:EU-DEFAULT-001:demo",
  "issuanceDate": "2026-06-12T09:41:00.000Z",
  "credentialSubject": {
    "id": "urn:epc:id:sgtin:0950110153.0003.SN-2026-000123",
    "eventType": "ObjectEvent",
    "action": "OBSERVE",
    "bizStep": "urn:epcglobal:cbv:bizstep:shipping",
    "disposition": "urn:epcglobal:cbv:disp:in_transit",
    "readPoint": "geo:41.1496,-8.6109",
    "bizLocation": "urn:epc:id:sgln:0950110153000..0",
    "eventTime": "2026-06-12T08:30:00.000Z",
    "epcList": [
      "urn:epc:id:sgtin:0950110153.0003.SN-2026-000123"
    ],
    "responsibleOperatorDid": "did:web:opendpp-node.eu:EU-DEFAULT-001:demo"
  },
  "proof": {
    "type": "DataIntegrityProof",
    "created": "2026-06-12T09:41:00.000Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:web:opendpp-node.eu:EU-DEFAULT-001:demo#key-1",
    "proofValue": "MEUCIQDkx0VqFholm0Oa7lzwL9C5cqcRBYRJWcExampleEcdsaDerAiBJ4dY0YxV5n7pUq2tHj8sExampleSecondIntegerValue9w=="
  }
}
```

## Responses

- **201** — Event registered. → [TraceEventRegistered](/schemas/TraceEventRegistered.md)
- **400** — Route-specific validation failure, always {success: false, error, message} with one of three error values: Bad Request (body missing or no credentialSubject),… → [Error](/schemas/Error.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The workspace subscription is lapsed or its grace period has expired — write operations are blocked until billing is restored. → [Error](/schemas/Error.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Persistence failure — also returned when credentialSubject.eventType/action is missing or not a valid enum value (the server-side enum rejects the row). → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/events' \
  --data '{"@context":["https://www.w3.org/ns/credentials/v2","https://vocabulary.uncefact.org/untp/dpp/"],"id":"urn:uuid:0e7a2c1c-6f4e-4a08-9d2e-3b1f5a7c9d10","type":["VerifiableCredential","DigitalTraceabilityEvent"],"issuer":"did:web:opendpp-node.eu:EU-DEFAULT-001:demo","issuanceDate":"2026-06-12T09:41:00.000Z","credentialSubject":{"id":"urn:epc:id:sgtin:0950110153.0003.SN-2026-000123","eventType":"ObjectEvent","action":"OBSERVE","bizStep":"urn:epcglobal:cbv:bizstep:shipping","disposition":"urn:epcglobal:cbv:disp:in_transit","readPoint":"geo:41.1496,-8.6109","bizLocation":"urn:epc:id:sgln:09501101530…'
```

## See also

Schemas: [Error](/schemas/Error.md), [TraceEventRegistered](/schemas/TraceEventRegistered.md), [UntpEventCredential](/schemas/UntpEventCredential.md).
