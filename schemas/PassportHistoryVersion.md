---
type: Schema
title: PassportHistoryVersion
description: PassportHistoryVersion
resource: https://opendpp-node.eu/openapi.json#/components/schemas/PassportHistoryVersion
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | — |
| `passportId` | string | yes | — |
| `productId` | string | yes | — |
| `date` | string | no | Only on the by-date read: the instant that was asked for, normalised. |
| `version` | integer | yes | The version number; on the by-date read this is the live version number when current is true. |
| `current` | boolean | yes | true when the answer is the live passport (nothing changed since date), false for an archived version. |
| `validFrom` | string,null | yes | The instant this version became current — the previous version's validUntil, or the passport's creation. |
| `validUntil` | string,null | yes | The instant it stopped being current; null for the live passport. |
| `recordedAt` | string,null | yes | When the snapshot was archived; null for the live passport. |
| `changedBy` | string,null | yes | Who recorded the change that replaced this version; null for the live passport. |
| `changeReason` | string,null | yes | — |
| `documentAvailable` | boolean | yes | true when this version is served as a document in passport. |
| `contentHash` | string,null | yes | SHA-256 over the RFC 8785 canonical form of this version's record, chained on the previous version's hash — the integrity evidence EN 18221:2026 §4.2 asks for,… |
| `passport` | object,null | no | The version as an EN 18223 Digital Product Passport document — the same shape GET /api/v1/passports/{id} returns, at the owner tier: the Table 1 header, the bo… |
| `metadata` | object,null | no | The regulated metadata as it stood in this version. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "passportId",
    "productId",
    "version",
    "current",
    "validFrom",
    "validUntil",
    "recordedAt",
    "changedBy",
    "changeReason",
    "documentAvailable",
    "contentHash"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true
    },
    "passportId": {
      "type": "string"
    },
    "productId": {
      "type": "string"
    },
    "date": {
      "type": "string",
      "format": "date-time",
      "description": "Only on the by-date read: the instant that was asked for, normalised."
    },
    "version": {
      "type": "integer",
      "minimum": 1,
      "description": "The version number; on the by-date read this is the live version number when `current` is true."
    },
    "current": {
      "type": "boolean",
      "description": "`true` when the answer is the live passport (nothing changed since `date`), `false` for an archived version."
    },
    "validFrom": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "The instant this version became current — the previous version's `validUntil`, or the passport's creation."
    },
    "validUntil": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "The instant it stopped being current; `null` for the live passport."
    },
    "recordedAt": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time",
      "description": "When the snapshot was archived; `null` for the live passport."
    },
    "changedBy": {
      "type": [
        "string",
        "null"
      ],
      "description": "Who recorded the change that replaced this version; `null` for the live passport."
    },
    "changeReason": {
      "type": [
        "string",
        "null"
      ]
    },
    "documentAvailable": {
      "type": "boolean",
      "description": "`true` when this version is served as a document in `passport`. `false` only for a version archived before whole-row snapshots existed, where nothing can reconstruct the document — then `metadata` carries the regulated data instead and `passport` is `null`."
    },
    "contentHash": {
      "type": [
        "string",
        "null"
      ],
      "description": "SHA-256 over the RFC 8785 canonical form of this version's record, chained on the previous version's hash — the integrity evidence EN 18221:2026 §4.2 asks for, so a retrieved version can be VERIFIED and not merely read. `null` on a version archived before the column existed, and on the live version (which is the passport itself)."
    },
    "passport": {
      "type": [
        "object",
        "null"
      ],
      "additionalProperties": true,
      "description": "**The version as an EN 18223 Digital Product Passport document** — the same shape `GET /api/v1/passports/{id}` returns, at the owner tier: the Table 1 header, the body's data elements at the root (clause 5.2), the seal material the version held and its `proof`. This is what EN 18221:2026 §4.2's point-in-time read and EN 18222's `ReadDPPVersionByIdAndDate` are about; until contract 1.16.0 these operations returned only the bare `metadata` member, which made a version a metadata fragment rather than a passport. The operator and facility relations are projected from the live row — a snapshot holds scalar columns only, and their identity is immutable (`regId`/`regIdScheme` cannot change, a facility keeps its GLN), so the relation is the same entity the version was written under. `null` only when `documentAvailable` is `false`."
    },
    "metadata": {
      "type": [
        "object",
        "null"
      ],
      "additionalProperties": true,
      "description": "The regulated metadata as it stood in this version. **`null` whenever `passport` is present** — read the document instead; this member survives only for a version archived before whole-row snapshots existed."
    }
  }
}
```

## Used by

- [getPassportVersionAtDate](/operations/getPassportVersionAtDate.md) (`GET /api/v1/passports/{id}/history/at`)
- [getPassportVersion](/operations/getPassportVersion.md) (`GET /api/v1/passports/{id}/history/{version}`)
