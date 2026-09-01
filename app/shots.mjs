import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4173';
const OUT = process.env.OUT || 'shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch(
  process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {},
);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const go = async (hash) => {
  await page.goto('about:blank');
  await page.goto(`${BASE}/#${hash}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
};
const shot = async (name, full = false) => {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  console.log('  ', name);
};

await go('/');
await shot('01-onboarding', true);

await go('/creative-library');
await shot('02-library-overview', true);

await go('/creative-library/media/video');
await shot('03-library-creative-assets');

await go('/creative-library/shoppable');
await shot('04-shoppable-assets', true);

await go('/creative-library/shoppable?empty=1');
await shot('05-shoppable-empty-state');

// Connect drawer, first-run intro
await go('/creative-library/shoppable');
await page.getByRole('button', { name: '+ Create shoppable asset' }).first().click();
await page.waitForTimeout(400);
await shot('06-drawer-intro');

// Working state: a product picked, creatives selected
await page.getByRole('button', { name: 'Get started', exact: true }).click();
await page.waitForTimeout(300);
await page.locator('button:has-text("Eyelash Growth Serum")').first().click();
await page.waitForTimeout(200);
for (const i of [0, 1, 2]) {
  await page.locator('[aria-label^="Select lp_"]').nth(i).click();
  await page.waitForTimeout(120);
}
await shot('07-drawer-link-mode');

// Filter + search bands open
const drawer = page.getByLabel('Create shoppable asset');
await drawer.getByRole('button', { name: /^Filter/ }).click();
await page.waitForTimeout(250);
await shot('08-drawer-filters');
await drawer.getByRole('button', { name: /^Filter/ }).click();

// Preview overlay
await page.locator('button:has-text("Preview")').first().click({ force: true });
await page.waitForTimeout(400);
await shot('09-drawer-preview');
await page.locator('button[aria-label="Close preview"]').click();
await page.waitForTimeout(200);

// Save -> success banner, then close -> synced list
await page.getByRole('button', { name: /^Save connection$/ }).click();
await page.waitForTimeout(500);
await shot('10-drawer-saved');
await page.getByRole('button', { name: 'Cancel' }).click();
await page.waitForTimeout(500);
await shot('11-shoppable-just-added');

// Add to campaigns modal
await page.getByRole('button', { name: 'Add to campaigns' }).first().click();
await page.waitForTimeout(400);
await page.locator('button:has-text("LEVPLUS — retargeting")').click();
await page.waitForTimeout(250);
await shot('12-add-to-campaigns');

// URL-only product path in the drawer
await go('/creative-library/shoppable');
await page.getByRole('button', { name: '+ Create shoppable asset' }).first().click();
await page.waitForTimeout(400);
await page.getByRole('button', { name: 'URL', exact: true }).click();
await page.waitForTimeout(200);
await page.locator('input[aria-label="Destination URL"]').fill('https://getlevplus.com/products/eye-gel');
await page.waitForTimeout(400);
await shot('13-drawer-url-mode');

// Campaign
await go('/campaign');
await shot('14-campaign', true);

// Campaign -> select creatives by product
await page.locator('button[aria-label^="Edit creatives"]').first().click();
await page.waitForTimeout(500);
await shot('15-campaign-select-creatives');

// Campaign -> product with no creatives -> empty state
await go('/campaign');
await page.getByRole('button', { name: 'Add creatives' }).first().click();
await page.waitForTimeout(500);
await shot('16-campaign-product-empty');

// -> connect drawer with back button, campaign drawer hidden
await page.getByRole('button', { name: 'Set up shoppable content' }).click();
await page.waitForTimeout(600);
await shot('17-campaign-connect-drawer');

// Campaign -> product picker
await go('/campaign');
await page.getByRole('button', { name: 'Edit products' }).click();
await page.waitForTimeout(500);
await shot('18-campaign-product-picker');

// Checklist popup expanded on the library
await go('/creative-library');
await page.getByRole('button', { name: 'Get started on Ads Manager' }).click();
await page.waitForTimeout(400);
await shot('19-library-checklist');

await browser.close();
console.log('done');
