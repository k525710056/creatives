import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BADGE,
  CUTS,
  KIND,
  PROMOTED_PRODUCTS,
  SLUG,
  shorten,
  type PromotedProduct,
} from '../../data/campaign';
import { libraryRoutes } from '../../routes';
import { IconCheck, IconChevronLeft, IconPlus, IconSearch } from '../../components/icons';
import { bg } from './style';
import d from './CampaignDrawers.module.css';

type Tab = 'Video' | 'Image' | 'Catalog';
type Mode = 'Product' | 'Creative';

interface Props {
  list: PromotedProduct[];
  product: PromotedProduct;
  prod: number;
  onPickProduct: (index: number) => void;
  mode: Mode;
  onSetMode: (mode: Mode) => void;
  tab: Tab;
  onSetTab: (tab: Tab) => void;
  sel: number[];
  onSetSel: (sel: number[]) => void;
  urlMode: boolean;
  allScope: boolean;
  onClose: () => void;
  onOpenConnect: () => void;
}

export default function SelectCreativesDrawer({
  list,
  product,
  prod,
  onPickProduct,
  mode,
  onSetMode,
  tab,
  onSetTab,
  sel,
  onSetSel,
  urlMode,
  allScope,
  onClose,
  onOpenConnect,
}: Props) {
  const [query, setQuery] = useState('');

  /** Every creative across the campaign's products, with what it is linked to. */
  const all = PROMOTED_PRODUCTS.flatMap((p) =>
    Array.from({ length: p.videos }, (_, j) => ({
      name: (SLUG[p.spu] ?? 'creative') + '-' + KIND[j % KIND.length],
      badge: BADGE[j % BADGE.length],
      link: 'Linked to 1 SPU · ' + p.spu.replace('SPU ', ''),
      img: p.covers?.[j],
      fallback: p.img,
      orphan: false,
    })),
  ).concat([
    {
      name: 'holiday-teaser',
      badge: '00:18',
      link: 'Not linked to a product',
      img: undefined,
      fallback: PROMOTED_PRODUCTS[0].img,
      orphan: true,
    },
  ]);

  const [allSel, setAllSel] = useState<number[]>(() =>
    all.map((_, i) => i).slice(0, all.length - 1),
  );

  const productMode = mode === 'Product';
  const hasCreatives = product.videos > 0 && tab !== 'Catalog';
  const noCreatives = product.videos === 0 && tab !== 'Catalog';

  const q = query.trim().toLowerCase();
  const railRows = list
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => !q || p.name.toLowerCase().includes(q) || p.spu.toLowerCase().includes(q));

  const tiles = CUTS.slice(0, product.videos);

  const eyeCare = PROMOTED_PRODUCTS.filter((p) =>
    ['SPU 4471', 'SPU 4473', 'SPU 4474'].includes(p.spu),
  ).reduce((n, p) => n + p.videos, 0);
  const productShot = PROMOTED_PRODUCTS.filter((p) => !p.covers).reduce((n, p) => n + p.videos, 0);
  const imageTotal = PROMOTED_PRODUCTS.reduce((n, p) => n + p.images, 0);

  return (
    <>
      <div className={`${d.scrim} ${d.scrimUnder}`} onClick={onClose} />
      <div className={d.drawer} role="dialog" aria-modal="true" aria-label="Select creatives by product">
        <div className={d.drawerHead}>
          <div className={d.drawerHeadLeft}>
            <button type="button" className={d.drawerBack} onClick={onClose} aria-label="Close">
              <IconChevronLeft size={20} />
            </button>
            <div>
              <h2 className={d.drawerTitle}>
                {productMode ? 'Select creatives by product' : 'All creatives'}
              </h2>
              <div className={d.drawerSub}>
                {productMode
                  ? 'Select the creatives from your Creative library for the products selected.'
                  : urlMode
                    ? 'Every creative linked to this destination URL.'
                    : 'Every creative matched from the products in this campaign, with the products it is linked to.'}
              </div>
            </div>
          </div>
          <Link to={libraryRoutes.media('video')} className={d.addCreative}>
            <IconPlus size={14} />
            Add creative
          </Link>
        </div>

        <div className={d.drawerBody}>
          <div className={`${d.drawerRail} ${productMode ? '' : d.drawerRailNarrow}`}>
            <div className={d.railHead}>
              <button
                type="button"
                className={`${d.railTitle} ${productMode ? '' : d.railTitleBack}`}
                onClick={() => onSetMode('Product')}
              >
                {productMode ? 'Products' : '‹ All'}
              </button>
              {productMode ? (
                <button
                  type="button"
                  className={d.railLink}
                  onClick={() => onSetMode('Creative')}
                >
                  View all creatives
                </button>
              ) : null}
            </div>

            {productMode ? (
              <>
                <div className={d.railSearch}>
                  <IconSearch size={16} style={{ color: '#a9abac' }} />
                  <input
                    className={d.railSearchInput}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search product"
                    aria-label="Search product"
                  />
                </div>
                {railRows.map(({ p, i }) => {
                  const gap = p.videos === 0;
                  const active = prod === i;
                  return (
                    <button
                      type="button"
                      key={p.spu}
                      className={`${d.railRow} ${gap ? d.railRowGap : ''} ${active ? d.railRowActive : ''}`}
                      onClick={() => onPickProduct(i)}
                    >
                      <span className={d.railImg} style={bg(p.img)} />
                      <span style={{ minWidth: 0 }}>
                        <span className={d.railNameRow}>
                          <span className={`${d.railName} ${active ? d.railNameActive : ''}`}>
                            {shorten(p.name)}
                          </span>
                          {gap ? (
                            <span className={d.gapMarkSm}>
                              <span className={d.gapDotSm} />
                              <span className={d.gapLabelSm}>Catalog image only</span>
                            </span>
                          ) : null}
                        </span>
                        <span className={`${d.railMeta} ${gap ? d.railMetaGap : ''}`}>
                          {gap
                            ? `${p.spu} · catalog image only`
                            : `${p.spu} · ${p.videos} ${p.videos === 1 ? 'creative' : 'creatives'}`}
                        </span>
                      </span>
                    </button>
                  );
                })}
                <div className={d.railFoot}>
                  <span className={d.railCount}>
                    {urlMode
                      ? `${list.length} products matched`
                      : allScope
                        ? `Showing first ${list.length}`
                        : `${list.length} products`}
                  </span>
                  {allScope ? <a href="#">Load more</a> : null}
                </div>
              </>
            ) : (
              <div className={d.collapsedRail}>
                {list.map((p) => (
                  <div key={p.spu} className={d.collapsedTile} style={bg(p.img)} />
                ))}
              </div>
            )}
          </div>

          {productMode ? (
            <div className={d.drawerMain}>
              <h3 className={d.h3}>Creatives</h3>
              <div className={d.sub}>
                These assets are already linked to this product in your{' '}
                <Link to={libraryRoutes.shoppable}>Creative Library</Link>.
              </div>

              <div className={d.tabs}>
                {(
                  [
                    ['Video', `Video (${product.videos})`],
                    ['Image', `Image (${product.images})`],
                    // A catalog product always carries its own image, so never 0.
                    ['Catalog', 'Catalog (1)'],
                  ] as [Tab, string][]
                ).map(([key, label]) => (
                  <button
                    type="button"
                    key={key}
                    className={`${d.tab} ${tab === key ? d.tabActive : ''}`}
                    onClick={() => onSetTab(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {hasCreatives ? (
                <>
                  <div className={d.filterChips}>
                    <span className={d.filterChip}>All</span>
                    <span className={`${d.filterChip} ${d.filterChipOn}`}>
                      Eye care ({allScope ? 7 : 3})
                    </span>
                    <span className={d.filterChip}>Summer sale (1)</span>
                    <span className={d.filterChip}>Best seller (1)</span>
                    <span className={d.filterChip}>Holiday (1)</span>
                  </div>
                  <div className={d.selRow}>
                    <span className={d.selCount}>
                      {sel.length} of {product.videos} selected
                    </span>
                    <span className={d.selActions}>
                      <button
                        type="button"
                        className={d.selectAll}
                        onClick={() => onSetSel([0, 1, 2].slice(0, product.videos))}
                      >
                        Select all
                      </button>
                      <button type="button" className={d.clearSel} onClick={() => onSetSel([])}>
                        Clear
                      </button>
                    </span>
                  </div>
                </>
              ) : null}

              {tab === 'Catalog' ? (
                <>
                  <div className={d.tileGrid}>
                    <div className={d.tileStatic}>
                      <div className={d.tileMedia} style={bg(product.img)}>
                        <div className={d.tileBadges}>
                          <span className={d.tileBadge}>CATALOG</span>
                        </div>
                      </div>
                      <div className={d.tileCaptionTight}>
                        <div className={d.tileName}>{shorten(product.name)} · catalog image</div>
                        <div className={d.tileMeta}>{product.spu} · from your catalog</div>
                      </div>
                    </div>
                  </div>
                  <p className={d.catalogNote}>
                    Always available, and what the ad falls back to when nothing else is linked.
                  </p>
                </>
              ) : null}

              {hasCreatives ? (
                <div className={d.tileGrid}>
                  {tiles.map((cut, i) => {
                    const on = sel.includes(i);
                    return (
                      <button
                        type="button"
                        key={cut.suffix}
                        className={`${d.tile} ${on ? d.tileOn : ''}`}
                        onClick={() =>
                          onSetSel(on ? sel.filter((x) => x !== i) : [...sel, i])
                        }
                      >
                        <span
                          className={d.tileMedia}
                          style={bg(product.covers?.[i], product.img)}
                        >
                          <span className={d.tileBadges}>
                            <span className={d.tileBadge}>VIDEO</span>
                            <span className={d.tileBadge}>{cut.tag}</span>
                          </span>
                          <span className={`${d.tileMark} ${on ? d.tileMarkOn : ''}`}>
                            {on ? <IconCheck size={12} /> : null}
                          </span>
                          <span className={d.tileDuration}>{cut.badge}</span>
                        </span>
                        <span className={d.tileCaption} style={{ display: 'block' }}>
                          <span className={d.tileName} style={{ display: 'block' }}>
                            {shorten(product.name)} · {cut.suffix}
                          </span>
                          <span className={d.tileMeta} style={{ display: 'block' }}>
                            {cut.meta}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {noCreatives ? (
                <div className={d.emptyState}>
                  <img
                    src="uploads/pasted-1788230779522-0.png"
                    alt="A creative linked to a product becomes a shoppable ad"
                    className={d.emptyArt}
                  />
                  <div className={d.emptyTag}>
                    <span className={d.emptyTagDot} />
                    <span className={d.emptyTagLabel}>Catalog image only</span>
                  </div>
                  <h4 className={d.emptyTitle}>This product has no shoppable content yet</h4>
                  <p className={d.emptyLead}>
                    Right now the ad can only show a still catalog photo. Link this product to a
                    video, a UGC clip or an authorized post and the ad gains a product card, a price
                    and a checkout — that pairing is what a campaign serves.
                  </p>
                  <div className={d.emptyReasons}>
                    <div>
                      <p className={d.emptyReasonTitle}>Buy without leaving</p>
                      <p className={d.emptyReasonBody}>
                        The product card and Shop button ride along with the creative.
                      </p>
                    </div>
                    <div>
                      <p className={d.emptyReasonTitle}>Set it up once</p>
                      <p className={d.emptyReasonBody}>
                        Every future campaign that picks this product gets these creatives.
                      </p>
                    </div>
                    <div>
                      <p className={d.emptyReasonTitle}>Beats a still photo</p>
                      <p className={d.emptyReasonBody}>
                        Catalog imagery alone earns far less watch time in feed.
                      </p>
                    </div>
                  </div>
                  <div className={d.emptyActions}>
                    <button type="button" className={d.emptyPrimary} onClick={onOpenConnect}>
                      Set up shoppable content
                    </button>
                    <Link to={libraryRoutes.media('video')} className={d.emptyBrowse}>
                      Browse creative assets
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className={`${d.drawerMain} ${d.drawerMainCreative}`}>
              <div className={d.creativeCard}>
                <h3 className={`${d.h3} ${d.h3Line}`}>Creatives</h3>
                <div className={d.sub}>
                  {urlMode
                    ? 'Every creative from your Creative Library linked to this destination URL.'
                    : 'Every creative from your Creative Library associated with these products.'}
                </div>
                <div className={d.tabs}>
                  <div className={`${d.tab} ${d.tabActive}`}>Video ({all.length})</div>
                  <div className={d.tab}>Image ({imageTotal})</div>
                  <div className={d.tab}>Catalog (0)</div>
                </div>
                <div className={`${d.selRow} ${d.selRowWrap}`}>
                  <div className={d.filterChips} style={{ marginBottom: 0 }}>
                    <span className={`${d.filterChip} ${d.filterChipOn}`}>All</span>
                    <span className={d.filterChip}>Eye care ({eyeCare})</span>
                    <span className={d.filterChip}>
                      Creator UGC ({Math.max(1, Math.round(all.length / 3))})
                    </span>
                    <span className={d.filterChip}>Product shot ({productShot})</span>
                  </div>
                  <div className={d.selActions}>
                    <span className={d.selCount}>
                      {allSel.length} of {all.length} selected
                    </span>
                    <button
                      type="button"
                      className={d.selectAll}
                      onClick={() => setAllSel(all.map((_, i) => i))}
                    >
                      Select all
                    </button>
                    <button type="button" className={d.clearSel} onClick={() => setAllSel([])}>
                      Clear
                    </button>
                  </div>
                </div>
                <div className={d.tileGrid}>
                  {all.map((c, i) => {
                    const on = allSel.includes(i);
                    return (
                      <button
                        type="button"
                        key={`${c.name}-${i}`}
                        className={`${d.tile} ${d.tileWide} ${on ? d.tileOn : ''}`}
                        onClick={() =>
                          setAllSel((cur) =>
                            cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i],
                          )
                        }
                      >
                        <span className={d.tileMedia} style={bg(c.img, c.fallback)}>
                          <span className={`${d.tileMark} ${on ? d.tileMarkOn : ''}`}>
                            {on ? <IconCheck size={12} /> : null}
                          </span>
                          <span className={d.tileDuration}>{c.badge}</span>
                        </span>
                        <span className={d.tileCaption} style={{ display: 'block' }}>
                          <span className={d.tileName} style={{ display: 'block' }}>
                            {c.name}
                          </span>
                          <span
                            className={`${d.tileMeta} ${c.orphan ? d.tileMetaOrphan : ''}`}
                            style={{ display: 'block' }}
                          >
                            {c.link}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={d.drawerFoot}>
          <button type="button" className={d.btnGhost} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={d.btnPrimary} onClick={onClose}>
            Apply selections
          </button>
        </div>
      </div>
    </>
  );
}
