---
type: Schema
title: AasEnvironmentInput
description: An Asset Administration Shell (AAS) JSON Environment — the format produced by OpenDPP's AAS export of a passport.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/AasEnvironmentInput
tags:
  - schema
timestamp: 2026-06-19T00:00:00Z
---

An Asset Administration Shell (AAS) JSON Environment — the format produced by OpenDPP's AAS export of a passport. MUST contain a submodel with `idShort: "ComplianceMetadata"` whose `submodelElements` (AAS `Property` elements and `SubmodelElementCollection`s) are parsed back into the passport metadata object; absence fails 400 `Ingestion Failed`. MAY contain an `eidasVerificationSeal` submodel (elements `digitalSealHash`, `cryptographicSignature`, `pemPublicKey`) — when present, the seal is verified against the tenant's SERVER-HELD eIDAS public key (the embedded `pemPublicKey` is never trusted as the verification key). Body limit 256 KiB.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `assetAdministrationShells` | array<object> | no | AAS shells. |
| `submodels` | array<object> | yes | Must include the ComplianceMetadata submodel; may include eidasVerificationSeal. |
| `conceptDescriptions` | array<object> | no | — |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "submodels"
  ],
  "description": "An Asset Administration Shell (AAS) JSON Environment — the format produced by OpenDPP's AAS export of a passport. MUST contain a submodel with `idShort: \"ComplianceMetadata\"` whose `submodelElements` (AAS `Property` elements and `SubmodelElementCollection`s) are parsed back into the passport metadata object; absence fails 400 `Ingestion Failed`. MAY contain an `eidasVerificationSeal` submodel (elements `digitalSealHash`, `cryptographicSignature`, `pemPublicKey`) — when present, the seal is verified against the tenant's SERVER-HELD eIDAS public key (the embedded `pemPublicKey` is never trusted as the verification key). Body limit 256 KiB.",
  "properties": {
    "assetAdministrationShells": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": true
      },
      "description": "AAS shells. The first shell's `assetInformation.specificAssetIds` entry with `name: \"productId\"` is the last-resort productId source (after `metadata.gtin`/`metadata.grai`/`metadata.productId`)."
    },
    "submodels": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": true
      },
      "description": "Must include the `ComplianceMetadata` submodel; may include `eidasVerificationSeal`."
    },
    "conceptDescriptions": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": true
      }
    }
  },
  "additionalProperties": true
}
```

## Used by

- [ingestPassportFromAas](/operations/ingestPassportFromAas.md) (`POST /api/v1/passports/aas/ingest`)
