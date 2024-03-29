'use client';

import { useEffect, useState, useRef } from 'react';
import ProgressBar from '@/app/(pre-verification)/sign-in/_component/ProgressBar';
import * as styles from '@/styles/signin/singin.css';
import { useRouter } from 'next/navigation';
import Timer from '../../_component/Timer';

import CodeDisplay from '../../_component/CodeDisplay';

export default function Page() {
  const [code, setCode] = useState({
    code0: '',
    code1: '',
    code2: '',
    code3: '',
  });

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // 입력 필드에 대한 참조를 생성합니다.
  const [isComposing, setIsComposing] = useState(false); // 한글 입력 중인지 확인하기 위한 상태

  //   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (!isComposing) {
  //       // 한글 입력 중이 아닐 때만 처리
  //       const newValue = event.target.value;
  //       const lastChar = newValue[newValue.length - 1] || '';

  //       if (newValue.length < inputValue.length) {
  //         const currentFilled = Object.values(code).filter(
  //           (val) => val !== '',
  //         ).length;
  //         const lastFilledIndex = currentFilled - 1;
  //         setCode((prev) => {
  //           const newCode = { ...prev };
  //           if (lastFilledIndex >= 0) {
  //             newCode[`code${lastFilledIndex}`] = '';
  //           }
  //           return newCode;
  //         });
  //       } else {
  //         const currentFilled = Object.values(code).filter(
  //           (val) => val !== '',
  //         ).length;
  //         if (currentFilled < 4) {
  //           setCode((prev) => ({ ...prev, [`code${currentFilled}`]: lastChar }));
  //         }
  //       }
  //       setInputValue(newValue);
  //     }
  //   };

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

  const updateCodeState = (value: string) => {
    // 전체 입력값을 바탕으로 코드 상태를 업데이트하는 로직
    const newValues = value.split('');
    const newCode = { code0: '', code1: '', code2: '', code3: '' };

    newValues.forEach((char, index) => {
      if (index < 4) {
        newCode[`code${index}`] = char;
      }
    });

    setCode(newCode);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setInputValue(newValue); // 현재 입력값 상태 업데이트

    if (!isComposing && newValue.length <= 4) {
      // 한글 입력 중이 아니고, 입력값 길이가 4 이하일 때만 코드 상태 업데이트
      updateCodeState(newValue);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (
    event: React.CompositionEvent<HTMLInputElement>,
  ) => {
    setIsComposing(false);
    // 한글 입력 완료 후에 코드 상태 업데이트
    updateCodeState(event.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.hiddenInput}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onCompositionStart={handleCompositionStart} // 한글 입력 시작 이벤트 추가
        onCompositionEnd={handleCompositionEnd} // 한글 입력 완료 이벤트 추가
        maxLength={4}
      />
      <div className={styles.barContainer}>
        <ProgressBar />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          문자로 받은 <br />
          인증번호를 입력해주세요
          <div className={styles.subTitle}>
            ex)황제펭귄1234 -> 1234
          </div>
        </div>
        <div className={styles.timerContainer}>
          <Timer />
        </div>
        <div className={styles.numberContainer} onClick={focusInput}>
          <CodeDisplay code={code} />
        </div>
        <div className={styles.retryMent}>다른 계좌로 인증하기</div>
      </div>
      <div className={styles.submitButton}>계좌 인증</div>
    </div>
  );
}
