---
type: Reference
title: eIDAS Keys
description: Tenant signing-key management.
resource: https://opendpp-node.eu/api-reference
tags:
  - api domain
  - eidas-keys
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Tenant signing-key management. Keys are generated and held server-side in an encrypted vault; private key material is never returned by any endpoint.

## Operations

- [rotateTenantKeys](/operations/rotateTenantKeys.md) — `POST /api/v1/tenants/rotate-keys` — Rotate the tenant's ECDSA signing key pair
- [getSealCaCertificate](/operations/getSealCaCertificate.md) — `GET /.well-known/opendpp-seal-ca.pem` — Download the platform seal-CA certificate (PEM)
