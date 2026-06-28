---
type: Schema
title: PassportAasEnvironment
description: IDTA Asset Administration Shell environment (returned when Accept contains application/aas+json), role-filtered for the caller's access tier.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportAasEnvironment
tags:
  - schema
timestamp: 2026-06-28T00:00:00Z
---

IDTA Asset Administration Shell environment (returned when `Accept` contains `application/aas+json`), role-filtered for the caller's access tier. Identifiers use `urn:opendpp:*` forms: the shell id is `urn:opendpp:aas:<passportUuid>` with idShort `AAS_<productId>` and `globalAssetId` `urn:opendpp:asset:<operatorId>:<productId>` (plus `specificAssetIds` carrying the productId and, when a facility is assigned, its GLN). The environment contains, at minimum, a `GeneralProductInformation` submodel (`urn:opendpp:submodel:general:<passportUuid>`) and a `ComplianceMetadata` submodel (`urn:opendpp:submodel:compliance`); for a manufacturer/product-identified passport it also carries an IDTA Digital Nameplate submodel (idShort `Nameplate`) and one or more additive per-category submodel views (ESPR-category views such as CarbonFootprint / TechnicalData, id prefix `urn:opendpp:submodel:category:`). An `eidasVerificationSeal` submodel is appended when the tenant has signing keys configured. Loose schema — the full AAS document structure is documented with the public resolution endpoints.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `assetAdministrationShells` | array<object> | yes | — |
| `submodels` | array<object> | yes | — |
| `conceptDescriptions` | array<object> | yes | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "IDTA Asset Administration Shell environment (returned when `Accept` contains `application/aas+json`), role-filtered for the caller's access tier. Identifiers use `urn:opendpp:*` forms: the shell id is `urn:opendpp:aas:<passportUuid>` with idShort `AAS_<productId>` and `globalAssetId` `urn:opendpp:asset:<operatorId>:<productId>` (plus `specificAssetIds` carrying the productId and, when a facility is assigned, its GLN). The environment contains, at minimum, a `GeneralProductInformation` submodel (`urn:opendpp:submodel:general:<passportUuid>`) and a `ComplianceMetadata` submodel (`urn:opendpp:submodel:compliance`); for a manufacturer/product-identified passport it also carries an IDTA Digital Nameplate submodel (idShort `Nameplate`) and one or more additive per-category submodel views (ESPR-category views such as CarbonFootprint / TechnicalData, id prefix `urn:opendpp:submodel:category:`). An `eidasVerificationSeal` submodel is appended when the tenant has signing keys configured. Loose schema — the full AAS document structure is documented with the public resolution endpoints.",
  "required": [
    "assetAdministrationShells",
    "submodels",
    "conceptDescriptions"
  ],
  "properties": {
    "assetAdministrationShells": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": true
      }
    },
    "submodels": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": true
      }
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

- [getPassport](/operations/getPassport.md) (`GET /api/v1/passports/{id}`)
