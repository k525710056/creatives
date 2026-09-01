# OLE 2.0 — shoppable assets flow

Implementation of the Claude Design handoff in `../project`. Four screens, wired
into one clickable flow.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production bundle into dist/
npm run smoke      # headless walk of every screen (see below)
```

## Screens and routes

Routing is hash-based, so the built `dist/` works from any static host or the
file system without server rewrites.

| Route | Source prototype |
| --- | --- |
| `#/` | `OLE 2.0 Onboarding.dc.html` |
| `#/creative-library` | `Creative Library.dc.html` — Overview |
| `#/creative-library/media/:kind` | Creative assets list (`video`, `image`, `post`, `aigc`, `catalog`) |
| `#/creative-library/shoppable` | Shoppable assets list |
| `#/campaign` | `Create OLE 2.0 Campaign: with catalog.dc.html` |

The prototypes linked to each other by filename and hash (`Creative
Library.dc.html#shoppable`). Every one of those links is preserved; the mapping
lives in `src/routes.ts` so there are no hard-coded paths in components.

Two states the design shipped as editor tweaks are reachable as query params:

- `#/creative-library/shoppable?empty=1` — the account-has-none-yet empty state
- `#/campaign?urlMatch=partial` (or `none`) — the Destination URL match outcomes

## Structure

```
src/
  styles/tokens.css        Keystone colours + type, lifted from ds/colors_and_type.css
  components/icons.tsx     33 Keystone glyphs, transcribed from the prototypes
  components/              Ads Manager header, icon rail, checklist panel shell
  data/                    Products, creatives, shoppable assets, campaigns
  features/
    shoppableDrawer/       The reusable connect drawer (link + select modes)
    creativeLibrary/       Shell, Overview, media table, shoppable assets, modal
    onboarding/
    campaign/              Form, product picker, select-creatives drawer
```

`ShoppableContentDrawer` is one component used from three places, matching the
`dc-import` in the prototypes — the Creative Library opens it in `link` mode, and
the campaign opens it in `link` mode with a `backLabel`, which swaps the header's
close X for a back affordance and hides the campaign drawer behind it so only one
panel is ever on screen.

### Styling

Design tokens in `src/styles/tokens.css`, then one CSS Module per component. The
prototypes were built entirely from inline style strings; pixel values, colours
and easing curves are transcribed unchanged, with the conditional variants
(`active`, `selected`, `needs creatives`) becoming modifier classes. Values that
are genuinely data — background image URLs, the readiness arc's dash offset —
still arrive inline, through a `--thumb` custom property the stylesheet consumes.

## Deviations from the prototypes

Everything below is a deliberate choice, not an oversight.

1. **Missing cover images.** The campaign screen references 14 creative cover
   frames (`uploads/pasted-1788221575494-0.png`, `uploads/lipliner-1-trim.png`,
   …) that were not included in the handoff bundle, so those tiles render as grey
   boxes in the prototype. Tiles here layer `url(cover), url(productPhoto)`, so a
   missing cover falls through to the real product photo. Dropping the files into
   `public/uploads/` restores the intended frames with no code change.
2. **Search boxes are real inputs.** Three search fields were static `<span>`
   placeholders in the source (rail products, drawer creatives, shoppable
   assets). They are `<input>`s here and actually filter, which also avoids the
   text-wrapping bug the design already hit and fixed on the global search field.
3. **The rail's Catalog SPU | URL toggle sits below the divider,** at the same
   level as the creatives pane's kind tabs. The source markup had drifted so the
   toggle was nested inside the title block, which would have broken the aligned
   title areas the design explicitly asked for; the intent is what is built.
4. **`presetProduct` is applied every time the drawer opens,** not once on mount.
   In the prototype the campaign could open the connect drawer for product B and
   still see product A pre-selected.
5. **Dead markup dropped.** The Creative Library template carried duplicated
   table-row fragments left over from an earlier edit, sitting outside their
   `sc-for` loop where their template holes could never resolve. They rendered
   nothing and are not reproduced.
6. **Two creative datasets, kept separate.** The Creative Library's media table
   and the drawer's selection grid ran on different arrays in the prototypes —
   the table needs review status, source and spend, which the drawer never shows.
   `data/library.ts` and `data/creatives.ts` preserve that split rather than
   inventing a merge. Worth reconciling if this goes near a real API.

## Known data notes

- Product imagery comes from `getlevplus.com`'s Shopify CDN and the Creative
  Library's media table still uses Unsplash thumbnails, exactly as the design
  does. Both need outbound network access; in a sandbox they fail and the tiles
  fall back to their placeholder colour.
- `Campaign No Shoppable Content.dc.html` and `Flow Map.dc.html` are referenced
  by the prototypes but are not in the bundle. The Campaigns entry in the icon
  rail points at the campaign screen that does exist; the Flow map buttons were
  already removed from the design.
- Counts, spend and "last sync 2 hours ago" are the design's placeholder values.

## Smoke test

`smoke.mjs` loads every screen and walks the main flow — create a shoppable
asset, see it sync into the list, open a creative preview, hit the campaign's
empty state and cross into the connect drawer — failing on any page error, blank
screen, or unresolved template hole. It needs a running preview server:

```bash
npm run build
npx vite preview --port 4173 &
npm run smoke
# PW_CHROME=/path/to/chrome npm run smoke   # to reuse a pre-installed Chromium
```
