---
type: Schema
title: PassportIngestCreated
description: 201 envelope of POST /api/v1/passports.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportIngestCreated
tags:
  - schema
timestamp: 2026-06-23T00:00:00Z
---

201 envelope of `POST /api/v1/passports`. Only these four top-level keys are ever emitted.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `message` | string | yes | "Digital Product Passport successfully validated and ingested", or "Draft passport saved" when draft: true. |
| `passport` | [PublicPassportJsonLd](/schemas/PublicPassportJsonLd.md) | yes | The PUBLIC redacted JSON-LD passport document (unsealed at creation: digitalSeal/proof are null). |
| `warnings` | array<[ValidationErrorItem](/schemas/ValidationErrorItem.md)> | yes | Non-blocking validation findings. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "message",
    "passport",
    "warnings"
  ],
  "description": "201 envelope of `POST /api/v1/passports`. Only these four top-level keys are ever emitted.",
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "message": {
      "type": "string",
      "description": "\"Digital Product Passport successfully validated and ingested\", or \"Draft passport saved\" when `draft: true`."
    },
    "passport": {
      "$ref": "#/components/schemas/PublicPassportJsonLd",
      "description": "The PUBLIC redacted JSON-LD passport document (unsealed at creation: `digitalSeal`/`proof` are null). The owner-only metadata key `facilityDetails` is always replaced with the literal string \"[REDACTED - Privileged Access Required]\" — even in this creator-facing echo, and even when the submitted metadata did not contain it. For `category: \"batteries\"`, the restricted legitimate-interest keys `detailedPerformance`, `lifecycleAndInUse`, and `circularityAndDisassembly` are masked the same way when present."
    },
    "warnings": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ValidationErrorItem"
      },
      "description": "Non-blocking validation findings. Always present; empty array when none and always empty for drafts."
    }
  }
}
```

## Used by

- [createPassport](/operations/createPassport.md) (`POST /api/v1/passports`)
