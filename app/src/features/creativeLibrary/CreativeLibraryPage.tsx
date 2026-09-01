import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AdsManagerHeader from '../../components/AdsManagerHeader';
import IconRail from '../../components/IconRail';
import ShoppableContentDrawer, {
  type SavedShoppableAsset,
} from '../shoppableDrawer/ShoppableContentDrawer';
import { LIBRARY_CREATIVES, LIBRARY_KINDS, SHOPPABLE_ASSETS, type LibraryKind, type ShoppableAsset } from '../../data/library';
import { libraryRoutes } from '../../routes';
import LibraryOverview from './LibraryOverview';
import MediaTable from './MediaTable';
import ShoppableAssetsView from './ShoppableAssetsView';
import AddToCampaignsModal, { type CampaignTarget } from './AddToCampaignsModal';
import LibraryChecklist from './LibraryChecklist';
import s from './CreativeLibrary.module.css';

type Page = 'overview' | 'media' | 'shoppable';

export default function CreativeLibraryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  /** `?empty=1` shows the account-has-none-yet state the design ships as a tweak. */
  const startEmpty = params.get('empty') === '1';

  const [sets, setSets] = useState<ShoppableAsset[]>(startEmpty ? [] : SHOPPABLE_ASSETS);
  // Toggling the state mid-session has to reseed the list, or the page keeps
  // whichever seed it happened to mount with.
  const [seededEmpty, setSeededEmpty] = useState(startEmpty);
  if (seededEmpty !== startEmpty) {
    setSeededEmpty(startEmpty);
    setSets(startEmpty ? [] : SHOPPABLE_ASSETS);
  }

  const [createOpen, setCreateOpen] = useState(false);
  const [campaignFor, setCampaignFor] = useState<CampaignTarget | null>(null);
  const [checklistOpen, setChecklistOpen] = useState(false);

  const { page, mediaTab } = useMemo(() => {
    const rest = location.pathname.replace(/^\/creative-library\/?/, '');
    if (rest.startsWith('shoppable')) return { page: 'shoppable' as Page, mediaTab: 'video' as LibraryKind };
    const media = rest.match(/^media\/(\w+)/);
    if (media) {
      const kind = LIBRARY_KINDS.find((k) => k.key === media[1])?.key ?? 'video';
      return { page: 'media' as Page, mediaTab: kind };
    }
    return { page: 'overview' as Page, mediaTab: 'video' as LibraryKind };
  }, [location.pathname]);

  const setsFor = (assetId: string) => sets.filter((x) => x.assetIds.includes(assetId));
  const unlinkedCount = LIBRARY_CREATIVES.filter((a) => setsFor(a.id).length === 0).length;
  const allLinked = unlinkedCount === 0;

  const go = (path: string) => navigate(startEmpty ? `${path}?empty=1` : path);
  const goOverview = () => go(libraryRoutes.overview);
  const goShoppable = () => go(libraryRoutes.shoppable);
  const goMedia = (kind: LibraryKind) => go(libraryRoutes.media(kind));

  const openCreate = () => setCreateOpen(true);
  /** Land on Shoppable assets first, so closing the drawer leaves you where the
      new asset will appear. */
  const startFromOverview = () => {
    goShoppable();
    setCreateOpen(true);
  };
  const closeCreate = () => {
    setCreateOpen(false);
    goShoppable();
  };

  /** The drawer stays open and fires once per saved asset, so append and keep ids unique. */
  const finishCreate = (result: SavedShoppableAsset) => {
    if (!result?.creatives) return;
    setSets((cur) => [
      {
        id: `new-${cur.length + 1}-${Date.now()}`,
        name: result.name,
        assetIds: [],
        creatives: result.creatives,
        destinationLabel: result.destination || 'Product from this asset',
        destinationSub: /^SPU/.test(result.destination || '')
          ? 'Product · catalog SPU'
          : 'Product · URL only',
        status: result.status === 'live' ? 'Live' : 'Paused',
        usedIn:
          result.campaigns > 0
            ? `${result.campaigns} ${result.campaigns === 1 ? 'campaign' : 'campaigns'}`
            : '0 campaigns',
        spend: '—',
        isNew: true,
      },
      ...cur,
    ]);
  };

  const confirmCampaigns = (target: CampaignTarget, count: number) => {
    setSets((cur) =>
      cur.map((x) =>
        x.name === target.name
          ? { ...x, usedIn: `${count} ${count === 1 ? 'campaign' : 'campaigns'}`, status: 'Live' }
          : x,
      ),
    );
    setCampaignFor(null);
  };

  const navItem = (active: boolean) => `${s.navItem} ${active ? s.navItemActive : ''}`;

  return (
    <div className={s.page}>
      <AdsManagerHeader />

      <div className={s.body}>
        <IconRail />

        <div className={s.scroll}>
          <div className={s.layout}>
            <aside className={s.sideRail}>
              <nav className={s.sideNav}>
                <h2 className={s.sideTitle}>Creative Library</h2>
                <div className={s.sideItems}>
                  <button
                    type="button"
                    className={navItem(page === 'overview')}
                    onClick={goOverview}
                  >
                    Overview
                  </button>

                  <p className={s.navGroup}>Creative assets</p>
                  {LIBRARY_KINDS.map((k) => (
                    <button
                      type="button"
                      key={k.key}
                      className={navItem(page === 'media' && mediaTab === k.key)}
                      onClick={() => goMedia(k.key)}
                    >
                      {k.label}
                    </button>
                  ))}

                  <p className={s.navGroup}>Interactive creative assets</p>
                  <button
                    type="button"
                    className={navItem(page === 'shoppable')}
                    onClick={goShoppable}
                  >
                    Shoppable assets
                    <span className={s.newBadge}>NEW</span>
                  </button>
                  {['Instant Form', 'Playable', 'Interactives'].map((label) => (
                    <div key={label} className={s.navItemMuted}>
                      {label}
                      <span className={s.navDash}>—</span>
                    </div>
                  ))}

                  <div className={s.navDivider} />
                  <div className={s.navTool}>Creative tools</div>
                </div>
              </nav>
            </aside>

            <main className={s.main}>
              {page === 'overview' ? (
                <LibraryOverview
                  unlinkedCount={unlinkedCount}
                  onStart={startFromOverview}
                />
              ) : null}

              {page === 'media' ? (
                <MediaTable
                  mediaTab={mediaTab}
                  onSelectTab={goMedia}
                  setsFor={setsFor}
                  allLinked={allLinked}
                  onOpenDrawer={openCreate}
                  onGoShoppable={goShoppable}
                />
              ) : null}

              {page === 'shoppable' ? (
                <ShoppableAssetsView
                  sets={sets}
                  showEmptyState={startEmpty && sets.length === 0}
                  onCreate={openCreate}
                  onBrowse={() => goMedia('video')}
                  onAddToCampaigns={setCampaignFor}
                />
              ) : null}
            </main>
          </div>
        </div>
      </div>

      <ShoppableContentDrawer
        open={createOpen}
        onClose={closeCreate}
        onDone={finishCreate}
      />

      {campaignFor ? (
        <AddToCampaignsModal
          target={campaignFor}
          onClose={() => setCampaignFor(null)}
          onConfirm={confirmCampaigns}
        />
      ) : null}

      <LibraryChecklist
        open={checklistOpen}
        onToggle={() => setChecklistOpen((v) => !v)}
        unlinkedCount={unlinkedCount}
        totalCount={LIBRARY_CREATIVES.length}
        onCreate={openCreate}
      />
    </div>
  );
}
