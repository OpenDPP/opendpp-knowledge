# Contributing to the OpenDPP Knowledge Bundle

Thanks for your interest in OpenDPP. This short guide explains what this repository is, why pull
requests are closed automatically, and which doors *are* open.

## What this repository is (and isn't)

This repo is a **generated mirror**. The OKF knowledge bundle here — the cross-linked Markdown
"concepts" under `guides/`, `tags/`, `operations/`, `schemas/`, `webhooks/`, plus the top-level
index/overview/log/manifest files — is **regenerated from the public OpenDPP OpenAPI spec** at
<https://opendpp-node.eu/openapi.json> and refreshed whenever the bundle changes. The OpenDPP
**product backend is a separate, private repository** — it is the source of truth for the spec the
bundle is generated from.

That split drives the one rule that matters most:

> ### 🚫 The concepts are **generated — do not hand-edit them, and pull requests here are closed automatically.**
>
> Every concept is overwritten on the next sync, so a change made in a PR here can't survive and can't
> flow back into the spec it was generated from. An automated responder politely closes fork PRs with a
> pointer back here. This is not a rejection of your idea — it's the wrong door for it.

## The doors that *are* open

- **Found an error, a stale concept, or want a change?** Please
  [**open an issue**](https://github.com/OpenDPP/opendpp-knowledge/issues) here — issues are welcome
  and are the right report/proposal door. If the fix belongs in the API spec itself, that's a
  **product** change and we'll route it to the private backend.
- **Hand-authored interop / kit contributions** (schemas, the offline conformance validator, samples,
  field mappings) — **PRs are welcome** at
  [`OpenDPP/opendpp-interop`](https://github.com/OpenDPP/opendpp-interop).
- **Docs & live API reference:** <https://opendpp-node.eu> ·
  [API reference](https://opendpp-node.eu/api-reference) ·
  [live bundle](https://opendpp-node.eu/okf).

## License & trademark

The bundle content is [Apache-2.0](./LICENSE); see [`NOTICE`](./NOTICE) for how the underlying API
specification may be used. "OpenDPP" is a trademark of Opendpp UAB — see [`TRADEMARK.md`](./TRADEMARK.md);
the license grants no rights to the marks.
