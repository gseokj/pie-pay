'use client';

import { Payment } from '@/model/participant';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Open from '@/app/(post-verification)/[meetId]/payment/approve/[payId]/page/Open';
import QRCode from '@/app/(post-verification)/[meetId]/payment/approve/[payId]/page/QRCode';
import { useEffect, useState } from 'react';
import { usePayment } from '@/store/usePayment';
import { getCookie } from '@/util/getCookie';
import { Me } from '@/model/member';
import { useSSE } from '@/store/useSSE';
import { useRouter } from 'next/navigation';
import { usePaymentSocket } from '@/store/usePaymentSocket';

type Props = { params: { payId: string } }

export default function Page({ params }: Props) {
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = getCookie('accessToken') as string;
    setToken(token);
  }, [token]);

  const { payId } = params;
  const queryClient = useQueryClient();
  const { payment, setPayment } = usePayment();

  const { res } = usePaymentSocket();
  const router = useRouter();

  // 결제 알람 넘어가는 용도
  const { SSEnotification } = useSSE();

  useEffect(() => {
    // 만약 방 개설자 아니다 || 방 개설자지만 나갔다가 들어왔다면  => 서버에서 불러온 payment를 넣어주는 과정
    if (!token) return;
    console.log(token);
    const p: Payment | undefined = queryClient.getQueryData(['payment', Number(payId), token]);
    console.log(p);
    const myInfo: Me | undefined = queryClient.getQueryData(['userInfo', token]);
    if (payment || !p) return;
    p.participants.sort((member) => member.memberInfo.memberId == myInfo?.memberId ? -1 : 1);
    setPayment(p);
  }, [token, payment]);
  useEffect(() => {
    console.log(SSEnotification);
    if (!SSEnotification || !payment) return;
    if (SSEnotification?.referenceId === 1 && SSEnotification?.destinationId === Number(payId)) {
      // router.replace(`${payId}/complete`);
      console.log('결제발생');
    }
  }, [SSEnotification]);
  useEffect(() => {
    if (!res) return;

    if (res.payStatus === 'COMPLETE' || res.payStatus === 'CLOSE') {
      console.log("여기왔음")
      router.replace(`/5/payment/approve/${payId}/complete`);
    }

  }, [res]);
  return (<>
    {payment?.payStatus === 'OPEN' && <Open payId={Number(payId)} />}
    {payment?.payStatus === 'ING' && <QRCode payId={Number(payId)} />}

  </>);
}