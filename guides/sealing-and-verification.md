---
type: Playbook
title: Sealing & verification
description: Apply an advanced electronic seal and verify it — including from a redacted document.
resource: https://opendpp-node.eu/security
tags:
  - sealing
  - verification
  - eIDAS
  - merkle
  - RFC 3161
generated:
  by: process:emit-okf
  at: 2026-09-01T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

OpenDPP passport seals are **advanced electronic seals**: an ECDSA P-256 signature over a
Merkle root of the passport content, with an optional RFC 3161 timestamp. (This is an *advanced*
seal — a *qualified* seal would require a QTSP; OpenDPP does not issue qualified seals.)

# Seal a passport

Call [sealPassport](/operations/sealPassport.md) with `passport:seal`. The tenant signing key is
generated and held server-side in an encrypted vault and is never returned; rotate it with
[rotateTenantKeys](/operations/rotateTenantKeys.md).

# Verify a seal

[verifyPassportSeal](/operations/verifyPassportSeal.md) is public and unauthenticated, and verifies
seals issued on this node — the signing key must be registered to a workspace here, so a seal from
another node is declined without cryptographic evaluation. It recomputes every Merkle leaf from the
submitted values, so it requires the **unredacted** document (caller-supplied redacted-leaf hashes
are deliberately not trusted) and checks that the signing workspace is bound to the economic
operator declared in the payload.

# Verifying redacted documents

Redacted documents stay verifiable **offline**: masked fields keep their true leaf hashes in
`proof.redactedLeaves` (see [MerkleTreeAttestationProof](/schemas/MerkleTreeAttestationProof.md)),
letting any verifier rebuild the sealed root without the privileged values. Download the platform
seal-CA certificate from [getSealCaCertificate](/operations/getSealCaCertificate.md).

> The legacy passport seal is a vendor **MerkleTreeAttestationProof**. The standards-conformant
> credential is a *separate* artifact — see [interop: AAS & UNTP](/guides/interop-aas-untp.md).
