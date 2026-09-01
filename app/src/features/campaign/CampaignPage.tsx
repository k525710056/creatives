import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ChecklistPanel, {
  ChecklistBars,
  ChecklistDoneRow,
  checklistStyles as cl,
} from '../../components/ChecklistPanel';
import ShoppableContentDrawer from '../shoppableDrawer/ShoppableContentDrawer';
import { PAGE_URL, PROMOTED, URL_SPUS, shorten, type PromotedProduct } from '../../data/campaign';
import { creativeBadge, type Creative } from '../../data/creatives';
import { bg } from '../../data/media';
import { libraryRoutes, routes } from '../../routes';
import {
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconCloseSmall,
  IconEdit,
  IconInfo,
} from '../../components/icons';
import ProductPickerDrawer from './ProductPickerDrawer';
import SelectCreativesDrawer from './SelectCreativesDrawer';
import s from './Campaign.module.css';

type UrlMatch = 'all' | 'partial' | 'none';

/** One line of "Creatives for these products" — a promoted product, or the
    destination URL itself when the campaign targets a page rather than a SPU. */
interface Row {
  key: string;
  isUrl: boolean;
  name: string;
  sku: string;
  detail: string;
  gap: boolean;
  note?: string;
  entry?: PromotedProduct;
  /** What the ad can actually show: linked creatives, else the catalog photo. */
  covers: Creative[];
  onEdit: () => void;
}

export default function CampaignPage() {
  const [params] = useSearchParams();
  /** The Destination URL branch ships three match outcomes as a design tweak. */
  const urlMatch = (params.get('urlMatch') as UrlMatch) || 'all';

  const [checklistOpen, setChecklistOpen] = useState(false);
  const [adv, setAdv] = useState(false);
  const [target, setTarget] = useState<'Products' | 'URL'>('Products');
  const [scope, setScope] = useState<'all' | 'curated'>('all');
  const [picked, setPicked] = useState<string[]>(['SPU 4471', 'SPU 4473', 'SPU 4474']);
  const [removed, setRemoved] = useState<string[]>([]);
  const [picker, setPicker] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [prod, setProd] = useState(0);
  const [tab, setTab] = useState<'Video' | 'Image' | 'Catalog'>('Video');
  const [mode, setMode] = useState<'Product' | 'Creative'>('Product');
  const [sel, setSel] = useState<string[]>([]);

  const curated = scope === 'curated';
  const urlMode = target === 'URL';

  const base = urlMode
    ? PROMOTED.filter((e) => URL_SPUS.includes(e.product.sku))
    : curated
      ? PROMOTED.filter((e) => picked.includes(e.product.sku))
      : PROMOTED;
  const list = base.filter((e) => !removed.includes(e.product.sku));
  const trimmed = curated || removed.length > 0;
  const activeEntry: PromotedProduct = list[Math.min(prod, list.length - 1)] ?? PROMOTED[0];

  /** Opening the editor pre-selects everything already linked — the campaign
      runs all of it unless you narrow it down. */
  const openEditor = (index: number, entry: PromotedProduct) => {
    setDrawer(true);
    setMode('Product');
    setProd(index);
    setSel(entry.creatives.map((c) => c.id));
  };

  const catalogPhotoOf = (entry: PromotedProduct): Creative[] => [
    {
      id: `fallback-${entry.product.id}`,
      kind: 'catalog',
      name: entry.product.name,
      media: entry.product.photo,
      tags: [],
      format: 'Catalog image',
      aspect: '1:1',
      dimension: '1000 x 1000',
      source: 'catalog',
      status: 'approved',
      spend: '0.00',
    },
  ];

  const productRow = (entry: PromotedProduct, i: number): Row => ({
    key: entry.product.id,
    isUrl: false,
    name: shorten(entry.product.name),
    sku: entry.product.sku,
    entry,
    gap: entry.catalogOnly,
    detail: entry.catalogOnly
      ? `${entry.product.sku} · a still product photo is all this ad can show`
      : `${entry.product.sku} · ${entry.creatives.length} ${entry.creatives.length === 1 ? 'creative' : 'creatives'}`,
    note: urlMode ? PAGE_URL : undefined,
    covers: entry.catalogOnly ? catalogPhotoOf(entry) : entry.creatives,
    onEdit: () => openEditor(i, entry),
  });

  /** Creatives reachable through the URL rather than a SPU. */
  const urlCreatives = list.flatMap((e) => e.creatives).slice(0, 3);

  const urlRow = (): Row => ({
    key: 'url-row',
    isUrl: true,
    name: PAGE_URL,
    sku: '',
    gap: false,
    detail: `Destination URL · ${urlCreatives.length} ${urlCreatives.length === 1 ? 'creative' : 'creatives'}`,
    covers: urlCreatives,
    onEdit: () => {
      setDrawer(true);
      setMode('Creative');
    },
  });

  let rows: Row[];
  if (!urlMode) rows = list.map(productRow);
  else if (urlMatch === 'partial') rows = [...list.slice(0, 2).map(productRow), urlRow()];
  else if (urlMatch === 'none') rows = [urlRow()];
  else rows = [...list.map(productRow), urlRow()];

  const thumbRows = rows.filter((r) => !r.isUrl).slice(0, 5);
  const allScope = !trimmed && !urlMode;
  const showPromotedBox = !(urlMode && urlMatch === 'none');

  const urlNotice =
    urlMatch === 'partial'
      ? '2 of the products on this page matched your catalog. The rest of the page is promoted as a destination URL — link creatives to it directly.'
      : urlMatch === 'none'
        ? 'No catalog products matched this page. Creatives linked to this URL are used instead.'
        : `${list.length} products matched on this page and pulled from LEVPLUS — US catalog. Creatives are linked the same way as catalog products.`;

  const urlRowsCaption =
    urlMatch === 'partial'
      ? `2 product rows · 1 URL row · ${urlCreatives.length} creatives linked to this URL`
      : urlMatch === 'none'
        ? `1 URL row · ${urlCreatives.length} creatives linked to this URL`
        : `${list.length} product rows · 1 URL row · ${list.filter((e) => e.catalogOnly).length} without creatives`;

  return (
    <div className={s.page}>
      <div className={s.topbar}>
        <div className={s.wordmark}>
          <span className={s.wordmarkMain}>TikTok</span>
          <span className={s.wordmarkAccent}>:</span>
          <span className={s.wordmarkTail}>Ads Manager</span>
        </div>
        <div className={s.topRight}>
          <span className={s.topLang}>English</span>
          <div className={s.avatar}>L</div>
          <IconChevronDown size={16} />
        </div>
      </div>

      <div className={s.container}>
        <div className={s.pageHead}>
          <Link to={routes.onboarding} className={s.backBtn}>
            <IconChevronLeft size={16} />
          </Link>
          <h1 className={s.h1}>Create OLE 2.0 campaign</h1>
          <span className={s.setupPill}>
            <IconCheck size={12} />
            Setup complete · assets auto-attached
          </span>
        </div>

        <div className={s.networkGrid}>
          <div className={s.networkCard}>
            <div>
              <div className={s.networkTitle}>OLE 2.0</div>
              <div className={s.networkMeta}>Ads will be served on OLE 2.0</div>
            </div>
            <div className={`${s.radio} ${s.radioOn}`} />
          </div>
          <div className={`${s.networkCard} ${s.networkCardIdle}`}>
            <div>
              <div className={`${s.networkTitle} ${s.networkTitleIdle}`}>TikTok network</div>
              <div className={`${s.networkMeta} ${s.networkMetaIdle}`}>
                Ads will be served on apps in TikTok network
              </div>
            </div>
            <div className={s.radio} />
          </div>
        </div>

        <div className={s.columns}>
          <div className={s.formCol}>
            <section className={s.section}>
              <div className={s.sectionHead}>
                <h2 className={s.h2}>Campaign name</h2>
                <IconChevronDown size={20} />
              </div>
              <div className={s.field}>LEVPLUS — OLE 2.0 purchase 2026_001</div>
            </section>

            <section className={s.section}>
              <div className={s.sectionHead}>
                <h2 className={s.h2}>Targeting</h2>
                <IconChevronDown size={20} />
              </div>
              <div className={s.labelRow}>
                Targeting country <IconInfo size={14} />
              </div>
              <div className={s.chipField}>
                <div className={s.chips}>
                  <span className={s.chip}>
                    United States <IconCloseSmall size={12} />
                  </span>
                </div>
                <IconChevronDown size={16} />
              </div>
            </section>

            <section className={s.section}>
              <div className={`${s.sectionHead} ${s.sectionHeadTight}`}>
                <h2 className={s.h2}>Budget and optimization goal</h2>
                <IconChevronDown size={20} />
              </div>

              <div className={`${s.infoBox} ${s.infoBoxSpaced}`}>
                <IconInfo size={16} className={s.infoIcon} />
                <div className={s.infoText}>
                  Optimization event <strong style={{ fontWeight: 600 }}>Complete payment</strong>{' '}
                  comes from <strong style={{ fontWeight: 600 }}>LEVPLUS Web Pixel</strong>,
                  connected in setup. <a href="#">Change pixel</a>
                </div>
              </div>

              <div className={s.label}>Daily budget</div>
              <div className={`${s.field} ${s.fieldSplit}`} style={{ marginBottom: 18 }}>
                <span>7,000.00</span>
                <span style={{ color: 'var(--fg-secondary)' }}>USD</span>
              </div>

              <div className={s.labelRow}>
                Audience strategy <IconInfo size={14} />
              </div>
              <div className={s.optionList}>
                <div className={s.option}>
                  <div>
                    <div className={s.optionTitle}>Universal customers</div>
                    <div className={s.optionMeta}>Optimize for purchases across all customers</div>
                  </div>
                  <div className={`${s.radio} ${s.radioOn}`} />
                </div>
                <div className={`${s.option} ${s.optionIdle}`}>
                  <div>
                    <div className={`${s.optionTitle} ${s.optionTitleIdle}`}>Prospecting</div>
                    <div className={`${s.optionMeta} ${s.optionMetaIdle}`}>
                      Optimize for customers who haven&apos;t purchased your products
                    </div>
                  </div>
                  <div className={s.radio} />
                </div>
                <div className={`${s.option} ${s.optionIdle}`}>
                  <div>
                    <div className={`${s.optionTitle} ${s.optionTitleIdle}`}>Discovery</div>
                    <div className={`${s.optionMeta} ${s.optionMetaIdle}`}>
                      Optimize for customers who haven&apos;t visited your website
                    </div>
                  </div>
                  <div className={s.radio} />
                </div>
              </div>

              <div className={s.label}>Goal type</div>
              <div className={s.optionGrid}>
                <div className={s.optionBordered}>
                  <div>
                    <div className={s.optionTitle}>ROAS</div>
                    <div className={s.optionMeta}>Return on ad spend</div>
                  </div>
                  <div className={`${s.radio} ${s.radioOn}`} />
                </div>
                <div className={`${s.option} ${s.optionIdle}`}>
                  <div>
                    <div className={`${s.optionTitle} ${s.optionTitleIdle}`}>CPP</div>
                    <div className={`${s.optionMeta} ${s.optionMetaIdle}`}>Cost per purchase</div>
                  </div>
                  <div className={s.radio} />
                </div>
              </div>

              <div className={s.label}>ROAS target</div>
              <div className={s.field} style={{ marginBottom: 18 }}>
                2.0
              </div>

              <div className={s.label}>Attribution window</div>
              <div className={`${s.field} ${s.fieldSplit}`}>
                <span>Day 1</span>
                <IconChevronDown size={16} />
              </div>
            </section>

            <section className={s.section}>
              <div className={`${s.sectionHead} ${s.sectionHeadTight}`}>
                <h2 className={s.h2}>Promoted products</h2>
                <IconChevronDown size={20} />
              </div>

              <div className={`${s.infoBox} ${s.infoBoxSpacedWide}`}>
                <IconInfo size={16} className={s.infoIcon} />
                <div className={s.infoText}>
                  Products come from{' '}
                  <strong style={{ fontWeight: 600 }}>LEVPLUS — US catalog</strong> and creatives
                  are matched through the{' '}
                  <strong style={{ fontWeight: 600 }}>creative ↔ product links</strong> from setup.{' '}
                  <Link to={libraryRoutes.shoppable}>Manage links</Link>
                </div>
              </div>

              <div className={`${s.label} ${s.labelTight}`}>Promotion target</div>
              <div className={s.hint}>Choose how you want to define the promoted target.</div>
              <div className={s.targetGrid}>
                <button
                  type="button"
                  className={`${s.targetCard} ${!urlMode ? s.targetCardOn : ''}`}
                  onClick={() => setTarget('Products')}
                >
                  <div className={`${s.radio} ${!urlMode ? s.radioOn : ''}`} />
                  <div style={{ minWidth: 0 }}>
                    <div className={s.targetTitle}>Products</div>
                    <div className={s.targetMeta}>Use product pages from a connected catalog.</div>
                  </div>
                </button>
                <button
                  type="button"
                  className={`${s.targetCard} ${urlMode ? s.targetCardOn : ''}`}
                  onClick={() => setTarget('URL')}
                >
                  <div className={`${s.radio} ${urlMode ? s.radioOn : ''}`} />
                  <div style={{ minWidth: 0 }}>
                    <div className={s.targetTitle}>Destination URL</div>
                    <div className={`${s.targetMeta} ${s.targetMetaIdle}`}>
                      Send people to a page on your website.
                    </div>
                  </div>
                </button>
              </div>

              {urlMode ? (
                <>
                  <div className={s.label}>Destination URL</div>
                  <div
                    className={`${s.urlCard} ${urlMatch === 'none' ? s.urlCardStandalone : ''}`}
                  >
                    <div className={s.urlRow}>
                      <div className={s.urlValue}>https://www.getlevplus.com/collections/all</div>
                      <div className={s.urlConfirm}>Confirm</div>
                    </div>
                    {showPromotedBox ? (
                      <div className={s.infoBox} style={{ marginTop: 12 }}>
                        <IconInfo size={16} className={s.infoIcon} />
                        <div className={s.infoText}>{urlNotice}</div>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}

              {showPromotedBox ? (
                <>
                  {!urlMode ? <div className={s.label}>Promoted products</div> : null}
                  <div
                    className={`${s.promotedBox} ${urlMode ? s.promotedBoxUnderUrl : ''}`}
                  >
                    <div className={s.promotedHead}>
                      <div className={s.promotedSource}>
                        {urlMode
                          ? 'Products found on this URL'
                          : trimmed
                            ? `${list.length} products selected`
                            : 'All products selected'}
                      </div>
                      {urlMode ? (
                        <span style={{ fontSize: 13, color: 'var(--fg-secondary)' }}>
                          From URL · {list.length} products
                        </span>
                      ) : (
                        <button
                          type="button"
                          className={s.editProducts}
                          onClick={() => {
                            setPicker(true);
                          }}
                        >
                          <IconEdit size={14} />
                          Edit products
                        </button>
                      )}
                    </div>
                    <div className={s.promotedThumbs}>
                      <div className={s.thumbStrip}>
                        {thumbRows.map((r) => (
                          <div key={r.key} className={s.thumbWrap}>
                            <div className={s.thumbTile} style={bg(r.entry?.product.photo)} />
                            <button
                              type="button"
                              className={s.thumbRemove}
                              aria-label={`Remove ${r.name}`}
                              onClick={() => {
                                setRemoved((cur) => [...cur, r.sku]);
                                setProd(0);
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {allScope ? <span className={s.andMore}>and more</span> : null}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              <div className={s.label}>Creatives for these products</div>
              <div className={s.creativesBox}>
                {urlMode ? <div className={s.creativesCaption}>{urlRowsCaption}</div> : null}
                {rows.map((r) => (
                  <div key={r.key} className={s.creativeRow}>
                    {r.isUrl ? (
                      <div className={s.rowUrlDot} />
                    ) : (
                      <div className={s.rowThumb} style={bg(r.entry?.product.photo)} />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className={s.rowNameLine}>
                        <div className={s.rowName}>{r.name}</div>
                        {r.gap ? (
                          <span className={s.gapMark}>
                            <span className={s.gapDot} />
                            <span className={s.gapLabel}>Catalog image only</span>
                          </span>
                        ) : null}
                      </div>
                      <div className={`${s.rowSpu} ${r.gap ? s.rowSpuGap : ''}`}>{r.detail}</div>
                      {r.note ? <div className={s.rowNote}>{r.note}</div> : null}
                    </div>
                    <div className={s.rowCovers}>
                      {r.covers.map((c) => (
                        <div
                          key={c.id}
                          className={`${s.cover} ${r.gap ? s.coverGap : ''}`}
                          style={bg(c.media)}
                          title={`${c.name} · ${creativeBadge(c)}`}
                        />
                      ))}
                    </div>
                    {r.gap ? (
                      <button type="button" className={s.rowAddBtn} onClick={r.onEdit}>
                        Add creatives
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={s.rowEditBtn}
                        onClick={r.onEdit}
                        aria-label={`Edit creatives for ${r.name}`}
                      >
                        <IconEdit size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {allScope ? (
                  <div className={s.viewAllRow}>
                    <button
                      type="button"
                      className={s.viewAll}
                      onClick={() => setDrawer(true)}
                    >
                      View all
                    </button>
                  </div>
                ) : null}
              </div>

              {!urlMode ? (
                <div className={s.subBox}>
                  <div className={s.optionalRow}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>Additional web URL</span>
                    <span className={s.optionalTag}>· Optional</span>
                  </div>
                  <div className={s.placeholderField}>Enter URL</div>
                  <div className={s.paramRow}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>URL parameters</span>
                    <div className={s.paramBar} />
                    <a href="#" style={{ fontSize: 13, fontWeight: 600 }}>
                      Edit
                    </a>
                  </div>
                </div>
              ) : null}

              <div className={s.subBox}>
                <div className={s.labelRow} style={{ marginBottom: 10 }}>
                  Identity (TikTok account) <IconInfo size={14} />
                </div>
                <div
                  className={`${s.field} ${s.fieldTall} ${s.fieldSplit}`}
                  style={{ marginBottom: 12 }}
                >
                  <span className={s.identityValue}>
                    <span className={s.identityAvatar}>l</span>@levplus
                  </span>
                  <IconChevronDown size={16} />
                </div>
                <div className={s.checkRow}>
                  <span className={s.checkSquare}>
                    <IconCheck size={11} />
                  </span>
                  <div>
                    <div className={s.checkTitle}>Only show as ads</div>
                    <div className={s.checkBody}>
                      Publish your posts as ads only and not on your TikTok profile. Posts using
                      catalog creatives are shown as ads by default.
                    </div>
                  </div>
                </div>
              </div>

              <div className={s.subBox}>
                <div className={s.labelRow} style={{ marginBottom: 2 }}>
                  Text (1/5) <IconInfo size={14} />
                </div>
                <div className={s.hint} style={{ marginBottom: 12 }}>
                  Add up to 5. We&apos;ll test them with different audiences and only keep the ones
                  with the most engagement.
                </div>
                <div className={s.tipRow}>
                  <IconInfo size={16} className={s.infoIcon} />
                  <div className={s.tipText}>
                    If you edit the text it is updated on TikTok. Engagement data from the original
                    video remains.
                  </div>
                  <IconCloseSmall size={14} />
                </div>
                <div className={`${s.tipRow} ${s.tipRowLast}`}>
                  <IconInfo size={16} className={s.infoIcon} />
                  <div className={s.tipText}>
                    Entered text won&apos;t override selected TikTok posts.
                  </div>
                  <IconCloseSmall size={14} />
                </div>
                <div className={s.textArea}>
                  <div className={s.textAreaValue}>
                    Brighter, smoother eyes in two weeks — up to 50% off this week.
                  </div>
                  <div className={s.textAreaCount}>42/100</div>
                </div>
                <a href="#" className={s.addAlt}>
                  + Add alternative text
                </a>
              </div>

              <button type="button" className={s.advToggle} onClick={() => setAdv(!adv)}>
                Advanced settings
                <IconChevronDown
                  size={16}
                  className={`${s.advCaret} ${adv ? s.advCaretOpen : ''}`}
                />
              </button>
              {adv ? (
                <div className={s.advBox}>
                  <div className={s.advSection}>
                    <div className={s.advHeadRow}>
                      <div className={s.labelRow} style={{ marginBottom: 0 }}>
                        Call to action <IconInfo size={14} />
                      </div>
                      <IconChevronDown size={16} />
                    </div>
                    <div className={s.hint} style={{ margin: '2px 0 8px' }}>
                      The system automatically shows the most suitable call to action.
                    </div>
                    <div style={{ fontSize: 14 }}>Shop now, Learn more</div>
                  </div>
                  <div className={s.advSection}>
                    <div className={s.labelRow} style={{ marginBottom: 0 }}>
                      Format <IconInfo size={14} />
                    </div>
                    <div className={s.hint} style={{ margin: '2px 0 10px' }}>
                      The system selects and displays the best creative format.
                    </div>
                    <div className={s.advCard}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 14, fontWeight: 500 }}>Carousel</span>{' '}
                        <span style={{ fontSize: 13, color: 'var(--fg-secondary)' }}>
                          Show multiple products and creatives in one placement.
                        </span>
                      </div>
                      <div className={s.toggleOn}>
                        <div className={s.toggleKnob} />
                      </div>
                    </div>
                  </div>
                  <div className={`${s.advSection} ${s.advSectionLast}`}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className={s.labelRow} style={{ marginBottom: 0 }}>
                        Automatic enhancements <IconInfo size={14} />
                      </div>
                      <div className={s.hint} style={{ marginTop: 2, marginBottom: 0 }}>
                        Enhancement formats are selected automatically and applied in real time as
                        your campaign delivers.
                      </div>
                    </div>
                    <div className={s.toggleOn}>
                      <div className={s.toggleKnob} />
                    </div>
                  </div>
                </div>
              ) : null}
            </section>

            <section className={s.section}>
              <h2 className={s.h2} style={{ marginBottom: 16 }}>
                Schedule
              </h2>
              <div className={s.scheduleRow}>
                <div className={`${s.field} ${s.fieldSplit} ${s.scheduleField}`}>
                  <span>2026-09-01 09:00:00</span>
                  <IconCalendar size={16} />
                </div>
                <div className={`${s.field} ${s.fieldSplit} ${s.scheduleFieldWide}`}>
                  <span>(UTC-08:00) Pacific Time (US &amp; Canada)</span>
                  <IconChevronDown size={16} />
                </div>
              </div>
              <div className={s.hint} style={{ marginBottom: 12 }}>
                Run campaign continuously after the scheduled start time
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                <span className={s.checkboxOutline} />
                Set end time
              </div>
            </section>

            <section className={s.legal}>
              By clicking{' '}
              <strong style={{ fontWeight: 600, color: 'var(--neutral-200)' }}>Publish</strong>, you
              agree to <a href="#">TikTok&apos;s Online Data Terms</a> and{' '}
              <a href="#">Commercial Terms of Service</a>, and authorize TikTok to use data from
              your catalog and destination URLs to optimize your ads.
            </section>
          </div>

          <aside className={s.aside}>
            <div className={s.asideCard}>
              <h3 className={s.h3}>Campaign summary</h3>
              <div className={s.summaryList}>
                <div>
                  <div className={s.summaryLabel}>Optimization event</div>
                  <div className={s.summaryValue}>Complete payment</div>
                </div>
                <div>
                  <div className={s.summaryLabel}>Placement</div>
                  <div className={s.summaryValue}>TikTok, including search results</div>
                </div>
                <div>
                  <div className={s.summaryLabel}>Audience</div>
                  <div className={s.summaryValue}>United States · users under 18 excluded</div>
                </div>
                <div>
                  <div className={s.summaryLabel}>Daily budget</div>
                  <div className={s.summaryValue}>$7,000.00 · ROAS 2.0</div>
                </div>
              </div>
            </div>

            <div className={s.asideCard}>
              <div className={s.h3Row}>
                <h3 className={s.h3} style={{ marginBottom: 0 }}>
                  Preview
                </h3>
                <a href="#" style={{ fontSize: 13, fontWeight: 600 }}>
                  View more
                </a>
              </div>
              <div className={s.previewMeta}>
                <div className={s.previewLogo}>t</div>
                <span className={s.previewLabel}>In feed</span>
                <IconChevronDown size={14} />
              </div>
              <div className={s.previewFrame}>
                <div className={s.previewPlaceholder}>Creative preview</div>
                <div className={s.previewCaption}>
                  <div className={s.previewHandle}>@levplus</div>
                  <div className={s.previewSub}>Hydrating serum · from catalog</div>
                </div>
              </div>
              <div className={s.safeZone}>
                <span className={s.safeZoneBox} />
                Display content safe zone
              </div>
            </div>
          </aside>
        </div>
      </div>

      <ChecklistPanel
        open={checklistOpen}
        onToggle={() => setChecklistOpen((v) => !v)}
        countPill="4/5"
        compactHead
        aboveActionBar
        summary={
          <div className={cl.summary}>
            <ChecklistBars done={4} compact />
            <p className={cl.note}>
              You&apos;re on the last step. Publish this campaign to complete setup.
            </p>
          </div>
        }
      >
        <ChecklistDoneRow title="Connect your pixel" compact />
        <ChecklistDoneRow title="Create your catalog" compact />
        <ChecklistDoneRow title="Connect your TikTok account" compact />
        <ChecklistDoneRow title="Link creatives to products" compact />
        <div className={`${cl.row} ${cl.rowCurrent}`}>
          <div className={`${cl.mark} ${cl.markOpen}`} />
          <div className={cl.rowBody}>
            <div className={cl.currentTitle}>Create campaign</div>
            <div className={`${cl.currentMeta} ${cl.currentMetaFlush}`}>
              In progress — finish the form and publish.
            </div>
          </div>
        </div>
      </ChecklistPanel>

      {picker ? (
        <ProductPickerDrawer
          initialSelection={list.map((e) => e.product.sku)}
          onCancel={() => setPicker(false)}
          onSave={(selection) => {
            setPicker(false);
            setScope(selection.length === PROMOTED.length ? 'all' : 'curated');
            setPicked(selection);
            setRemoved([]);
            setProd(0);
            setSel([]);
          }}
        />
      ) : null}

      {/* Only one panel is ever visible: this one steps aside for the connect flow. */}
      {drawer && !connectOpen ? (
        <SelectCreativesDrawer
          list={list}
          entry={activeEntry}
          prod={prod}
          onPickProduct={(i) => {
            setProd(i);
            setSel((list[i]?.creatives ?? []).map((c) => c.id));
          }}
          mode={mode}
          onSetMode={setMode}
          tab={tab}
          onSetTab={setTab}
          sel={sel}
          onSetSel={setSel}
          urlMode={urlMode}
          allScope={allScope}
          onClose={() => setDrawer(false)}
          onOpenConnect={() => setConnectOpen(true)}
        />
      ) : null}

      <div className={s.actionBar}>
        <div className={s.actionInner}>
          <div className={s.actionLeft}>
            <div className={s.exitGroup}>
              <Link to={routes.onboarding} className={s.exitLink}>
                Exit
              </Link>
              <span className={s.exitDivider} />
              <span className={s.exitCaret}>
                <IconChevronDown size={16} />
              </span>
            </div>
            <span className={s.draftNote}>Draft saved 2 min ago</span>
          </div>
          <button type="button" className={s.publish}>
            Publish
          </button>
        </div>
      </div>

      {/* The linking job belongs to the Creative Library drawer, not a copy of it.
          Back returns to the panel we came from; it was only hidden, so its
          selections are still there. */}
      <ShoppableContentDrawer
        open={connectOpen}
        mode="link"
        backLabel="Back to product selection"
        presetProduct={activeEntry.product.sku}
        onClose={() => setConnectOpen(false)}
        onDone={() => setConnectOpen(false)}
      />
    </div>
  );
}
