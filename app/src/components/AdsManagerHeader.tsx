import { IconSearch } from './icons';
import styles from './AdsManagerHeader.module.css';

/** The black Ads Manager bar as the Creative Library renders it (64px). */
export default function AdsManagerHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.accountPill}>
          <div className={styles.appsGrid}>
            <span className={styles.appsDot} />
            <span className={styles.appsDot} />
            <span className={styles.appsDot} />
          </div>
          <div className={styles.avatar}>G</div>
        </div>
        <div className={styles.brand}>
          <img src="assets/tiktok-logo-icon.svg" alt="" className={styles.brandIcon} />
          <img src="assets/tiktok-logo-text.svg" alt="TikTok" className={styles.brandText} />
          <span className={styles.brandLabel}>Ads Manager</span>
        </div>
      </div>

      <div className={styles.searchWrap}>
        <div className={styles.search}>
          <IconSearch size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search pages, tools, or help articles"
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.business}>
          <span className={styles.businessName}>LEVPLUS Commerce</span>
          <img src="assets/KS/navbar-chevron.svg" alt="" className={styles.chevron} />
        </div>
        <div className={styles.toolButton}>
          <img src="assets/KS/navbar-business.svg" alt="" className={styles.toolIcon} />
        </div>
        <div className={styles.toolButton}>
          <img src="assets/KS/navbar-bell.svg" alt="" className={styles.toolIcon} />
        </div>
        <div className={styles.toolButton}>
          <img src="assets/KS/navbar-help.svg" alt="" className={styles.toolIcon} />
        </div>
      </div>
    </header>
  );
}
