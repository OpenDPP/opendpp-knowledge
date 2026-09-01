---
type: API Endpoint
title: Get a single facility
description: Fetches one facility by id, scoped to your tenant workspace.
resource: https://opendpp-node.eu/api/v1/facilities/{id}
tags:
  - GET
  - facilities
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

`GET /api/v1/facilities/{id}`

**Domain:** [Facilities](/tags/facilities.md)  
**Authentication:** **API key required** — `Authorization: Bearer op_dpp_token_…`.

Fetches one facility by id, scoped to your tenant workspace.

**Permission:** `facility:read`.

**Operator-scoped keys:** if the facility belongs to a *different* Economic Operator than the key's scope, the response is **403**. Facilities with no operator (`operatorId: null`) **are** readable by operator-scoped keys here, even though they are excluded from the list endpoint.

Returns the full row including the privileged address fields (`streetAddress`, `city`, `postalCode`) that public passport documents never expose. (Public exposure of a linked facility: the JSON-LD document shows `id`/`gln`/`name`/`activity`/`country`; the AAS export only the GLN, name and country.)

**404 body:** standard envelope with message `Facility <id> not found under your Tenant workspace`.

**Rate limit:** your plan's per-key budget applies — **Growth** 120/min, **Scale** 600/min, **Enterprise** unlimited — with a ceiling of 3x that rate across all of the workspace's keys. The per-IP ceiling is not the binding limit for authenticated calls. Standard `x-ratelimit-*` headers; **429** carries `Retry-After`.

## Responses

- **200** — Facility found. → [FacilityEnvelope](/schemas/FacilityEnvelope.md)
- **401** — Missing, invalid, revoked or expired credentials. → [Error](/schemas/Error.md)
- **403** — Forbidden. → [Error](/schemas/Error.md)
- **404** — The resource does not exist or is not visible to the calling workspace. → [Error](/schemas/Error.md)
- **429** — Rate limit exceeded — either your key's per-minute plan budget (or the 3x workspace ceiling above it) or the per-IP ceiling, whichever bit first.
- **500** — Unexpected server error. → [Error](/schemas/Error.md)

## Example

```bash
curl -s \
  -H 'Authorization: Bearer op_dpp_token_…' \
  -X GET 'https://opendpp-node.eu/api/v1/facilities/{id}'
```

## See also

Schemas: [Error](/schemas/Error.md), [FacilityEnvelope](/schemas/FacilityEnvelope.md).
