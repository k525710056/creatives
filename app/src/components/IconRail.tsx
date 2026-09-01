import { Link } from 'react-router-dom';
import { routes } from '../routes';
import {
  IconAssets,
  IconAudience,
  IconBilling,
  IconCampaigns,
  IconCatalog,
  IconCreativeLibrary,
  IconHome,
  IconMoreHorizontal,
} from './icons';
import styles from './IconRail.module.css';

/** The 72px product rail. Creative Library is the active destination here. */
export default function IconRail() {
  return (
    <nav className={styles.rail}>
      <Link to={routes.onboarding} title="Home" className={styles.item}>
        <IconHome size={22} />
      </Link>
      <Link to={routes.campaign} title="Campaigns" className={styles.item}>
        <IconCampaigns size={22} />
      </Link>
      <div title="Assets" className={styles.item}>
        <IconAssets size={22} />
      </div>
      <div title="Creative Library" className={`${styles.item} ${styles.active}`}>
        <IconCreativeLibrary size={22} />
      </div>
      <div title="Billing" className={styles.item}>
        <IconBilling size={22} />
      </div>
      <div title="Audience" className={styles.item}>
        <IconAudience size={22} />
      </div>
      <div title="Catalog" className={styles.item}>
        <IconCatalog size={22} />
      </div>
      <div title="More" className={styles.item}>
        <IconMoreHorizontal size={22} />
      </div>
    </nav>
  );
}
