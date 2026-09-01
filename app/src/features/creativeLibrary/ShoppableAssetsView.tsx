import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LIBRARY_CREATIVES, type ShoppableAsset } from '../../data/library';
import { CATALOG_NAME, PRODUCTS, type Product } from '../../data/products';
import { libraryRoutes } from '../../routes';
import { IconCatalog, IconSearch } from '../../components/icons';
import type { CampaignTarget } from './AddToCampaignsModal';
import s from './CreativeLibrary.module.css';

const bg = (url: string) => ({ ['--thumb' as string]: `url(${url})` });

const spuOf = (set: ShoppableAsset) => {
  const m = (set.destinationLabel || '').match(/SPU\s+(\d+)/);
  return m ? 'SPU ' + m[1] : null;
};

interface Props {
  sets: ShoppableAsset[];
  showEmptyState: boolean;
  onCreate: () => void;
  onBrowse: () => void;
  onAddToCampaigns: (target: CampaignTarget) => void;
}

export default function ShoppableAssetsView({
  sets,
  showEmptyState,
  onCreate,
  onBrowse,
  onAddToCampaigns,
}: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [unusedOnly, setUnusedOnly] = useState(false);

  const unusedCount = sets.filter((x) => x.usedIn.startsWith('0')).length;

  /**
   * A connected catalog means every product earns a row, so the gaps are this
   * page's own to-do list rather than something you have to go looking for.
   */
  const withSpu = PRODUCTS.map((p) => ({
    product: p as Product | null,
    set: sets.find((x) => spuOf(x) === p.sku) ?? null,
  }));
  const urlOnly = sets
    .filter((x) => !spuOf(x))
    .map((set) => ({ product: null as Product | null, set }));

  const q = query.trim().toLowerCase();
  const rows = [...withSpu, ...urlOnly]
    .map((r) => ({ ...r, needs: !r.set }))
    .filter((r) => !unusedOnly || !r.set || /^0 /.test(r.set.usedIn || ''))
    .filter((r) => {
      if (!q) return true;
      const haystack = [r.product?.name, r.product?.sku, r.set?.name, r.set?.destinationLabel]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    })
    .sort((a, b) => (a.needs ? 0 : 1) - (b.needs ? 0 : 1));

  const withAsset = sets.filter((x) => /SPU\s+\d+/.test(x.destinationLabel || '')).length;

  return (
    <div className={s.stack16}>
      <div className={`${s.pageHead} ${s.pageHeadTop}`}>
        <div style={{ minWidth: 0 }}>
          <h1 className={s.h1}>Shoppable assets</h1>
          <p className={s.pageSub}>
            A named asset assembled from media. Required: a creative and a product — a catalog SPU
            or a URL. Reusable across campaigns.
          </p>
        </div>
        <div className={s.headActionsTight}>
          <button
            type="button"
            className={`${s.btnPrimary} ${s.btnPrimarySm}`}
            onClick={onCreate}
          >
            + Create shoppable asset
          </button>
        </div>
      </div>

      {showEmptyState ? (
        <div className={s.emptyState}>
          <div className={s.emptyTop}>
            <div className={s.emptyCopy}>
              <span className={s.emptyBadge}>NEW</span>
              <h2 className={s.emptyTitle}>A creative on its own cannot sell anything</h2>
              <p className={s.emptyLead}>
                Link a creative to the product it features and the ad gains a product card, a price
                and a checkout. That link is what makes it shoppable — and it is what a campaign
                looks for when it decides which creative to serve.
              </p>
              <div className={s.emptyActions}>
                <button type="button" className={s.startHereCta} onClick={onCreate}>
                  + Create shoppable asset
                </button>
                <button type="button" className={s.emptyBrowse} onClick={onBrowse}>
                  Browse creative assets
                </button>
              </div>
            </div>
            <div className={s.emptyArtWrap}>
              <img
                src="uploads/pasted-1788230779522-0.png"
                alt="A creative linked to a product becomes a shoppable ad"
                className={s.emptyArt}
              />
            </div>
          </div>

          <div className={s.emptyReasons}>
            <p className={s.emptyReasonsLabel}>What the link buys you</p>
            <div className={s.emptyReasonGrid}>
              <div>
                <p className={s.emptyReasonTitle}>Buy without leaving</p>
                <p className={s.emptyReasonBody}>
                  The product card and Shop button ride along with the creative.
                </p>
              </div>
              <div>
                <p className={s.emptyReasonTitle}>Campaigns pre-fill</p>
                <p className={s.emptyReasonBody}>
                  Pick a product in campaign setup and its linked creatives are already there.
                </p>
              </div>
              <div>
                <p className={s.emptyReasonTitle}>Beats a catalog photo</p>
                <p className={s.emptyReasonBody}>
                  Products with no linked creative fall back to a still image and underperform.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={s.tableCard}>
          <div className={s.catalogBanner}>
            <span className={s.catalogIcon}>
              <IconCatalog size={15} />
            </span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p className={s.catalogName}>
                Products pulled from <strong style={{ fontWeight: 600 }}>{CATALOG_NAME}</strong>
              </p>
              <p className={s.catalogMeta}>
                {PRODUCTS.length} products · synced from getlevplus.com · last sync 2 hours ago
              </p>
            </div>
            <Link to={libraryRoutes.media('catalog')} className={s.catalogLink}>
              Catalog Manager
            </Link>
          </div>

          <div className={s.toolbar}>
            {searchOpen ? (
              <div className={s.toolbarSearch}>
                <IconSearch size={15} style={{ color: '#8a8b8c' }} />
                <input
                  className={s.toolbarSearchInput}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search shoppable assets"
                  aria-label="Search shoppable assets"
                />
              </div>
            ) : null}
            <button
              type="button"
              className={`${s.iconToggle} ${searchOpen ? s.toggleOn : ''}`}
              title="Search shoppable assets"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setFiltersOpen(false);
                if (searchOpen) setQuery('');
              }}
            >
              <IconSearch size={15} />
            </button>
            <div className={s.filterWrap}>
              <button
                type="button"
                className={`${s.textToggle} ${filtersOpen || unusedOnly ? s.toggleOn : ''}`}
                onClick={() => {
                  setFiltersOpen(!filtersOpen);
                  setSearchOpen(false);
                }}
              >
                {unusedOnly ? 'Filter · Not in a campaign' : 'Filter'}
              </button>
              {filtersOpen ? (
                <div className={s.filterMenu}>
                  <button
                    type="button"
                    className={`${s.filterOption} ${unusedOnly ? '' : s.filterOptionActive}`}
                    onClick={() => {
                      setUnusedOnly(false);
                      setFiltersOpen(false);
                    }}
                  >
                    All shoppable assets
                  </button>
                  <button
                    type="button"
                    className={`${s.filterOption} ${unusedOnly ? s.filterOptionActive : ''}`}
                    onClick={() => {
                      setUnusedOnly(true);
                      setFiltersOpen(false);
                    }}
                  >
                    Not in a campaign ({unusedCount})
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className={s.tableScroll}>
            <div className={s.shoppableTable}>
              <div className={s.shoppableHead}>
                <span className={s.th}>Product</span>
                <span className={s.th}>Shoppable asset</span>
                <span className={s.th}>Status</span>
                <span className={s.th}>Used in</span>
                <span className={s.th}>Spend</span>
                <span className={s.th}>Action</span>
              </div>

              {rows.map(({ product, set, needs }) => {
                const thumbs = set
                  ? set.assetIds
                      .map((id) => LIBRARY_CREATIVES.find((x) => x.id === id))
                      .filter(Boolean)
                  : [];
                const key = product ? product.id : set!.id;
                return (
                  <div
                    key={key}
                    className={`${s.shoppableRow} ${
                      set?.isNew ? s.rowNew : needs ? s.rowNeeds : ''
                    }`}
                  >
                    <div className={s.productCell}>
                      <div
                        className={`${s.productThumb} ${product ? '' : s.productThumbEmpty}`}
                        style={product ? bg(product.image) : undefined}
                      />
                      <div style={{ minWidth: 0 }}>
                        <p className={s.productName}>
                          {product
                            ? product.name
                            : (set!.destinationLabel || '').replace(/^https?:\/\//, '')}
                        </p>
                        <p className={s.productMeta}>
                          {product ? product.sku : 'URL · no SPU behind it'}
                        </p>
                      </div>
                    </div>

                    <div className={s.assetCell}>
                      {set ? (
                        <>
                          <div className={s.assetThumbs}>
                            {thumbs.map((t) => (
                              <div
                                key={t!.id}
                                className={s.assetThumb}
                                style={bg(t!.thumbnail)}
                              />
                            ))}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p className={s.assetName}>
                              <span className={s.assetNameText}>{set.name}</span>
                              {set.isNew ? <span className={s.justAdded}>JUST ADDED</span> : null}
                            </p>
                            <p className={s.composition}>
                              {set.creatives} {set.creatives === 1 ? 'creative' : 'creatives'}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className={s.gapCell}>
                          <span className={s.gapMark}>
                            <span className={s.gapDot} />
                            <span className={s.gapLabel}>Catalog image only</span>
                          </span>
                          {/* The gap is in this column, so the fix lives here too. */}
                          <button type="button" className={s.linkCreatives} onClick={onCreate}>
                            + Link creatives
                          </button>
                        </div>
                      )}
                    </div>

                    <div className={s.cellPad}>
                      {set ? (
                        <span
                          className={`${s.pillSm} ${set.status === 'Live' ? s.pillLive : ''}`}
                        >
                          {set.status}
                        </span>
                      ) : null}
                    </div>

                    <div className={s.cellPad}>
                      <span
                        className={`${s.usedIn} ${
                          set && /^0 /.test(set.usedIn || '') ? s.usedInNone : ''
                        }`}
                      >
                        {set ? set.usedIn : '—'}
                      </span>
                    </div>

                    <div className={s.spend}>{set ? set.spend : '—'}</div>

                    <div>
                      {set ? (
                        <button
                          type="button"
                          className={s.addToCampaigns}
                          onClick={() =>
                            onAddToCampaigns({
                              name: set.name,
                              destination: set.destinationLabel,
                              creatives: set.creatives,
                            })
                          }
                        >
                          Add to campaigns
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className={s.countLabel}>
            {PRODUCTS.length} products · {withAsset} with a shoppable asset
          </p>
        </div>
      )}
    </div>
  );
}
