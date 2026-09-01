import { linkedCreatives, type Creative } from './creatives';
import { PRODUCTS, type Product } from './products';

/**
 * The campaign screen's view of a promoted product. Everything here is derived
 * from the catalog and the creative links — the campaign no longer keeps its
 * own product list or its own cut frames, so a creative added in the Creative
 * Library shows up on this screen without being restated.
 */
export interface PromotedProduct {
  product: Product;
  /** In link order: what a campaign would actually serve for this product. */
  creatives: Creative[];
  videos: number;
  images: number;
  /** Nothing linked — the ad can only fall back to the catalog photo. */
  catalogOnly: boolean;
}

export const promotedProduct = (product: Product): PromotedProduct => {
  const creatives = linkedCreatives(product.id);
  return {
    product,
    creatives,
    videos: creatives.filter((c) => c.kind === 'video').length,
    images: creatives.filter((c) => c.kind === 'image').length,
    catalogOnly: creatives.length === 0,
  };
};

export const PROMOTED: PromotedProduct[] = PRODUCTS.map(promotedProduct);

/** Products the destination-URL branch matches on getlevplus.com/collections/all. */
export const URL_SPUS = ['SPU 4471', 'SPU 4472', 'SPU 4473', 'SPU 4474', 'SPU 4475'];

export const PAGE_URL = 'www.getlevplus.com/collections/all';

export const shorten = (n: string) => {
  const w = String(n).split(' ');
  return w.length > 5 ? w.slice(0, 5).join(' ') + '…' : n;
};
