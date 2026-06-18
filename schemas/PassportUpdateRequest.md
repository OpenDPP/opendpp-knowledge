---
type: Schema
title: PassportUpdateRequest
description: Body of PUT /api/v1/passports/{id}.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportUpdateRequest
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

Body of PUT /api/v1/passports/{id}. Unknown keys are ignored.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `metadata` | object | yes | Full replacement ESPR metadata object. |
| `draft` | boolean | no | true = save as draft: skips ESPR validation and forces status DRAFT (this also demotes an already-published passport back to DRAFT). |
| `changeReason` | string | no | Free-text reason recorded on the version-history snapshot. |
| `facilityId` | string,null | no | GLN-backed facility assignment. |
| `enrichment` | — | no | Presentational marketing block stored OUTSIDE the ESPR-validated metadata and the Merkle seal. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Body of PUT /api/v1/passports/{id}. Unknown keys are ignored.",
  "required": [
    "metadata"
  ],
  "additionalProperties": true,
  "properties": {
    "metadata": {
      "type": "object",
      "description": "Full replacement ESPR metadata object. `metadata.category` must be one of: textiles, batteries, electronics, cosmetics, toys, iron-steel, aluminium, chemicals, construction. Validated against the category's compliance rules unless `draft: true` (400 with `errors[]` on failure — no `warnings` on this route). A machine-readable JSON Schema is published at GET /api/v1/schemas/{category} for **textiles, batteries, electronics, chemicals and construction only** — cosmetics, toys, iron-steel and aluminium are validated by built-in rules and return 404 from that endpoint."
    },
    "draft": {
      "type": "boolean",
      "default": false,
      "description": "true = save as draft: skips ESPR validation and forces status DRAFT (this also demotes an already-published passport back to DRAFT). false/absent = validated save; a DRAFT passport is published (status ACTIVE, emits the passport.ingested webhook)."
    },
    "changeReason": {
      "type": "string",
      "description": "Free-text reason recorded on the version-history snapshot. Defaults to \"API Update\"."
    },
    "facilityId": {
      "type": [
        "string",
        "null"
      ],
      "description": "GLN-backed facility assignment. Omit to leave unchanged; null or \"\" detaches; a UUID attaches a facility that must be owned by your tenant (otherwise 400)."
    },
    "enrichment": {
      "oneOf": [
        {
          "$ref": "#/components/schemas/PassportEnrichmentInput"
        },
        {
          "type": "null"
        }
      ],
      "description": "Presentational marketing block stored OUTSIDE the ESPR-validated metadata and the Merkle seal. Include the key (even null/{}) to overwrite; omit to leave unchanged. An empty result after sanitation clears the block."
    }
  }
}
```

## Used by

- [updatePassport](/operations/updatePassport.md) (`PUT /api/v1/passports/{id}`)
