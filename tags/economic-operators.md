---
type: Reference
title: Economic Operators
description: Register and manage the economic operators (manufacturers/brands, identified by EORI or national registry id) that passports are issued on behalf of.
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - economic-operators
timestamp: 2026-06-26T00:00:00Z
---

Register and manage the economic operators (manufacturers/brands, identified by EORI or national registry id) that passports are issued on behalf of. Operators with passports are archived — never hard-deleted — to preserve passport resolvability (ESPR Art. 9(2)).

## Operations

- [listOperators](/operations/listOperators.md) — `GET /api/v1/operators` — List economic operators bound to your workspace
- [registerOperator](/operations/registerOperator.md) — `POST /api/v1/operators` — Register an economic operator and bind it to your workspace
- [getOperator](/operations/getOperator.md) — `GET /api/v1/operators/{id}` — Fetch a single bound economic operator
- [updateOperator](/operations/updateOperator.md) — `PATCH /api/v1/operators/{id}` — Update an operator's name or role (regId is immutable)
- [deleteOperator](/operations/deleteOperator.md) — `DELETE /api/v1/operators/{id}` — Remove an operator (archives if it has passports, else hard-deletes)
- [restoreOperator](/operations/restoreOperator.md) — `POST /api/v1/operators/{id}/restore` — Restore an archived operator and its archived passports
