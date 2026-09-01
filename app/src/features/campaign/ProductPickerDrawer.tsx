import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRICES, PROMOTED_PRODUCTS } from '../../data/campaign';
import { libraryRoutes } from '../../routes';
import { IconCheck, IconChevronDown, IconChevronLeft, IconChevronRight, IconSearch } from '../../components/icons';
import { bg } from './style';
import d from './CampaignDrawers.module.css';

interface Props {
  initialSelection: string[];
  onCancel: () => void;
  onSave: (selection: string[]) => void;
}

export default function ProductPickerDrawer({ initialSelection, onCancel, onSave }: Props) {
  const [selection, setSelection] = useState<string[]>(initialSelection);
  const [query, setQuery] = useState('');

  const allPicked = selection.length === PROMOTED_PRODUCTS.length;
  const q = query.trim().toLowerCase();
  const rows = PROMOTED_PRODUCTS.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.spu.toLowerCase().includes(q),
  );

  const toggle = (spu: string) =>
    setSelection((cur) => (cur.includes(spu) ? cur.filter((x) => x !== spu) : [...cur, spu]));

  return (
    <>
      <div className={d.scrim} onClick={onCancel} />
      <div className={d.picker} role="dialog" aria-modal="true" aria-label="Promoted products">
        <div className={d.pickerHead}>
          <button type="button" className={d.pickerClose} onClick={onCancel} aria-label="Close">
            <IconChevronRight size={16} />
          </button>
          <h2 className={d.pickerTitle}>Promoted products</h2>
          <div className={d.pickerSub}>
            Select which products to feature. Selecting all is recommended so we can match audiences
            with the ones they&apos;re most likely to buy. Manage products in{' '}
            <Link to={libraryRoutes.media('catalog')}>Catalog Manager</Link>.
          </div>
        </div>

        <div className={d.pickerBody}>
          <div className={d.pickerRail}>
            <div className={d.catalogSelect}>
              levplus-us-catalog
              <IconChevronDown size={16} />
            </div>
            <div className={d.scopeCard}>
              <div>
                <div className={d.scopeTitle}>Products</div>
                <div className={d.scopeMeta}>
                  Featuring all products is recommended. Custom select up to 20.
                </div>
              </div>
              <div className={`${d.radio} ${d.radioOn}`} />
            </div>
            <div className={`${d.scopeCard} ${d.scopeCardIdle}`}>
              <div>
                <div className={`${d.scopeTitle} ${d.scopeTitleIdle}`}>Product set</div>
                <div className={`${d.scopeMeta} ${d.scopeMetaIdle}`}>
                  Only feature products from a set.
                </div>
              </div>
              <div className={d.radio} />
            </div>
          </div>

          <div className={d.pickerMain}>
            <div className={d.pickerToolbar}>
              <div className={d.toolChip}>
                Name
                <IconChevronDown size={14} />
              </div>
              <div className={d.toolSearch}>
                <IconSearch size={15} style={{ color: '#a9abac' }} />
                <input
                  className={d.toolSearchInput}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  aria-label="Search products"
                />
              </div>
              <div className={d.toolChip}>
                Available
                <IconChevronDown size={14} />
              </div>
              <div className={d.pager}>
                <IconChevronLeft size={14} />1 / 6
                <IconChevronRight size={14} />
              </div>
            </div>

            <div className={d.urlPick}>
              <div className={d.urlPickHead}>
                <span>Select specific products from URL</span>
                <IconChevronDown size={16} />
              </div>
              <div className={d.urlPickRow}>
                <div className={d.urlPickInput}>Enter URL</div>
                <div className={d.urlPickConfirm}>Confirm</div>
              </div>
            </div>

            <div className={d.pickerTableHead}>
              <button
                type="button"
                className={`${d.box} ${allPicked ? d.boxOn : ''}`}
                onClick={() =>
                  setSelection(allPicked ? [] : PROMOTED_PRODUCTS.map((p) => p.spu))
                }
                aria-label="Select all products"
              >
                {allPicked ? <IconCheck size={12} /> : null}
              </button>
              <span className={`${d.pickerTh} ${d.thGrow}`}>Product info</span>
              <span className={`${d.pickerTh} ${d.thPrice}`}>Price</span>
              <span className={`${d.pickerTh} ${d.thUrl}`}>URL</span>
            </div>

            <div className={d.pickerRows}>
              {rows.map((p) => {
                const i = PROMOTED_PRODUCTS.indexOf(p);
                const on = selection.includes(p.spu);
                return (
                  <button
                    type="button"
                    key={p.spu}
                    className={`${d.pickerRow} ${on ? d.pickerRowOn : ''}`}
                    onClick={() => toggle(p.spu)}
                  >
                    <span className={`${d.box} ${on ? d.boxOn : ''}`}>
                      {on ? <IconCheck size={12} /> : null}
                    </span>
                    <span className={d.rowImg} style={bg(p.img)} />
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span className={d.rowName} style={{ display: 'block' }}>
                        {p.name}
                      </span>
                      <span className={d.rowSku} style={{ display: 'block' }}>
                        SKU {p.spu.replace('SPU ', '')}0{i}
                      </span>
                    </span>
                    <span className={d.rowPrice}>{PRICES[i]} USD</span>
                    <span className={d.rowUrl}>URL</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={d.pickerFoot}>
          <span className={d.pickerFootLabel}>
            {allPicked ? 'All products selected' : `${selection.length} products selected`}
          </span>
          <div className={d.footActions}>
            <button type="button" className={d.btnGhost} onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className={d.btnPrimary} onClick={() => onSave(selection)}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
