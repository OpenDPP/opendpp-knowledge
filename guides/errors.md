---
type: Reference
title: Error model
description: Error envelopes returned by the API, including the richer ESPR validation-failure shape.
resource: https://opendpp-node.eu/api-reference
tags:
  - errors
  - validation
  - troubleshooting
timestamp: 2026-07-04T00:00:00Z
---

Authenticated endpoints return `{ success: false, error, message }` (some endpoints, and all
public-resolution errors, omit `success` and return only `error` + `message`).

# Validation failures

ESPR metadata validation failures return a richer shape with per-field `errors[]` (plus
`warnings[]` when any exist — the key is omitted entirely when there are none). `friendlyMessage`
texts are localizable via `?lang=` or `Accept-Language` (28 languages, default `en`). See
[ValidationErrorItem](/schemas/ValidationErrorItem.md) and the dry-run validators
[validatePassport](/operations/validatePassport.md) /
[validatePassportPublic](/operations/validatePassportPublic.md).

Bulk endpoints report row-level problems as `errors: string[]`. Malformed JSON and query-string
violations return Fastify's default `{ statusCode, code, error, message }` body.

# Status codes you will encounter

| Status | Meaning |
|--------|---------|
| `400` | Bad request or ESPR validation failed. |
| `401` | Missing/invalid/revoked/expired credentials. |
| `402` | Workspace subscription lapsed — writes blocked, reads unaffected. |
| `403` | Authenticated but not allowed (permission, cross-workspace, or MFA-gated write). |
| `404` | Resource not found or not visible to your workspace. |
| `409` | Duplicate (e.g. a `(productId, operatorId)` pair that already exists). |
| `413` | Request body over the per-endpoint limit. |
| `429` | Rate limit exceeded — see [rate limits](/guides/rate-limits.md). |
| `5xx` | Unexpected server error; details are logged server-side and never returned. |
