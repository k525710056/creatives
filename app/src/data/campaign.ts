/**
 * Promoted products as the campaign screen models them: a per-product count of
 * how many creatives are already linked, plus the cover frames for those cuts.
 *
 * The `covers` files were not included in the design handoff bundle. Tiles layer
 * `url(cover), url(img)` so a missing cover falls through to the real product
 * photo instead of a grey box; dropping the files into public/uploads/ restores
 * the intended frames with no code change.
 */
export interface PromotedProduct {
  name: string;
  spu: string;
  videos: number;
  images: number;
  img: string;
  covers?: string[];
}

const SHOP = 'https://www.getlevplus.com/cdn/shop/files/';

export const PROMOTED_PRODUCTS: PromotedProduct[] = [
  { name: 'Colored Clay Undereye Corrector', spu: 'SPU 4471', videos: 3, images: 2, img: 'uploads/nobrush_label.png', covers: ['uploads/pasted-1788221575494-0.png', 'uploads/pasted-1788221702013-0.png', 'uploads/pasted-1788221575494-0.png'] },
  { name: 'Cooling Eye Gel with Ceramic Tip', spu: 'SPU 4472', videos: 0, images: 0, img: SHOP + '1_0007__0.jpg?v=1785838781&width=533' },
  { name: 'LEVPLUS Calcium Dark Spot Eye Cream', spu: 'SPU 4473', videos: 2, images: 1, img: SHOP + 'bf8c42f9-ef38-41c9-9429-040964852cc0.png?v=1787749488&width=533', covers: ['uploads/pasted-1788222250866-0.png', 'uploads/pasted-1788222259375-0.png'] },
  { name: 'LEVPLUS Instant Eye Tightener', spu: 'SPU 4474', videos: 2, images: 2, img: SHOP + '1_7.jpg?v=1787304634&width=533', covers: ['uploads/pasted-1788222316981-0.png', 'uploads/pasted-1788222333105-0.png'] },
  { name: 'Easy Glide Lip Liner', spu: 'SPU 4475', videos: 3, images: 2, img: SHOP + 'DM_20260604162741_001.jpg?v=1780576209&width=533', covers: ['uploads/lipliner-1-trim.png', 'uploads/lipliner-2-trim.png', 'uploads/lipliner-3-trim.png'] },
  { name: 'Eyelash Growth Serum Non-Prostaglandin', spu: 'SPU 4476', videos: 0, images: 0, img: SHOP + '5_6603c1b2-e1e7-41c7-984b-6f06efbe4d04.jpg?v=1785418608&width=533' },
  { name: 'LEVPLUS Hair Removal Cream', spu: 'SPU 4477', videos: 1, images: 1, img: SHOP + '3_ceb87797-3ab0-430c-a7c2-66cfd34d87ef.png?v=1786092488&width=533', covers: ['uploads/pasted-1788222448826-0.png'] },
  { name: 'Longwear Eyeliner Waterproof', spu: 'SPU 4478', videos: 4, images: 2, img: SHOP + '0006s_0012_LEVPLUS.jpg?v=1785395834&width=533', covers: ['uploads/pasted-1788222481677-0.png', 'uploads/eyeliner-1-trim.png', 'uploads/eyeliner-2-trim.png', 'uploads/eyeliner-3-trim.png'] },
];

export const CUTS = [
  { badge: '00:15', tag: 'HERO', suffix: 'hero', meta: 'Hero cut · 9:16 · 1080×1920' },
  { badge: '00:09', tag: 'DETAIL', suffix: 'detail', meta: 'Detail loop · 9:16 · 1080×1920' },
  { badge: '00:22', tag: 'TRY-ON', suffix: 'tryon', meta: 'Try-on · 9:16 · 1080×1920' },
  { badge: '00:18', tag: 'UGC', suffix: 'ugc', meta: 'Creator UGC · 9:16 · 1080×1920' },
];

export const PRICES = ['42.00', '26.99', '37.49', '29.99', '19.99', '31.99', '32.99', '27.99'];

/** Products the "Destination URL" flow matches on getlevplus.com/collections/all. */
export const URL_SPUS = ['SPU 4471', 'SPU 4472', 'SPU 4473', 'SPU 4474', 'SPU 4475'];

export const PAGE_URL = 'www.getlevplus.com/collections/all';

export const SLUG: Record<string, string> = {
  'SPU 4471': 'undereye-corrector',
  'SPU 4472': 'eye-gel',
  'SPU 4473': 'dark-spot-cream',
  'SPU 4474': 'eye-tightener',
  'SPU 4475': 'lip-liner',
  'SPU 4476': 'lash-serum',
  'SPU 4477': 'hair-removal',
  'SPU 4478': 'eyeliner',
};

export const KIND = ['hero', 'detail', 'tryon', 'ugc'];
export const BADGE = ['00:15', '00:09', '00:22', '00:18'];

export const shorten = (n: string) => {
  const w = String(n).split(' ');
  return w.length > 5 ? w.slice(0, 5).join(' ') + '…' : n;
};
