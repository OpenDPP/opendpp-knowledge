---
type: API Endpoint
title: Register an economic operator and bind it to your workspace
description: Register an economic operator and bind it to your workspace
resource: https://opendpp-node.eu/api/v1/operators
tags:
  - POST
  - economic-operators
timestamp: 2026-07-04T00:00:00Z
---

`POST /api/v1/operators`

**Domain:** [Economic Operators](/tags/economic-operators.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Registers an economic operator (manufacturer, importer, supplier, …) and binds it to your workspace.

**Permission:** `operator:create`. Cookie-session clients must send the `X-CSRF-Token` header (double-submit); Bearer clients (API key / JWT) are exempt.

**Deduplication (per workspace):** operators are scoped to your workspace — `regId` is unique *within* your workspace, not across the platform. If **your workspace** already has an operator with the submitted `regId`, that existing record is returned and the submitted `name`, `role` and `regIdScheme` are **ignored**. A `regId` already used by *another* workspace is irrelevant — you always get **your own** operator row (so one workspace can never bind to, rename, or archive another's operator). The call is idempotent: re-registering an already-bound operator succeeds with `201` again. The per-workspace match includes **archived** operators: if your workspace's operator for that `regId` is archived, the archived record is returned as-is (`archivedAt` non-null) with `201` — registration does not un-archive it; use `POST /api/v1/operators/{id}/restore` to reactivate it.

**Registration-id integrity:** fabricated `EORI-MOCK…` ids are rejected on every path. When `regIdScheme` is `EORI`, `regId` must match `^[A-Z]{2}[A-Za-z0-9]{1,15}$` (2-letter ISO 3166 country prefix followed by up to 15 alphanumerics, e.g. `DE1234567890`). Validation is syntax-only by default. When the node operator enables the OPT-IN `EORI_EXISTENCE_CHECK` (#404), a declared `EORI` `regId` is additionally checked for EXISTENCE against the EU Commission EOS validation service and, if not found, a NON-BLOCKING advisory is added to the 201 `warnings[]` — the operator is still registered (best-effort, fail-open: a network error, or a freshly-issued / GB EORI, never blocks registration). With the check off, `warnings` is `[]`.

Side effects: an `operator.created` audit event and an in-app notification are recorded.

**Rate limit:** global limiter, 100 requests/min/IP (429 carries `x-ratelimit-*` headers).

## Request body

Schema (required): [RegisterOperatorRequest](/schemas/RegisterOperatorRequest.md).

```json
{
  "name": "Default EU Manufacturing Operator",
  "regId": "EU-DEFAULT-001",
  "role": "MANUFACTURER"
}
```

## Responses

- **201** — Operator registered (or an existing operator with the same regId was bound to your workspace). → [RegisterOperatorResponse](/schemas/RegisterOperatorResponse.md)
- **400** — Two distinct bodies. → [Error](/schemas/Error.md), [OperatorMinimalError](/schemas/OperatorMinimalError.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **402** — The write is blocked by billing — the workspace subscription is lapsed / its grace period expired (reads are unaffected), OR (on passport-creating writes) the… → [PassportQuotaError](/schemas/PassportQuotaError.md)
- **403** — Authenticated but not allowed: the key lacks the required permission, the request crosses workspaces, or an MFA-gated write was attempted without an MFA sessio… → [Error](/schemas/Error.md)
- **429** — Global rate limit exceeded (100 requests/min per IP).
- **500** — Database/handler failure. → [Error](/schemas/Error.md), [OperatorMinimalError](/schemas/OperatorMinimalError.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -H 'Content-Type: application/json' \
  -X POST 'https://opendpp-node.eu/api/v1/operators' \
  --data '{"name":"Default EU Manufacturing Operator","regId":"EU-DEFAULT-001","role":"MANUFACTURER"}'
```

## See also

Schemas: [Error](/schemas/Error.md), [OperatorMinimalError](/schemas/OperatorMinimalError.md), [RegisterOperatorRequest](/schemas/RegisterOperatorRequest.md), [RegisterOperatorResponse](/schemas/RegisterOperatorResponse.md).
