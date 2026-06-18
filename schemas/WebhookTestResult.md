---
type: Schema
title: WebhookTestResult
description: WebhookTestResult
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookTestResult
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | yes | The request was processed (NOT whether the receiver accepted it — see delivered). |
| `event` | string | yes | The event type sent. |
| `url` | string | yes | The receiver URL the test was sent to. |
| `delivered` | boolean | yes | true if the receiver returned a 2xx within the 5s timeout. |
| `statusCode` | integer,null | yes | The receiver's HTTP status, or null on a transport/SSRF error. |
| `error` | string,null | yes | Transport/SSRF error message when delivery failed, else null. |

## JSON Schema

```json
{
  "type": "object",
  "required": [
    "success",
    "event",
    "url",
    "delivered",
    "statusCode",
    "error"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "const": true,
      "description": "The request was processed (NOT whether the receiver accepted it — see `delivered`)."
    },
    "event": {
      "type": "string",
      "description": "The event type sent."
    },
    "url": {
      "type": "string",
      "format": "uri",
      "description": "The receiver URL the test was sent to."
    },
    "delivered": {
      "type": "boolean",
      "description": "`true` if the receiver returned a 2xx within the 5s timeout."
    },
    "statusCode": {
      "type": [
        "integer",
        "null"
      ],
      "description": "The receiver's HTTP status, or null on a transport/SSRF error."
    },
    "error": {
      "type": [
        "string",
        "null"
      ],
      "description": "Transport/SSRF error message when delivery failed, else null."
    }
  }
}
```

## Used by

- [testWebhookSubscription](/operations/testWebhookSubscription.md) (`POST /api/v1/webhooks/subscriptions/{id}/test`)
