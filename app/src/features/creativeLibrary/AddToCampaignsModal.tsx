import { useState } from 'react';
import { CAMPAIGNS } from '../../data/library';
import { IconCheck, IconClose } from '../../components/icons';
import s from './CreativeLibrary.module.css';

export interface CampaignTarget {
  name: string;
  destination: string;
  creatives: number;
}

interface Props {
  target: CampaignTarget;
  onClose: () => void;
  onConfirm: (target: CampaignTarget, count: number) => void;
}

/** Adding to a campaign is a separate decision from building the link, so it
    gets its own modal rather than a step inside the drawer. */
export default function AddToCampaignsModal({ target, onClose, onConfirm }: Props) {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalScrim} onClick={onClose} />
      <div className={s.modal} role="dialog" aria-modal="true" aria-label="Add to campaigns">
        <div className={s.modalHead}>
          <div style={{ minWidth: 0 }}>
            <h2 className={s.modalTitle}>Add to campaigns</h2>
            <p className={s.modalSub}>{target.name}</p>
            <p className={s.modalMeta}>
              {target.destination} · {target.creatives}{' '}
              {target.creatives === 1 ? 'creative' : 'creatives'}
            </p>
          </div>
          <button type="button" className={s.modalClose} onClick={onClose} aria-label="Close">
            <IconClose size={18} />
          </button>
        </div>

        <div className={s.pickHead}>
          <span />
          <span className={s.pickTh}>Campaign</span>
          <span className={s.pickTh}>Objective</span>
          <span className={s.pickTh}>Status</span>
          <span className={s.pickTh}>Spend</span>
        </div>

        <div className={s.pickScroll}>
          {CAMPAIGNS.map((c) => {
            const checked = picked.includes(c.id);
            return (
              <button
                type="button"
                key={c.id}
                className={`${s.pickRow} ${checked ? s.pickRowOn : ''}`}
                onClick={() => toggle(c.id)}
              >
                <span className={`${s.pickBox} ${checked ? s.pickBoxOn : ''}`}>
                  {checked ? <IconCheck size={11} /> : null}
                </span>
                <div style={{ minWidth: 0, paddingRight: 12 }}>
                  <p className={s.pickName}>{c.name}</p>
                  <p className={s.pickId}>ID {c.id}</p>
                </div>
                <div className={s.pickObjective}>{c.objective}</div>
                <div className={s.cellPad}>
                  <span className={`${s.pillSm} ${c.status === 'Active' ? s.pillLive : ''}`}>
                    {c.status}
                  </span>
                </div>
                <div className={s.pickSpend}>{c.spend}</div>
              </button>
            );
          })}
        </div>

        <div className={s.modalFoot}>
          <p className={s.modalNote}>
            {picked.length === 0
              ? 'The asset stays in your library — adding it to a campaign does not copy it.'
              : `${picked.length} ${picked.length === 1 ? 'campaign' : 'campaigns'} selected`}
          </p>
          <button type="button" className={s.modalCancel} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={s.modalSave}
            disabled={picked.length === 0}
            onClick={() => onConfirm(target, picked.length)}
          >
            {picked.length > 1 ? `Add to ${picked.length} campaigns` : 'Add to campaign'}
          </button>
        </div>
      </div>
    </div>
  );
}
