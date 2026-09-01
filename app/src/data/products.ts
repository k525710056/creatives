import type { MediaRef } from './media';

/**
 * The 12 products in the LEVPLUS catalog (getlevplus.com/collections/all).
 * The one product list in the app: the Creative Library's Shoppable assets
 * table, the connect drawer's rail, and the campaign's promoted products all
 * read this, so a product is named and pictured the same way everywhere.
 */
export interface Product {
  id: string;
  name: string;
  sku: string;
  price: string;
  path: string;
  photo: MediaRef;
}

const SHOP = 'https://www.getlevplus.com/cdn/shop/files/';

export const PRODUCTS: Product[] = [
  { id: 'p-4471', name: 'Colored Clay Undereye Corrector', sku: 'SPU 4471', price: '$42.00', path: '/products/undereye-corrector', photo: { local: 'products/4471.png', remote: SHOP + 'dfgasrt.jpg?v=1787218619&width=533' } },
  { id: 'p-4472', name: 'Cooling Eye Gel with Ceramic Tip', sku: 'SPU 4472', price: '$26.99', path: '/products/eye-gel', photo: { local: 'products/4472.jpg', remote: SHOP + '1_0007__0.jpg?v=1785838781&width=533' } },
  { id: 'p-4473', name: 'Calcium Dark Spot Eye Cream', sku: 'SPU 4473', price: '$37.49', path: '/products/leye-cream', photo: { local: 'products/4473.jpg', remote: SHOP + 'bf8c42f9-ef38-41c9-9429-040964852cc0.png?v=1787749488&width=533' } },
  { id: 'p-4474', name: 'Instant Eye Tightener', sku: 'SPU 4474', price: '$29.99', path: '/products/eye-tightener', photo: { local: 'products/4474.jpg', remote: SHOP + '1_7.jpg?v=1787304634&width=533' } },
  { id: 'p-4475', name: 'Easy Glide Lip Liner', sku: 'SPU 4475', price: '$19.99', path: '/products/summervibes', photo: { local: 'products/4475.jpg', remote: SHOP + 'DM_20260604162741_001.jpg?v=1780576209&width=533' } },
  { id: 'p-4476', name: 'Eyelash Growth Serum', sku: 'SPU 4476', price: '$31.99', path: '/products/landin', photo: { local: 'products/4476.jpg', remote: SHOP + '5_6603c1b2-e1e7-41c7-984b-6f06efbe4d04.jpg?v=1785418608&width=533' } },
  { id: 'p-4477', name: 'Hair Removal Cream', sku: 'SPU 4477', price: '$32.99', path: '/products/ntle-hair-remov', photo: { local: 'products/4477.jpg', remote: SHOP + '3_ceb87797-3ab0-430c-a7c2-66cfd34d87ef.png?v=1786092488&width=533' } },
  { id: 'p-4478', name: 'Longwear Eyeliner', sku: 'SPU 4478', price: '$27.99', path: '/products/longwear-eyeliner', photo: { local: 'products/4478.jpg', remote: SHOP + '0006s_0012_LEVPLUS.jpg?v=1785395834&width=533' } },
  { id: 'p-4479', name: 'Peauvelle Nude Blur Tint', sku: 'SPU 4479', price: '$29.99', path: '/products/lip-tint', photo: { local: 'products/4479.jpg', remote: SHOP + '3_53282c8c-1108-4eb7-8408-8820d59c169e.png?v=1788162512&width=533' } },
  { id: 'p-4480', name: 'Summer Skin Essentials Set', sku: 'SPU 4480', price: '$39.00', path: '/products/summer-skin-essentials', photo: { local: 'products/4480.jpg', remote: SHOP + '01_0008_LEVPLUS.jpg?v=1787379975&width=533' } },
  { id: 'p-4481', name: 'Pink Collagen Volume Multi Balm', sku: 'SPU 4481', price: '$32.99', path: '/products/frfg1-2', photo: { local: 'products/4481.jpg', remote: SHOP + '3.webp?v=1785156441&width=533' } },
  { id: 'p-4482', name: 'Collagen Tinted Moisturizer', sku: 'SPU 4482', price: '$45.98', path: '/products/moisturizer', photo: { local: 'products/4482.jpg', remote: SHOP + 'AA01.png?v=1786020084&width=533' } },
  // A newly listed product with nothing linked to it yet — the state the flow
  // exists to resolve. Name, price and path are placeholders pending the real
  // catalog entry; the photo slot is waiting on products/4483.
  { id: 'p-4483', name: 'Blending Brush Applicator', sku: 'SPU 4483', price: '$16.00', path: '/products/blending-brush', photo: { local: 'products/4483.png' } },
];

export const CATALOG_NAME = 'LEVPLUS — US catalog';

export const productUrl = (p: Product) => 'https://getlevplus.com' + p.path;

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

export const productBySku = (sku: string) => PRODUCTS.find((p) => p.sku === sku);

export const findProductOwningUrl = (raw: string): Product | null => {
  const u = (raw || '').trim().toLowerCase();
  if (u.length < 8) return null;
  return PRODUCTS.find((p) => u.indexOf(p.path) !== -1) ?? null;
};

export { SHOP };
