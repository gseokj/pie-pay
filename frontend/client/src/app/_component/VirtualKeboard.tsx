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
interface Password {
  value0: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
}

type Props = {
  password: Password;
  setPassword: React.Dispatch<React.SetStateAction<Password>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function VirtualKeboard({
  password,
  setPassword,
  index,
  setIndex,
}: Props) {
  //   const numberArrays: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  //   const numberArray = shuffleArray(numberArrays);
  const [numberArray, setNumberArray] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  useEffect(() => {
    setNumberArray(shuffleArray(numberArray));
  }, []);

  const handleNumberClick = (number: number) => {
    const update = (): number => {
      const key = `value${index}`;
      const updatePassword = { ...password, [key]: number };
      setPassword(updatePassword);
      return index + 1;
    };

    const newIndex: number = index <= 5 ? update() : index;
    setIndex(newIndex);
  };

  // useEffect(() => {
  //   console.log(index);
  //   console.log(password);
  // }, [password]);

  const deleteNumberClick = () => {
    const update = (): number => {
      const key = `value${index - 1}`;
      const updatePassword = { ...password, [key]: '' };
      setPassword(updatePassword);
      return index - 1;
    };

    const newIndex: number = index > 0 ? update() : index;
    setIndex(newIndex);
  };

  return (
    <div className={styles.keyboardContainer}>
      <div
        className={styles.number}
        onClick={() => handleNumberClick(numberArray[0])}
      >
        {numberArray[0]}
      </div>
      <div
        className={styles.number}
        onClick={() => handleNumberClick(numberArray[1])}
      >
        {numberArray[1]}
      </div>
      <div
        className={styles.number}
        onClick={() => handleNumberClick(numberArray[2])}
      >
        {numberArray[2]}
      </div>
      <div
        className={styles.number}
        onClick={() => handleNumberClick(numberArray[3])}
      >
        {numberArray[3]}
      </div>
      <div
        className={styles.number}
        onClick={() => handleNumberClick(numberArray[4])}
      >
        {numberArray[4]}
      </div>
      <div
        className={styles.number}
        onClick={() => handleNumberClick(numberArray[5])}
      >
        {numberArray[5]}
      </div>
      <div
        className={styles.number}
        onClick={() => handleNumberClick(numberArray[6])}
      >
        {numberArray[6]}
      </div>
      <div
        className={styles.number}
        onClick={() => handleNumberClick(numberArray[7])}
      >
        {numberArray[7]}
      </div>
      <div
        className={styles.number}
        onClick={() => handleNumberClick(numberArray[8])}
      >
        {numberArray[8]}
      </div>
      <div className={styles.text}>취소</div>
      <div
        className={styles.number}
        onClick={() => handleNumberClick(numberArray[9])}
      >
        {numberArray[9]}
      </div>
      <div className={styles.text} onClick={() => deleteNumberClick()}>
        삭제
      </div>
    </div>
  );
}
