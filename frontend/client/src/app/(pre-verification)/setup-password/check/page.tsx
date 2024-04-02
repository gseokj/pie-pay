'use client';

import VirtualKeboard from '@/app/_component/VirtualKeboard';
import * as styles from '@/styles/setpassword/setPassword.css';
import { useEffect, useState } from 'react';
import { getCookie } from '@/util/getCookie';
import { useStore } from '@/store/useSetupPassword';
import { useRouter } from 'next/navigation';
import { postConfirmPassword } from '@/api/password';
import { RequestSetPassword } from '@/model/password';
import { getMyInfo } from '@/api/user';
import { assert } from 'console';

interface Password {
  value0: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
}

export default function SimplePasswordCheck() {
  const router = useRouter();
  const [index, setIndex] = useState<number>(0);
  const [result, setResult] = useState<boolean>(true);
  const [password, setPassword] = useState<Password>({
    value0: '',
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  });

  const { password: storePassword }: { password: Password } = useStore();

  const [token, setToken] = useState('');

  useEffect(() => {
    const token = getCookie('accessToken') as string;
    setToken(token);
  }, []);


  const sendRequest = async () => {
    console.log('인증 진행');
    {
      const codesAsString = Object.values(password).join('');
      try {
        const request: RequestSetPassword = {
          paymentPassword: codesAsString,
        };
        const response = await postConfirmPassword(request, token);
        console.log('Verification response:', response);
        console.log('accessToken : ' + response.result.accessToken);
        settingToken(response.result.accessToken);
      } catch (error) {}
    }
  };

  const settingToken = async (accessToken: string) => {
    if (typeof accessToken === 'string') {
      document.cookie = `accessToken=${accessToken} ; path=/`;
      setSession(accessToken);
      console.log('accessToken : ' + accessToken);
      // refreshRequest(accessToken);
      router.push('/');
    } else {
      router.back();
    }
  };

  const setSession = async (token: string) => {
    const myInfo = await getMyInfo(token);
    document.cookie = `myInfo=${JSON.stringify(myInfo.result)};`;
  };

  useEffect(() => {
    console.log(index);
    console.log(password);
    if (index === 6) {
      console.log('======================= 비교 시작 =======================');
      // setResult(
      console.log(Object.entries(password).toString());
      console.log(Object.entries(storePassword).toString());
      setResult(
        Object.entries(password).toString() ==
          Object.entries(storePassword).toString(),
      );
      sendRequest();
      console.log(result);
    }
  }, [password, index, result]);
  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <div className={styles.title}>간편 비밀번호 확인</div>
        <div className={styles.description}>
          비밀번호를 다시 한번 입력하세요
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
        <div
          className={result ? styles.messageInvisible : styles.messageVisible}
        >
          비밀번호가 일치하지 않습니다
        </div>
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
