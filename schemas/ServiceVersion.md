---
type: Schema
title: ServiceVersion
description: Running API contract version and source build identity, returned by GET /api/v1/version.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/ServiceVersion
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-09-21T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Running API contract version and source build identity, returned by `GET /api/v1/version`. The `apiVersion` MAJOR is the safe thing to pin an integration or generated SDK to.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `apiVersion` | string | yes | SemVer of the public API contract currently served (equals the OpenAPI document's info.version; its MAJOR equals the /api/v1 URL major). |
| `commit` | string | yes | Short git commit SHA of the running build, or "unknown" when a build did not inject it. |
| `builtAt` | string | yes | Build/deploy timestamp (ISO 8601 UTC), or "unknown" when a build did not inject it. |
| `providerRole` | string | no | The CEN EN 18222:2026 clause 4.1 DPP service-provider role this node operates as: main for the creator's main service provider, backup for the back-up service… |

## JSON Schema

```json
{
  "type": "object",
  "description": "Running API contract version and source build identity, returned by `GET /api/v1/version`. The `apiVersion` MAJOR is the safe thing to pin an integration or generated SDK to.",
  "required": [
    "apiVersion",
    "commit",
    "builtAt"
  ],
  "properties": {
    "apiVersion": {
      "type": "string",
      "description": "SemVer of the public API contract currently served (equals the OpenAPI document's `info.version`; its MAJOR equals the `/api/v1` URL major).",
      "examples": [
        "1.0.0"
      ]
    },
    "commit": {
      "type": "string",
      "description": "Short git commit SHA of the running build, or `\"unknown\"` when a build did not inject it.",
      "examples": [
        "a7a96d0",
        "unknown"
      ]
    },
    "builtAt": {
      "type": "string",
      "description": "Build/deploy timestamp (ISO 8601 UTC), or `\"unknown\"` when a build did not inject it.",
      "examples": [
        "2026-06-12T09:30:00Z",
        "unknown"
      ]
    },
    "providerRole": {
      "type": "string",
      "enum": [
        "main",
        "backup"
      ],
      "description": "The CEN EN 18222:2026 clause 4.1 DPP service-provider role this node operates as: `main` for the creator's main service provider, `backup` for the back-up service provider. The standard assigns different method obligations per role, so an assessment of this node against that series starts here. **This value is deployment-scoped and is the same on every host this node answers on** — an individual operator agreement may record a different role, and that per-operator answer is deliberately not published here. A node serving this contract always sends it, and sends `main` when configured with no other role — but it is NOT declared required, because a node serving an earlier contract does not send it at all, and a client must not refuse that response. Read the value; never infer a role from the field's absence.",
      "examples": [
        "main"
      ]
    }
  }
}
```

## Used by

- [getApiVersion](/operations/getApiVersion.md) (`GET /api/v1/version`)
