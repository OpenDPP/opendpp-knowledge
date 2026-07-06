---
type: Schema
title: UntpEventCredential
description: A UNTP/EPCIS 2.0 traceability event wrapped as a VC-shaped credential.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/UntpEventCredential
tags:
  - schema
timestamp: 2026-07-04T00:00:00Z
---

A UNTP/EPCIS 2.0 traceability event wrapped as a VC-shaped credential. The only hard structural requirement is `credentialSubject`; the `proof` MUST be a conformant W3C `DataIntegrityProof` (`cryptosuite: "ecdsa-jcs-2019"`) and a missing, non-conformant, or unverifiable proof is rejected with the 400 `Cryptographic Verification Failed` body. Extra properties are permitted — the signature covers `sha256(JCS(proof options)) ‖ sha256(JCS(credential without proof))` (RFC 8785 JCS canonicalization).

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `@context` | array<string> | no | — |
| `id` | string | no | Credential id (e.g. |
| `type` | array<string> | no | — |
| `issuer` | string | no | Issuer DID. |
| `issuanceDate` | string | no | Fallback for the stored eventTime when credentialSubject.eventTime is absent. |
| `credentialSubject` | [UntpEventCredentialSubject](/schemas/UntpEventCredentialSubject.md) | yes | — |
| `proof` | [UntpEventProof](/schemas/UntpEventProof.md) | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "A UNTP/EPCIS 2.0 traceability event wrapped as a VC-shaped credential. The only hard structural requirement is `credentialSubject`; the `proof` MUST be a conformant W3C `DataIntegrityProof` (`cryptosuite: \"ecdsa-jcs-2019\"`) and a missing, non-conformant, or unverifiable proof is rejected with the 400 `Cryptographic Verification Failed` body. Extra properties are permitted — the signature covers `sha256(JCS(proof options)) ‖ sha256(JCS(credential without proof))` (RFC 8785 JCS canonicalization).",
  "required": [
    "credentialSubject",
    "proof"
  ],
  "properties": {
    "@context": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "id": {
      "type": "string",
      "description": "Credential id (e.g. `urn:uuid:...`). NOT used as the stored event id — the event primary key is always server-generated."
    },
    "type": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "issuer": {
      "type": "string",
      "description": "Issuer DID. Unless a trusted x5c chain is embedded, the verification key is resolved by EXACT match of the DID's trailing `:`-segment against registered tenant subdomains/company names — e.g. `did:web:opendpp-node.eu:demo` resolves the workspace with subdomain `demo`. For operator-scoped API keys the issuer DID must ALSO contain the bound operator's registration id somewhere in the string (the issuer is checked in preference to `credentialSubject.responsibleOperatorDid`), e.g. `did:web:opendpp-node.eu:EU-DEFAULT-001:demo`. Stored verbatim as the event's `issuerDid`."
    },
    "issuanceDate": {
      "type": "string",
      "format": "date-time",
      "description": "Fallback for the stored `eventTime` when `credentialSubject.eventTime` is absent."
    },
    "credentialSubject": {
      "$ref": "#/components/schemas/UntpEventCredentialSubject"
    },
    "proof": {
      "$ref": "#/components/schemas/UntpEventProof"
    }
  }
}
```

## Used by

- [registerTraceabilityEvent](/operations/registerTraceabilityEvent.md) (`POST /api/v1/events`)
