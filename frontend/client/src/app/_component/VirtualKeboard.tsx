'use client';

import * as styles from '@/styles/virtualKeyboard/virtualKeboard.css';
import { useEffect, useState } from 'react';

function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function VirtualKeboard() {
  //   const numberArrays: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  //   const numberArray = shuffleArray(numberArrays);
  const [numberArray, setNumberArray] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  useEffect(() => {
    setNumberArray(shuffleArray(numberArray));
  });

  return (
    <div className={styles.keyboardContainer}>
      <div className={styles.number}>{numberArray[0]}</div>
      <div className={styles.number}>{numberArray[1]}</div>
      <div className={styles.number}>{numberArray[2]}</div>
      <div className={styles.number}>{numberArray[3]}</div>
      <div className={styles.number}>{numberArray[4]}</div>
      <div className={styles.number}>{numberArray[5]}</div>
      <div className={styles.number}>{numberArray[6]}</div>
      <div className={styles.number}>{numberArray[7]}</div>
      <div className={styles.number}>{numberArray[8]}</div>
      <div className={styles.text}>취소</div>
      <div className={styles.number}>{numberArray[9]}</div>
      <div className={styles.text}>삭제</div>
    </div>
  );
}
