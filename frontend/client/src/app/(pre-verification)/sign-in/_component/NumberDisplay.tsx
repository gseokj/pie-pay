import * as styles from '@/styles/signin/numberDisplay.css';

type Props = {
  number: { [key: string]: string };
};

export default function NumberDisplay({ number }: Props) {
  return (
    <div className={styles.numberContainer}>
      <ul className={styles.numberUl}>
        {Object.keys(number).map((key) => (
          <li key={key} className={styles.numberLi}>
            <div className={styles.number}>{number[key]}</div>
            <div
              className={
                number[key]
                  ? `${styles.underLine} ${styles.filledUnderLine}`
                  : styles.underLine
              }
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
