import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CREATIVES,
  LINKED,
  SELECTABLE_KINDS,
  creativeBadge,
  creativeMeta,
  kindLabel,
  linkedCount,
  productsUsing,
  type CreativeKind,
} from '../../data/creatives';
import { bg } from '../../data/media';
import { PRODUCTS, findProductOwningUrl, productUrl, type Product } from '../../data/products';
import { libraryRoutes, routes } from '../../routes';
import {
  IconCheck,
  IconChevronLeft,
  IconClose,
  IconEye,
  IconMoreHorizontal,
  IconPlus,
  IconSearch,
} from '../../components/icons';
import s from './ShoppableContentDrawer.module.css';

const SEEN_KEY = 'ole2_shoppable_wizard_seen';

const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
const stripProtocol = (u: string) => u.replace(/^https?:\/\//, '');

/** Only assembled creatives can be picked — catalog imagery is the fallback. */
const POOL = CREATIVES.filter((c) => c.kind !== 'catalog');

export interface SavedShoppableAsset {
  name: string;
  status: 'live' | 'paused';
  creatives: number;
  destination: string;
  campaigns: number;
  reusable: boolean;
}

export interface ShoppableContentDrawerProps {
  open: boolean;
  /** `link` builds the relationship; `select` picks which existing links run. */
  mode?: 'link' | 'select';
  hasCatalog?: boolean;
  /** When set the header shows a back affordance instead of a close X. */
  backLabel?: string;
  /** SPU or product id the drawer opens already focused on. */
  presetProduct?: string;
  onClose: () => void;
  onDone?: (result: SavedShoppableAsset) => void;
}

export default function ShoppableContentDrawer({
  open,
  mode = 'link',
  hasCatalog: hasCatalogProp,
  backLabel,
  presetProduct,
  onClose,
  onDone,
}: ShoppableContentDrawerProps) {
  const selectMode = mode === 'select';
  const hasCatalog = hasCatalogProp !== false;

  const [step, setStep] = useState<'intro' | 'build'>('intro');
  const [nameEdited, setNameEdited] = useState<string | null>(null);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [url, setUrl] = useState('');
  const [kindTab, setKindTab] = useState<CreativeKind>('video');
  const [tag, setTag] = useState('All');
  const [query, setQuery] = useState('');
  const [productQuery, setProductQuery] = useState('');
  const [needyOnly, setNeedyOnly] = useState(false);
  const [source, setSource] = useState<'catalog' | 'url'>('catalog');
  const [searchOpen, setSearchOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [creatives, setCreatives] = useState<string[]>([]);

  /**
   * Runs on each open rather than once on mount: the campaign can hand the
   * drawer a different product every time it reopens it.
   */
  useEffect(() => {
    if (!open) return;
    const preset = presetProduct
      ? PRODUCTS.find((x) => x.sku === presetProduct || x.id === presetProduct)
      : null;
    if (preset) {
      setProductIds([preset.id]);
      setUrl(productUrl(preset));
      setStep('build');
      return;
    }
    let seen = false;
    try {
      seen = window.localStorage.getItem(SEEN_KEY) === '1';
    } catch {
      seen = false;
    }
    if (seen) setStep('build');
  }, [open, presetProduct]);

  const markSeen = () => {
    try {
      window.localStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* private browsing — the intro simply shows again */
    }
  };

  const resolved = useMemo(() => findProductOwningUrl(url), [url]);
  const chosenProducts = useMemo(
    () => PRODUCTS.filter((p) => productIds.includes(p.id)),
    [productIds],
  );
  const product = chosenProducts[0] ?? null;
  const hasUrl = url.trim().length > 6;
  const destReady = selectMode ? Boolean(product) : chosenProducts.length > 0 || hasUrl;
  const assetCount = Math.max(
    chosenProducts.length,
    hasUrl && chosenProducts.length === 0 ? 1 : 0,
  );

  const linkedIds = product ? LINKED[product.id] ?? [] : [];
  const pool = selectMode ? POOL.filter((a) => linkedIds.includes(a.id)) : POOL;
  const inKind = pool.filter((a) => a.kind === kindTab);
  const q = query.trim().toLowerCase();
  const visible = inKind.filter(
    (a) =>
      (tag === 'All' || a.tags.includes(tag)) &&
      (!q ||
        a.name.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        creativeMeta(a).toLowerCase().includes(q)),
  );
  const chosen = POOL.filter((a) => creatives.includes(a.id));
  const ready = destReady && chosen.length > 0;

  // In select mode the campaign hands over its own products; the catalog is
  // the whole list otherwise.
  const scoped = selectMode ? PRODUCTS.filter((p) => linkedCount(p.id) > 0) : PRODUCTS;
  const needy = scoped.filter((p) => linkedCount(p.id) === 0);
  const pq = productQuery.trim().toLowerCase();
  // Products carrying nothing but catalog imagery lead — they are the work to do.
  const railProducts = (needyOnly ? needy : scoped)
    .filter((p) => !pq || p.name.toLowerCase().includes(pq) || p.sku.toLowerCase().includes(pq))
    .slice()
    .sort((a, b) => (linkedCount(a.id) === 0 ? 0 : 1) - (linkedCount(b.id) === 0 ? 0 : 1));

  const tagNames = ['All', ...Array.from(new Set(inKind.flatMap((a) => a.tags)))];

  const destLabel = () => {
    const u = stripProtocol(url.trim());
    if (chosenProducts.length > 1) return `${chosenProducts.length} products`;
    if (chosenProducts.length === 1) {
      return `${chosenProducts[0].sku} · ${stripProtocol(productUrl(chosenProducts[0]))}`;
    }
    if (u.length > 6) return `URL · ${u}`;
    return '';
  };

  const defaultName = () => {
    if (chosenProducts.length > 1) return `${chosenProducts.length} assets, named per product`;
    if (chosenProducts[0]) return `LEVPLUS — ${chosenProducts[0].name}`;
    const u = url.trim();
    if (u) return 'LEVPLUS — ' + stripProtocol(u).slice(0, 44);
    return 'Untitled shoppable asset';
  };

  const currentName = nameEdited === null ? defaultName() : nameEdited;

  /** Link mode is many-to-many: each picked product becomes its own asset. */
  const pickProduct = (p: Product) => {
    const has = productIds.includes(p.id);
    setTag('All');
    if (selectMode) {
      setProductIds(has ? [] : [p.id]);
      setCreatives([]);
      return;
    }
    setProductIds(has ? productIds.filter((id) => id !== p.id) : [...productIds, p.id]);
  };

  const typeUrl = (value: string) => {
    const owner = findProductOwningUrl(value);
    setUrl(value);
    if (owner && !productIds.includes(owner.id)) setProductIds([...productIds, owner.id]);
  };

  const toggleCreative = (id: string) =>
    setCreatives((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const save = () => {
    if (!ready) return;
    markSeen();
    if (selectMode) {
      onDone?.({
        name: destLabel(),
        status: 'live',
        creatives: chosen.length,
        destination: destLabel(),
        campaigns: 0,
        reusable: false,
      });
      return;
    }
    // Each picked product becomes its own asset, carrying the same creatives.
    const targets = chosenProducts.length
      ? chosenProducts.map((p) => ({
          name: nameEdited && chosenProducts.length === 1 ? nameEdited : `LEVPLUS — ${p.name}`,
          destination: `${p.sku} · ${stripProtocol(productUrl(p))}`,
        }))
      : [{ name: currentName, destination: destLabel() }];

    targets.forEach((target) => {
      onDone?.({
        name: target.name,
        status: 'live',
        creatives: chosen.length,
        destination: target.destination,
        campaigns: 0,
        reusable: true,
      });
    });

    setFlash(
      `${plural(targets.length, 'shoppable asset')} saved — ${plural(chosen.length, 'creative')} linked to ${
        targets.length === 1 ? targets[0].destination : plural(targets.length, 'product')
      }.`,
    );
    setNameEdited(null);
    setProductIds([]);
    setUrl('');
    setCreatives([]);
    setQuery('');
    setPreviewId(null);
  };

  if (!open) return null;

  const catalogSource = selectMode || source === 'catalog';
  const urlSource = !selectMode && source === 'url';
  const previewAsset =
    visible.find((a) => a.id === previewId) ?? POOL.find((a) => a.id === previewId);

  const stepPreview = (delta: number) => {
    if (!previewAsset || visible.length < 2) return;
    const i = visible.findIndex((a) => a.id === previewAsset.id);
    if (i === -1) return;
    setPreviewId(visible[(i + delta + visible.length) % visible.length].id);
  };

  return (
    <div className={s.overlay}>
      <div className={s.scrim} onClick={onClose} />
      <div className={s.panel} role="dialog" aria-modal="true" aria-label="Create shoppable asset">
        <div className={s.head}>
          <div className={s.headLeft}>
            {backLabel ? (
              <button type="button" className={s.back} onClick={onClose}>
                <IconChevronLeft size={14} />
                <span className={s.backLabel}>{backLabel}</span>
              </button>
            ) : null}
            <div style={{ minWidth: 0 }}>
              <h2 className={s.headline}>
                {selectMode ? 'Select creatives by product' : 'Create shoppable asset'}
              </h2>
              <div className={s.subtitle}>
                {selectMode
                  ? 'Choose which of the creatives already linked to these products this campaign runs.'
                  : 'Pick a product, then the creatives that should serve for it.'}
              </div>
            </div>
          </div>
          <button type="button" className={s.close} onClick={onClose} title="Close">
            <IconClose size={18} />
          </button>
        </div>

        {step === 'intro' ? (
          <div className={s.intro}>
            <div className={s.introInner}>
              <h3 className={s.introTitle}>You are connecting two things</h3>
              <p className={s.introLead}>
                A product on one side, creatives on the other. When a campaign selects that product,
                these are the creatives it serves — so you build it once and reuse it.
              </p>
              <div className={s.introDiagram}>
                <div className={s.introSide}>
                  <p className={s.introSideTitle}>Product</p>
                  <p className={s.introSideBody}>
                    A catalog SPU with its URL, or a URL on its own. A SPU always carries a URL, so
                    those two are the only ways a product is represented.
                  </p>
                </div>
                <span className={s.introArrow}>→</span>
                <div className={s.introSide}>
                  <p className={s.introSideTitle}>Creatives</p>
                  <p className={s.introSideBody}>
                    Any number of videos, images, TikTok posts or AI cuts. All of them become
                    eligible to serve for that product.
                  </p>
                </div>
              </div>
              <div className={s.introActions}>
                <button type="button" className={s.introPrimary} onClick={() => setStep('build')}>
                  Get started
                </button>
                <button
                  type="button"
                  className={s.introSkip}
                  onClick={() => {
                    markSeen();
                    setStep('build');
                  }}
                >
                  Skip — I have done this before
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {flash ? (
              <div className={s.flash}>
                <div className={s.flashMark}>
                  <IconCheck size={13} />
                </div>
                <p className={s.flashText}>{flash}</p>
                <Link to={routes.campaign} className={s.flashCta}>
                  Create campaign
                </Link>
                <button
                  type="button"
                  className={s.flashDismiss}
                  onClick={() => setFlash(null)}
                  title="Dismiss"
                >
                  <IconClose size={12} />
                </button>
              </div>
            ) : null}

            {!selectMode ? (
              <div className={s.summary}>
                <div className={s.summaryLeft}>
                  <span className={s.summaryEyebrow}>Building</span>
                  <div className={s.summaryChips}>
                    <span
                      className={`${s.chip} ${chosenProducts.length || hasUrl ? s.chipFilled : s.chipEmpty}`}
                    >
                      {chosenProducts.length > 1
                        ? plural(chosenProducts.length, 'product')
                        : chosenProducts.length === 1
                          ? chosenProducts[0].sku
                          : hasUrl
                            ? 'URL'
                            : 'Product'}
                    </span>
                    <span className={s.summaryOp}>+</span>
                    <span className={`${s.chip} ${chosen.length ? s.chipFilled : s.chipEmpty}`}>
                      {chosen.length ? plural(chosen.length, 'creative') : 'Creatives'}
                    </span>
                    <span className={s.summaryOp}>=</span>
                    <span className={`${s.chip} ${ready ? s.chipResult : s.chipEmpty}`}>
                      {assetCount > 1 ? plural(assetCount, 'shoppable asset') : '1 shoppable asset'}
                    </span>
                  </div>
                </div>
                <div className={s.summaryName}>
                  <span className={s.summaryNameLabel}>Name</span>
                  <input
                    className={s.nameInput}
                    value={currentName}
                    onChange={(e) => setNameEdited(e.target.value)}
                    aria-label="Shoppable asset name"
                  />
                </div>
              </div>
            ) : null}

            <div className={s.panes}>
              <div className={`${s.rail} ${selectMode ? s.railFirst : ''}`}>
                <div className={s.paneHead}>
                  <div className={s.paneHeadRow}>
                    <span className={`${s.stepDot} ${destReady ? s.stepDotDone : ''}`}>2</span>
                    <h3 className={s.paneTitle}>{selectMode ? 'Product' : 'Products to sell'}</h3>
                    <span className={s.paneMeta}>
                      {selectMode
                        ? `${railProducts.length} in this campaign`
                        : chosenProducts.length
                          ? `${chosenProducts.length} selected`
                          : hasCatalog
                            ? 'Select one or more'
                            : 'URL only'}
                    </span>
                  </div>
                  <p className={s.paneHelp}>
                    {selectMode
                      ? 'From this campaign. Pick one to see the creatives already linked to it.'
                      : 'Each product you pick becomes its own shoppable asset. A product is a catalog SPU or a URL.'}
                  </p>
                </div>

                {!selectMode ? (
                  <div className={s.sourceTabs}>
                    <div className={s.sourceTabsInner}>
                      <button
                        type="button"
                        className={`${s.sourceTab} ${source === 'catalog' ? s.sourceTabActive : ''}`}
                        onClick={() => setSource('catalog')}
                      >
                        Catalog SPU
                      </button>
                      <button
                        type="button"
                        className={`${s.sourceTab} ${source === 'url' ? s.sourceTabActive : ''}`}
                        onClick={() => setSource('url')}
                      >
                        URL
                      </button>
                    </div>
                  </div>
                ) : null}

                {urlSource ? (
                  <div className={s.urlBlock}>
                    <input
                      className={s.urlInput}
                      value={url}
                      onChange={(e) => typeUrl(e.target.value)}
                      placeholder="https://www.getlevplus.com/products/…"
                      aria-label="Destination URL"
                    />
                    {resolved ? (
                      <div className={s.urlResolved}>
                        <div className={s.urlResolvedThumb} style={bg(resolved.photo)} />
                        <div className={s.urlResolvedText}>
                          <strong style={{ fontWeight: 600 }}>{resolved.sku}</strong> owns this URL,
                          so it has been selected for you.
                        </div>
                      </div>
                    ) : null}
                    {hasUrl && !resolved ? (
                      <div className={s.urlUnresolved}>
                        No catalog SPU owns this URL, so this product is the URL on its own. It works
                        in a campaign, but carries no price or stock.
                      </div>
                    ) : null}
                    {!hasUrl ? (
                      <p className={s.urlHint}>
                        Use this for a landing page or a collection that has no SPU behind it.
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {catalogSource && !hasCatalog ? (
                  <div className={s.noCatalog}>
                    <div className={s.noCatalogCard}>
                      <p className={s.noCatalogTitle}>No catalog connected</p>
                      <p className={s.noCatalogBody}>
                        SPUs come from a catalog. Connect one to pick products by SPU, or switch to
                        URL above.
                      </p>
                      <Link to={libraryRoutes.media('catalog')} className={s.noCatalogCta}>
                        Connect Catalog Manager
                      </Link>
                    </div>
                  </div>
                ) : null}

                {catalogSource && hasCatalog ? (
                  <>
                    <div className={s.railControls}>
                      <span
                        className={`${s.coverage} ${needy.length === 0 ? s.coverageComplete : ''}`}
                      >
                        {needy.length === 0
                          ? `All ${scoped.length} products have creatives`
                          : `${needy.length} of ${scoped.length} products still need creatives`}
                      </span>
                      <div className={s.railSearch}>
                        <IconSearch size={15} className={s.railSearchIcon} />
                        <input
                          className={s.railSearchInput}
                          value={productQuery}
                          onChange={(e) => setProductQuery(e.target.value)}
                          placeholder={
                            selectMode
                              ? `Search ${scoped.length} products in this campaign`
                              : `Search ${scoped.length} products`
                          }
                          aria-label="Search products"
                        />
                      </div>
                    </div>

                    <div className={s.railList}>
                      {railProducts.map((p) => {
                        const active = productIds.includes(p.id);
                        const n = linkedCount(p.id);
                        return (
                          <button
                            type="button"
                            key={p.id}
                            className={`${s.productRow} ${active ? s.productRowActive : ''}`}
                            onClick={() => pickProduct(p)}
                          >
                            <span className={`${s.checkbox} ${active ? s.checkboxOn : ''}`}>
                              {active ? <IconCheck size={11} /> : null}
                            </span>
                            <div className={s.productThumb} style={bg(p.photo)} />
                            <div className={s.productBody}>
                              <div
                                className={`${s.productName} ${active ? s.productNameActive : ''}`}
                              >
                                {p.name}
                              </div>
                              <div className={s.productStatusRow}>
                                <span
                                  className={`${s.statusDot} ${n === 0 ? s.statusDotGap : ''}`}
                                />
                                <span
                                  className={`${s.statusLabel} ${n === 0 ? s.statusLabelGap : ''}`}
                                >
                                  {n === 0 ? 'Catalog image only' : plural(n, 'creative')}
                                </span>
                                <span className={s.statusSep}>·</span>
                                <span className={s.productMeta}>{p.sku}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                      <div className={s.railFoot}>
                        <span className={s.railCount}>
                          {needyOnly
                            ? `${railProducts.length} without creatives`
                            : `${railProducts.length} products`}
                        </span>
                        {railProducts.length < scoped.length ? (
                          <button
                            type="button"
                            className={s.railShowAll}
                            onClick={() => {
                              setNeedyOnly(false);
                              setProductQuery('');
                            }}
                          >
                            Show all {scoped.length}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              <div className={`${s.creativePane} ${selectMode ? s.creativePaneSecond : ''}`}>
                {selectMode && !destReady ? (
                  <div className={s.destPending}>
                    <span className={s.destPendingMark}>←</span>
                    <p className={s.destPendingCopy}>
                      Pick a product on the left to see the creatives already linked to it.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className={s.creativeHead}>
                      <div style={{ minWidth: 0 }}>
                        <div className={s.paneHeadRow}>
                          <span
                            className={`${s.stepDot} ${chosen.length ? s.stepDotDone : ''}`}
                          >
                            1
                          </span>
                          <h3 className={s.paneTitle}>
                            {selectMode ? 'Creatives to run' : 'Creatives to link'}
                          </h3>
                        </div>
                        <div className={s.creativeSubtitle}>
                          {selectMode
                            ? 'These assets are already linked to this product in your Creative Library.'
                            : `Any creative you add becomes eligible to serve for ${destLabel() || 'this product'}.`}
                        </div>
                      </div>
                      <Link to={libraryRoutes.media('video')} className={s.addCreative}>
                        <IconPlus size={13} />
                        Add creative
                      </Link>
                    </div>

                    <div className={s.controls}>
                      <div className={s.kindTabs}>
                        {SELECTABLE_KINDS.map((k) => {
                          const n = pool.filter((a) => a.kind === k.key).length;
                          return (
                            <button
                              type="button"
                              key={k.key}
                              className={`${s.kindTab} ${k.key === kindTab ? s.kindTabActive : ''}`}
                              onClick={() => {
                                setKindTab(k.key);
                                setTag('All');
                              }}
                            >
                              {k.label} ({n})
                            </button>
                          );
                        })}
                      </div>
                      <div className={s.controlsRight}>
                        <span className={s.selCount}>
                          {visible.filter((a) => creatives.includes(a.id)).length} of{' '}
                          {visible.length} selected
                        </span>
                        <button
                          type="button"
                          className={`${s.iconToggle} ${searchOpen || q ? s.toggleOn : ''}`}
                          title="Search creatives"
                          onClick={() => {
                            setSearchOpen(!searchOpen);
                            setMenuOpen(false);
                          }}
                        >
                          <IconSearch size={15} />
                        </button>
                        <button
                          type="button"
                          className={`${s.textToggle} ${filtersOpen || tag !== 'All' ? s.toggleOn : ''}`}
                          onClick={() => {
                            setFiltersOpen(!filtersOpen);
                            setMenuOpen(false);
                          }}
                        >
                          {tag === 'All' ? 'Filter' : `Filter · ${tag}`}
                        </button>
                        <div className={s.menuWrap}>
                          <button
                            type="button"
                            className={`${s.iconToggle} ${menuOpen ? s.toggleOn : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="More selection actions"
                          >
                            <IconMoreHorizontal size={15} />
                          </button>
                          {menuOpen ? (
                            <div className={s.menu}>
                              <button
                                type="button"
                                className={s.menuItem}
                                onClick={() => {
                                  setCreatives((cur) =>
                                    Array.from(new Set([...cur, ...visible.map((a) => a.id)])),
                                  );
                                  setMenuOpen(false);
                                }}
                              >
                                Select all in view
                              </button>
                              <button
                                type="button"
                                className={s.menuItem}
                                onClick={() => {
                                  setCreatives((cur) =>
                                    cur.filter((id) => !visible.some((a) => a.id === id)),
                                  );
                                  setMenuOpen(false);
                                }}
                              >
                                Clear selection
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {searchOpen ? (
                      <div className={s.searchBand}>
                        <div className={s.searchBox}>
                          <IconSearch size={15} className={s.railSearchIcon} />
                          <input
                            className={s.searchInput}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={`Search ${pool.length} creatives by name or tag`}
                            aria-label="Search creatives"
                          />
                          <button
                            type="button"
                            className={s.searchDone}
                            onClick={() => {
                              setSearchOpen(false);
                              setQuery('');
                            }}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {filtersOpen ? (
                      <div className={s.tagBand}>
                        {tagNames.map((t) => {
                          const n =
                            t === 'All'
                              ? inKind.length
                              : inKind.filter((a) => a.tags.includes(t)).length;
                          return (
                            <button
                              type="button"
                              key={t}
                              className={`${s.tagChip} ${t === tag ? s.tagChipActive : ''}`}
                              onClick={() => setTag(t)}
                            >
                              {t === 'All' ? 'All' : `${t} (${n})`}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    <div className={s.cardScroll}>
                      {visible.length > 0 ? (
                        <div className={s.cardGrid}>
                          {visible.map((a) => {
                            const checked = creatives.includes(a.id);
                            const kind = kindLabel(a.kind).toUpperCase();
                            return (
                              <div
                                key={a.id}
                                className={`${s.card} ${checked ? s.cardChecked : ''}`}
                              >
                                <div
                                  className={s.cardMedia}
                                  onClick={() => toggleCreative(a.id)}
                                  role="button"
                                  tabIndex={0}
                                  onKeyDown={(e) => e.key === 'Enter' && toggleCreative(a.id)}
                                  aria-pressed={checked}
                                  aria-label={`Select ${a.name}`}
                                >
                                  <div className={s.cardImage} style={bg(a.media)} />
                                  <div className={s.cardBadges}>
                                    <span className={s.cardBadge}>{kind}</span>
                                    <span className={s.cardBadge}>{a.tags[0]?.toUpperCase()}</span>
                                  </div>
                                  <div
                                    className={`${s.cardMark} ${checked ? s.cardMarkOn : ''}`}
                                  >
                                    {checked ? (
                                      <IconCheck size={12} style={{ color: '#fff' }} />
                                    ) : null}
                                  </div>
                                  <div className={s.cardDuration}>{creativeBadge(a)}</div>
                                  {/* Sits inside the toggling image, so it must not bubble. */}
                                  <button
                                    type="button"
                                    className={s.cardPreview}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPreviewId(a.id);
                                    }}
                                  >
                                    <IconEye size={11} />
                                    Preview
                                  </button>
                                </div>
                                <div className={s.cardCaption}>
                                  <div
                                    className={s.cardName}
                                    onClick={() => setPreviewId(a.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && setPreviewId(a.id)}
                                  >
                                    {a.name}
                                  </div>
                                  <div className={s.cardMeta}>{creativeMeta(a)}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className={s.cardsEmpty}>
                          <div className={s.cardsEmptyTitle}>
                            {q
                              ? 'No matching creatives'
                              : selectMode
                                ? 'No creatives linked to this product'
                                : 'Nothing here yet'}
                          </div>
                          <div className={s.cardsEmptyBody}>
                            {q
                              ? `Nothing matches “${query.trim()}”. Try a different name or tag.`
                              : selectMode
                                ? 'Link one in your Creative Library, or add a creative above.'
                                : 'Upload or generate a creative, or clear the filter above.'}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {previewAsset ? (
              <div className={s.previewOverlay}>
                <div className={s.previewScrim} onClick={() => setPreviewId(null)} />
                <div className={s.previewCard}>
                  <div className={s.previewMedia}>
                    <div className={s.previewImage} style={bg(previewAsset.media)} />
                    <div className={s.previewBadge}>{creativeBadge(previewAsset)}</div>
                  </div>
                  <div className={s.previewBody}>
                    <div className={s.previewTop}>
                      <div style={{ minWidth: 0 }}>
                        <div className={s.previewChips}>
                          <span className={s.previewChip}>{kindLabel(previewAsset.kind)}</span>
                          {previewAsset.tags.map((t) => (
                            <span key={t} className={s.previewChip}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <p className={s.previewName}>{previewAsset.name}</p>
                        <p className={s.previewMeta}>{creativeMeta(previewAsset)}</p>
                      </div>
                      <button
                        type="button"
                        className={s.previewClose}
                        onClick={() => setPreviewId(null)}
                        aria-label="Close preview"
                      >
                        <IconClose size={18} />
                      </button>
                    </div>

                    <div className={s.previewFacts}>
                      <div>
                        <p className={s.previewFactLabel}>In shoppable assets</p>
                        <p className={s.previewFactValue}>
                          {(() => {
                            const usedIn = productsUsing(previewAsset.id)
                              .map((id) => PRODUCTS.find((x) => x.id === id)?.sku)
                              .filter(Boolean);
                            return usedIn.length ? usedIn.join(', ') : 'Not in one yet';
                          })()}
                        </p>
                      </div>
                      <div>
                        <p className={s.previewFactLabel}>Status in this selection</p>
                        <p
                          className={`${s.previewFactValue} ${
                            creatives.includes(previewAsset.id) ? s.previewSelected : ''
                          }`}
                        >
                          {creatives.includes(previewAsset.id) ? 'Selected' : 'Not selected'}
                        </p>
                      </div>
                    </div>

                    <div className={s.previewActions}>
                      <button
                        type="button"
                        className={
                          creatives.includes(previewAsset.id)
                            ? `${s.previewSecondary} ${s.previewSecondaryStrong}`
                            : s.previewPrimary
                        }
                        onClick={() => toggleCreative(previewAsset.id)}
                      >
                        {creatives.includes(previewAsset.id)
                          ? 'Remove from selection'
                          : 'Add to selection'}
                      </button>
                      <button
                        type="button"
                        className={s.previewSecondary}
                        onClick={() => stepPreview(-1)}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className={s.previewSecondary}
                        onClick={() => stepPreview(1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className={s.footer}>
              <span className={s.footerNote}>
                {selectMode
                  ? chosen.length === 0
                    ? 'Nothing selected yet — this product will fall back to catalog imagery.'
                    : `${plural(chosen.length, 'creative')} will run for ${product ? product.name : 'this product'}.`
                  : assetCount === 0
                    ? 'Pick creatives, then the products they should sell.'
                    : chosen.length === 0
                      ? `Pick creatives to link to ${assetCount === 1 ? 'this product' : plural(assetCount, 'product')}.`
                      : assetCount === 1
                        ? `Creates 1 shoppable asset with ${plural(chosen.length, 'creative')}.`
                        : `Creates ${plural(assetCount, 'shoppable asset')} — one per product, each with the same ${plural(chosen.length, 'creative')}.`}
              </span>
              <button type="button" className={s.cancel} onClick={onClose}>
                Cancel
              </button>
              <button type="button" className={s.save} onClick={save} disabled={!ready}>
                {selectMode
                  ? 'Apply selections'
                  : assetCount > 1
                    ? `Save ${assetCount} connections`
                    : 'Save connection'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
