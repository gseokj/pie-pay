'use client';

import VirtualKeboard from '@/app/_component/VirtualKeboard';
import * as styles from '@/styles/setpassword/setPassword.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useSetupPassword';
import { getCookie } from '@/util/getCookie';
import { postInitPassword } from '@/api/password';
import { RequestSetPassword } from '@/model/password';

interface Password {
  value0: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
}

export default function SimplePasswordSet() {
  // const index: number = 0;
  const [index, setIndex] = useState<number>(0);
  const [password, setPassword] = useState<Password>({
    value0: '',
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  });

  const token = getCookie('accessToken') as string;
  const router = useRouter();
  const sendRequest = async () => {
    console.log('인증 진행');
    {
      const codesAsString = Object.values(password).join('');
      try {
        const request: RequestSetPassword = {
          paymentPassword: codesAsString,
        };
        const response = await postInitPassword(request, token);
        console.log('Verification response:', response);
        router.push('/setup-password/check');
      } catch (error) {}
    }
  };

  const { password: storePassword, setPassword: setStorePassword } = useStore();
  // updateState();
  useEffect(() => {
    console.log(index);
    console.log(password);
    if (index === 6) {
      setStorePassword(password);
      sendRequest();
    }
  }, [password, index]);

  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <div className={styles.title}>간편 비밀번호 설정</div>
        <div className={styles.description}>
          새로 설정할 간편 비밀번호를 입력하세요
        </div>
      </div>
      <div className={styles.passwordWrapper}>
        <ul className={styles.passwordScreen}>
          <li className={styles.dotWrapper}>
            <div
              className={
                password.value0 === ''
                  ? styles.dotBeforeInput
                  : styles.dotAfterInput
              }
            ></div>
          </li>
          <li className={styles.dotWrapper}>
            <div
              className={
                password.value1 === ''
                  ? styles.dotBeforeInput
                  : styles.dotAfterInput
              }
            ></div>
          </li>
          <li className={styles.dotWrapper}>
            <div
              className={
                password.value2 === ''
                  ? styles.dotBeforeInput
                  : styles.dotAfterInput
              }
            ></div>
          </li>
          <li className={styles.dotWrapper}>
            <div
              className={
                password.value3 === ''
                  ? styles.dotBeforeInput
                  : styles.dotAfterInput
              }
            ></div>
          </li>
          <li className={styles.dotWrapper}>
            <div
              className={
                password.value4 === ''
                  ? styles.dotBeforeInput
                  : styles.dotAfterInput
              }
            ></div>
          </li>
          <li className={styles.dotWrapper}>
            <div
              className={
                password.value5 === ''
                  ? styles.dotBeforeInput
                  : styles.dotAfterInput
              }
            ></div>
          </li>
        </ul>
      </div>
      <VirtualKeboard
        password={password}
        setPassword={setPassword}
        index={index}
        setIndex={setIndex}
      />
    </div>
  );
}
