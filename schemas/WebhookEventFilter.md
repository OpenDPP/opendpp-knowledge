---
type: Schema
title: WebhookEventFilter
description: Subscribable event filter values.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/WebhookEventFilter
tags:
  - schema
timestamp: 2026-06-29T00:00:00Z
---

Subscribable event filter values. `*` matches every emitted event. `passport.status_updated` (decommission/reactivate) and `passport.updated` (in-place edit of a published passport) are now first-class subscribable filters.

## JSON Schema

```json
{
  "type": "string",
  "enum": [
    "passport.ingested",
    "passport.updated",
    "passport.sealed",
    "passport.recalled",
    "passport.status_updated",
    "*"
  ],
  "description": "Subscribable event filter values. `*` matches every emitted event. `passport.status_updated` (decommission/reactivate) and `passport.updated` (in-place edit of a published passport) are now first-class subscribable filters."
}
```

## Used by

- schema [WebhookSubscriptionCreateRequest](/schemas/WebhookSubscriptionCreateRequest.md)
- schema [WebhookSubscriptionRow](/schemas/WebhookSubscriptionRow.md)
- schema [WebhookSubscriptionUpdateRequest](/schemas/WebhookSubscriptionUpdateRequest.md)
