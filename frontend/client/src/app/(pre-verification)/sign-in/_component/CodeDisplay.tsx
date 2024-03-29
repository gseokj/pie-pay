import * as styles from '@/styles/signin/codeDisplay.css';

type Props = {
  code: { [key: string]: string };
};

export default function CodeDisplay({ code }: Props) {
  return (
    <div className={styles.numberContainer}>
      <ul className={styles.numberUl}>
        {Object.keys(code).map((key) => (
          <li key={key} className={styles.numberLi}>
            <div className={styles.number}>{code[key]}</div>
            <div
              className={
                code[key]
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
