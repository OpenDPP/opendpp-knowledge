---
type: Reference
title: Conformance honesty
description: What OpenDPP's output conforms to today, what is partial, and what is on the roadmap.
resource: https://github.com/OpenDPP/opendpp-interop
tags:
  - conformance
  - standards
  - honesty
timestamp: 2026-06-22T00:00:00Z
---

OpenDPP is deliberately precise about what it claims. In short:

- **ESPR / EU Battery Regulation** — the platform is built for **readiness** against the ESPR data
  requirements and the EU Battery Regulation. Whether a given product is *compliant* is the
  operator's determination, not OpenDPP's.
- **AAS (IDTA)** — the AAS v3.0 Environment is CI-validated against the official IDTA-01001-3-1 schema.
  Concepts OpenDPP coins itself are honestly namespaced `urn:opendpp:*`, never presented as eCl@ss.
- **UNTP / W3C Data Integrity** — the per-passport credential is a conformant UNTP DigitalProductPassport
  credential, emitted both as an enveloping `vc+jwt` and as an embedded `ecdsa-jcs-2019` Data Integrity
  proof, and CI-validated against the official UNTP DPP schema and the off-the-shelf `@digitalbazaar`
  cryptosuite.
- **The legacy passport seal** is a vendor `MerkleTreeAttestationProof` — an eIDAS *advanced* (not
  qualified) seal. It is never presented as the conformant credential; that is a separate artifact.

The authoritative per-path conform / partial / roadmap matrix lives in the open-source interop kit at
[github.com/OpenDPP/opendpp-interop](https://github.com/OpenDPP/opendpp-interop). No competent
authority certifies, verifies, or approves a product or passport through OpenDPP.
