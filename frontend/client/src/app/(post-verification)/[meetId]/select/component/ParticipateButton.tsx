'use client';

import { useRouter } from 'next/navigation';
import * as styles from '@/styles/payment/select/selectMember.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useMemberFilter } from '@/store/useMemberFilter';
import { usePayment } from '@/store/usePayment';
import { Payment } from '@/model/participant';
import { LoaderComponent } from '@/app/component/Loading';
import { useEffect, useState } from 'react';
import { getCookie } from '@/util/getCookie';
import { Me } from '@/model/member';
import { fixMeet } from '@/api/meet';
import { Meet } from '@/model/meet/meets';
import { postParticipant } from '@/api/payment';


type Props = {
  meetId: string
}

export default function ParticipateButton({ meetId }: Props) {
  const [isPending, setIsPending] = useState(false);
  const route = useRouter();
  const { filterMembers } = useMemberFilter();
  const { setPayment, payment } = usePayment();
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = getCookie('accessToken') as string;
    setToken(token);
  }, []);
  const queryClient = useQueryClient();
  const myInfo: Me | undefined = queryClient.getQueryData(['userInfo', token]);


  const createParticipant = () => {
    postParticipant(meetId, token, filterMembers.filter(member => member.isSelected)).then((response) => {
      const res: Payment = response;
      res.participants.sort((member) => member.memberInfo.memberId == myInfo?.memberId ? -1 : 1);
      setIsPending(true);
      setPayment(res);
      route.replace(`/payment/approve/${response['payId']}`);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      {isPending && <LoaderComponent />}
      <button onClick={createParticipant} className={styles.submitButton}>
        <div>알림 보내기</div>
      </button>
    </>
  );
}