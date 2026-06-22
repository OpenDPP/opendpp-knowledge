---
type: Schema
title: ServiceVersion
description: Running API contract version and source build identity, returned by GET /api/v1/version.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/ServiceVersion
tags:
  - schema
timestamp: 2026-06-22T00:00:00Z
---

Running API contract version and source build identity, returned by `GET /api/v1/version`. The `apiVersion` MAJOR is the safe thing to pin an integration or generated SDK to.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `apiVersion` | string | yes | SemVer of the public API contract currently served (equals the OpenAPI document's info.version; its MAJOR equals the /api/v1 URL major). |
| `commit` | string | yes | Short git commit SHA of the running build, or "unknown" when a build did not inject it. |
| `builtAt` | string | yes | Build/deploy timestamp (ISO 8601 UTC), or "unknown" when a build did not inject it. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Running API contract version and source build identity, returned by `GET /api/v1/version`. The `apiVersion` MAJOR is the safe thing to pin an integration or generated SDK to.",
  "additionalProperties": false,
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
    }
  }
}
```

## Used by

- [getApiVersion](/operations/getApiVersion.md) (`GET /api/v1/version`)
