/**
 * Vendors every remote image into public/media/ under the local path its data
 * entry already names, so the app stops depending on the Shopify CDN.
 *
 *   node fetch-media.mjs          # only what is missing
 *   node fetch-media.mjs --force  # re-download everything
 *
 * Run it somewhere with network access to getlevplus.com — the Claude Code
 * sandbox cannot reach it, which is the whole reason this is a script you run
 * rather than something already done in the repo.
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SHOP = 'https://www.getlevplus.com/cdn/shop/files/';
const OUT = 'public/media';
const force = process.argv.includes('--force');

/**
 * Both data files spell an asset the same way — a `local` path, then the remote
 * either as `remote: SHOP + '…'` or through the `cdn('…')` helper.
 */
const collect = (file) => {
  const src = readFileSync(file, 'utf8');
  const re = /local:\s*'([^']+)'\s*,\s*(?:remote:\s*SHOP\s*\+\s*|\.\.\.cdn\(\s*)'([^']+)'/g;
  return [...src.matchAll(re)].map(([, local, remote]) => ({ local, url: SHOP + remote }));
};

const assets = [...collect('src/data/products.ts'), ...collect('src/data/creatives.ts')];

// Several creatives legitimately share one source frame; fetch each URL once.
const unique = new Map();
for (const a of assets) if (!unique.has(a.local)) unique.set(a.local, a.url);

console.log(`${unique.size} assets referenced\n`);

let saved = 0;
let skipped = 0;
const failed = [];

for (const [local, url] of unique) {
  const dest = join(OUT, local);
  if (!force && existsSync(dest)) {
    skipped++;
    continue;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = Buffer.from(await res.arrayBuffer());
    if (body.length < 1024) throw new Error(`suspiciously small (${body.length} bytes)`);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, body);
    console.log(`  ✓ ${local}  ${(body.length / 1024).toFixed(0)} KB`);
    saved++;
  } catch (err) {
    console.log(`  ✗ ${local}  ${err.message}`);
    failed.push({ local, url, reason: err.message });
  }
}

console.log(`\n${saved} saved, ${skipped} already present, ${failed.length} failed`);
if (failed.length) {
  console.log('\nStill missing — drop these in by hand, or re-run with --force:');
  for (const f of failed) console.log(`  ${f.local}\n    ${f.url}`);
  process.exitCode = 1;
}
