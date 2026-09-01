/**
 * Smoke test: loads every screen and walks the shoppable-asset flow end to
 * end, failing on any page error, blank screen or unresolved template hole.
 *
 *   npm run build && npx vite preview --port 4173 &
 *   npm run smoke
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:4173';
const errors = [];

// PW_CHROME lets a sandbox point at a pre-installed Chromium instead of
// downloading one; without it Playwright uses its own.
const browser = await chromium.launch(
  process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {},
);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('pageerror', (e) => errors.push(`PAGEERROR ${page.url()} :: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`CONSOLE ${page.url()} :: ${m.text()}`);
});

async function visit(hash, label) {
  await page.goto('about:blank');
  await page.goto(`${BASE}/#${hash}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const text = (await page.locator('#root').innerText()).trim();
  console.log(`${label.padEnd(34)} chars=${String(text.length).padStart(5)}  ${text.split('\n')[0].slice(0, 60)}`);
  if (text.length < 80) errors.push(`EMPTY ${label}`);
  if (text.includes('{{')) errors.push(`UNRESOLVED HOLE in ${label}`);
  if (label.endsWith('empty') && !text.includes('cannot sell anything')) errors.push('EMPTY STATE not rendered');
}

await visit('/', 'onboarding');
await visit('/creative-library', 'library overview');
await visit('/creative-library/media/video', 'library media video');
await visit('/creative-library/media/catalog', 'library media catalog');
await visit('/creative-library/shoppable', 'library shoppable');
await visit('/creative-library/shoppable?empty=1', 'library shoppable empty');
await visit('/campaign', 'campaign');

// --- interactions ---
await page.goto('about:blank');
await page.goto(`${BASE}/#/creative-library/shoppable`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: '+ Create shoppable asset' }).first().click();
await page.waitForTimeout(300);
let intro = await page.locator('text=You are connecting two things').count();
if (intro) {
  await page.getByRole('button', { name: 'Get started', exact: true }).click();
  await page.waitForTimeout(300);
}
console.log('drawer open, panes:', await page.locator('text=Products to sell').count(), await page.locator('text=Creatives to link').count());

// pick a product + a creative, then save
await page.locator('button:has-text("Eyelash Growth Serum")').first().click();
await page.waitForTimeout(200);
await page.locator('[aria-label^="Select lp_"]').first().click();
await page.waitForTimeout(200);
const saveBtn = page.getByRole('button', { name: /^Save connection$/ });
console.log('save enabled:', await saveBtn.isEnabled());
await saveBtn.click();
await page.waitForTimeout(400);
console.log('flash:', (await page.locator('text=saved —').count()) > 0);

// close drawer -> lands on shoppable list with the new row
await page.getByRole('button', { name: 'Cancel' }).click();
await page.waitForTimeout(400);
console.log('JUST ADDED row:', await page.locator('text=JUST ADDED').count());

// preview overlay
await page.getByRole('button', { name: '+ Create shoppable asset' }).first().click();
await page.waitForTimeout(300);
await page.locator('button:has-text("Preview")').first().click({ force: true });
await page.waitForTimeout(300);
console.log('preview open:', await page.locator('text=Status in this selection').count());
await page.keyboard.press('Escape');

// campaign: open the select-creatives drawer for a product with no creatives
await page.goto('about:blank');
await page.goto(`${BASE}/#/campaign`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Add creatives' }).first().click();
await page.waitForTimeout(400);
console.log('campaign empty state:', await page.locator('text=This product has no shoppable content yet').count());
await page.getByRole('button', { name: 'Set up shoppable content' }).click();
await page.waitForTimeout(400);
console.log('connect drawer back label:', await page.locator('text=Back to product selection').count());
console.log('campaign drawer hidden:', (await page.locator('text=Select creatives by product').count()) === 0);

// campaign: product picker
await page.goto('about:blank');
await page.goto(`${BASE}/#/campaign`, { waitUntil: 'networkidle' });
console.log('no stray drawer overlay:', (await page.locator('[class*="overlay"]').count()) === 0);
await page.getByRole('button', { name: 'Edit products' }).click();
await page.waitForTimeout(400);
console.log('picker rows:', await page.locator('text=SPU 4471').count());

await browser.close();

if (errors.length) {
  console.log('\n--- ERRORS ---');
  errors.forEach((e) => console.log(e));
  process.exit(1);
}
console.log('\nno runtime errors');
