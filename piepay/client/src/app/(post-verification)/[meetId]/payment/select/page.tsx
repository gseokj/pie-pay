'use client';

import * as styles from '@/styles/payment/select/selectMember.css';
import one from '@/assets/icons/payment1.svg';
import SearchNickname from '@/app/(post-verification)/[meetId]/payment/select/component/SearchNickname';
import SelectedMember from '@/app/(post-verification)/[meetId]/payment/select/component/SelectedMember';
import MemberList from '@/app/(post-verification)/[meetId]/payment/select/component/MemberList';
import ListHeader from '@/app/(post-verification)/[meetId]/payment/select/component/ListHeader';
import Header from '@/app/(post-verification)/[meetId]/payment/component/Header';
import { useQueryClient } from '@tanstack/react-query';
import { useMemberFilter } from '@/store/useMemberFilter';
import { Me, Member } from '@/model/member';
import { useEffect, useState } from 'react';
import { getCookie } from '@/util/getCookie';
import { postParticipant } from '@/api/participant';
import { Payment } from '@/model/participant';
import { usePayment } from '@/store/usePayment';
import { useRouter } from 'next/navigation';

type Props = {
  params: { meetId: string },
}
export default function Page({ params }: Props) {

  const route = useRouter();
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = getCookie('accessToken') as string;
    setToken(token);
  }, []);
  const queryClient = useQueryClient();
  const myInfo: Me | undefined = queryClient.getQueryData(["userInfo",token]);
  const { meetId } = params;
  const Members = queryClient.getQueryData(['meetMembers',meetId, token]) as Member[];
  const { setFilterMembers, filterMembers } = useMemberFilter();
  const { setPayment, payment } = usePayment();


  useEffect(() => {
    if (!Members || Members.length <= 0 || !myInfo) return;
    setFilterMembers(Members.sort((member) => member.memberId == myInfo.memberId ? -1 : 1));
  }, [Members,myInfo]);

  const sendNotification = () =>{
    postParticipant(meetId, token, filterMembers.filter(member => member.isSelected)).then((response) => {
      const res: Payment = response;
      res.participants.sort((member) => member.memberInfo.memberId == myInfo?.memberId ? -1 : 1);
      setPayment(res);
      route.replace(`approve/${res['payId']}`);
    }).catch((error) => {
      console.log(error);
    });

  }
  return (
    <div className={styles.container}>
      <Header type={one} />
      <div className={styles.contentContainer}>
        <div className={styles.headerContainer}>
          <p className={styles.title}>결제 멤버를 선택해 주세요</p>
        </div>
        <div className={styles.listHeaderContainer}>
          <SelectedMember />
          <SearchNickname />
          <hr className={styles.hr} />
          {<ListHeader />}
        </div>
        <MemberList />
        <button onClick={sendNotification} className={styles.submitButton}>
          <p>알림 보내기</p>
        </button>
      </div>
    </div>
  );
}