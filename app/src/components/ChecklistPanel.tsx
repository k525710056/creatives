import type { ReactNode } from 'react';
import { IconCheck, IconChevronDown } from './icons';
import styles from './ChecklistPanel.module.css';

export { styles as checklistStyles };

interface PanelProps {
  open: boolean;
  onToggle: () => void;
  /** Campaign shows a "4/5" pill beside the title instead of a progress block. */
  countPill?: string;
  compactHead?: boolean;
  aboveActionBar?: boolean;
  summary?: ReactNode;
  children: ReactNode;
}

export default function ChecklistPanel({
  open,
  onToggle,
  countPill,
  compactHead,
  aboveActionBar,
  summary,
  children,
}: PanelProps) {
  return (
    <aside className={`${styles.panel} ${aboveActionBar ? styles.aboveActionBar : ''}`}>
      <div
        className={`${styles.head} ${compactHead ? styles.headCompact : ''}`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      >
        <div className={styles.titleRow}>
          <div className={compactHead ? styles.titleCompact : styles.title}>
            Get started on Ads Manager
          </div>
          {countPill ? <span className={styles.countPill}>{countPill}</span> : null}
        </div>
        <IconChevronDown
          size={18}
          className={`${styles.caret} ${open ? '' : styles.caretCollapsed}`}
        />
      </div>
      {open ? (
        <>
          {summary}
          <div className={styles.body}>{children}</div>
        </>
      ) : null}
    </aside>
  );
}

/** Five progress bars; `done` is how many of them are filled. */
export function ChecklistBars({ done, compact }: { done: number; compact?: boolean }) {
  return (
    <div className={`${styles.bars} ${compact ? styles.barsCompact : ''}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className={`${styles.bar} ${i < done ? styles.barDone : ''}`} />
      ))}
    </div>
  );
}

export function ChecklistDoneRow({
  title,
  meta,
  compact,
  trailing,
}: {
  title: ReactNode;
  meta?: string;
  compact?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <div className={`${styles.row} ${compact ? styles.rowCompact : ''}`}>
      <div className={styles.mark}>
        <IconCheck size={12} />
      </div>
      {compact ? (
        <div className={styles.doneTitleCompact}>{title}</div>
      ) : (
        <div className={styles.rowBody}>
          <div className={styles.doneTitle}>{title}</div>
          {meta ? <div className={styles.doneMeta}>{meta}</div> : null}
        </div>
      )}
      {trailing}
    </div>
  );
}
