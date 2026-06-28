---
type: Schema
title: AasEnvironment
description: An Asset Administration Shell (AAS) v3.0 environment export of the passport, served as application/aas+json.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/AasEnvironment
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
---

An Asset Administration Shell (AAS) v3.0 environment export of the passport, served as `application/aas+json`. Three top-level keys: `assetAdministrationShells` (asset identity — `urn:opendpp:aas:{passportId}` / `urn:opendpp:asset:{operatorId}:{productId}`, GS1 GLN-qualified specific asset ids), `submodels`, and `conceptDescriptions` (semantic concept records from the admin-curated registry, `urn:opendpp:concept:…`; empty array when the registry is empty). Submodels: a `GeneralProductInformation` submodel (`urn:opendpp:submodel:general:{passportId}`), a `ComplianceMetadata` submodel (`urn:opendpp:submodel:compliance`) mapping the passport metadata through the concept registry, an IDTA Digital Nameplate submodel (idShort `Nameplate`) whenever manufacturer/product identity is available — carrying `ManufacturerName` / `ManufacturerProductDesignation` for EU-index (CIRPASS-2) discoverability — one or more additive per-category submodel views (ESPR-category views such as CarbonFootprint / TechnicalData, id prefix `urn:opendpp:submodel:category:`), and — whenever the issuing tenant's eIDAS signing key is provisioned (the normal case) — an `eidasVerificationSeal` submodel (`urn:opendpp:submodel:security-seal:{passportId}`) carrying `digitalSealHash`, `cryptographicSignature`, `pemPublicKey` and an optional `x509CertificateChain`. The seal submodel is present for EVERY access tier. Role filtering strips restricted and commercial owner-only elements from the `ComplianceMetadata` submodel before sending: owner credentials are filtered by their API-key role, grant holders by the `legitimate_interest` tier, anonymous callers by the `public` tier. Submodel internals are intentionally not enumerated in this specification.

## JSON Schema

```json
{
  "type": "object",
  "description": "An Asset Administration Shell (AAS) v3.0 environment export of the passport, served as `application/aas+json`. Three top-level keys: `assetAdministrationShells` (asset identity — `urn:opendpp:aas:{passportId}` / `urn:opendpp:asset:{operatorId}:{productId}`, GS1 GLN-qualified specific asset ids), `submodels`, and `conceptDescriptions` (semantic concept records from the admin-curated registry, `urn:opendpp:concept:…`; empty array when the registry is empty). Submodels: a `GeneralProductInformation` submodel (`urn:opendpp:submodel:general:{passportId}`), a `ComplianceMetadata` submodel (`urn:opendpp:submodel:compliance`) mapping the passport metadata through the concept registry, an IDTA Digital Nameplate submodel (idShort `Nameplate`) whenever manufacturer/product identity is available — carrying `ManufacturerName` / `ManufacturerProductDesignation` for EU-index (CIRPASS-2) discoverability — one or more additive per-category submodel views (ESPR-category views such as CarbonFootprint / TechnicalData, id prefix `urn:opendpp:submodel:category:`), and — whenever the issuing tenant's eIDAS signing key is provisioned (the normal case) — an `eidasVerificationSeal` submodel (`urn:opendpp:submodel:security-seal:{passportId}`) carrying `digitalSealHash`, `cryptographicSignature`, `pemPublicKey` and an optional `x509CertificateChain`. The seal submodel is present for EVERY access tier. Role filtering strips restricted and commercial owner-only elements from the `ComplianceMetadata` submodel before sending: owner credentials are filtered by their API-key role, grant holders by the `legitimate_interest` tier, anonymous callers by the `public` tier. Submodel internals are intentionally not enumerated in this specification.",
  "additionalProperties": true
}
```

## Used by

- [resolvePublicPassport](/operations/resolvePublicPassport.md) (`GET /passport/{id}`)
- [resolveGs1Gtin](/operations/resolveGs1Gtin.md) (`GET /01/{gtin14}`)
- [resolveGs1Grai](/operations/resolveGs1Grai.md) (`GET /8003/{grai}`)
