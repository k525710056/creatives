import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChecklistPanel, {
  ChecklistBars,
  ChecklistDoneRow,
  checklistStyles as c,
} from '../../components/ChecklistPanel';
import {
  IconAccountSetup,
  IconAllApps,
  IconBell,
  IconCatalog,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconCustomReports,
  IconDashboard,
  IconGmvMax,
  IconHelp,
  IconNavCampaigns,
  IconPayment,
  IconSearchNav,
  IconStepPixel,
} from '../../components/icons';
import { libraryRoutes, routes } from '../../routes';
import s from './Onboarding.module.css';

const ASSET_CARDS = [
  {
    step: 'Step 1 · Pixel',
    badge: 'Active',
    name: 'LEVPLUS Web Pixel',
    meta: 'ID 7391042 · 12.4K events in last 7 days',
    icon: <IconStepPixel size={16} />,
  },
  {
    step: 'Step 2 · Catalog',
    badge: 'Synced',
    name: 'LEVPLUS — US catalog',
    meta: '12 products · 236 in stock',
    icon: <IconCatalog size={16} />,
  },
  {
    step: 'Step 3 · TikTok account',
    badge: 'Authorized',
    name: '@levplus',
    meta: 'Identity available for Spark Ads & LIVE',
    icon: <IconAccountSetup size={16} />,
  },
  {
    step: 'Step 4 · Creatives ↔ products',
    badge: 'Linked',
    name: '36 videos linked to 24 products',
    meta: 'Avg 1.5 creatives per product',
    icon: <IconNavCampaigns size={16} />,
  },
];

const PREFILLED = [
  { title: 'Optimization event · Complete payment', meta: 'from LEVPLUS Web Pixel' },
  { title: 'Product source · US catalog', meta: '12 products eligible' },
  { title: 'Identity · @levplus', meta: 'Spark Ads enabled' },
  { title: 'Creatives · 36 product-linked videos', meta: 'Auto-matched per product' },
];

export default function OnboardingPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className={s.page}>
      <div className={s.topbar}>
        <div className={s.topLeft}>
          <div className={s.accountPill}>
            <IconAllApps size={16} />
            <div className={s.avatar}>L</div>
          </div>
          <div className={s.wordmark}>
            <span className={s.wordmarkMain}>TikTok</span>
            <span className={s.wordmarkAccent}>:</span>
            <span className={s.wordmarkTail}>Ads Manager</span>
          </div>
        </div>
        <div className={s.topRight}>
          <IconSearchNav size={20} />
          <IconBell size={20} />
          <IconHelp size={20} />
          <div className={s.business}>
            <span>LEVPLUS Commerce</span>
            <IconChevronDown size={16} />
          </div>
        </div>
      </div>

      <div className={s.shell}>
        <nav className={s.sidenav}>
          <div className={s.navRow}>
            <IconDashboard size={16} />
            Dashboard
          </div>
          <div className={s.navRowSplit}>
            <span className={s.navLabel}>
              <IconNavCampaigns size={16} />
              Campaigns
            </span>
            <IconChevronDown size={14} />
          </div>
          <div className={s.subItem}>1.0</div>
          <div className={`${s.subItem} ${s.subItemActive}`}>2.0</div>
          <div className={`${s.navRowSplit} ${s.navRowSpaced}`}>
            <span className={s.navLabel}>
              <IconAllApps size={16} />
              Assets
            </span>
            <IconChevronDown size={14} />
          </div>
          <div className={s.subItemSplit}>
            Commerce Account
            <span className={s.readyDot} />
          </div>
          <div className={s.subItemSplit}>
            Events
            <span className={s.readyDot} />
          </div>
          <div className={s.subItemSplit}>
            Catalogs
            <span className={s.readyDot} />
          </div>
          <Link to={routes.creativeLibrary} className={s.subItemSplit}>
            Creatives
            <span className={s.readyDot} />
          </Link>
          <div className={`${s.navRow} ${s.navRowSpaced}`}>
            <IconCustomReports size={16} />
            Custom reports
          </div>
          <div className={s.navRow}>
            <IconPayment size={16} />
            Payment
          </div>
          <div className={s.navRow}>
            <IconAccountSetup size={16} />
            Account setup
          </div>
          <div className={s.navRow}>
            <IconGmvMax size={16} />
            GMV Max
          </div>
        </nav>

        <main className={s.main}>
          <div className={s.content}>
            <div className={s.titleRow}>
              <h1 className={s.h1}>OLE 2.0</h1>
              <div className={s.segmented}>
                <div className={s.segActive}>TikTok</div>
                <div className={s.segIdle}>TikTok Ad Network</div>
              </div>
            </div>

            <div className={s.step}>
              <div className={s.stepGutter}>
                <div className={s.stepMarkDone}>
                  <IconCheck size={14} />
                </div>
                <div className={s.stepLine} />
              </div>
              <div className={`${s.stepBody} ${s.stepBodyPad}`}>
                <h2 className={s.h2}>Commerce account is ready</h2>
                <p className={s.lead}>
                  Your pixel, catalog, TikTok account, and product-linked creatives are packaged
                  into{' '}
                  <strong style={{ fontWeight: 500, color: 'var(--neutral-200)' }}>
                    LEVPLUS Commerce
                  </strong>
                  . Every 2.0 campaign in this ad account can use them without re-setup.
                </p>

                <div className={s.cardGrid}>
                  {ASSET_CARDS.map((card) => (
                    <div key={card.step} className={s.assetCard}>
                      <div className={s.assetIcon}>{card.icon}</div>
                      <div style={{ minWidth: 0 }}>
                        <div className={s.assetLabelRow}>
                          <span className={s.assetStep}>{card.step}</span>
                          <span className={s.assetBadge}>{card.badge}</span>
                        </div>
                        <div className={s.assetName}>{card.name}</div>
                        <div className={s.assetMeta}>{card.meta}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={s.inlineLinks}>
                  <a href="#" className={s.inlineLink}>
                    View commerce account
                  </a>
                  <Link to={routes.creativeLibrary} className={s.inlineLink}>
                    Manage creative library
                  </Link>
                </div>
              </div>
            </div>

            <div className={s.step}>
              <div className={s.stepGutterCentered}>
                <div className={s.stepMarkOpen}>5</div>
              </div>
              <div className={s.stepBody}>
                <h2 className={s.h2}>Create your first 2.0 campaign</h2>
                <p className={`${s.lead} ${s.leadWide}`}>
                  Nothing left to connect. Campaign creation opens pre-filled with the assets above —
                  you only choose budget, audience, and schedule.
                </p>

                <div className={s.prefilled}>
                  <div className={s.prefilledLabel}>Pre-filled in campaign creation</div>
                  <div className={s.prefilledGrid}>
                    {PREFILLED.map((item) => (
                      <div key={item.title} className={s.prefilledItem}>
                        <IconCheck size={14} className={s.prefilledCheck} />
                        <div>
                          <div className={s.prefilledTitle}>{item.title}</div>
                          <div className={s.prefilledMeta}>{item.meta}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={s.ctaRow}>
                  <Link to={routes.campaign} className={s.ctaPrimary}>
                    Create campaign
                  </Link>
                  <button type="button" className={s.ctaSecondary}>
                    Preview pre-filled setup
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ChecklistPanel
            open={open}
            onToggle={() => setOpen((v) => !v)}
            summary={
              <div className={c.summary}>
                <div className={c.progressLine}>
                  <span className={c.progressValue}>4/5 completed</span>
                  <span className={c.progressRemaining}>1 step left</span>
                </div>
                <ChecklistBars done={4} />
                <p className={c.note}>
                  Your assets are prepared. Launch the campaign to put them to work — TikTok
                  optimizes toward the events your pixel already reports.
                </p>
              </div>
            }
          >
            <ChecklistDoneRow
              title="Connect your pixel"
              meta="LEVPLUS Web Pixel · receiving events"
              trailing={<IconChevronRight size={16} />}
            />
            <ChecklistDoneRow
              title="Create your catalog"
              meta="LEVPLUS — US catalog · 12 products"
              trailing={<IconChevronRight size={16} />}
            />
            <ChecklistDoneRow
              title="Connect your TikTok account"
              meta="@levplus · authorized"
              trailing={<IconChevronRight size={16} />}
            />
            <ChecklistDoneRow
              title={
                <Link to={libraryRoutes.shoppable} className={c.link}>
                  Set up shoppable assets
                </Link>
              }
              meta="36 videos · 24 products covered"
              trailing={<IconChevronRight size={16} />}
            />

            <div className={`${c.row} ${c.rowCurrent}`}>
              <div className={`${c.mark} ${c.markOpen}`} />
              <div className={c.rowBody}>
                <div className={c.currentTitle}>Create campaign</div>
                <div className={c.currentMeta}>
                  Set budget, audience, and schedule — assets are already attached.
                </div>
                <Link to={routes.campaign} className={c.cta}>
                  Start now
                </Link>
              </div>
            </div>
          </ChecklistPanel>
        </main>
      </div>
    </div>
  );
}
