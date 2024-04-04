'use client';

import BackButton from '@/app/(post-verification)/component/BackButton';
import React from 'react';
import Image from 'next/image';
import vailedLeftButton from '@/assets/icons/vailedLeftButton.svg';
import unvailedRightButton from '@/assets/icons/unvailedRightButton.svg';
import { faker } from '@faker-js/faker';
import { getDate } from '@/util/dateFormat';
import dropdown from '@/assets/icons/dropdown.svg';
import dropup from '@/assets/icons/dropup.svg';
import { Member } from '@/model/member';
import { getCookie } from '@/util/getCookie';
import { getDebts } from '@/api/debts';
import { useState, useEffect } from 'react';
import { Result, ApiResponse } from '@/model/debts';
import DebtsHistory from '../component/DebtsHistory';
import * as styles from '@/styles/mypage/debts.css';

type Info = {
  name: string;
  profile: string;
  amount: number;
  createdAt: string | null;
  type: string;
};
export default function Unsettled() {
  const token = getCookie('accessToken') as string;
  const [response, setResponse] = useState<ApiResponse | undefined>();
  const getDebtsRequest = async () => {
    try {
      const response = await getDebts(token);
      setResponse(response);
    } catch (error) {}
  };

  const [list, setList] = useState<Info[]>([]);

  const formatDate = (inputDate: string | null | undefined): string => {
    if (inputDate === null || inputDate === undefined) {
      return '';
    }

    // Date 객체를 생성합니다.
    const date = new Date(inputDate);

    // 연도, 월, 일을 각각 가져옵니다.
    // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const year = date.getFullYear();
    // 월과 일이 한 자릿수일 경우 앞에 '0'을 붙여줍니다.
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    // 원하는 형식으로 날짜를 반환합니다.
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    getDebtsRequest();
  }, []);

  useEffect(() => {
    if (response) {
      // response가 undefined가 아닐 때만 실행
      const lentList = response.result.myLent.map((item) => ({
        name: item.borrowerName,
        profile: item.borrowerProfile,
        amount: item.amount,
        createdAt: formatDate(item.createdAt),
        type: 'lent',
      }));
      const borrowedList = response.result.myBorrowed.map((item) => ({
        name: item.lenderName,
        profile: item.lenderProfile,
        amount: item.amount,
        createdAt: formatDate(item.createdAt),
        type: 'borrowed',
      }));
      let combinedList = [...lentList, ...borrowedList];
      combinedList.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
      setList(combinedList);
      console.log(combinedList);
    }
  }, [response]); // response 상태가 업데이트될 때마다 이 로직이 실행됩니다.

  return (
    <div className={styles.container}>
      <article className={styles.articleStyle}>
        <BackButton />
        <p className={styles.title}>미정산 내역</p>
        <div />
      </article>
      <section className={styles.sectionStyle}>
        <div className={styles.totalBox}>
          <div className={styles.totalContent}>
            <p className={styles.totalFont}>대신 내준 금액</p>
            <p className={styles.totalAmount}>
              {response?.result.myLent.reduce(
                (acc, curr) => acc + curr.amount,
                0,
              )}
              원
            </p>
          </div>
          <div className={styles.totalContent}>
            <p className={styles.totalFont}>받은 금액</p>
            <p className={styles.totalAmount}>
              {response?.result.myBorrowed.reduce(
                (acc, curr) => acc + curr.amount,
                0,
              )}
              원
            </p>
          </div>
        </div>
        <div className={styles.historySection}>
          <p className={styles.totalAmount}>미정산 건수 {list.length} </p>
          <div className={styles.sortSection}>
            <Image src={dropdown} alt="" width={20} height={20} />
            {/* <Image src={dropup} alt="" width={20} height={20} /> */}
            <p className={styles.sortContent}>최신순</p>
          </div>
          <div className={styles.historyLists}>
            {list.map((item, index) => (
              <DebtsHistory
                name={item.name}
                profile={item.profile}
                amount={item.amount}
                createdAt={item.createdAt}
                type={item.type}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
