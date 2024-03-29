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
  const [isComplete, setIsComplete] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // 입력 필드에 대한 참조를 생성합니다.
  const [message, setMessage] = useState('인증번호가 오지 않았어요'); // 메시지 상태 추가
  const [messagePart1, setMessagePart1] =
    useState('인증번호가 입력되지 않았어요');
  const [messagePart2, setMessagePart2] = useState('인증번호가 오지 않았나요?');
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

  const handleSubmit = () => {
    const isAllFilled = Object.values(number).every((num) => num !== '');
    setIsComplete(isAllFilled); // 모든 필드가 채워졌는지 상태 업데이트
  };

  const MessageDisplay = () => {
    if (isComplete) {
      return <div className={styles.retryMent}>{message}</div>;
    } else {
      return (
        <div className={styles.retryMent}>
          <div className={styles.errorMent}>{messagePart1}</div>
          <div>{messagePart2}</div>
        </div>
      );
    }
  };

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
        <MessageDisplay />
      </div>
      <div className={styles.submitButton} onClick={handleSubmit}>
        본인 인증
      </div>
    </div>
  );
}
