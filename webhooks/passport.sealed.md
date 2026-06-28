---
type: Webhook Event
title: passport.sealed
description: Passport sealed with an eIDAS advanced seal
resource: https://opendpp-node.eu/openapi.json#/webhooks/passport.sealed
tags:
  - webhook
  - event
timestamp: 2026-06-28T00:00:00Z
---

Sent when a passport is sealed via `POST /api/v1/passports/{id}/seal`, transactionally with the seal write. The payload carries the populated `digitalSeal`, `signingPublicKey`, and the `proof` block: `merkleRoot` always; an `x5c` certificate chain binding the signing key to the tenant's legal identity **when the tenant's signing key has an issued chain**; an **optional** `rfc3161` trusted timestamp; and `redactedLeaves` hashes **when the passport carries masked metadata keys**. Delivered to every active subscription whose filter contains `passport.sealed` or `*`.

**Delivery contract** (sender `User-Agent: OpenDPP-Webhook-Outbox/1.0`):
- The body is a JSON **envelope** `{ id, type, created, data }`: `data` is the **public (redacted) JSON-LD passport document**, `type` is the event name (also in the `X-OpenDPP-Event` header), and `id` is the stable delivery id (also in the `X-OpenDPP-Delivery` header, constant across retries). The owner-only `facilityDetails` metadata key **always appears with the masked value `[REDACTED - Privileged Access Required]`** (in `metadata`, flattened at top level, and in the `@context` term map) even when the passport never set that key; restricted metadata keys likewise appear masked, with their true leaf hashes in `proof.redactedLeaves`.
- **Success = any HTTP 2xx** within the **5-second** timeout. Redirects are **never followed** (3xx = failure). Response body ignored.
- **Retries:** up to **5 delivery attempts** total. Failed attempts 1–4 schedule the next attempt ~1 min / 5 min / 30 min / 2 h after the previous failure; the **5th failed attempt dead-letters the event** and the workspace is notified in-app.
- **Per-subscription dedup:** endpoints that already returned 2xx are not re-POSTed on retries; still treat delivery as at-least-once, but the **`X-OpenDPP-Delivery`** id is STABLE across retries, so deduplicate on it for exactly-once.
- **Signature verification:** `HMAC-SHA256(secret, X-OpenDPP-Timestamp + "." + rawBody)` keyed with the FULL `whsec_…` secret, lowercase hex, constant-time compare against `X-OpenDPP-Signature` (bare hex, no scheme prefix). Verify over the **raw body bytes**; reject >~5 min timestamp skew; timestamp+signature are re-minted per retry attempt.

## Delivery

Deliveries are HMAC-SHA256-signed `POST` requests with retry/backoff. Subscribe and manage endpoints via the [Webhooks](/tags/webhooks.md) tag.

## Payload

Schema: [WebhookEnvelope](/schemas/WebhookEnvelope.md).
