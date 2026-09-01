import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROMOTED, shorten, type PromotedProduct } from '../../data/campaign';
import {
  CATALOG_CREATIVES,
  creativeBadge,
  creativeMeta,
  kindLabel,
  type Creative,
} from '../../data/creatives';
import { bg } from '../../data/media';
import { libraryRoutes } from '../../routes';
import { IconCheck, IconChevronLeft, IconPlus, IconSearch } from '../../components/icons';
import d from './CampaignDrawers.module.css';

type Tab = 'Video' | 'Image' | 'Catalog';
type Mode = 'Product' | 'Creative';

interface Props {
  list: PromotedProduct[];
  entry: PromotedProduct;
  prod: number;
  onPickProduct: (index: number) => void;
  mode: Mode;
  onSetMode: (mode: Mode) => void;
  tab: Tab;
  onSetTab: (tab: Tab) => void;
  sel: string[];
  onSetSel: (sel: string[]) => void;
  urlMode: boolean;
  allScope: boolean;
  onClose: () => void;
  onOpenConnect: () => void;
}

export default function SelectCreativesDrawer({
  list,
  entry,
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

  const { product, creatives } = entry;
  const productMode = mode === 'Product';

  /** The catalog photo is always available, and is what the ad falls back to. */
  const catalogCreative = CATALOG_CREATIVES.find((c) => c.name.startsWith(product.sku));

  const inTab: Creative[] =
    tab === 'Catalog'
      ? catalogCreative
        ? [catalogCreative]
        : []
      : creatives.filter((c) => (tab === 'Video' ? c.kind === 'video' : c.kind === 'image'));

  const hasCreatives = inTab.length > 0 && tab !== 'Catalog';
  const noCreatives = creatives.length === 0 && tab !== 'Catalog';

  const q = query.trim().toLowerCase();
  const railRows = list
    .map((entryRow, i) => ({ entryRow, i }))
    .filter(
      ({ entryRow }) =>
        !q ||
        entryRow.product.name.toLowerCase().includes(q) ||
        entryRow.product.sku.toLowerCase().includes(q),
    );

  /** Every creative this campaign could serve, with the product it belongs to. */
  const all = list.flatMap((row) =>
    row.creatives.map((c) => ({ creative: c, sku: row.product.sku })),
  );
  const [allSel, setAllSel] = useState<string[]>(() => all.map((x) => x.creative.id));

  const tagCount = (tag: string) => all.filter((x) => x.creative.tags.includes(tag)).length;

  const toggle = (id: string) =>
    onSetSel(sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]);

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
                <button type="button" className={d.railLink} onClick={() => onSetMode('Creative')}>
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
                {railRows.map(({ entryRow, i }) => {
                  const gap = entryRow.catalogOnly;
                  const active = prod === i;
                  return (
                    <button
                      type="button"
                      key={entryRow.product.id}
                      className={`${d.railRow} ${gap ? d.railRowGap : ''} ${active ? d.railRowActive : ''}`}
                      onClick={() => onPickProduct(i)}
                    >
                      <span className={d.railImg} style={bg(entryRow.product.photo)} />
                      <span style={{ minWidth: 0 }}>
                        <span className={d.railNameRow}>
                          <span className={`${d.railName} ${active ? d.railNameActive : ''}`}>
                            {shorten(entryRow.product.name)}
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
                            ? `${entryRow.product.sku} · catalog image only`
                            : `${entryRow.product.sku} · ${entryRow.creatives.length} ${entryRow.creatives.length === 1 ? 'creative' : 'creatives'}`}
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
                {list.map((row) => (
                  <div
                    key={row.product.id}
                    className={d.collapsedTile}
                    style={bg(row.product.photo)}
                  />
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
                    ['Video', `Video (${entry.videos})`],
                    ['Image', `Image (${entry.images})`],
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
                    <span className={`${d.filterChip} ${d.filterChipOn}`}>All</span>
                    {Array.from(new Set(inTab.flatMap((c) => c.tags))).map((t) => (
                      <span key={t} className={d.filterChip}>
                        {t} ({inTab.filter((c) => c.tags.includes(t)).length})
                      </span>
                    ))}
                  </div>
                  <div className={d.selRow}>
                    <span className={d.selCount}>
                      {inTab.filter((c) => sel.includes(c.id)).length} of {inTab.length} selected
                    </span>
                    <span className={d.selActions}>
                      <button
                        type="button"
                        className={d.selectAll}
                        onClick={() =>
                          onSetSel(Array.from(new Set([...sel, ...inTab.map((c) => c.id)])))
                        }
                      >
                        Select all
                      </button>
                      <button
                        type="button"
                        className={d.clearSel}
                        onClick={() => onSetSel(sel.filter((id) => !inTab.some((c) => c.id === id)))}
                      >
                        Clear
                      </button>
                    </span>
                  </div>
                </>
              ) : null}

              {tab === 'Catalog' && catalogCreative ? (
                <>
                  <div className={d.tileGrid}>
                    <div className={d.tileStatic}>
                      <div className={d.tileMedia} style={bg(catalogCreative.media)}>
                        <div className={d.tileBadges}>
                          <span className={d.tileBadge}>CATALOG</span>
                        </div>
                      </div>
                      <div className={d.tileCaptionTight}>
                        <div className={d.tileName}>{shorten(product.name)} · catalog image</div>
                        <div className={d.tileMeta}>{product.sku} · from your catalog</div>
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
                  {inTab.map((c) => {
                    const on = sel.includes(c.id);
                    return (
                      <button
                        type="button"
                        key={c.id}
                        className={`${d.tile} ${on ? d.tileOn : ''}`}
                        onClick={() => toggle(c.id)}
                      >
                        <span className={d.tileMedia} style={bg(c.media)}>
                          <span className={d.tileBadges}>
                            <span className={d.tileBadge}>{kindLabel(c.kind).toUpperCase()}</span>
                            <span className={d.tileBadge}>{c.tags[0]?.toUpperCase()}</span>
                          </span>
                          <span className={`${d.tileMark} ${on ? d.tileMarkOn : ''}`}>
                            {on ? <IconCheck size={12} /> : null}
                          </span>
                          <span className={d.tileDuration}>{creativeBadge(c)}</span>
                        </span>
                        <span className={d.tileCaption} style={{ display: 'block' }}>
                          <span className={d.tileName} style={{ display: 'block' }}>
                            {c.name}
                          </span>
                          <span className={d.tileMeta} style={{ display: 'block' }}>
                            {creativeMeta(c)}
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
                  <div className={`${d.tab} ${d.tabActive}`}>
                    Video ({all.filter((x) => x.creative.kind === 'video').length})
                  </div>
                  <div className={d.tab}>
                    Image ({all.filter((x) => x.creative.kind === 'image').length})
                  </div>
                  <div className={d.tab}>Catalog ({PROMOTED.length})</div>
                </div>
                <div className={`${d.selRow} ${d.selRowWrap}`}>
                  <div className={d.filterChips} style={{ marginBottom: 0 }}>
                    <span className={`${d.filterChip} ${d.filterChipOn}`}>All</span>
                    {['Eye care', 'UGC', 'Hero'].map((t) => (
                      <span key={t} className={d.filterChip}>
                        {t} ({tagCount(t)})
                      </span>
                    ))}
                  </div>
                  <div className={d.selActions}>
                    <span className={d.selCount}>
                      {allSel.length} of {all.length} selected
                    </span>
                    <button
                      type="button"
                      className={d.selectAll}
                      onClick={() => setAllSel(all.map((x) => x.creative.id))}
                    >
                      Select all
                    </button>
                    <button type="button" className={d.clearSel} onClick={() => setAllSel([])}>
                      Clear
                    </button>
                  </div>
                </div>
                <div className={d.tileGrid}>
                  {all.map(({ creative, sku }) => {
                    const on = allSel.includes(creative.id);
                    return (
                      <button
                        type="button"
                        key={`${sku}-${creative.id}`}
                        className={`${d.tile} ${d.tileWide} ${on ? d.tileOn : ''}`}
                        onClick={() =>
                          setAllSel((cur) =>
                            cur.includes(creative.id)
                              ? cur.filter((x) => x !== creative.id)
                              : [...cur, creative.id],
                          )
                        }
                      >
                        <span className={d.tileMedia} style={bg(creative.media)}>
                          <span className={`${d.tileMark} ${on ? d.tileMarkOn : ''}`}>
                            {on ? <IconCheck size={12} /> : null}
                          </span>
                          <span className={d.tileDuration}>{creativeBadge(creative)}</span>
                        </span>
                        <span className={d.tileCaption} style={{ display: 'block' }}>
                          <span className={d.tileName} style={{ display: 'block' }}>
                            {creative.name}
                          </span>
                          <span className={d.tileMeta} style={{ display: 'block' }}>
                            Linked to {sku}
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
