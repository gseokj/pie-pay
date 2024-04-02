'use client'

import { useEffect, useState, useRef } from 'react';
import ProgressBar from '@/app/(pre-verification)/sign-in/_component/ProgressBar';
import * as styles from '@/styles/signin/singin.css';
import Timer from '../../_component/Timer';
import NumberDisplay from '../../_component/NumberDisplay';
import { useStore } from '@/store/usePhoneNumber';
import { ConfirmPhoneNumber } from '@/model/signin';
import { getCookie } from '@/util/getCookie';
import { useRouter } from 'next/navigation';
import { postRequestConfirm } from '@/api/signin';

type NumberState = {
  num0: string;
  num1: string;
  num2: string;
  num3: string;
  num4: string;
  num5: string;
};

export default function Page() {
  const [number, setNumber] = useState<NumberState>({
    num0: '',
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
  });
  const router = useRouter();
  const { phoneNumber, setPhoneNumber } = useStore();
  const [isComplete, setIsComplete] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('인증번호가 오지 않았어요');
  const [messagePart1, setMessagePart1] = useState('인증번호가 일치하지 않습니다');
  const [messagePart2, setMessagePart2] = useState('인증번호가 오지 않았나요?');
  const [isNotVerify, setIsNotVerify] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [messagePart3, setMessagePart3] = useState('인증번호가 일치하지 않습니다');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^\d$/.test(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'Tab'
    ) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const [token, setToken] = useState('');

  useEffect(() => {
    const token = getCookie('accessToken') as string;
    setToken(token);
  }, []);

  const sendVerificationRequest = async () => {
    console.log('인증 진행');
    const allNumbersAsString = Object.values(number).join('');
    try {
      const request: ConfirmPhoneNumber = {
        phoneNumber: phoneNumber.phoneNumber,
        verificationNumber: allNumbersAsString,
      };
      const response = await postRequestConfirm(request, token);
      router.push('/sign-in/account-auth');
    } catch (error) {
      setIsNotVerify(true);
    }
  };

  const handleSubmit = () => {
    const isAllFilled = Object.values(number).every((num) => num !== '');
    setIsComplete(isAllFilled);
    setIsClicked(true);
    if (isAllFilled) {
      sendVerificationRequest();
    }
  };

  const MessageDisplay = () => {
    if (isComplete && isNotVerify) {
      return (
        <div className={styles.retryMent}>
          <div className={styles.errorMent}>{messagePart1}</div>
          <div>{messagePart2}</div>
        </div>
      );
    } else if (!isComplete && !isNotVerify) {
      return (
        <div className={styles.retryMent}>
          <div className={styles.errorMent}>{messagePart1}</div>
          <div>{messagePart2}</div>
        </div>
      );
    } else if (isComplete || isNotVerify) {
      return <div className={styles.retryMent}>{message}</div>;
    }
  };

  useEffect(() => {
    console.log(isClicked);
    console.log(isNotVerify);
    MessageDisplay();
  }, [isNotVerify]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const lastChar = newValue[newValue.length - 1] || '';

    if (newValue.length < inputValue.length) {
      const currentFilled = Object.values(number).filter(
        (val) => val !== '',
      ).length;
      const lastFilledIndex = currentFilled - 1;
      setNumber((prev) => {
        const newNumber = { ...prev };
        if (lastFilledIndex >= 0) {
          newNumber[`num${lastFilledIndex}` as keyof NumberState] = '';
        }
        return newNumber;
      });
    } else if (!isNaN(Number(lastChar))) {
      const currentFilled = Object.values(number).filter(
        (val) => val !== '',
      ).length;
      if (currentFilled < 6) {
        setNumber((prev) => ({ ...prev, [`num${currentFilled}` as keyof NumberState]: lastChar }));
      }
    }
    setInputValue(newValue);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.hiddenInput}
        ref={inputRef}
        type="text"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        maxLength={6}
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
