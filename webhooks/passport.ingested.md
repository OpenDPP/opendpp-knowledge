---
type: Webhook Event
title: passport.ingested
description: Passport created or first published
resource: https://opendpp-node.eu/openapi.json#/webhooks/passport.ingested
tags:
  - webhook
  - event
timestamp: 2026-06-28T00:00:00Z
---

Sent when a passport becomes active for the first time: a non-draft `POST /api/v1/passports` create, the **first publish** of a draft via `PUT /api/v1/passports/{id}`, or each successfully ingested row of `POST /api/v1/passports/bulk`. Draft creation does NOT emit it, non-publish updates and deletes emit nothing, and **AAS ingestion (`POST /api/v1/passports/aas/ingest`) emits no webhook events at all**. The payload is the freshly created passport: `status: "ACTIVE"` with `digitalSeal` and `proof` still `null` (unless a previously sealed draft is re-published). Emission is enqueued transactionally with the passport write (outbox pattern) and delivered asynchronously to every active subscription whose filter contains `passport.ingested` or `*`.

**Delivery contract** (sender `User-Agent: OpenDPP-Webhook-Outbox/1.0`):
- The body is a JSON **envelope** `{ id, type, created, data }`: `data` is the **public (redacted) JSON-LD passport document**, `type` is the event name (also in the `X-OpenDPP-Event` header), and `id` is the stable delivery id (also in the `X-OpenDPP-Delivery` header, constant across retries). Owner-tier fields (facility street address, restricted metadata values) are never included. The owner-only `facilityDetails` metadata key **always appears with the masked value `[REDACTED - Privileged Access Required]`** — in `metadata`, flattened at top level, and in the `@context` term map — even when the passport never set that key; restricted metadata keys likewise appear masked, with their true leaf hashes preserved in `proof.redactedLeaves` once sealed.
- **Success = any HTTP 2xx** returned within the **5-second** timeout. Redirects are **never followed** — a 3xx counts as failure. The response body is ignored.
- **Retries:** up to **5 delivery attempts** total. Failed attempts 1–4 schedule the next attempt with exponential backoff — ~1 min, 5 min, 30 min, then 2 h after the previous failure. The **5th failed attempt dead-letters the event** (no further deliveries) and the workspace receives an in-app notification.
- **Per-subscription dedup:** endpoints that already returned 2xx are not re-POSTed when the same event is retried for sibling subscriptions. Still treat delivery as at-least-once (a 2xx the sender fails to record can re-deliver), but the **`X-OpenDPP-Delivery`** id is STABLE across retries, so deduplicate on it for exactly-once.
- **Signature verification:** compute `HMAC-SHA256(secret, X-OpenDPP-Timestamp + "." + rawBody)` keyed with the FULL `whsec_…` secret (including the prefix), hex-encode lowercase, constant-time-compare with `X-OpenDPP-Signature` (bare hex — no `v1=`/`sha256=` prefix). Verify over the **raw body bytes** before any JSON parsing. Reject timestamps older than ~5 minutes; the timestamp and signature are **re-minted on every retry attempt**, so retried deliveries always carry a fresh, valid pair.

## Delivery

Deliveries are HMAC-SHA256-signed `POST` requests with retry/backoff. Subscribe and manage endpoints via the [Webhooks](/tags/webhooks.md) tag.

## Payload

Schema: [WebhookEnvelope](/schemas/WebhookEnvelope.md).
