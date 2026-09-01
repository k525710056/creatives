# Media

Permanent imagery for the app. Everything here is served from `/media/…` and is
committed to the repo, so it replaces the remote Shopify CDN and Unsplash URLs
the design prototypes pointed at.

Drop files in the right folder. If a filename matches the slot below, it gets
wired up automatically; otherwise just say what each file is and it gets mapped
by hand.

## `products/` — catalog product photos

One per SPU, square, ≥ 400px. Used by the Shoppable assets table, the drawer's
product rail, the campaign's product picker and its promoted-products strip.

| File | Product |
| --- | --- |
| `4471.jpg` | Colored Clay Undereye Corrector |
| `4472.jpg` | Cooling Eye Gel with Ceramic Tip |
| `4473.jpg` | Calcium Dark Spot Eye Cream |
| `4474.jpg` | Instant Eye Tightener |
| `4475.jpg` | Easy Glide Lip Liner |
| `4476.jpg` | Eyelash Growth Serum |
| `4477.jpg` | Hair Removal Cream |
| `4478.jpg` | Longwear Eyeliner |
| `4479.jpg` | Peauvelle Nude Blur Tint |
| `4480.jpg` | Summer Skin Essentials Set |
| `4481.jpg` | Pink Collagen Volume Multi Balm |
| `4482.jpg` | Collagen Tinted Moisturizer |

`.png` and `.webp` are fine too.

## `creatives/` — the Creative Library pool

Cover frames for the 26 creatives in the connect drawer, and the thumbnails in
the Creative Library's media table. Named after the creative, one folder per
kind. 9:16 unless the name says otherwise.

- `video/` — 16 files, e.g. `lp_undereye_hero_9x16.jpg`, `lp_lashserum_2weeks_ba.jpg`
- `image/` — 4 files, e.g. `lp_undereye_still_1x1.png` (1:1), `lp_tightener_still_4x5.png` (4:5)
- `post/` — 3 authorized TikTok posts, named by post id, e.g. `7536098577698717697.jpg`
- `aigc/` — 3 generated cuts, e.g. `symphony_api-20260827-LP1.jpg`

The full list of expected names lives in `src/data/creatives.ts`.

## `covers/` — campaign creative cuts

The per-product cut frames the campaign screen shows beside each promoted
product, and inside "Select creatives by product". Named `<spu>-<index>`,
index starting at 1, in the order the cuts appear (hero, detail, try-on, UGC).

| Files | Product |
| --- | --- |
| `4471-1` `4471-2` `4471-3` | Colored Clay Undereye Corrector |
| `4473-1` `4473-2` | Calcium Dark Spot Eye Cream |
| `4474-1` `4474-2` | Instant Eye Tightener |
| `4475-1` `4475-2` `4475-3` | Easy Glide Lip Liner |
| `4477-1` | Hair Removal Cream |
| `4478-1` `4478-2` `4478-3` `4478-4` | Longwear Eyeliner |

These are the 14 frames the design handoff referenced but did not ship. Missing
ones fall through to the product photo, so partial sets are fine.

`4472`, `4476`, `4480`, `4482` deliberately have none — they are the products the
flow flags as "Catalog image only".

## `brand/` — everything else

Illustrations, logos, diagrams. The creative-to-shoppable-ad illustration used
by both empty states currently lives at `uploads/pasted-1788230779522-0.png`;
a replacement goes here.
