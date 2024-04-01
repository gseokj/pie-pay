'use client';

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

export default function Page() {
  const { accountInfo, setAccountInfo } = useStore();
  const [message, setMessage] = useState('다른 계좌로 인증하기'); // 메시지 상태 추가
  const [messagePart1, setMessagePart1] =
    useState('입금자명이 일치하지 않습니다');
  const [code, setCode] = useState({
    code0: '',
    code1: '',
    code2: '',
    code3: '',
  });

  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // 입력 필드에 대한 참조를 생성합니다.
  const [isComposing, setIsComposing] = useState(false); // 한글 입력 중인지 확인하기 위한 상태
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      // 값을 설정한 후에 커서를 값의 끝으로 이동
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  const token = getCookie('accessToken') as string;

  const sendRequest = async () => {
    console.log('인증 진행');
    {
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
        onCompositionStart={handleCompositionStart} // 한글 입력 시작 이벤트 추가
        onCompositionEnd={handleCompositionEnd} // 한글 입력 완료 이벤트 추가
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
