'use client';

import VirtualKeboard from '@/app/_component/VirtualKeboard';
import * as styles from '@/styles/setpassword/setPassword.css';

export default function SimplePasswordSet() {
  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <div className={styles.title}>간편 비밀번호 설정</div>
        <div className={styles.description}>
          새로 설정할 간편 비밀번호를 입력하세요
        </div>
      </div>
      <div className={styles.passwordWrapper}>
        <ul className={styles.passwordScreen}>
          <li className={styles.dotWrapper}>
            <div className={styles.dotAfterInput}></div>
          </li>
          <li className={styles.dotWrapper}>
            <div className={styles.dotAfterInput}></div>
          </li>
          <li className={styles.dotWrapper}>
            <div className={styles.dotAfterInput}></div>
          </li>
          <li className={styles.dotWrapper}>
            <div className={styles.dotBeforeInput}></div>
          </li>
          <li className={styles.dotWrapper}>
            <div className={styles.dotBeforeInput}></div>
          </li>
          <li className={styles.dotWrapper}>
            <div className={styles.dotBeforeInput}></div>
          </li>
        </ul>
      </div>
      <VirtualKeboard />
    </div>
  );
}
