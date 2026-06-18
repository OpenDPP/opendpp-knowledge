---
type: Schema
title: HealthStatus
description: Health-check body of GET /health.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/HealthStatus
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

Health-check body of `GET /health`. Carries the running build identity (`apiVersion`/`commit`/`builtAt`) in addition to the liveness fields.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | string | yes | — |
| `service` | string | yes | — |
| `timestamp` | string | yes | Current server time, ISO 8601 UTC with milliseconds. |
| `apiVersion` | string | yes | SemVer of the public API contract currently served (equals the OpenAPI document's info.version; its MAJOR equals the /api/v1 URL major). |
| `commit` | string | yes | Short git commit SHA of the running build, or "unknown" when a build did not inject it. |
| `builtAt` | string | yes | Build/deploy timestamp (ISO 8601 UTC), or "unknown" when a build did not inject it. |

## JSON Schema

```json
{
  "type": "object",
  "description": "Health-check body of `GET /health`. Carries the running build identity (`apiVersion`/`commit`/`builtAt`) in addition to the liveness fields.",
  "additionalProperties": false,
  "required": [
    "status",
    "service",
    "timestamp",
    "apiVersion",
    "commit",
    "builtAt"
  ],
  "properties": {
    "status": {
      "type": "string",
      "const": "OK"
    },
    "service": {
      "type": "string",
      "const": "OpenDPP B2B Enterprise Engine"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "Current server time, ISO 8601 UTC with milliseconds."
    },
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

- [getHealth](/operations/getHealth.md) (`GET /health`)
