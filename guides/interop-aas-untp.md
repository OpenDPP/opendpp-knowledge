---
type: Reference
title: "Interop: AAS & UNTP credentials"
description: The standards-conformant projections OpenDPP serves alongside JSON-LD, and where to validate them.
resource: https://github.com/OpenDPP/opendpp-interop
tags:
  - interop
  - AAS
  - IDTA
  - UNTP
  - data integrity
timestamp: 2026-06-20T00:00:00Z
---

Public resolution is **content-negotiated**: one URL serves several representations, so a passport
never drifts between formats. Set the `Accept` header on
[resolvePublicPassport](/operations/resolvePublicPassport.md), the GS1 resolvers, or
[getPassport](/operations/getPassport.md):

| `Accept` | Representation |
|----------|----------------|
| (default) | W3C JSON-LD passport document |
| `application/aas+json` | Asset Administration Shell (AAS) v3.0 Environment, validated against the official IDTA-01001-3-1 schema |
| `application/vc+jwt` | A conformant UNTP DigitalProductPassport credential, signed as an enveloping JOSE `vc+jwt` (ES256) |
| `application/vc+ld+json` | The same credential with an embedded W3C **Data Integrity** proof (cryptosuite `ecdsa-jcs-2019`, RFC 8785 JCS, multibase base58btc) |
| `text/html` | The human passport page |

The per-unit resolver [resolvePublicBatteryUnit](/operations/resolvePublicBatteryUnit.md) also serves
the item-granularity `vc+jwt` and `vc+ld+json` counterparts.

# Validate it yourself

The interoperability boundary — the official AAS + UNTP schemas, live-reproducible samples, an offline
conformance validator, and the AAS + UNTP field mappings — is **open source** at
[github.com/OpenDPP/opendpp-interop](https://github.com/OpenDPP/opendpp-interop) (Apache-2.0). It lets
any integrator validate and verify OpenDPP's standards-conformant output without access to the product
source. See also the [conformance](/guides/conformance.md) honesty matrix.
