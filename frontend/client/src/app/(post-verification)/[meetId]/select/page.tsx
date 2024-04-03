'use client';

import * as styles from '@/styles/payment/select/selectMember.css';
import one from '@/assets/icons/payment1.svg';
import SearchNickname from '@/app/(post-verification)/[meetId]/select/component/SearchNickname';
import SelectedMember from '@/app/(post-verification)/[meetId]/select/component/SelectedMember';
import MemberList from '@/app/(post-verification)/[meetId]/select/component/MemberList';
import ListHeader from '@/app/(post-verification)/[meetId]/select/component/ListHeader';
import Header from "@/app/(post-verification)/payment/component/Header";
import ParticipateButton from '@/app/(post-verification)/[meetId]/select/component/ParticipateButton';
import { useQueryClient } from '@tanstack/react-query';
import { useMemberFilter } from '@/store/useMemberFilter';
import { Me, Member } from '@/model/member';
import { useEffect, useState } from 'react';
import { getCookie } from '@/util/getCookie';

type Props = {
  params: { meetId: string },
}
export default function Page({ params }: Props) {
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

  useEffect(() => {
    if (!Members || Members.length <= 0 || !myInfo) return;
    setFilterMembers(Members.sort((member) => member.memberId == myInfo.memberId ? -1 : 1));
    console.log(filterMembers);
  }, [Members,myInfo]);

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
        <ParticipateButton meetId={meetId} />
      </div>
    </div>
  );
}