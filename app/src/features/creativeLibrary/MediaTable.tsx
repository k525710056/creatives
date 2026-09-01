import { CREATIVE_SOURCE, REVIEW_STATUS, type ShoppableAsset } from '../../data/library';
import { CREATIVES, CREATIVE_KINDS, type CreativeKind } from '../../data/creatives';
import { bg } from '../../data/media';
import { IconCheck } from '../../components/icons';
import s from './CreativeLibrary.module.css';

interface Props {
  mediaTab: CreativeKind;
  onSelectTab: (kind: CreativeKind) => void;
  setsFor: (assetId: string) => ShoppableAsset[];
  allLinked: boolean;
  onOpenDrawer: () => void;
  onGoShoppable: () => void;
}

export default function MediaTable({
  mediaTab,
  onSelectTab,
  setsFor,
  allLinked,
  onOpenDrawer,
  onGoShoppable,
}: Props) {
  const rows = CREATIVES.filter((a) => a.kind === mediaTab);
  const title = (CREATIVE_KINDS.find((k) => k.key === mediaTab) ?? CREATIVE_KINDS[0]).label;

  return (
    <div className={s.stack16}>
      <div className={`${s.pageHead} ${s.pageHeadTop}`}>
        <div style={{ minWidth: 0 }}>
          <h1 className={s.h1}>{title}</h1>
          <p className={s.pageSub}>
            {mediaTab === 'catalog'
              ? 'Product imagery pulled from your catalog. Available as a creative asset without uploading anything.'
              : 'A creative asset on its own. It becomes an interactive creative asset once it is assembled — a shoppable asset pairs it with a product.'}
          </p>
        </div>
        <button type="button" className={`${s.btnPrimary} ${s.btnPrimarySm}`}>
          Upload or import
        </button>
      </div>

      {allLinked ? (
        <div className={s.allLinkedBanner}>
          <div className={s.allLinkedMark}>
            <IconCheck size={14} />
          </div>
          <p className={s.allLinkedCopy}>
            Every piece of media in this view is part of a shoppable asset. Nothing here is sitting
            unused.
          </p>
          <button type="button" className={s.allLinkedCta} onClick={onGoShoppable}>
            View shoppable assets
          </button>
        </div>
      ) : null}

      <div className={s.tableCard}>
        <div className={s.tabs}>
          {CREATIVE_KINDS.map((k) => {
            const active = k.key === mediaTab;
            const count = CREATIVES.filter((a) => a.kind === k.key).length;
            return (
              <button
                type="button"
                key={k.key}
                className={`${s.tab} ${active ? s.tabActive : ''}`}
                onClick={() => onSelectTab(k.key)}
              >
                {k.label}
                <span className={`${s.tabCount} ${active ? s.tabCountActive : ''}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={s.tableScroll}>
          <div className={s.mediaTable}>
            <div className={s.mediaHead}>
              <span className={s.th}>Creative</span>
              <span className={s.th}>In shoppable assets</span>
              <span className={s.th}>Tags</span>
              <span className={s.th}>Pre-review</span>
              <span className={s.th}>Creative source</span>
              <span className={s.th}>Spend</span>
              <span className={s.th}>Action</span>
            </div>

            {rows.map((a) => {
              const sets = setsFor(a.id);
              const status = REVIEW_STATUS[a.status];
              const source = CREATIVE_SOURCE[a.source];
              return (
                <div key={a.id} className={s.mediaRow}>
                  <div className={s.mediaCreative}>
                    <div className={s.mediaThumb} style={bg(a.media)} />
                    <div style={{ minWidth: 0 }}>
                      <p className={s.mediaName}>{a.name}</p>
                      <p className={s.mediaDimension}>{a.dimension}</p>
                    </div>
                  </div>

                  {/* Product binding no longer happens on raw media, so this
                      column reports which assembled assets use it. */}
                  <div className={s.cellWrap}>
                    {sets.map((set) => (
                      <span key={set.id} className={s.setChip}>
                        {set.name}
                      </span>
                    ))}
                    {sets.length === 0 ? (
                      <button type="button" className={s.createSetChip} onClick={onOpenDrawer}>
                        + Create shoppable asset
                      </button>
                    ) : null}
                  </div>

                  <div className={s.cellWrap}>
                    {a.tags.map((tag: string) => (
                      <span key={tag} className={s.tagChip}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={s.cellCenter}>
                    <span
                      className={s.statusPill}
                      style={{ background: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className={s.cellCenter}>
                    <span className={s.sourceCell} style={{ color: source.color }}>
                      {source.label}
                    </span>
                  </div>

                  <div className={s.spendCell}>{a.spend} USD</div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button type="button" className={s.rowAction}>
                      Add to campaign
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className={s.countLabel}>
          {rows.length} {rows.length === 1 ? 'item' : 'items'}
        </p>
      </div>
    </div>
  );
}
