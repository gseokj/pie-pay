import * as styles from '@/styles/mypage/historyContent.css';

type Info = {
  name: string;
  profile: string;
  amount: number;
  createdAt: string | null;
  type: string;
};

export default function DebtsHistory({
  name,
  profile,
  amount,
  createdAt,
  type,
}: Info) {
  if (type === 'lent') {
    return (
      <div className={styles.container}>
        <div className={styles.topRow}>
          <p className={styles.createdAtStyle}>{createdAt}</p>
          <p className={styles.status}>정산 미완료</p>
        </div>
        <div className={styles.profileSection}>
          <img className={styles.profileImage} src={profile} />
          <p className={styles.nameStyle}>{name}님에게 받을 돈이 있어요</p>
        </div>
        <div className={styles.bottomRow}>
          <p className={styles.amountStyle}>{amount} 원</p>
        </div>
      </div>
    );
  } else if (type === 'borrowed') {
    return (
      <div className={styles.container}>
        <div className={styles.topRow}>
          <p className={styles.createdAtStyle}>{createdAt}</p>
          <p className={styles.status}>정산 미완료</p>
        </div>
        <div className={styles.profileSection}>
          <img className={styles.profileImage} src={profile} />
          <p className={styles.nameStyle}>{name}님에게 갚을 돈이 있어요</p>
        </div>
        <div className={styles.bottomRow}>
          <p className={styles.amountStyle}>{amount} 원</p>
          <button className={styles.settleButton}>현금 정산</button>
        </div>
      </div>
    );
  }
}
