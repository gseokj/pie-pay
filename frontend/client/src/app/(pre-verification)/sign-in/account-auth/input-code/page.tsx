'use client'

import { useEffect, useState, useRef } from 'react';
import ProgressBar from '@/app/(pre-verification)/sign-in/_component/ProgressBar';
import * as styles from '@/styles/signin/singin.css';
import { useRouter } from 'next/navigation';
import Timer from '../../_component/Timer';
import { getCookie } from '@/util/getCookie';
import CodeDisplay from '../../_component/CodeDisplay';
import { useStore } from '@/store/useAccountStore';
import { ConfirmBankVerify } from '@/model/signin';
import { postBankConfirm } from '@/api/signin';

type CodeState = {
  code0: string;
  code1: string;
  code2: string;
  code3: string;
};

export default function Page() {
  const { accountInfo, setAccountInfo } = useStore();
  const [message, setMessage] = useState('다른 계좌로 인증하기');
  const [messagePart1, setMessagePart1] = useState('입금자명이 일치하지 않습니다');
  const [code, setCode] = useState<CodeState>({
    code0: '',
    code1: '',
    code2: '',
    code3: '',
  });

  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  const token = getCookie('accessToken') as string;

  const sendRequest = async () => {
    console.log('인증 진행');
    const codesAsString = Object.values(code).join('');
    try {
      const request: ConfirmBankVerify = {
        bankCode: accountInfo.bankCode,
        accountNo: accountInfo.accountNo,
        verificationWord: codesAsString,
      };
      const response = await postBankConfirm(request, token);
      console.log(response);
      router.push('/setup-password/init');
    } catch (error) {
      setIsError(true);
    }
  };

  const updateCodeState = (value: string) => {
    const newValues = value.split('');
    const newCode: CodeState = { code0: '', code1: '', code2: '', code3: '' };

    newValues.forEach((char, index) => {
      if (index < 4) {
        newCode[`code${index}` as keyof CodeState] = char;
      }
    });

    setCode(newCode);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setInputValue(newValue);

    if (!isComposing && newValue.length <= 4) {
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
    updateCodeState(event.currentTarget.value);
  };

  const handleSubmit = () => {
    sendRequest();
  };

  const ErrorMessage = () => {
    return <div className={styles.errorMent}>{messagePart1}</div>;
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.hiddenInput}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        maxLength={4}
      />
      <div className={styles.barContainer}>
        <ProgressBar />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          계좌로 받은 <br />
          입금자명을 입력해주세요
        </div>
        <div className={styles.timerContainer}>
          <Timer />
        </div>
        <div className={styles.numberContainer} onClick={focusInput}>
          <CodeDisplay code={code} />
        </div>
        <div className={styles.retryMent}>
          {isError && <ErrorMessage />}
          다른 계좌로 인증하기
        </div>
      </div>
      <div className={styles.submitButton} onClick={handleSubmit}>
        계좌 인증
      </div>
    </div>
  );
}
