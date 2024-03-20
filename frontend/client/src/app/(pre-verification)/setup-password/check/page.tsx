import VirtualKeboard from '@/app/_component/VirtualKeboard';
import * as styles from '@/styles/setpassword/setPassword.css';
import Image from 'next/image';
import dot from '@/assets/icons/dot.svg';

export default function SimplePasswordCheck() {
  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <div className={styles.title}>간편 비밀번호 확인</div>
        <div className={styles.description}>
          비밀번호를 다시 한번 입력하세요
        </div>
      </div>
      <div>
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
