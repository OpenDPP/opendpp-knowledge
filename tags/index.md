# API domains

* [Passports](passports.md) - Create, validate, read, update, seal and manage the lifecycle of Digital Product Passports.
* [Economic Operators](economic-operators.md) - Register and manage the economic operators (manufacturers/brands, identified by EORI or national registry id) that passports are issued on behalf of.
* [Battery Units](battery-units.md) - Per-unit battery serialization (real serials, GS1 AI 21) under a SKU-level passport, plus append-only telemetry events (state of health, charge cycles, status…
* [Facilities](facilities.md) - Manufacturing facility master data, identified by GS1 GLN-13 (the Unique Facility Identifier).
* [Access Grants](access-grants.md) - Capability tokens implementing tiered access (Battery Regulation Art.
* [Webhooks](webhooks.md) - Subscribe HTTPS endpoints to passport lifecycle events.
* [Traceability & Audit](traceability-audit.md) - UNTP/EPCIS supply-chain traceability events, lineage queries, and the public seal verifier.
* [Public Resolution](public-resolution.md) - Unauthenticated, content-negotiated passport resolution: GS1 Digital Link paths, passport and unit pages.
* [Verifiable Credentials](verifiable-credentials.md) - Issuer trust endpoints that back the UNTP Verifiable Credential representations: the workspace's did:web DID document (public keys only) and its W3C Bitstring…
* [Schemas & Vocabulary](schemas-vocabulary.md) - Machine-readable contracts: per-category ESPR JSON Schemas, the W3C JSON-LD context, and the curated materials vocabulary.
* [QR Codes](qr-codes.md) - Export GS1-Digital-Link QR codes (PNG/SVG, 128–2048 px, GS1 quiet zone) for passports and battery units.
* [eIDAS Keys](eidas-keys.md) - Tenant signing-key management.
* [Account](account.md) - Identity of the authenticated API key / session: workspace, role, permissions, operator scope, and passport usage against the tier quota — the integration-faci…
* [Service](service.md) - Service metadata and liveness.
