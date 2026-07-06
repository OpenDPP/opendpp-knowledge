---
type: Reference
title: OpenDPP Integration API — overview
description: What the OpenDPP Integration API does, how it is organised, and where to start.
resource: https://opendpp-node.eu/api-reference
tags:
  - overview
  - getting started
  - ESPR
  - EU Battery Regulation
timestamp: 2026-07-06T00:00:00Z
---

OpenDPP is a B2B platform for **EU Digital Product Passports (DPPs)**, aligned with the data
requirements of the ESPR (Regulation (EU) 2024/1781) and the EU Battery Regulation
(Regulation (EU) 2023/1542). This knowledge bundle is a machine-readable projection of the **public
integration surface**: everything an external system needs to create, validate, seal, publish,
resolve and verify passports. It is generated from the same OpenAPI 3.1 document served at
[`/openapi.json`](https://opendpp-node.eu/openapi.json); the human-readable reference is at
[`/api-reference`](https://opendpp-node.eu/api-reference).

# What you can do

- **Create & validate** SKU/type-level passports against ESPR category rules — see
  [createPassport](/operations/createPassport.md) and the dry-run
  [validatePassport](/operations/validatePassport.md).
- **Seal** a passport with an eIDAS **advanced** electronic seal and **verify** it offline — see
  [sealPassport](/operations/sealPassport.md) and [verifyPassportSeal](/operations/verifyPassportSeal.md),
  and the [sealing & verification](/guides/sealing-and-verification.md) playbook.
- **Serialise** individual battery units (GS1 AI 21) and append telemetry — the
  [Battery Units](/tags/battery-units.md) tag.
- **Resolve** a passport publicly with content negotiation (JSON-LD / AAS / UNTP credential / HTML) —
  the [Public Resolution](/tags/public-resolution.md) tag.
- **Subscribe** to lifecycle events over signed webhooks — the [Webhooks](/tags/webhooks.md) tag.

# How this bundle is organised

| Directory | Contents |
|-----------|----------|
| [`guides/`](/guides/index.md) | Curated integration playbooks and references (auth, errors, rate limits, access tiers, sealing, interop, conformance). |
| [`tags/`](/tags/index.md) | One overview per API domain, each linking to its operations. |
| [`operations/`](/operations/index.md) | One concept per endpoint (method, path, parameters, request/response shapes, a curl example). |
| [`schemas/`](/schemas/index.md) | One concept per request/response object, with its JSON Schema and the operations that use it. |
| [`webhooks/`](/webhooks/index.md) | The lifecycle events you can subscribe to. |

# Four URL zones

The API spans four kinds of path: the versioned `/api/v1/*` management surface (the bulk),
unversioned **public resolution** roots (`/passport`, `/01`, `/8003`, `/unit`, `/context/v1`), a
`/.well-known/` certificate path, and the ops endpoints (`/health`, `/api/v1/version`). Start with
[authentication](/guides/authentication.md).
