'use client';

import ProgressBar from '@/app/(pre-verification)/sign-in/_component/ProgressBar';
import * as styles from '@/styles/signin/singin.css';
import { useState, useEffect, useRef } from 'react';
import Timer from '../../_component/Timer';
import NumberDisplay from '../../_component/NumberDisplay';

export default function Page() {
  const [number, setNumber] = useState({
    num0: '',
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
  });
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // 입력 필드에 대한 참조를 생성합니다.

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // 숫자키, 백스페이스, 삭제, 방향키, Tab만 허용
    if (
      !/^\d$/.test(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'Tab'
    ) {
      event.preventDefault(); // 위 조건에 맞지 않는 키 입력을 차단
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const lastChar = newValue[newValue.length - 1] || '';

    // 입력값 길이가 줄어들었는지 확인하여 삭제 동작 판단
    if (newValue.length < inputValue.length) {
      // 사용자가 값을 삭제했을 때의 처리
      const currentFilled = Object.values(number).filter(
        (val) => val !== '',
      ).length;
      const lastFilledIndex = currentFilled - 1;
      setNumber((prev) => {
        const newNumber = { ...prev };
        if (lastFilledIndex >= 0) {
          newNumber[`num${lastFilledIndex}`] = '';
        }
        return newNumber;
      });
    } else if (!isNaN(Number(lastChar))) {
      // 새로운 숫자를 추가했을 때의 처리
      const currentFilled = Object.values(number).filter(
        (val) => val !== '',
      ).length;
      if (currentFilled < 6) {
        setNumber((prev) => ({ ...prev, [`num${currentFilled}`]: lastChar }));
      }
    }
    setInputValue(newValue); // 현재 입력값 상태 업데이트
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.hiddenInput}
        ref={inputRef} // input 요소에 ref를 설정합니다.
        type="text"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        maxLength={6} // 최대 입력 길이를 6으로 제한
      />
      <div className={styles.barContainer}>
        <ProgressBar />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          문자로 받은 <br />
          인증번호를 입력해주세요
        </div>
        <div className={styles.timerContainer}>
          <Timer />
        </div>
        <div className={styles.numberContainer} onClick={focusInput}>
          <NumberDisplay number={number} />
        </div>
        <div className={styles.retryMent}>인증번호가 오지 않았어요</div>
      </div>
      <div className={styles.submitButton}>본인 인증</div>
    </div>
  );
}
