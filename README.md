<p align="center">
  <img src="https://raw.githubusercontent.com/OpenDPP/opendpp-knowledge/main/assets/opendpp-mark.png" alt="OpenDPP" width="96" height="96">
</p>

# OpenDPP Knowledge Bundle

> A machine-readable **[Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)** (OKF)
> projection of the [OpenDPP](https://opendpp-node.eu) Digital Product Passport **Integration API** —
> agent-ingestible Markdown for AI agents and humans.

OpenDPP is a B2B platform for **EU Digital Product Passports (DPPs)**, aligned with the data
requirements of the ESPR (Regulation (EU) 2024/1781) and the EU Battery Regulation
(Regulation (EU) 2023/1542). This repository is a knowledge bundle: a directory of cross-linked
Markdown "concepts" (one per API operation, tag, schema and webhook, plus curated guides), each with
a YAML frontmatter block. An LLM can ingest it verbatim into context; a person can read it here on
GitHub.

This bundle is **generated** from the public OpenAPI document at
<https://opendpp-node.eu/openapi.json> and is refreshed whenever the API version changes — so it never
drifts from the running service. Do not hand-edit concepts here; they are overwritten on each sync.

## Start here

- [`index.md`](index.md) — the bundle root listing (progressive disclosure).
- [`overview.md`](overview.md) — what the API does and how it is organised.
- [`manifest.json`](manifest.json) — every concept with its `type`/`title`/`description`/`resource`.

## Layout

| Path | Contents |
|------|----------|
| [`guides/`](guides) | Curated playbooks/references: authentication, errors, rate limits, access tiers, sealing & verification, AAS/UNTP interop, conformance. |
| [`tags/`](tags) | One overview per API domain, linking to its operations. |
| [`operations/`](operations) | One concept per endpoint — method, path, parameters, request/response schemas, a curl example. |
| [`schemas/`](schemas) | One concept per request/response object, with its JSON Schema and the operations that use it. |
| [`webhooks/`](webhooks) | The lifecycle events you can subscribe to. |

## Related

- **OpenAPI spec & API reference:** <https://opendpp-node.eu/openapi.json> · <https://opendpp-node.eu/api-reference>
- **Live bundle + discovery:** <https://opendpp-node.eu/okf> · <https://opendpp-node.eu/llms.txt>
- **Interop boundary kit** (official AAS + UNTP schemas, samples, an offline conformance validator):
  <https://github.com/OpenDPP/opendpp-interop>
- **Client SDKs** (`@opendpp/sdk` (TypeScript) + Python, generated from the OpenAPI contract):
  <https://github.com/OpenDPP/opendpp-sdk>

## License & trademark

[Apache-2.0](LICENSE). See [`NOTICE`](NOTICE) for how the underlying API specification may be used.

"OpenDPP" is a trademark of Opendpp UAB. The Apache-2.0 license covers the content, not the name:
forks may rebuild but must rename, and "OpenDPP-conformant" is reserved for output validated
against the hosted node — see [`TRADEMARK.md`](TRADEMARK.md).
