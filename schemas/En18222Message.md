---
type: Schema
title: En18222Message
description: EN 18222:2026 Table 13 — a message carrying information for the requester.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/En18222Message
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-15T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

EN 18222:2026 Table 13 — a message carrying information for the requester.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `messageType` | string | yes | EN 18222:2026 Table 14 — MessageTypeEnum. |
| `text` | string | yes | The message text. |
| `code` | string | no | The EN 18222 Table 15 generic status code this message reports, e.g. ClientErrorResourceNotFound. |
| `correlationId` | string | no | Relates several result messages across systems. |
| `timestamp` | string | no | — |

## JSON Schema

```json
{
  "type": "object",
  "description": "EN 18222:2026 Table 13 — a message carrying information for the requester.",
  "required": [
    "messageType",
    "text"
  ],
  "properties": {
    "messageType": {
      "type": "string",
      "enum": [
        "Info",
        "Warning",
        "Error",
        "Exception"
      ],
      "description": "EN 18222:2026 Table 14 — MessageTypeEnum."
    },
    "text": {
      "type": "string",
      "description": "The message text."
    },
    "code": {
      "type": "string",
      "description": "The EN 18222 Table 15 generic status code this message reports, e.g. `ClientErrorResourceNotFound`. The same fact as the HTTP status; Table 15 is where their correspondence is defined."
    },
    "correlationId": {
      "type": "string",
      "description": "Relates several result messages across systems. This node uses the request id it also returns as `X-Request-Id`."
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

## Used by

- schema [En18222Result](/schemas/En18222Result.md)
