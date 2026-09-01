import type { MediaRef } from './media';
import { PRODUCTS, SHOP, type Product } from './products';

/**
 * One creative, one object.
 *
 * The Creative Library's media table, the connect drawer's selection grid and
 * the campaign's per-product cut strip are three views of this same list — so a
 * piece of footage is added once and every surface picks it up. `LINKED` is the
 * only place a creative meets a product.
 */
export type CreativeKind = 'video' | 'image' | 'post' | 'aigc' | 'catalog';
export type ReviewStatus = 'approved' | 'in-review' | 'needs-attention';
export type CreativeSource = 'uploaded' | 'aigc' | 'catalog';

export interface Creative {
  id: string;
  kind: CreativeKind;
  /** Filename, or the post id for an authorized TikTok post. */
  name: string;
  media: MediaRef;
  /** Editorial labels. The drawer filters on these; the library table lists them. */
  tags: string[];
  /** What kind of cut it is — "Hero cut", "Creator UGC", "Before / after". */
  format: string;
  aspect: '9:16' | '1:1' | '4:5';
  dimension: string;
  /** Runtime for moving footage; absent for stills. */
  duration?: string;
  source: CreativeSource;
  status: ReviewStatus;
  spend: string;
}

export const CREATIVE_KINDS = [
  { key: 'video', label: 'Video' },
  { key: 'image', label: 'Image' },
  { key: 'post', label: 'TikTok post' },
  { key: 'aigc', label: 'AI generated' },
  { key: 'catalog', label: 'Catalog creatives' },
] as const;

/** The kinds a creative can be *selected* as — catalog imagery is a fallback,
    never something you pick, so the drawer's tabs stop short of it. */
export const SELECTABLE_KINDS = CREATIVE_KINDS.filter((k) => k.key !== 'catalog');

const cdn = (file: string): MediaRef => ({ remote: SHOP + file });

/** Uploaded, generated and authorized creatives — everything but catalog imagery. */
const UPLOADED: Creative[] = [
  { id: 'a1', kind: 'video', name: 'lp_undereye_hero_9x16.mp4', tags: ['Hero', 'Undereye'], format: 'Hero cut', aspect: '9:16', dimension: '1080 x 1920', duration: '00:18', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_undereye_hero_9x16.jpg', ...cdn('dfgasrt.jpg?v=1787218619&width=533') } },
  { id: 'a2', kind: 'video', name: 'lp_undereye_ugc_creator01.mp4', tags: ['UGC', 'Undereye'], format: 'Creator UGC', aspect: '9:16', dimension: '1080 x 1920', duration: '00:26', source: 'uploaded', status: 'approved', spend: '1137.20', media: { local: 'creatives/video/lp_undereye_ugc_creator01.jpg', ...cdn('81yhoBkpXHL._SL1500_ffe8afbb-927d-4fa0-88fd-7eb6e73aecbc.jpg?v=1787218619&width=533') } },
  { id: 'a3', kind: 'video', name: 'lp_eyegel_ceramic_tip_demo.mp4', tags: ['Demo', 'Eye care'], format: 'Applicator demo', aspect: '9:16', dimension: '1080 x 1920', duration: '00:15', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_eyegel_ceramic_tip_demo.jpg', ...cdn('1_0007__0.jpg?v=1785838781&width=533') } },
  { id: 'a4', kind: 'video', name: 'lp_eyegel_depuff_ba.mp4', tags: ['Before/after', 'Eye care'], format: 'Before / after', aspect: '9:16', dimension: '1080 x 1920', duration: '00:22', source: 'uploaded', status: 'in-review', spend: '0.00', media: { local: 'creatives/video/lp_eyegel_depuff_ba.jpg', ...cdn('1_0006_DM_20260804180428_002.jpg?v=1785838781&width=533') } },
  { id: 'a5', kind: 'video', name: 'lp_lipliner_swatch_demo.mp4', tags: ['Demo', 'Lip'], format: 'Swatch demo', aspect: '9:16', dimension: '1080 x 1920', duration: '00:12', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_lipliner_swatch_demo.jpg', ...cdn('DM_20260604162741_001.jpg?v=1780576209&width=533') } },
  { id: 'a6', kind: 'video', name: 'lp_lipliner_tryon_3shades.mp4', tags: ['Try-on', 'Lip'], format: 'Try-on', aspect: '9:16', dimension: '1080 x 1920', duration: '00:19', source: 'uploaded', status: 'approved', spend: '498.10', media: { local: 'creatives/video/lp_lipliner_tryon_3shades.jpg', ...cdn('DM_20260604162741_002.jpg?v=1780576210&width=533') } },
  { id: 'a7', kind: 'video', name: 'lp_lashserum_2weeks_ba.mp4', tags: ['Before/after', 'Eye care'], format: 'Before / after', aspect: '9:16', dimension: '1080 x 1920', duration: '00:31', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_lashserum_2weeks_ba.jpg', ...cdn('5_6603c1b2-e1e7-41c7-984b-6f06efbe4d04.jpg?v=1785418608&width=533') } },
  { id: 'a8', kind: 'video', name: 'lp_lashserum_ugc_routine.mp4', tags: ['UGC', 'Eye care'], format: 'Creator UGC', aspect: '9:16', dimension: '1080 x 1920', duration: '00:28', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_lashserum_ugc_routine.jpg', ...cdn('1_af8dae95-bdb9-417e-9e5d-4581dd41193c.jpg?v=1785418606&width=533') } },
  { id: 'a9', kind: 'video', name: 'lp_eyeliner_waterproof_test.mp4', tags: ['Demo', 'Eye care'], format: 'Waterproof test', aspect: '9:16', dimension: '1080 x 1920', duration: '00:16', source: 'uploaded', status: 'approved', spend: '707.32', media: { local: 'creatives/video/lp_eyeliner_waterproof_test.jpg', ...cdn('0006s_0012_LEVPLUS.jpg?v=1785395834&width=533') } },
  { id: 'a10', kind: 'video', name: 'lp_eyeliner_hero_9x16.mp4', tags: ['Hero', 'Eye care'], format: 'Hero cut', aspect: '9:16', dimension: '1080 x 1920', duration: '00:14', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_eyeliner_hero_9x16.jpg', ...cdn('07dcbd7c3dac8d078c6b1ed2c04a2262_86eafb64-616c-4251-8bbc-53b1ab186a0c.png?v=1784809559&width=533') } },
  { id: 'a11', kind: 'video', name: 'lp_tightener_instant_lift.mp4', tags: ['Demo', 'Eye care'], format: 'Instant result', aspect: '9:16', dimension: '1080 x 1920', duration: '00:20', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_tightener_instant_lift.jpg', ...cdn('1_7.jpg?v=1787304634&width=533') } },
  { id: 'a12', kind: 'video', name: 'lp_darkspot_ugc_60plus.mp4', tags: ['UGC', 'Eye care'], format: 'Creator UGC', aspect: '9:16', dimension: '1080 x 1920', duration: '00:34', source: 'uploaded', status: 'in-review', spend: '0.00', media: { local: 'creatives/video/lp_darkspot_ugc_60plus.jpg', ...cdn('bf8c42f9-ef38-41c9-9429-040964852cc0.png?v=1787749488&width=533') } },
  { id: 'a13', kind: 'video', name: 'lp_hairremoval_5min_demo.mp4', tags: ['Demo'], format: 'Demo', aspect: '9:16', dimension: '1080 x 1920', duration: '00:24', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_hairremoval_5min_demo.jpg', ...cdn('3_ceb87797-3ab0-430c-a7c2-66cfd34d87ef.png?v=1786092488&width=533') } },
  { id: 'a14', kind: 'video', name: 'lp_liptint_tryon_nude.mp4', tags: ['Try-on', 'Lip'], format: 'Try-on', aspect: '9:16', dimension: '1080 x 1920', duration: '00:17', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_liptint_tryon_nude.jpg', ...cdn('3_53282c8c-1108-4eb7-8408-8820d59c169e.png?v=1788162512&width=533') } },
  { id: 'a15', kind: 'video', name: 'lp_summerset_bundle_9x16.mp4', tags: ['Bundle'], format: 'Bundle cut', aspect: '9:16', dimension: '1080 x 1920', duration: '00:23', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_summerset_bundle_9x16.jpg', ...cdn('01_0008_LEVPLUS.jpg?v=1787379975&width=533') } },
  { id: 'a16', kind: 'video', name: 'lp_multibalm_tryon.mp4', tags: ['Try-on', 'Lip'], format: 'Try-on', aspect: '9:16', dimension: '1080 x 1920', duration: '00:13', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/video/lp_multibalm_tryon.jpg', ...cdn('3.webp?v=1785156441&width=533') } },
  { id: 'a17', kind: 'image', name: 'lp_undereye_still_1x1.png', tags: ['Hero', 'Undereye'], format: 'Still', aspect: '1:1', dimension: '1080 x 1080', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/image/lp_undereye_still_1x1.png', ...cdn('81yhoBkpXHL._SL1500_ffe8afbb-927d-4fa0-88fd-7eb6e73aecbc.jpg?v=1787218619&width=533') } },
  { id: 'a18', kind: 'image', name: 'lp_tightener_still_4x5.png', tags: ['Detail', 'Eye care'], format: 'Still', aspect: '4:5', dimension: '1200 x 1500', source: 'uploaded', status: 'needs-attention', spend: '498.10', media: { local: 'creatives/image/lp_tightener_still_4x5.png', ...cdn('1_6.jpg?v=1787304643&width=533') } },
  { id: 'a19', kind: 'image', name: 'lp_summerset_still_1x1.png', tags: ['Bundle'], format: 'Still', aspect: '1:1', dimension: '1080 x 1080', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/image/lp_summerset_still_1x1.png', ...cdn('01_0007_LEVPLUS.jpg?v=1787379979&width=533') } },
  { id: 'a20', kind: 'image', name: 'lp_moisturizer_still_4x5.png', tags: ['Detail'], format: 'Still', aspect: '4:5', dimension: '1200 x 1500', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/image/lp_moisturizer_still_4x5.png', ...cdn('103.png?v=1785915688&width=533') } },
  { id: 'a21', kind: 'post', name: '7536098577698717697', tags: ['UGC'], format: 'Authorized post · @levplus', aspect: '9:16', dimension: '1080 x 1920', source: 'uploaded', status: 'approved', spend: '1313.00', media: { local: 'creatives/post/7536098577698717697.jpg', ...cdn('29117711-e751-42e3-936c-5ed20a061aaa.png?v=1787749500&width=533') } },
  { id: 'a22', kind: 'post', name: '7541220398871042561', tags: ['Try-on'], format: 'Authorized post · @levplus', aspect: '9:16', dimension: '1080 x 1920', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/post/7541220398871042561.jpg', ...cdn('4_1e254acc-3faa-4a43-ae20-1441b2747e86.jpg?v=1788162512&width=533') } },
  { id: 'a23', kind: 'post', name: '7539884120017231873', tags: ['UGC'], format: 'Authorized post · @levplus', aspect: '9:16', dimension: '1080 x 1920', source: 'uploaded', status: 'approved', spend: '0.00', media: { local: 'creatives/post/7539884120017231873.jpg', ...cdn('2_c07de122-e907-41d0-9b31-083059e22aec.png?v=1786092489&width=533') } },
  { id: 'a24', kind: 'aigc', name: 'symphony_api-20260827-LP1', tags: ['Hero', 'AI cut'], format: 'Generated', aspect: '9:16', dimension: '1080 x 1920', duration: '00:12', source: 'aigc', status: 'approved', spend: '0.00', media: { local: 'creatives/aigc/symphony_api-20260827-LP1.jpg', ...cdn('AA01.png?v=1786020084&width=533') } },
  { id: 'a25', kind: 'aigc', name: 'symphony_api-20260829-LP4', tags: ['Try-on', 'AI cut'], format: 'Generated', aspect: '9:16', dimension: '1080 x 1920', duration: '00:09', source: 'aigc', status: 'in-review', spend: '0.00', media: { local: 'creatives/aigc/symphony_api-20260829-LP4.jpg', ...cdn('O1CN01iel3Km2DyaBeOX7ze__2222165368678-0-cib.jpg?v=1780666397&width=533') } },
  { id: 'a26', kind: 'aigc', name: 'symphony_api-20260830-LP7', tags: ['Demo', 'AI cut'], format: 'Generated', aspect: '1:1', dimension: '1080 x 1080', duration: '00:11', source: 'aigc', status: 'approved', spend: '0.00', media: { local: 'creatives/aigc/symphony_api-20260830-LP7.jpg', ...cdn('1_0006_DM_20260804180428_002.jpg?v=1785838781&width=533') } },
];

/** A catalog product always carries its own image, so these are derived, never
    listed by hand — that is why "Catalog (0)" can never happen. */
const catalogCreativeOf = (p: Product): Creative => ({
  id: `cat-${p.sku.replace('SPU ', '')}`,
  kind: 'catalog',
  name: `${p.sku} · ${p.name}`,
  media: p.photo,
  tags: ['From catalog'],
  format: 'Catalog image',
  aspect: '1:1',
  dimension: '1000 x 1000',
  source: 'catalog',
  status: 'approved',
  spend: '0.00',
});

export const CATALOG_CREATIVES: Creative[] = PRODUCTS.map(catalogCreativeOf);

export const CREATIVES: Creative[] = [...UPLOADED, ...CATALOG_CREATIVES];

export const creativeById = (id: string) => CREATIVES.find((c) => c.id === id);

/** What the Creative Library has already connected, per product. */
export const LINKED: Record<string, string[]> = {
  'p-4471': ['a1', 'a2', 'a17'],
  'p-4472': ['a3', 'a4'],
  'p-4473': ['a12', 'a21'],
  'p-4474': ['a11', 'a18'],
  'p-4475': ['a5', 'a6'],
  'p-4476': [],
  'p-4477': ['a13', 'a23'],
  'p-4478': ['a9', 'a10'],
  'p-4479': ['a14', 'a22'],
  'p-4480': [],
  'p-4481': ['a16'],
  'p-4482': [],
  'p-4483': [],
};

/** The creatives a campaign would serve for a product, in order. Catalog
    imagery is excluded: it is the fallback when this list is empty. */
export const linkedCreatives = (productId: string): Creative[] =>
  (LINKED[productId] ?? []).map(creativeById).filter((c): c is Creative => Boolean(c));

export const linkedCount = (productId: string) => (LINKED[productId] ?? []).length;

/** Which products a creative currently serves — the reverse of `LINKED`. */
export const productsUsing = (creativeId: string): string[] =>
  Object.keys(LINKED).filter((k) => (LINKED[k] ?? []).includes(creativeId));

/** Every creative that is not part of any shoppable asset yet. */
export const unlinkedCreatives = (): Creative[] =>
  UPLOADED.filter((c) => productsUsing(c.id).length === 0);

/** "Hero cut · 9:16 · 1080x1920" — the caption under a selection card. */
export const creativeMeta = (c: Creative) =>
  `${c.format} · ${c.aspect} · ${c.dimension.replace(/ x /, 'x')}`;

/** The corner badge on a card: runtime, or what kind of still it is. */
export const creativeBadge = (c: Creative) =>
  c.duration ??
  ({ image: 'IMG', post: 'POST', catalog: 'CATALOG' } as Record<string, string>)[c.kind] ??
  '';

export const kindLabel = (kind: CreativeKind) =>
  (CREATIVE_KINDS.find((k) => k.key === kind) ?? CREATIVE_KINDS[0]).label;
