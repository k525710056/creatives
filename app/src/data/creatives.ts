import { SHOP } from './products';

/** Creative kinds the connect drawer offers as tabs. */
export const DRAWER_KINDS = [
  { key: 'video', label: 'Video' },
  { key: 'image', label: 'Image' },
  { key: 'post', label: 'TikTok post' },
  { key: 'aigc', label: 'AI generated' },
] as const;

export type DrawerKind = (typeof DRAWER_KINDS)[number]['key'];

export interface DrawerCreative {
  id: string;
  kind: DrawerKind;
  tag: string;
  name: string;
  meta: string;
  badge: string;
  image: string;
}

/** Real LEVPLUS product imagery from getlevplus.com, not stock photography. */
export const DRAWER_CREATIVES: DrawerCreative[] = [
  { id: 'a1', kind: 'video', tag: 'Hero', name: 'lp_undereye_hero_9x16.mp4', meta: 'Hero cut · 9:16 · 1080x1920', badge: '00:18', image: SHOP + 'dfgasrt.jpg?v=1787218619&width=533' },
  { id: 'a2', kind: 'video', tag: 'UGC', name: 'lp_undereye_ugc_creator01.mp4', meta: 'Creator UGC · 9:16 · 1080x1920', badge: '00:26', image: SHOP + '81yhoBkpXHL._SL1500_ffe8afbb-927d-4fa0-88fd-7eb6e73aecbc.jpg?v=1787218619&width=533' },
  { id: 'a3', kind: 'video', tag: 'Demo', name: 'lp_eyegel_ceramic_tip_demo.mp4', meta: 'Applicator demo · 9:16 · 1080x1920', badge: '00:15', image: SHOP + '1_0007__0.jpg?v=1785838781&width=533' },
  { id: 'a4', kind: 'video', tag: 'Before/after', name: 'lp_eyegel_depuff_ba.mp4', meta: 'Before / after · 9:16 · 1080x1920', badge: '00:22', image: SHOP + '1_0006_DM_20260804180428_002.jpg?v=1785838781&width=533' },
  { id: 'a5', kind: 'video', tag: 'Demo', name: 'lp_lipliner_swatch_demo.mp4', meta: 'Swatch demo · 9:16 · 1080x1920', badge: '00:12', image: SHOP + 'DM_20260604162741_001.jpg?v=1780576209&width=533' },
  { id: 'a6', kind: 'video', tag: 'Try-on', name: 'lp_lipliner_tryon_3shades.mp4', meta: 'Try-on · 9:16 · 1080x1920', badge: '00:19', image: SHOP + 'DM_20260604162741_002.jpg?v=1780576210&width=533' },
  { id: 'a7', kind: 'video', tag: 'Before/after', name: 'lp_lashserum_2weeks_ba.mp4', meta: 'Before / after · 9:16 · 1080x1920', badge: '00:31', image: SHOP + '5_6603c1b2-e1e7-41c7-984b-6f06efbe4d04.jpg?v=1785418608&width=533' },
  { id: 'a8', kind: 'video', tag: 'UGC', name: 'lp_lashserum_ugc_routine.mp4', meta: 'Creator UGC · 9:16 · 1080x1920', badge: '00:28', image: SHOP + '1_af8dae95-bdb9-417e-9e5d-4581dd41193c.jpg?v=1785418606&width=533' },
  { id: 'a9', kind: 'video', tag: 'Demo', name: 'lp_eyeliner_waterproof_test.mp4', meta: 'Waterproof test · 9:16 · 1080x1920', badge: '00:16', image: SHOP + '0006s_0012_LEVPLUS.jpg?v=1785395834&width=533' },
  { id: 'a10', kind: 'video', tag: 'Hero', name: 'lp_eyeliner_hero_9x16.mp4', meta: 'Hero cut · 9:16 · 1080x1920', badge: '00:14', image: SHOP + '07dcbd7c3dac8d078c6b1ed2c04a2262_86eafb64-616c-4251-8bbc-53b1ab186a0c.png?v=1784809559&width=533' },
  { id: 'a11', kind: 'video', tag: 'Demo', name: 'lp_tightener_instant_lift.mp4', meta: 'Instant result · 9:16 · 1080x1920', badge: '00:20', image: SHOP + '1_7.jpg?v=1787304634&width=533' },
  { id: 'a12', kind: 'video', tag: 'UGC', name: 'lp_darkspot_ugc_60plus.mp4', meta: 'Creator UGC · 9:16 · 1080x1920', badge: '00:34', image: SHOP + 'bf8c42f9-ef38-41c9-9429-040964852cc0.png?v=1787749488&width=533' },
  { id: 'a13', kind: 'video', tag: 'Demo', name: 'lp_hairremoval_5min_demo.mp4', meta: 'Demo · 9:16 · 1080x1920', badge: '00:24', image: SHOP + '3_ceb87797-3ab0-430c-a7c2-66cfd34d87ef.png?v=1786092488&width=533' },
  { id: 'a14', kind: 'video', tag: 'Try-on', name: 'lp_liptint_tryon_nude.mp4', meta: 'Try-on · 9:16 · 1080x1920', badge: '00:17', image: SHOP + '3_53282c8c-1108-4eb7-8408-8820d59c169e.png?v=1788162512&width=533' },
  { id: 'a15', kind: 'video', tag: 'Bundle', name: 'lp_summerset_bundle_9x16.mp4', meta: 'Bundle cut · 9:16 · 1080x1920', badge: '00:23', image: SHOP + '01_0008_LEVPLUS.jpg?v=1787379975&width=533' },
  { id: 'a16', kind: 'video', tag: 'Try-on', name: 'lp_multibalm_tryon.mp4', meta: 'Try-on · 9:16 · 1080x1920', badge: '00:13', image: SHOP + '3.webp?v=1785156441&width=533' },
  { id: 'a17', kind: 'image', tag: 'Hero', name: 'lp_undereye_still_1x1.png', meta: 'Still · 1:1 · 1080x1080', badge: 'IMG', image: SHOP + '81yhoBkpXHL._SL1500_ffe8afbb-927d-4fa0-88fd-7eb6e73aecbc.jpg?v=1787218619&width=533' },
  { id: 'a18', kind: 'image', tag: 'Detail', name: 'lp_tightener_still_4x5.png', meta: 'Still · 4:5 · 1200x1500', badge: 'IMG', image: SHOP + '1_6.jpg?v=1787304643&width=533' },
  { id: 'a19', kind: 'image', tag: 'Bundle', name: 'lp_summerset_still_1x1.png', meta: 'Still · 1:1 · 1080x1080', badge: 'IMG', image: SHOP + '01_0007_LEVPLUS.jpg?v=1787379979&width=533' },
  { id: 'a20', kind: 'image', tag: 'Detail', name: 'lp_moisturizer_still_4x5.png', meta: 'Still · 4:5 · 1200x1500', badge: 'IMG', image: SHOP + '103.png?v=1785915688&width=533' },
  { id: 'a21', kind: 'post', tag: 'UGC', name: '7536098577698717697', meta: 'Authorized post · @levplus', badge: 'POST', image: SHOP + '29117711-e751-42e3-936c-5ed20a061aaa.png?v=1787749500&width=533' },
  { id: 'a22', kind: 'post', tag: 'Try-on', name: '7541220398871042561', meta: 'Authorized post · @levplus', badge: 'POST', image: SHOP + '4_1e254acc-3faa-4a43-ae20-1441b2747e86.jpg?v=1788162512&width=533' },
  { id: 'a23', kind: 'post', tag: 'UGC', name: '7539884120017231873', meta: 'Authorized post · @levplus', badge: 'POST', image: SHOP + '2_c07de122-e907-41d0-9b31-083059e22aec.png?v=1786092489&width=533' },
  { id: 'a24', kind: 'aigc', tag: 'Hero', name: 'symphony_api-20260827-LP1', meta: 'Generated · 9:16 · 1080x1920', badge: '00:12', image: SHOP + 'AA01.png?v=1786020084&width=533' },
  { id: 'a25', kind: 'aigc', tag: 'Try-on', name: 'symphony_api-20260829-LP4', meta: 'Generated · 9:16 · 1080x1920', badge: '00:09', image: SHOP + 'O1CN01iel3Km2DyaBeOX7ze__2222165368678-0-cib.jpg?v=1780666397&width=533' },
  { id: 'a26', kind: 'aigc', tag: 'Demo', name: 'symphony_api-20260830-LP7', meta: 'Generated · 1:1 · 1080x1080', badge: '00:11', image: SHOP + '1_0006_DM_20260804180428_002.jpg?v=1785838781&width=533' },
];

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
};

/** The products this campaign promotes — select mode never leaves this set. */
export const CAMPAIGN_PRODUCT_IDS = ['p-4471', 'p-4473', 'p-4474', 'p-4476', 'p-4479'];

export const linkedCount = (productId: string) => (LINKED[productId] ?? []).length;
