#!/usr/bin/env node
// Standalone OKF conformance check for this published bundle — zero dependencies (Node built-ins only),
// so it runs in CI without an install step. Mirrors the source-repo validator
// (opendpp-node:src/okf/validate.ts): every non-reserved .md has a frontmatter block with a non-empty
// `type` (+ title/description/generated); reserved index.md/log.md carry no frontmatter (except the
// root index.md, which may declare only okf_version); and every internal Markdown link resolves.
import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep, dirname } from "node:path";

const ROOT = process.cwd();
const SEGMENT_RE = /^[A-Za-z0-9_][A-Za-z0-9_.\-]*$/;
// SCALAR required keys. `generated` is NOT here: OKF v0.2 made it a MAPPING (SPEC §5.2), so it needs
// the block check below rather than a `key: value` probe. The probe is `[ \t]*` and not `\s*` on
// purpose — `\s` matches newlines, so `\s*\S` would step onto the NEXT line and read an empty
// `title:` as populated.
const REQUIRED_SCALAR = ["type", "title", "description"];
// Files this repo OWNS — everything at the root that is not part of the synced bundle. The upstream
// mirror (opendpp-node's okf-publish.yml) rsyncs the bundle in with `--delete`, so it must --exclude
// every one of these; its pre-sync gate refuses to delete a path the bundle doesn't own. Asserting
// they still exist here is the independent second line of defence. Add a file at the root → add it
// here. (Dot-paths like .github aren't listed: the walker below skips them.)
const REPO_OWNED = ["README.md", "CONTRIBUTING.md", "LICENSE", "NOTICE", "TRADEMARK.md", "validate.mjs"];
// Repo-meta Markdown that is NOT an OKF concept (no frontmatter; GitHub-relative links) — skip it.
// A SUPERSET of the .md files above, deliberately NOT derived from them: this set answers "is this a
// concept?", REPO_OWNED answers "must this exist?", and CHANGELOG.md / CODE_OF_CONDUCT.md are the
// first without being the second (conventional names not added yet, already pre-excluded upstream).
// Deriving one from the other would make the day someone adds CHANGELOG.md the day CI demands OKF
// frontmatter of it.
const REPO_META = new Set([...REPO_OWNED.filter((f) => f.endsWith(".md")), "CHANGELOG.md", "CODE_OF_CONDUCT.md"]);
const errors = [];

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "node_modules") continue; // .git, .github, .DS_Store, …
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else out.push(relative(ROOT, full).split(sep).join("/"));
  }
  return out;
}

const all = walk(ROOT);
const paths = new Set(all);

// manifest.json lists every concept the bundle claims to ship, so it is the only record of what
// SHOULD be here. A concept listed but absent means the sync OMITTED it (e.g. an exclude pattern
// matching at the wrong depth) — a class the upstream pre-sync gate structurally cannot see, because
// an omission is not a deletion. Each guard below returns early: an unusable manifest must report
// exactly that, never run the loop zero times and let "validated nothing" read as "all valid".
function manifestErrors(present) {
  if (!present.has("manifest.json")) return ["manifest.json: missing — the bundle manifest is not optional"];

  let manifest;
  try {
    manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));
  } catch (e) {
    return [`manifest.json: unparseable (${e.message})`];
  }
  if (!Array.isArray(manifest.concepts)) {
    return [`manifest.json: "concepts" is ${typeof manifest.concepts}, expected an array — the omission check cannot run`];
  }

  const found = [];
  // The manifest's own count, so a truncated or half-written file disagrees with itself.
  if (manifest.conceptCount !== manifest.concepts.length) {
    found.push(`manifest.json: conceptCount ${manifest.conceptCount} != concepts.length ${manifest.concepts.length}`);
  }
  for (const c of manifest.concepts) {
    if (!present.has(c.path)) found.push(`${c.path}: listed in manifest.json but not on disk`);
  }
  return found;
}

function frontmatter(content) {
  if (!content.startsWith("---\n")) return null;
  const end = content.indexOf("\n---", 4);
  if (end === -1) return "UNTERMINATED";
  return content.slice(4, end + 1);
}

// OKF v0.2 §5.2 moved provenance into a `generated` MAPPING and RETIRED v0.1's bare `timestamp`:
//
//   generated:
//     by: process:emit-okf
//     at: 2026-07-26T00:00:00Z
//
// Its children are indented, so the scalar probe above cannot reach them — capture the block, then
// read `by`/`at` out of it. Mirrors the upstream contract (opendpp-node:src/okf/validate.ts): `by` is
// a non-empty actor, `at` is an ISO 8601 instant.
function generatedErrors(p, fm) {
  const block = /^generated:[ \t]*\r?\n((?:[ \t]+\S[^\n]*\r?\n?)*)/m.exec(fm);
  if (!block) return [`${p}: missing "generated" mapping (SPEC §5.2)`];
  const out = [];
  const by = /^[ \t]+by:[ \t]*(\S[^\n]*?)[ \t]*$/m.exec(block[1]);
  const at = /^[ \t]+at:[ \t]*(\S[^\n]*?)[ \t]*$/m.exec(block[1]);
  if (!by) out.push(`${p}: "generated.by" is required and must be a non-empty actor (SPEC §5.2/§7)`);
  if (!at || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(at[1])) {
    out.push(`${p}: "generated.at" must be an ISO 8601 datetime (SPEC §5.2)`);
  }
  return out;
}

function resolveLink(from, href) {
  let t = href.split("#")[0].trim();
  if (t === "") return null;
  if (t.startsWith("/")) return t.slice(1);
  const stack = from.includes("/") ? from.slice(0, from.lastIndexOf("/")).split("/") : [];
  for (const s of t.split("/")) {
    if (s === "" || s === ".") continue;
    if (s === "..") stack.pop();
    else stack.push(s);
  }
  return stack.join("/");
}

for (const p of all) {
  if (REPO_META.has(p)) continue;
  for (const seg of p.split("/")) if (!SEGMENT_RE.test(seg)) errors.push(`${p}: bad path segment "${seg}"`);
  if (!p.endsWith(".md")) continue;
  const content = readFileSync(join(ROOT, p), "utf8");
  const base = p.split("/").pop();
  const fm = frontmatter(content);
  if (base === "index.md" || base === "log.md") {
    if (fm === "UNTERMINATED") errors.push(`${p}: unterminated frontmatter`);
    else if (fm !== null && !(p === "index.md" && /^okf_version:/m.test(fm) && fm.trim().split("\n").length === 1)) {
      errors.push(`${p}: reserved file should not carry frontmatter`);
    }
    continue;
  }
  if (fm === null || fm === "UNTERMINATED") {
    errors.push(`${p}: missing/invalid frontmatter`);
    continue;
  }
  for (const key of REQUIRED_SCALAR) if (!new RegExp(`^${key}:[ \\t]*\\S`, "m").test(fm)) errors.push(`${p}: missing non-empty "${key}"`);
  errors.push(...generatedErrors(p, fm));
  // A bundle carrying BOTH shapes is half-migrated: consumers would read a field the producer no
  // longer maintains. Upstream rejects it too, so accepting it here would hide the drift.
  if (/^timestamp:/m.test(fm)) errors.push(`${p}: legacy v0.1 "timestamp" key — use "generated.at" (SPEC §5.2)`);
}

// internal links resolve (concept files only; repo-meta uses GitHub-relative links)
for (const p of all.filter((x) => x.endsWith(".md") && !REPO_META.has(x))) {
  const body = readFileSync(join(ROOT, p), "utf8").replace(/^---\n[\s\S]*?\n---\n/, "").replace(/```[\s\S]*?```/g, "");
  for (const m of body.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|data:)/i.test(href) || href.startsWith("#")) continue;
    const target = resolveLink(p, href);
    if (target && !paths.has(target)) errors.push(`${p}: broken internal link "${href}" → "${target}"`);
  }
}

// Everything above is presence-driven — it validates what is on disk, so a file that VANISHED is
// invisible to it. The bundle arrives by `rsync --delete` from opendpp-node, so these two checks
// enumerate what must be here and report anything the sync removed or never delivered.
for (const f of REPO_OWNED) {
  if (!paths.has(f)) errors.push(`${f}: repo-owned file is missing — removed by a mirror sync?`);
}

errors.push(...manifestErrors(paths));

if (errors.length) {
  console.error(`✗ OKF validation failed (${errors.length}):\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log(`✓ OKF bundle valid (${all.filter((p) => p.endsWith(".md")).length} concepts).`);
