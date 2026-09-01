/**
 * The Creative Library's own media table. This is a different projection of the
 * creative pool than `DRAWER_CREATIVES`: the table needs review status, source
 * and spend, which the drawer's selection cards never show. The prototypes kept
 * the two datasets separate, so this port does too.
 */

const ASSET = (id: string) => `https://images.unsplash.com/${id}?w=400&h=500&fit=crop`;

export const LIBRARY_KINDS = [
  { key: 'video', label: 'Video' },
  { key: 'image', label: 'Image' },
  { key: 'post', label: 'TikTok post' },
  { key: 'aigc', label: 'AI generated' },
  { key: 'catalog', label: 'Catalog creatives' },
] as const;

export type LibraryKind = (typeof LIBRARY_KINDS)[number]['key'];
export type ReviewStatus = 'approved' | 'in-review' | 'needs-attention';
export type CreativeSource = 'uploaded' | 'aigc' | 'catalog';

export interface LibraryCreative {
  id: string;
  kind: LibraryKind;
  name: string;
  thumbnail: string;
  dimension: string;
  source: CreativeSource;
  status: ReviewStatus;
  spend: string;
  tags: string[];
}

export const LIBRARY_CREATIVES: LibraryCreative[] = [
  { id: 'a1', kind: 'video', name: 'lp_undereye_hero_9x16.mp4', thumbnail: ASSET('photo-1596462502278-27bfdc403348'), dimension: '1080 x 1920', source: 'uploaded', status: 'approved', spend: '0.00', tags: ['Undereye', 'Hero'] },
  { id: 'a2', kind: 'aigc', name: 'symphony_api-20260827-LP1', thumbnail: ASSET('photo-1522335789203-aabd1fc54bc9'), dimension: '1080 x 1920', source: 'aigc', status: 'approved', spend: '1137.20', tags: ['AI cut'] },
  { id: 'a3', kind: 'video', name: 'lp_eyecream_ugc_02.mp4', thumbnail: ASSET('photo-1556228578-8c89e6adf883'), dimension: '1080 x 1920', source: 'uploaded', status: 'in-review', spend: '0.00', tags: ['UGC', 'Eye care'] },
  { id: 'a4', kind: 'post', name: '7536098577698717697', thumbnail: ASSET('photo-1515886657613-9f3515b0c78f'), dimension: '1080 x 1920', source: 'uploaded', status: 'approved', spend: '1313.00', tags: ['TikTok post'] },
  { id: 'a5', kind: 'video', name: 'lp_lipliner_demo_1x1.mp4', thumbnail: ASSET('photo-1556228720-195a672e8a03'), dimension: '1080 x 1080', source: 'uploaded', status: 'approved', spend: '0.00', tags: ['Lip'] },
  { id: 'a6', kind: 'image', name: 'meta_image_lp_tightener_still', thumbnail: ASSET('photo-1570172619644-dfd03ed5d881'), dimension: '1200 x 1500', source: 'uploaded', status: 'needs-attention', spend: '498.10', tags: ['Eye care', 'Imported'] },
  { id: 'a7', kind: 'image', name: 'lp_undereye_still_1x1.png', thumbnail: ASSET('photo-1620916566398-39f1143ab7be'), dimension: '1080 x 1080', source: 'uploaded', status: 'approved', spend: '0.00', tags: ['Undereye'] },
  { id: 'a8', kind: 'aigc', name: 'symphony_api-20260829-LP4', thumbnail: ASSET('photo-1631730359585-38a4935cbec4'), dimension: '1080 x 1920', source: 'aigc', status: 'in-review', spend: '0.00', tags: ['AI cut'] },
  { id: 'a9', kind: 'post', name: '7541220398871042561', thumbnail: ASSET('photo-1556228453-efd6c1ff04f6'), dimension: '1080 x 1920', source: 'uploaded', status: 'approved', spend: '707.32', tags: ['TikTok post'] },
  { id: 'a10', kind: 'catalog', name: 'SPU 4471 · Colored Clay Undereye Corrector', thumbnail: ASSET('photo-1608248543803-ba4f8c70ae0b'), dimension: '1000 x 1000', source: 'catalog', status: 'approved', spend: '0.00', tags: ['From catalog'] },
  { id: 'a11', kind: 'catalog', name: 'SPU 4475 · Easy Glide Lip Liner', thumbnail: ASSET('photo-1556228720-195a672e8a03'), dimension: '1000 x 1000', source: 'catalog', status: 'approved', spend: '0.00', tags: ['From catalog'] },
];

export const REVIEW_STATUS: Record<ReviewStatus, { label: string; bg: string; color: string }> = {
  approved: { label: 'Approved', bg: '#e7fde8', color: '#057e33' },
  'in-review': { label: 'In review', bg: '#f2f3f4', color: '#4a4b4c' },
  'needs-attention': { label: 'Needs attention', bg: '#fff4e5', color: '#b45309' },
};

export const CREATIVE_SOURCE: Record<CreativeSource, { label: string; color: string }> = {
  uploaded: { label: 'User uploaded', color: '#8a8b8c' },
  aigc: { label: 'AIGC', color: '#7c3aed' },
  catalog: { label: 'From catalog', color: '#8a8b8c' },
};

/** A shoppable asset: one product (SPU + its URL, or a URL alone) and its creatives. */
export interface ShoppableAsset {
  id: string;
  name: string;
  /** Library creative ids whose thumbnails represent the asset in the table. */
  assetIds: string[];
  creatives: number;
  destinationLabel: string;
  destinationSub: string;
  status: 'Live' | 'Paused';
  usedIn: string;
  spend: string;
  isNew?: boolean;
}

export const SHOPPABLE_ASSETS: ShoppableAsset[] = [
  { id: 'sc1', name: 'LEVPLUS — Colored Clay Undereye Corrector', assetIds: ['a2', 'a4'], creatives: 4, destinationLabel: 'SPU 4471 Colored Clay Undereye Corrector', destinationSub: 'Product · catalog SPU', status: 'Live', usedIn: '2 campaigns', spend: '$2,450.20' },
  { id: 'sc2', name: 'Holiday lip bundle', assetIds: ['a5'], creatives: 2, destinationLabel: 'getlevplus.com/collections/holiday-lip', destinationSub: 'Product · URL only', status: 'Live', usedIn: '1 campaign', spend: '$498.10' },
  { id: 'sc3', name: 'Eye tightener UGC', assetIds: ['a6'], creatives: 3, destinationLabel: 'SPU 4474 Instant Eye Tightener', destinationSub: 'Product · catalog SPU', status: 'Paused', usedIn: '0 campaigns', spend: '—' },
];

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  status: 'Draft' | 'Active' | 'Paused';
  spend: string;
}

export const CAMPAIGNS: Campaign[] = [
  { id: '2475264', name: 'LEVPLUS — OLE 2.0 purchase 2026_001', objective: 'Product sales', status: 'Draft', spend: '—' },
  { id: '2471902', name: 'LEVPLUS — retargeting 2026_014', objective: 'Product sales', status: 'Active', spend: '$4,180.20' },
  { id: '2468117', name: 'LEVPLUS — prospecting Q3', objective: 'Product sales', status: 'Paused', spend: '$912.00' },
  { id: '2461330', name: 'LEVPLUS — eye care always-on', objective: 'Product sales', status: 'Active', spend: '$7,306.55' },
  { id: '2458901', name: 'LEVPLUS — lip launch teaser', objective: 'Traffic', status: 'Draft', spend: '—' },
];

export const OVERVIEW_STATS = [
  { label: 'Added yesterday', value: '152' },
  { label: 'Added (7 days)', value: '608' },
  { label: 'Active spending (7 days)', value: '0' },
  { label: 'All creative assets', value: '291,358' },
];

export const CONTENT_SUITE_PROJECTS = [
  { name: 'LEVPLUS_US_2026-08', status: 'Active' },
  { name: 'Undereye launch testing', status: 'Active' },
  { name: 'LEVPLUS_CA_2026-08', status: 'Active' },
];
