'use client';

import React, { useEffect, useState } from 'react';
import * as styles from '@/styles/signin/singin.css';
import ProgressBar from '../_component/ProgressBar';
import Terms from '../_component/Terms';
import { useRouter } from 'next/navigation';

type Term = {
  id: number;
  title: string;
  content: string;
};

export default function Page() {
  const [agree, setAgree] = useState<boolean[]>([false, false]);

  const router = useRouter();
  const bankTermsList: Term[] = [
    {
      id: 1,
      title: '[필수] 오픈뱅킹 출금이체 동의',
      content: '그래도 동의하시죠?',
    },
    {
      id: 2,
      title: '[필수] 금융결제원 개인정보 제공 동의',
      content: '그래도 동의하시죠?',
    },
    {
      id: 3,
      title: '[필수] 개인(신용)정보 수집 및 이용 동의',
      content: '그래도 동의하시죠?',
    },
  ];

  const myuDataTermsList: Term[] = [
    {
      id: 1,
      title: '[필수] 개인 및 고유식별정보 수집 및 이용 동의',
      content: '그래도 동의하시죠?',
    },
    {
      id: 2,
      title: '[필수] 상세정보 관련 개인정보 수집 이용 동의',
      content: '그래도 동의하시죠?',
    },
    {
      id: 3,
      title: '[필수] 개인정보 제3자 제공 동의',
      content: '그래도 동의하시죠?',
    },
  ];

  const handleAgreeChange = (index: number, isAgreed: boolean) => {
    setAgree((prevAgree) => {
      const updatedAgree = [...prevAgree];
      updatedAgree[index] = isAgreed;
      return updatedAgree;
    });
  };

  const route = () => {
    if (agree[0] && agree[1]) {
      router.push('/sign-in/account-auth/account-form');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <ProgressBar />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          은행 계좌 연결과 <br />
          마이 데이터 사용 동의가 필요해요
        </div>
        <div className={styles.termsBox}>
          <Terms
            title={'bank'}
            termsList={bankTermsList}
            onAgreeChange={(isAgreed) => handleAgreeChange(0, isAgreed)}
          />
        </div>
        <div className={styles.termsBox}>
          <Terms
            title={'my'}
            termsList={myuDataTermsList}
            onAgreeChange={(isAgreed) => handleAgreeChange(1, isAgreed)}
          />
        </div>
      </div>
      <div className={styles.submitButton} onClick={route}>
        약관 동의
      </div>
    </div>
  );
}
