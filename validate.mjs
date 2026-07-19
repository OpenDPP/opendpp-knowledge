#!/usr/bin/env node
// Standalone OKF conformance check for this published bundle — zero dependencies (Node built-ins only),
// so it runs in CI without an install step. Mirrors the source-repo validator
// (opendpp-node:src/okf/validate.ts): every non-reserved .md has a frontmatter block with a non-empty
// `type` (+ title/description/timestamp); reserved index.md/log.md carry no frontmatter (except the
// root index.md, which may declare only okf_version); and every internal Markdown link resolves.
import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep, dirname } from "node:path";

const ROOT = process.cwd();
const SEGMENT_RE = /^[A-Za-z0-9_][A-Za-z0-9_.\-]*$/;
const REQUIRED = ["type", "title", "description", "timestamp"];
// Files this repo OWNS — everything at the root that is not part of the synced bundle. The upstream
// mirror (opendpp-node's okf-publish.yml) rsyncs the bundle in with `--delete`, so it must --exclude
// every one of these; its pre-sync gate refuses to delete a path the bundle doesn't own. Asserting
// they still exist here is the independent second line of defence. Add a file at the root → add it
// here. (Dot-paths like .github aren't listed: the walker below skips them.)
const REPO_OWNED = ["README.md", "CONTRIBUTING.md", "LICENSE", "NOTICE", "TRADEMARK.md", "validate.mjs"];
// The repo-meta Markdown among them is NOT an OKF concept (no frontmatter; GitHub-relative links). Skip it.
const REPO_META = new Set(REPO_OWNED.filter((f) => f.endsWith(".md")));
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

function frontmatter(content) {
  if (!content.startsWith("---\n")) return null;
  const end = content.indexOf("\n---", 4);
  if (end === -1) return "UNTERMINATED";
  return content.slice(4, end + 1);
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
  for (const key of REQUIRED) if (!new RegExp(`^${key}:\\s*\\S`, "m").test(fm)) errors.push(`${p}: missing non-empty "${key}"`);
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

// manifest.json lists every concept the bundle claims to ship. One listed but absent means the sync
// OMITTED it (e.g. an exclude pattern that matched at the wrong depth) — a class the upstream
// pre-sync gate structurally cannot see, because an omission is not a deletion.
if (!paths.has("manifest.json")) {
  errors.push("manifest.json: missing — the bundle manifest is not optional");
} else {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));
  } catch (e) {
    errors.push(`manifest.json: unparseable (${e.message})`);
  }
  for (const c of manifest?.concepts ?? []) {
    if (!paths.has(c.path)) errors.push(`${c.path}: listed in manifest.json but not on disk`);
  }
}

if (errors.length) {
  console.error(`✗ OKF validation failed (${errors.length}):\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log(`✓ OKF bundle valid (${all.filter((p) => p.endsWith(".md")).length} concepts).`);
