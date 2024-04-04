import * as styles from '@/styles/loading/loading.css';

export const LoaderComponent = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.loader}></div>
    <div className={styles.loaderText}>Loading...</div>
  </div>
);


