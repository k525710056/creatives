/**
 * Folds dist/ into one self-contained HTML page: CSS inlined, fonts and the
 * two local images as data URIs, the ES module inlined as a <script>.
 *
 * Written for the Artifact host, which wraps the file in its own
 * doctype/html/head/body — so this emits page content only.
 *
 * Product photography stays on its remote CDN; it is not vendored here and the
 * Artifact CSP will not load it, so those tiles render as their placeholder
 * colour in the hosted preview. Running the app locally shows the real imagery.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const ASSETS = join(DIST, 'assets');

const MIME = {
  '.otf': 'font/otf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

const dataUri = (path) => {
  const ext = path.slice(path.lastIndexOf('.'));
  const mime = MIME[ext] ?? 'application/octet-stream';
  return `data:${mime};base64,${readFileSync(path).toString('base64')}`;
};

const built = readdirSync(ASSETS);
const cssName = built.find((f) => f.endsWith('.css'));
const jsName = built.find((f) => f.endsWith('.js'));

// --- CSS: swap the hashed font URLs for data URIs ---
// Vite emits these relative to the stylesheet (`./name.otf`) under base './',
// so match that form as well as the absolute one and fail loudly if neither hits.
let css = readFileSync(join(ASSETS, cssName), 'utf8');
for (const font of built.filter((f) => f.endsWith('.otf'))) {
  const uri = dataUri(join(ASSETS, font));
  const before = css;
  css = css.replaceAll(`./${font}`, uri).replaceAll(`/assets/${font}`, uri);
  if (css === before) throw new Error(`font not referenced by the stylesheet: ${font}`);
}

// --- JS: the runtime asset paths are plain strings, so swap those too ---
let js = readFileSync(join(ASSETS, jsName), 'utf8');
const RUNTIME_ASSETS = [
  'assets/tiktok-logo-icon.svg',
  'assets/tiktok-logo-text.svg',
  'assets/KS/navbar-chevron.svg',
  'assets/KS/navbar-business.svg',
  'assets/KS/navbar-bell.svg',
  'assets/KS/navbar-help.svg',
  'uploads/pasted-1788230779522-0.png',
  'uploads/nobrush_label.png',
];
for (const rel of RUNTIME_ASSETS) {
  const before = js;
  js = js.replaceAll(`"${rel}"`, `"${dataUri(join(DIST, rel))}"`);
  if (js === before) console.warn('  ! not referenced in bundle:', rel);
}

const html = `<title>OLE 2.0 Shoppable Assets</title>
<style>
  /* The hosted page is a frame around the Ads Manager UI, so it commits to that
     UI's own light palette rather than following the viewer's theme. */
  :root { color-scheme: light; }
  html, body, #root { height: 100%; }
  body { margin: 0; background: #f8f8f9; }
</style>
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`;

writeFileSync('artifact.html', html);
console.log('artifact.html', (Buffer.byteLength(html) / 1e6).toFixed(2), 'MB');
