---
type: API Endpoint
title: Publicly verify a passport's eIDAS seal, certificate chain and timestamp
description: Publicly verify a passport's eIDAS seal, certificate chain and timestamp
resource: https://opendpp-node.eu/api/v1/audit/verify
tags:
  - POST
  - traceability-audit
timestamp: 2026-06-18T00:00:00Z
---

`POST /api/v1/audit/verify`

**Domain:** [Traceability & Audit](/tags/traceability-audit.md)  
**Authentication:** **Public** — no authentication required.

**Public seal-verification API** — cryptographically verifies that a Digital Product Passport document was sealed by an economic-operator tenant registered on this node and has not been tampered with. No authentication required.

**Rate limit:** custom in-memory token bucket, **30 requests/min per IP** (per app instance). This bucket emits no rate-limit headers of its own — any `x-ratelimit-*` headers on responses (including this 429) come from the global 100 req/min limiter and describe that budget, not the 30/min one. The 429 body is the two-field `{"error": "Too Many Requests", "message": "Rate limit exceeded."}`.

**Input resolution.** `payload` is required. `signature` and `publicKey` may be supplied top-level, or are extracted from the document's embedded proof block: `signature` ← `payload.proof.proofValue` (else `payload.proof.signatureValue`); `publicKey` ← `payload.proof.publicKeyPem`, else the leaf certificate's SPKI when `payload.proof.x5c` is present. If, after extraction, any of the three is still missing → 400. The public key is CRLF-normalized and trimmed before matching.

**Verification pipeline (in order):**
1. **Certificate-chain report (optional).** If `payload.proof.x5c` is a non-empty array of base64-DER certificates (leaf first), the chain is parsed and a `certificate` report is built: the leaf's `subject` / `issuer` / `validFrom` / `validTo` (X.509 textual dates such as `Jan 10 00:00:00 2026 GMT` — NOT ISO 8601), `chainValid` (every link signature-verifies against the next certificate, every certificate is inside its validity window, and the top of the chain is anchored to this node's seal CA — SHA-256 fingerprint match or signature under the CA key; the CA is published at `GET /.well-known/opendpp-seal-ca.pem`), and `keyMatchesProof` (the leaf SPKI equals the supplied `publicKey`, whitespace-insensitive; always `true` when no explicit key was supplied). An unparseable chain yields `{"chainValid": false, "error": "Unparseable x5c certificate chain"}` and does NOT fail the request. This reports the CERTIFIED identity of the seal creator (eIDAS Art. 36(1)(b)). The report is attached only to the final verification outcome (step 4) — the two policy-failure responses below omit it.
2. **Key-registration gate.** The `publicKey` must exactly match the registered eIDAS public key of a tenant on this node (trailing-newline tolerant) — otherwise HTTP **200** with `verified: false` and an explanatory `message`. Verification-policy failures are reported in-band, never as HTTP errors.
3. **Operator-binding gate (fail-closed).** If the payload declares an operator registration id (`payload.operator.regId`, else `payload.economicOperator.regId`), that id MUST resolve to an Economic Operator registered on this node AND that operator MUST be bound to the signing tenant (a workspace–operator binding registered on this node). A declared operator that is unregistered, or registered but not bound to the key-owning tenant, → 200 `verified: false` with an explanatory `message`. Payloads that declare no operator id skip this gate.
4. **Signature verification (two phases).** *Phase 1 — Merkle seal:* when `payload.metadata` is an object (or, when the `metadata` key is entirely absent, the whole `payload` is treated as the metadata), the SHA-256 Merkle tree over the metadata's top-level properties is rebuilt and the base64 ECDSA (P-256 / SHA-256) `signature` is verified against the recomputed root. Every leaf is recomputed from the actual values — caller-supplied redacted-leaf hashes are NOT accepted (they would let a tampered field be smuggled past verification), so a publicly redacted document will not pass the Merkle phase: verify the unredacted, privileged document. *Phase 2 — fallback:* if the Merkle phase does not verify, the signature is verified over the deterministic key-sorted canonicalization of the entire `payload`.
5. **RFC 3161 timestamp report (optional).** When `payload.proof.rfc3161.token` is a non-empty base64-DER TimeStampToken, the response includes `timestamp` with the TSA-asserted `genTime` parsed from the token's TSTInfo (or `genTime: null` plus a `note` when the token cannot be parsed). This reports presence + asserted time only — full cryptographic TSR validation is the verifier's own step (e.g. `openssl ts -verify` against the TSA certificate). Like `certificate`, it appears only on the final verification outcome.

**Outcome.** A processed verification ALWAYS returns HTTP 200 with `verified: true|false`; 400 is reserved for missing parameters or an exception thrown while verifying (e.g. an undecodable public key). `certificate` and `timestamp` are attached only when verification proceeds past the key-registration and operator-binding gates — the two policy `verified: false` responses contain only `{success, verified, message}`, even when an x5c chain and/or an RFC 3161 token were supplied. The 400 bodies on this public endpoint are `{"success": false, "message": "..."}` — they include `success` but OMIT the `error` field. (A syntactically malformed JSON body is rejected earlier by the framework with its default `{statusCode, error, message}` body; a POST with no body at all — no `Content-Type` — fails before processing with a framework-default 500, so send at least `{}`. An empty `application/json` body is treated as `{}` and yields the documented 400.)

## Request body

Schema (required): [SealVerifyRequest](/schemas/SealVerifyRequest.md).

```json
{
  "payload": {
    "passportId": "9b2fa884-5b1d-4c0e-9a3f-2d7c8e1f6a45",
    "productId": "09501101530003",
    "operator": {
      "name": "OpenDPP Demo Eco Industries",
      "regId": "EU-DEFAULT-001"
    },
    "metadata": {
      "category": "textiles",
      "originCountry": "PT",
      "materialComposition": [
        {
          "material": "Organic Cotton",
          "percentage": 80
        },
        {
          "material": "Recycled Polyester",
          "percentage": 20
        }
      ]
    },
    "proof": {
      "type": "DataIntegrityProof",
      "proofValue": "MEQCIB3pZ8sVxampleMerkleRootSealSignatureFirstIntegerAiAW6kQexampleSecondDerIntegerValue0123456789abcd==",
      "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEexampleDemoTenantSealPublicKey\n0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNO=\n-----END PUBLIC KEY-----",
      "x5c": [
        "MIIB2zCCAYGgAwIBAgIUExampleLeafSealCertificateBase64Der",
        "MIIB4TCCAYagAwIBAgIUExampleNodeSealCaCertificateBase64Der"
      ],
      "rfc3161": {
        "token": "MIIKlAYJKoZIhvcNAQcCoIIKhTCCCoECAQMxDzANBglghkgBZQMEAgEFADCBExampleTimeStampTokenDer"
      }
    }
  }
}
```

## Responses

- **200** — Verification processed. → [SealVerifyResponse](/schemas/SealVerifyResponse.md)
- **400** — Missing cryptographic parameters (after proof-block extraction), or an exception during verification (e.g.
- **429** — Public-resolution rate limit exceeded (30 requests/min per IP; no rate-limit headers). → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/audit/verify' \
  --data '{"payload":{"passportId":"9b2fa884-5b1d-4c0e-9a3f-2d7c8e1f6a45","productId":"09501101530003","operator":{"name":"OpenDPP Demo Eco Industries","regId":"EU-DEFAULT-001"},"metadata":{"category":"textiles","originCountry":"PT","materialComposition":[{"material":"Organic Cotton","percentage":80},{"material":"Recycled Polyester","percentage":20}]},"proof":{"type":"DataIntegrityProof","proofValue":"MEQCIB3pZ8sVxampleMerkleRootSealSignatureFirstIntegerAiAW6kQexampleSecondDerIntegerValue0123456789abcd==","publicKeyPem":"-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEexampleDemoTenantSe…'
```

## See also

Schemas: [SealVerifyRequest](/schemas/SealVerifyRequest.md), [SealVerifyResponse](/schemas/SealVerifyResponse.md).
