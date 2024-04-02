'use client';

import { faker } from '@faker-js/faker';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getDate } from '@/util/dateFormat';
import * as styles from '@/styles/mypage/myPageMain.css';
import MyInfo from '@/app/(post-verification)/mypage/component/MyInfo';
import MyAccount from '@/app/(post-verification)/mypage/component/MyAccount';
import { QueryClient } from '@tanstack/react-query';
import { getMembers } from '@/api/member';
import UnpaidInfo from './component/UnpaidInfo';
import PayHistory from './component/PayHistory';

const Borrower = {
  memberId: 5,
  profileImage: faker.image.avatar(),
  nickname: '속석주',
};
const UnsettledBox = {
  createAt: new Date().toString(),
  Borrower: Borrower,
};
const Meet = {
  meetId: 1,
  meetName: '갈까마귀모임',
  meetImage: faker.image.avatar(),
};

const Receipt = {
  payId: 1,
  storeName: '(주) 뽕족 강남점',
  totalAmount: 40500,
};
const Payment = {
  createAt: new Date().toString(),
  meet: Meet,
  receipt: Receipt,
};

export default function MyPage() {
  const route = useRouter();

  // const token = cookies().get('accessToken');

  // const {meetId} = params;
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({queryKey: ['members', meetId, token?.value], queryFn: getMembers});
  return (
    <div className={styles.container}>
      <MyInfo />
      <MyAccount />
      <UnpaidInfo />
      <PayHistory />
    </div>
  );
}
