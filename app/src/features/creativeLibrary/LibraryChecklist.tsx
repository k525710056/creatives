import { Link } from 'react-router-dom';
import ChecklistPanel, {
  ChecklistBars,
  ChecklistDoneRow,
  checklistStyles as c,
} from '../../components/ChecklistPanel';
import { IconCheck } from '../../components/icons';
import { routes } from '../../routes';

interface Props {
  open: boolean;
  onToggle: () => void;
  unlinkedCount: number;
  totalCount: number;
  onCreate: () => void;
}

/**
 * The same onboarding checklist, with step 4 as the live step here. It starts
 * collapsed: the Creative Library's content column is narrower than
 * onboarding's, so an expanded panel would cover what the page is teaching.
 */
export default function LibraryChecklist({
  open,
  onToggle,
  unlinkedCount,
  totalCount,
  onCreate,
}: Props) {
  const allLinked = unlinkedCount === 0;

  return (
    <ChecklistPanel
      open={open}
      onToggle={onToggle}
      summary={
        <div className={c.summary}>
          <div className={c.progressLine}>
            <span className={c.progressValue}>{allLinked ? 4 : 3}/5 completed</span>
            <span className={c.progressRemaining}>
              {allLinked ? '1 step left' : '2 steps left'}
            </span>
          </div>
          <ChecklistBars done={allLinked ? 4 : 3} />
          <p className={c.note}>
            {allLinked
              ? 'Every creative is in a shoppable asset. Launch the campaign to put them to work.'
              : 'Pair your media with products so campaigns have something shoppable to serve.'}
          </p>
        </div>
      }
    >
      <ChecklistDoneRow
        title="Connect your pixel"
        meta="LEVPLUS Web Pixel · receiving events"
      />
      <ChecklistDoneRow title="Create your catalog" meta="LEVPLUS — US catalog · 12 products" />
      <ChecklistDoneRow title="Connect your TikTok account" meta="@levplus · authorized" />

      <div className={allLinked ? c.row : `${c.row} ${c.rowCurrent}`}>
        <div className={allLinked ? c.mark : `${c.mark} ${c.markOpen}`}>
          {allLinked ? <IconCheck size={12} /> : null}
        </div>
        <div className={c.rowBody}>
          <div className={allLinked ? c.doneTitle : c.currentTitle}>Set up shoppable assets</div>
          <div className={`${c.currentMeta} ${allLinked ? c.currentMetaFlush : ''}`}>
            {allLinked
              ? `${totalCount} creatives · all in a shoppable asset`
              : `${unlinkedCount} of ${totalCount} creatives not in a shoppable asset yet`}
          </div>
          {allLinked ? null : (
            <button type="button" className={c.cta} onClick={onCreate}>
              + Create shoppable asset
            </button>
          )}
        </div>
      </div>

      <div className={`${c.row} ${c.rowLast}`}>
        <div className={`${c.mark} ${c.markMuted}`} />
        <div className={c.rowBody}>
          <div className={c.currentTitle}>Create campaign</div>
          <div className={c.currentMeta}>
            Set budget, audience, and schedule — assets are already attached.
          </div>
          <Link to={routes.campaign} className={c.ctaSecondary}>
            Start now
          </Link>
        </div>
      </div>
    </ChecklistPanel>
  );
}
