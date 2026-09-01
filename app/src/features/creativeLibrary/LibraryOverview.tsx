import {
  CONTENT_SUITE_PROJECTS,
  LIBRARY_CREATIVES,
  OVERVIEW_STATS,
} from '../../data/library';
import {
  IconAd,
  IconCheck,
  IconChevronDown,
  IconDoc,
} from '../../components/icons';
import s from './CreativeLibrary.module.css';

const RING_CIRCUMFERENCE = 163.363;

const bg = (url: string) => ({ ['--thumb' as string]: `url(${url})` });

interface Props {
  unlinkedCount: number;
  onStart: () => void;
}

export default function LibraryOverview({ unlinkedCount, onStart }: Props) {
  const allLinked = unlinkedCount === 0;
  const score = allLinked ? 5 : 4;

  const readiness = [
    { label: 'Add at least 6 creative assets', done: true },
    { label: 'Link a TikTok account', done: true },
    { label: 'Generate creative assets with AI', done: true },
    { label: 'Add code for authorized TikTok post', done: true },
    { label: 'Link creatives to catalog products', done: allLinked },
  ];

  const topAssets = LIBRARY_CREATIVES.slice(0, 4);

  return (
    <div className={s.stack20}>
      <div className={s.pageHead}>
        <h1 className={s.h1}>Overview</h1>
        <div className={s.headActions}>
          <button type="button" className={s.btnSecondary}>
            Add authorized TikTok post
          </button>
          <button type="button" className={s.btnPrimary}>
            Upload or import
            <IconChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className={s.columns}>
        <div className={s.colMain}>
          <section className={s.card}>
            <div className={s.cardHeadRow}>
              <h2 className={s.cardTitle}>Get started</h2>
              <IconChevronDown size={20} className={s.collapseCaret} />
            </div>
            <div className={s.getStartedBody}>
              <div className={s.startHere}>
                <div className={s.startHereBody}>
                  <div className={s.startHereTitleRow}>
                    <p className={s.startHereTitle}>
                      Turn your creative assets into shoppable assets
                    </p>
                    <span className={s.newBadge}>NEW</span>
                  </div>
                  <p className={s.startHereCopy}>
                    Link each creative to products so customers can shop directly from your ads and
                    help improve campaign performance.
                  </p>
                  <div className={s.startHereActions}>
                    <button type="button" className={s.startHereCta} onClick={onStart}>
                      + Make creatives shoppable
                    </button>
                  </div>
                </div>
                <img
                  src="uploads/pasted-1788230779522-0.png"
                  alt="A creative linked to a product becomes a shoppable ad"
                  className={s.startHereArt}
                />
              </div>
            </div>
          </section>

          <section className={s.card}>
            <h2 className={s.cardTitle}>Auto-generated for you</h2>
            <p className={s.cardSub}>
              You can auto-generate some creative assets from your existing ones.
            </p>
            <div className={s.emptyGenerated}>
              <div className={s.emptyGeneratedArt} />
              <p className={s.emptyGeneratedCopy}>No creative assets have been generated yet.</p>
              <button type="button" className={s.emptyGeneratedCta}>
                Generate new
              </button>
            </div>
          </section>

          <section className={s.card}>
            <h2 className={s.cardTitle}>Added by you</h2>
            <h3 className={s.subhead}>Overview</h3>
            <div className={s.statGrid}>
              {OVERVIEW_STATS.map((stat) => (
                <div key={stat.label} className={s.stat}>
                  <p className={s.statLabel}>{stat.label}</p>
                  <p className={s.statValue}>{stat.value}</p>
                </div>
              ))}
            </div>

            <h3 className={`${s.subhead} ${s.subheadSpaced}`}>Top-performing creative assets</h3>
            <div className={s.topTable}>
              <div className={`${s.topRow} ${s.topHead}`}>
                <span>Creative asset</span>
                <span>Spending</span>
                <span>CVR (Clicks)</span>
                <span />
              </div>
              {topAssets.map((a) => (
                <div key={a.id} className={`${s.topRow} ${s.topBodyRow}`}>
                  <div className={s.topAsset}>
                    <div className={s.topThumb} style={bg(a.thumbnail)} />
                    <div style={{ minWidth: 0 }}>
                      <p className={s.topName}>{a.name}</p>
                      <p className={s.topType}>{a.source === 'aigc' ? 'AIGC video' : 'Video'}</p>
                    </div>
                  </div>
                  <span className={s.topCell}>{a.spend}</span>
                  <span className={s.topCell}>0.00</span>
                  <span />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className={s.colRail}>
          <section className={`${s.card} ${s.cardPad20}`}>
            <h2 className={s.cardTitle}>Creative readiness</h2>
            <div className={s.ringRow}>
              <div className={s.ring}>
                {/* A real arc, so the ring and the "one step left" copy agree. */}
                <svg viewBox="0 0 62 62" className={s.ringSvg}>
                  <circle cx="31" cy="31" r="26" fill="none" stroke="#e6e7e8" strokeWidth="4" />
                  <circle
                    cx="31"
                    cy="31"
                    r="26"
                    fill="none"
                    stroke="#0d9f6e"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_CIRCUMFERENCE * (1 - score / 5)}
                  />
                </svg>
                <span className={s.ringLabel}>{score}/5</span>
              </div>
              <p className={s.ringMessage}>
                {allLinked
                  ? 'Your creative setup is ready for optimal performance.'
                  : 'One step left: put your remaining media into a shoppable asset.'}
              </p>
            </div>
            <div className={s.checkList}>
              {readiness.map((check) => (
                <div key={check.label} className={s.checkRow}>
                  <span className={`${s.checkDot} ${check.done ? '' : s.checkDotOff}`}>
                    <IconCheck size={11} />
                  </span>
                  <span className={s.checkLabel}>{check.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={`${s.card} ${s.cardPad20}`}>
            <h2 className={s.cardTitle}>Content Suite project</h2>
            <div className={s.projects}>
              {CONTENT_SUITE_PROJECTS.map((p) => (
                <div key={p.name} className={s.project}>
                  <p className={s.projectName}>{p.name}</p>
                  <p className={s.projectStatus}>
                    <span className={s.projectDot} />
                    {p.status}
                  </p>
                </div>
              ))}
            </div>
            <div className={s.projectActions}>
              <button type="button" className={s.projectBtn}>
                New project
              </button>
              <button type="button" className={s.projectBtn}>
                View all
              </button>
            </div>
          </section>

          <section className={`${s.card} ${s.cardPad20}`}>
            <h2 className={s.cardTitle}>Resources</h2>
            <div className={s.resources}>
              <div>
                <a href="#" className={s.resourceLink}>
                  <IconDoc size={16} />
                  TikTok ad specs
                </a>
                <p className={s.resourceCopy}>Review the specs for different types of TikTok ads.</p>
              </div>
              <div>
                <a href="#" className={s.resourceLink}>
                  <IconAd size={16} />
                  Ad preview tool
                </a>
                <p className={s.resourceCopy}>
                  Use the ad preview tool to envision what your ad will look like once it&apos;s
                  published.
                </p>
              </div>
              <div>
                <a href="#" className={s.resourceLink}>
                  <IconDoc size={16} />
                  TikTok creative best practices
                </a>
                <p className={s.resourceCopy}>
                  Review best practices that have worked well for advertisers on TikTok.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
