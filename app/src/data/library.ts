import type { ReviewStatus, CreativeSource } from './creatives';

/** Chip colours for a creative's pre-review state. */
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

/** A shoppable asset: one product (a catalog SPU with its URL, or a URL alone)
    and the creatives linked to it. Reusable across campaigns. */
export interface ShoppableAsset {
  id: string;
  name: string;
  /** Creative ids whose thumbnails stand in for the asset in the table. */
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
  { id: 'sc1', name: 'LEVPLUS — Colored Clay Undereye Corrector', assetIds: ['a1', 'a2', 'a17'], creatives: 3, destinationLabel: 'SPU 4471 Colored Clay Undereye Corrector', destinationSub: 'Product · catalog SPU', status: 'Live', usedIn: '2 campaigns', spend: '$2,450.20' },
  { id: 'sc2', name: 'Holiday lip bundle', assetIds: ['a5', 'a6'], creatives: 2, destinationLabel: 'getlevplus.com/collections/holiday-lip', destinationSub: 'Product · URL only', status: 'Live', usedIn: '1 campaign', spend: '$498.10' },
  { id: 'sc3', name: 'Eye tightener UGC', assetIds: ['a11', 'a18'], creatives: 2, destinationLabel: 'SPU 4474 Instant Eye Tightener', destinationSub: 'Product · catalog SPU', status: 'Paused', usedIn: '0 campaigns', spend: '—' },
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
